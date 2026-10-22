import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { getExam } from "@/lib/course/content";
import { toPublicQuestion } from "@/lib/course/grading";
import { buildExamResult, courseContext, examMinutes } from "@/lib/course/server";
import { attemptState, lessonCompletions, pendingRestart, restartInfo } from "@/lib/course/attempts";
import { cooldownMinutes, SUBMIT_GRACE_MS, type AttemptSummary } from "@/lib/course/attempt-rules";
import type { Exam, ExamKind, Response } from "@/lib/course/types";
import { recordActivity } from "@/lib/gamification-server";
import { XP } from "@/lib/gamification";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; kind: string }> };

const isKind = (k: string): k is ExamKind => k === "pretest" || k === "tryout";

/** Section intros and listening answer windows sit outside the section clocks. */
const SLACK_MINUTES = 10;

/** Where the student was: section, question, section clock and answers. */
type Draft = { section: number; sectionStartedAt: number | null; index: number; responses: Record<string, Response | null> };

type AttemptRow = {
  id: string;
  kind: ExamKind;
  started_at: string;
  submitted_at: string | null;
  answers: Record<string, Response | null> | null;
  draft: Draft | null;
  total_score: number | null;
  auto_submitted: boolean;
  counted: boolean;
  restarted_at: string | null;
};

const COLUMNS = "id, kind, started_at, submitted_at, answers, draft, total_score, auto_submitted, counted, restarted_at";

/** Section layout for the review screen (ids in order + passages). */
function layoutOf(exam: Exam) {
  return exam.sections.map((s) => ({ skill: s.skill, title: s.title, questionIds: s.questions.map((q) => q.id), passages: s.passages ?? [] }));
}

async function load(slug: string, kind: string) {
  if (!isKind(kind)) return { ok: false as const, error: "Unknown test.", status: 404 };
  const ctx = await courseContext(slug);
  if (!ctx.ok) return ctx;
  if (kind === "tryout") {
    if (!ctx.access) return { ok: false as const, error: "You don't own this course yet.", status: 403 };
    if (!ctx.unlocks.tryoutUnlocked) {
      return { ok: false as const, error: "The tryout opens after every lesson and Big Quiz is done.", status: 403 };
    }
  }
  const exam = getExam(ctx.course, kind);
  if (!exam) return { ok: false as const, error: "This course doesn't have that test.", status: 404 };
  return { ...ctx, kind, exam };
}

type Ctx = Extract<Awaited<ReturnType<typeof load>>, { exam: Exam }>;

const deadlineOf = (exam: Exam, startedAt: string) => Date.parse(startedAt) + (examMinutes(exam) + SLACK_MINUTES) * 60_000;
const countOf = (exam: Exam) => exam.sections.reduce((n, s) => n + s.questions.length, 0);

async function loadAttempts(ctx: Ctx): Promise<AttemptRow[]> {
  const { data } = await ctx.admin
    .from("course_attempts")
    .select(COLUMNS)
    .eq("student_id", ctx.user.id)
    .eq("course_slug", ctx.course.slug)
    .eq("kind", ctx.kind)
    .order("started_at", { ascending: true });
  // Unfinished attempts from before autosave existed have nothing to grade: leave them out.
  return ((data || []) as AttemptRow[]).filter((r) => r.submitted_at || r.counted);
}

/** Grades and closes an attempt; null when another request closed it first. */
async function finish(ctx: Ctx, row: AttemptRow, answers: Record<string, Response | null>, auto: boolean) {
  const submittedAt = new Date().toISOString();
  const result = buildExamResult(ctx.exam, { ...row, answers, submitted_at: submittedAt });
  const { data, error } = await ctx.admin
    .from("course_attempts")
    .update({
      answers,
      submitted_at: submittedAt,
      auto_submitted: auto,
      total_score: result.totalScore,
      result: { sections: result.sections, totalScore: result.totalScore, overtime: result.overtime },
    })
    .eq("id", row.id)
    .is("submitted_at", null)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const xp = await recordActivity(ctx.admin, ctx.user.id, { study: true, award: { source: "exam", ref: `${ctx.course.slug}:${ctx.kind}`, xp: XP.exam } });
  return { result, xp };
}

/** Attempts with expired timers submitted (with their autosave), plus the student's standing. */
async function current(ctx: Ctx) {
  let rows = await loadAttempts(ctx);
  const expired = rows.filter((r) => !r.submitted_at && deadlineOf(ctx.exam, r.started_at) + SUBMIT_GRACE_MS < Date.now());
  if (expired.length) {
    for (const r of expired) await finish(ctx, r, r.draft?.responses || {}, true);
    rows = await loadAttempts(ctx);
  }
  const summaries: AttemptSummary[] = rows.map((r, i) => ({
    id: r.id,
    no: i + 1,
    startedAt: r.started_at,
    submittedAt: r.submitted_at,
    score: r.total_score,
    maxScore: null,
    passed: null,
    autoSubmitted: r.auto_submitted,
    counted: r.counted,
  }));
  const state = attemptState(
    rows.map((r, i) => ({ id: r.id, no: i + 1, submittedAt: r.submitted_at, deadline: new Date(deadlineOf(ctx.exam, r.started_at)).toISOString(), counted: r.counted })),
    summaries,
    countOf(ctx.exam),
    ctx.profile.role === "admin"
  );
  // Starting over a tryout means studying the last chapter's lessons again.
  // The free course pretest is a diagnostic: three attempts, no restart.
  const lessons = ctx.kind === "tryout" ? restartLessons(ctx) : [];
  const marker = ctx.kind === "tryout" ? pendingRestart(rows) : null;
  const completions = marker ? await lessonCompletions(ctx.admin, ctx.user.id, ctx.course.slug) : new Map(lessons.filter((l) => ctx.unlocks.done.has(l.id)).map((l) => [l.id, "done"]));
  const info = restartInfo(lessons, completions, marker, state);
  const restart = ctx.kind === "tryout" ? info : { ...info, available: false, pending: false };
  return { rows, state, restart };
}

/** The lessons right before the tryout: the level that opens it (default: the last one). */
function restartLessons(ctx: Ctx) {
  const gate = ctx.course.levels.find((l) => l.id === ctx.course.tryoutAfterLevel) ?? ctx.course.levels.at(-1);
  return gate?.lessons ?? [];
}

/**
 * GET — overview: format, time, attempt log and the student's standing.
 * GET ?attemptId= — a finished attempt with full review.
 */
export async function GET(request: NextRequest, { params }: Params) {
  const { slug, kind } = await params;
  const ctx = await load(slug, kind);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  const { rows, state, restart } = await current(ctx);

  const attemptId = request.nextUrl.searchParams.get("attemptId");
  if (attemptId) {
    const attempt = rows.find((r) => r.id === attemptId && r.submitted_at);
    if (!attempt) return jsonError("Result not found.", 404);
    return NextResponse.json({
      result: { ...buildExamResult(ctx.exam, { ...attempt, submitted_at: attempt.submitted_at! }), autoSubmitted: attempt.auto_submitted },
      layout: layoutOf(ctx.exam),
    });
  }

  return NextResponse.json({
    title: ctx.exam.title,
    description: ctx.exam.description,
    minutes: examMinutes(ctx.exam),
    questions: countOf(ctx.exam),
    cooldownMin: cooldownMinutes(countOf(ctx.exam)),
    sections: ctx.exam.sections.map((s) => ({ skill: s.skill, title: s.title, minutes: s.minutes, questions: s.questions.length })),
    state,
    restart,
  });
}

/**
 * POST { action: "start" } — begin (or resume) an attempt; returns the exam
 * without keys, the server's deadline and the autosaved draft.
 * POST { action: "save", attemptId, draft } — autosave.
 * POST { action: "submit", attemptId, responses } — grade and store.
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, kind } = await params;
  const ctx = await load(slug, kind);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);

  const body = await readJson<{ action?: string; attemptId?: string; responses?: Record<string, Response | null>; draft?: Draft }>(request);

  if (body?.action === "restart") {
    const { rows, restart } = await current(ctx);
    if (!restart.available) return jsonError("You can start over once all your attempts are used.", 409);
    // The round stops counting; the last chapter's lessons must be studied again. Nothing else changes.
    const { error } = await ctx.admin
      .from("course_attempts")
      .update({ counted: false, restarted_at: new Date().toISOString() })
      .in("id", rows.filter((r) => r.counted).map((r) => r.id));
    if (error) return jsonError("Couldn't start over.", 500);
    const lessons = restartLessons(ctx);
    return NextResponse.json({ ok: true, firstLesson: lessons[0]?.id ?? null });
  }

  if (body?.action === "start") {
    const standing = await current(ctx);
    let { rows, state } = standing;
    let attempt = rows.find((r) => !r.submitted_at);
    if (!attempt) {
      if (standing.restart.pending) return jsonError("Study the lessons again first — then your new attempts open.", 409);
      if (state.left <= 0) return jsonError("You've used all your attempts for this test.", 409);
      if (state.cooldownUntil) return jsonError("Take a short break — the next attempt opens soon.", 429);
      const { error } = await ctx.admin.from("course_attempts").insert([{ student_id: ctx.user.id, course_slug: slug, kind: ctx.kind }]);
      if (error) return jsonError("Couldn't start the test.", 500);
      ({ rows, state } = await current(ctx));
      attempt = rows.find((r) => !r.submitted_at);
      if (!attempt) return jsonError("Couldn't start the test.", 500);
    }

    return NextResponse.json({
      attemptId: attempt.id,
      attemptNo: rows.indexOf(attempt) + 1,
      startedAt: attempt.started_at,
      deadline: new Date(deadlineOf(ctx.exam, attempt.started_at)).toISOString(),
      serverNow: new Date().toISOString(),
      draft: attempt.draft,
      state,
      exam: {
        kind: ctx.exam.kind,
        title: ctx.exam.title,
        sections: ctx.exam.sections.map((s) => ({
          skill: s.skill,
          title: s.title,
          minutes: s.minutes,
          directions: s.directions,
          parts: s.parts,
          passages: s.passages ?? [],
          questions: s.questions.map(toPublicQuestion),
        })),
      },
    });
  }

  if (body?.action === "save" || body?.action === "submit") {
    if (!body.attemptId) return jsonError("attemptId is required.");
    const rows = await loadAttempts(ctx);
    const attempt = rows.find((r) => r.id === body.attemptId);
    if (!attempt) return jsonError("Test session not found.", 404);
    const late = Date.now() > deadlineOf(ctx.exam, attempt.started_at) + SUBMIT_GRACE_MS;

    if (body.action === "save") {
      if (attempt.submitted_at) return jsonError("This test has already been submitted.", 409);
      if (late || !body.draft) return jsonError("Time is up for this test.", 409);
      const { error } = await ctx.admin
        .from("course_attempts")
        .update({ draft: body.draft, draft_saved_at: new Date().toISOString() })
        .eq("id", attempt.id)
        .is("submitted_at", null);
      if (error) return jsonError("Couldn't save your answers.", 500);
      return NextResponse.json({ ok: true });
    }

    if (attempt.submitted_at) return jsonError("This test has already been submitted.", 409);
    // Answers sent long after the deadline don't count: grade the last autosave instead.
    const done = await finish(ctx, attempt, late ? attempt.draft?.responses || {} : body.responses || {}, late);
    if (!done) return jsonError("This test has already been submitted.", 409);
    const { state } = await current(ctx);
    return NextResponse.json({ result: { ...done.result, autoSubmitted: late }, layout: layoutOf(ctx.exam), xp: done.xp, state });
  }

  return jsonError("Unknown action.");
}
