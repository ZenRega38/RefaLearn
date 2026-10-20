import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { findLevelQuiz, quizSet } from "@/lib/course/content";
import { toPublicQuestion } from "@/lib/course/grading";
import { courseContext } from "@/lib/course/server";
import {
  closeExpiredQuizAttempts,
  lessonCompletions,
  pendingRestart,
  finishQuizAttempt,
  loadQuizAttempts,
  quizResult,
  quizState,
  quizTimeLimit,
  restartInfo,
  type CourseCtx,
  type FoundQuiz,
  type QuizAttemptRow,
} from "@/lib/course/attempts";
import { cooldownMinutes, SUBMIT_GRACE_MS } from "@/lib/course/attempt-rules";
import type { Response } from "@/lib/course/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; quizId: string }> };

async function load(slug: string, quizId: string): Promise<{ ok: false; error: string; status: number } | { ok: true; ctx: CourseCtx; found: FoundQuiz }> {
  const ctx = await courseContext(slug);
  if (!ctx.ok) return ctx;
  if (!ctx.access) return { ok: false, error: "You don't own this course yet.", status: 403 };
  const found = findLevelQuiz(ctx.course, quizId);
  if (!found) return { ok: false, error: "Quiz not found.", status: 404 };
  if (!ctx.unlocks.unlocked.has(quizId)) return { ok: false, error: "Finish the earlier parts first.", status: 403 };
  return { ok: true, ctx, found };
}

/** Attempts with expired timers submitted, plus where the student stands. */
async function current(ctx: CourseCtx, found: FoundQuiz) {
  const rows = await closeExpiredQuizAttempts(ctx, found, await loadQuizAttempts(ctx.admin, ctx.user.id, ctx.course.slug, found.quiz.id), SUBMIT_GRACE_MS);
  const state = quizState(rows, found, ctx.profile.role === "admin");
  // Starting over means studying this chapter's lessons again (and only those).
  const marker = pendingRestart(rows);
  const completions = marker ? await lessonCompletions(ctx.admin, ctx.user.id, ctx.course.slug) : new Map<string, string>();
  const restart = restartInfo(found.level.lessons, marker ? completions : new Map(found.level.lessons.filter((l) => ctx.unlocks.done.has(l.id)).map((l) => [l.id, "done"])), marker, state);
  return { rows, state, restart };
}

/**
 * GET — the quiz overview (no questions): rules, time limit, attempt log
 * and best result. GET ?attemptId= — one finished attempt with its review.
 */
export async function GET(request: NextRequest, { params }: Params) {
  const { slug, quizId } = await params;
  const loaded = await load(slug, quizId);
  if (!loaded.ok) return jsonError(loaded.error, loaded.status);
  const { ctx, found } = loaded;
  const { rows, state, restart } = await current(ctx, found);

  const attemptId = request.nextUrl.searchParams.get("attemptId");
  if (attemptId) {
    const row = rows.find((r) => r.id === attemptId && r.submitted_at);
    if (!row) return jsonError("Result not found.", 404);
    return NextResponse.json({ result: quizResult(found, row) });
  }

  // The stored best result, or a better one closed just now (an expired attempt).
  const stored = ctx.progress.find((p) => p.itemId === quizId);
  const top = rows.filter((r) => r.submitted_at && r.score != null).sort((a, b) => b.score! - a.score!)[0];
  const best =
    top && (!stored || (stored.score ?? 0) < top.score!)
      ? { score: top.score, maxScore: top.max_score, passed: !!top.passed || !!stored?.passed }
      : stored ? { score: stored.score, maxScore: stored.maxScore, passed: stored.passed } : null;
  return NextResponse.json({
    isPretest: found.isPretest,
    mascot: ctx.course.mascot ?? null,
    openOrder: !!ctx.course.openOrder,
    quiz: {
      id: found.quiz.id,
      title: found.quiz.title,
      passPercent: found.quiz.passPercent,
      questionCount: found.quiz.questions.length,
      sets: found.quiz.sets?.length ?? 1,
      parts: found.quiz.parts ?? null,
    },
    level: { id: found.level.id, title: found.level.title },
    timeLimitSec: quizTimeLimit(ctx, found),
    cooldownMin: cooldownMinutes(found.quiz.questions.length),
    best,
    state,
    restart,
  });
}

/**
 * POST { action: "start" } — open a new attempt (or resume the open one):
 * the questions without keys, the server's deadline and the saved draft.
 * POST { action: "save", attemptId, responses } — autosave.
 * POST { action: "submit", attemptId, responses } — grade and close.
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, quizId } = await params;
  const loaded = await load(slug, quizId);
  if (!loaded.ok) return jsonError(loaded.error, loaded.status);
  const { ctx, found } = loaded;
  const body = await readJson<{ action?: string; attemptId?: string; responses?: Record<string, Response | null> }>(request);

  if (body?.action === "restart") {
    const { rows, restart } = await current(ctx, found);
    if (!restart.available) return jsonError("You can start over once all your attempts are used.", 409);
    // The round stops counting; its lessons must be studied again. Nothing else changes.
    const { error } = await ctx.admin
      .from("course_quiz_attempts")
      .update({ counted: false, restarted_at: new Date().toISOString() })
      .in("id", rows.filter((r) => r.counted).map((r) => r.id));
    if (error) return jsonError("Couldn't start over.", 500);
    return NextResponse.json({ ok: true, firstLesson: found.level.lessons[0]?.id ?? null });
  }

  if (body?.action === "start") {
    const standing = await current(ctx, found);
    let { rows, state } = standing;
    let row: QuizAttemptRow | undefined = rows.find((r) => !r.submitted_at);
    if (!row) {
      if (standing.restart.pending) return jsonError("Study the lessons again first — then your new attempts open.", 409);
      if (state.left <= 0) return jsonError("You've used all your attempts for this quiz.", 409);
      if (state.cooldownUntil) return jsonError("Take a short break — the next attempt opens soon.", 429);
      const now = Date.now();
      const { data, error } = await ctx.admin
        .from("course_quiz_attempts")
        .insert({
          student_id: ctx.user.id,
          course_slug: slug,
          item_id: quizId,
          attempt_no: (rows.at(-1)?.attempt_no ?? 0) + 1,
          started_at: new Date(now).toISOString(),
          deadline_at: new Date(now + quizTimeLimit(ctx, found) * 1000).toISOString(),
        })
        .select("id")
        .single();
      // Two tabs pressing Start at once: the other one won, use its attempt.
      if (error && !/duplicate key/.test(error.message)) return jsonError("Couldn't start the quiz.", 500);
      rows = await loadQuizAttempts(ctx.admin, ctx.user.id, slug, quizId);
      row = rows.find((r) => !r.submitted_at) ?? rows.find((r) => r.id === data?.id);
      if (!row) return jsonError("Couldn't start the quiz.", 500);
      state = quizState(rows, found, ctx.profile.role === "admin");
    }

    const set = quizSet(found.quiz, row.attempt_no);
    return NextResponse.json({
      attempt: { id: row.id, no: row.attempt_no, startedAt: row.started_at, deadline: row.deadline_at },
      serverNow: new Date().toISOString(),
      questions: set.questions.map(toPublicQuestion),
      passages: set.passages ?? [],
      draft: row.draft || {},
      state,
    });
  }

  if (body?.action === "save" || body?.action === "submit") {
    if (!body.attemptId) return jsonError("attemptId is required.");
    const rows = await loadQuizAttempts(ctx.admin, ctx.user.id, slug, quizId);
    const row = rows.find((r) => r.id === body.attemptId);
    if (!row) return jsonError("Attempt not found.", 404);

    const late = Date.now() > Date.parse(row.deadline_at) + SUBMIT_GRACE_MS;
    if (body.action === "save") {
      if (row.submitted_at) return jsonError("This attempt has already been submitted.", 409);
      if (late) return jsonError("Time is up for this attempt.", 409);
      const { error } = await ctx.admin
        .from("course_quiz_attempts")
        .update({ draft: body.responses || {}, draft_saved_at: new Date().toISOString() })
        .eq("id", row.id)
        .is("submitted_at", null);
      if (error) return jsonError("Couldn't save your answers.", 500);
      return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
    }

    // Submit. Answers sent long after the deadline don't count: the last
    // autosave from before the deadline is graded instead.
    let xp = 0;
    let closed = row;
    if (!row.submitted_at) {
      const done = await finishQuizAttempt(ctx, found, row, late ? row.draft || {} : body.responses || {}, late);
      if (done) {
        closed = done.row;
        xp = done.xp;
      } else {
        closed = (await loadQuizAttempts(ctx.admin, ctx.user.id, slug, quizId)).find((r) => r.id === row.id) ?? row;
      }
    }
    const fresh = await loadQuizAttempts(ctx.admin, ctx.user.id, slug, quizId);
    return NextResponse.json({ result: quizResult(found, closed), state: quizState(fresh, found, ctx.profile.role === "admin"), xp });
  }

  return jsonError("Unknown action.");
}
