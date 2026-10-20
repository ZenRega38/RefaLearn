import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { quizSet } from "@/lib/course/content";
import { courseContext, gradeQuestions, logSubmission } from "@/lib/course/server";
import { cooldownMinutes, MAX_ATTEMPTS, quizSeconds, type AttemptState, type AttemptSummary, type RestartInfo } from "@/lib/course/attempt-rules";
import type { Level, LevelQuiz, Response } from "@/lib/course/types";
import { recordActivity } from "@/lib/gamification-server";
import { XP } from "@/lib/gamification";

// Timed, resumable attempts for level quizzes (chapter pretests,
// posttests, Big Quizzes, module tryouts). The server owns the clock: an
// attempt has a deadline, answers are autosaved into `draft`, and an
// attempt whose deadline passed is submitted with its last draft the next
// time the student (or the page) asks — so leaving the page never loses
// work and never stops the timer.

export type CourseCtx = Extract<Awaited<ReturnType<typeof courseContext>>, { ok: true }>;
export type FoundQuiz = { level: Level; quiz: LevelQuiz; isPretest: boolean };

export type QuizAttemptRow = {
  id: string;
  attempt_no: number;
  started_at: string;
  deadline_at: string;
  draft: Record<string, Response | null> | null;
  submitted_at: string | null;
  auto_submitted: boolean;
  answers: Record<string, Response | null> | null;
  score: number | null;
  max_score: number | null;
  passed: boolean | null;
  counted: boolean;
};

const COLUMNS = "id, attempt_no, started_at, deadline_at, draft, submitted_at, auto_submitted, answers, score, max_score, passed, counted";

export function quizTimeLimit(ctx: CourseCtx, found: FoundQuiz): number {
  return quizSeconds(found.quiz.questions.length, ctx.course.quizSecondsPerQuestion);
}

export async function loadQuizAttempts(admin: SupabaseClient, studentId: string, slug: string, itemId: string): Promise<QuizAttemptRow[]> {
  const { data } = await admin
    .from("course_quiz_attempts")
    .select(COLUMNS)
    .eq("student_id", studentId)
    .eq("course_slug", slug)
    .eq("item_id", itemId)
    .order("started_at", { ascending: true });
  return (data || []) as QuizAttemptRow[];
}

export function summarize(row: QuizAttemptRow): AttemptSummary {
  return {
    id: row.id,
    no: row.attempt_no,
    startedAt: row.started_at,
    submittedAt: row.submitted_at,
    score: row.score,
    maxScore: row.max_score,
    passed: row.passed,
    autoSubmitted: row.auto_submitted,
    counted: row.counted,
  };
}

/** Attempts used, attempts left, the break before the next one, and the open attempt. */
export function attemptState(
  rows: { id: string; no: number; submittedAt: string | null; deadline: string; counted: boolean }[],
  summaries: AttemptSummary[],
  questionCount: number,
  unlimited: boolean
): AttemptState {
  const counted = rows.filter((r) => r.counted);
  const used = counted.length;
  const open = rows.find((r) => !r.submittedAt) ?? null;
  const lastDone = [...counted].filter((r) => r.submittedAt).sort((a, b) => b.submittedAt!.localeCompare(a.submittedAt!))[0];
  const until = lastDone ? Date.parse(lastDone.submittedAt!) + cooldownMinutes(questionCount) * 60_000 : 0;
  return {
    max: MAX_ATTEMPTS,
    used,
    left: unlimited ? MAX_ATTEMPTS : Math.max(0, MAX_ATTEMPTS - used),
    cooldownUntil: !unlimited && until > Date.now() ? new Date(until).toISOString() : null,
    open: open ? { id: open.id, no: open.no, deadline: open.deadline } : null,
    attempts: summaries,
    unlimited,
    serverNow: new Date().toISOString(),
  };
}

export function quizState(rows: QuizAttemptRow[], found: FoundQuiz, unlimited: boolean): AttemptState {
  return attemptState(
    rows.map((r) => ({ id: r.id, no: r.attempt_no, submittedAt: r.submitted_at, deadline: r.deadline_at, counted: r.counted })),
    rows.map(summarize),
    found.quiz.questions.length,
    unlimited
  );
}

/** The review for a finished attempt: its own question set, graded against its answers. */
export function quizReview(found: FoundQuiz, row: QuizAttemptRow) {
  const set = quizSet(found.quiz, row.attempt_no);
  const review = gradeQuestions(set.questions, row.answers || {});
  return { review, passages: set.passages ?? [] };
}

export function quizResult(found: FoundQuiz, row: QuizAttemptRow) {
  const { review, passages } = quizReview(found, row);
  return {
    attemptId: row.id,
    attemptNo: row.attempt_no,
    score: row.score ?? review.filter((r) => r.correct).length,
    max: row.max_score ?? review.length,
    passed: !!row.passed,
    isPretest: found.isPretest,
    passPercent: found.quiz.passPercent,
    autoSubmitted: row.auto_submitted,
    submittedAt: row.submitted_at,
    startedAt: row.started_at,
    review,
    passages,
  };
}

/**
 * Grades and closes an attempt, then does everything a finished quiz
 * does: the admin's work log, the best result (never downgraded), and XP.
 * Returns null when another request closed it first.
 */
export async function finishQuizAttempt(
  ctx: CourseCtx,
  found: FoundQuiz,
  row: QuizAttemptRow,
  responses: Record<string, Response | null>,
  auto: boolean
): Promise<{ row: QuizAttemptRow; xp: number } | null> {
  const set = quizSet(found.quiz, row.attempt_no);
  // Keep only answers to this attempt's questions.
  const ids = new Set(set.questions.map((q) => q.id));
  const answers = Object.fromEntries(Object.entries(responses).filter(([id]) => ids.has(id)));
  const review = gradeQuestions(set.questions, answers);
  const score = review.filter((r) => r.correct).length;
  const max = review.length;
  // A chapter pretest is diagnostic: taking it is enough to move on.
  const passed = found.isPretest || (score / max) * 100 >= found.quiz.passPercent;
  const submittedAt = new Date().toISOString();

  const { data: closed, error } = await ctx.admin
    .from("course_quiz_attempts")
    .update({ answers, submitted_at: submittedAt, auto_submitted: auto, score, max_score: max, passed, draft: answers })
    .eq("id", row.id)
    .is("submitted_at", null)
    .select(COLUMNS)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!closed) return null;

  const slug = ctx.course.slug;
  const quizId = found.quiz.id;
  await logSubmission(ctx.admin, {
    studentId: ctx.user.id,
    slug,
    itemId: quizId,
    kind: found.isPretest ? "level_pretest" : "level_quiz",
    score,
    maxScore: max,
    passed,
    answers: Object.fromEntries(review.map((r) => [r.id, r.response])),
  });

  // Keep the best attempt: never downgrade a pass or a higher score.
  const previous = ctx.progress.find((p) => p.itemId === quizId);
  if (!previous || (previous.score ?? 0) < score || (!previous.passed && passed)) {
    const { error: progressError } = await ctx.admin.from("course_progress").upsert(
      {
        student_id: ctx.user.id,
        course_slug: slug,
        item_id: quizId,
        kind: found.isPretest ? "level_pretest" : "level_quiz",
        score: Math.max(score, previous?.score ?? 0),
        max_score: max,
        passed: passed || !!previous?.passed,
        completed_at: submittedAt,
      },
      { onConflict: "student_id,course_slug,item_id" }
    );
    if (progressError) throw new Error(progressError.message);
  }

  // XP: once for taking a pretest or quiz, once more for passing a quiz.
  const ref = `${slug}:${quizId}`;
  let xp = await recordActivity(ctx.admin, ctx.user.id, {
    study: true,
    award: found.isPretest ? { source: "pretest", ref, xp: XP.pretest } : { source: "quiz_done", ref, xp: XP.quizDone },
  });
  if (!found.isPretest && passed) {
    xp += await recordActivity(ctx.admin, ctx.user.id, { study: true, award: { source: "quiz_passed", ref, xp: XP.quizPassed } });
  }
  return { row: closed as QuizAttemptRow, xp };
}

/** Submits, with their last autosaved answers, attempts whose time ran out while the student was away. */
export async function closeExpiredQuizAttempts(ctx: CourseCtx, found: FoundQuiz, rows: QuizAttemptRow[], graceMs: number): Promise<QuizAttemptRow[]> {
  const expired = rows.filter((r) => !r.submitted_at && Date.parse(r.deadline_at) + graceMs < Date.now());
  if (expired.length === 0) return rows;
  for (const row of expired) await finishQuizAttempt(ctx, found, row, row.draft || {}, true);
  return loadQuizAttempts(ctx.admin, ctx.user.id, ctx.course.slug, found.quiz.id);
}

// ---------------------------------------------------------------------------
// Starting over
// ---------------------------------------------------------------------------
//
// Out of attempts? No one has to unlock anything: the student starts over
// by going back to the start of the material. Restarting marks the lessons
// behind the quiz (its chapter's lessons, each with its checkpoint) as not
// done; once they are all studied again, a new round of attempts opens.
// Finished attempts stay in the log, and the best score is kept.

export function restartInfo(
  lessons: { id: string; title: string }[],
  done: ReadonlySet<string>,
  rows: { counted: boolean; submittedAt: string | null }[],
  state: AttemptState
): RestartInfo {
  const list = lessons.map((l) => ({ id: l.id, title: l.title, done: done.has(l.id) }));
  const restarted = rows.some((r) => !r.counted) && !rows.some((r) => r.counted);
  return {
    available: !state.unlimited && state.left <= 0 && !state.open,
    pending: restarted && list.some((l) => !l.done),
    lessons: list,
  };
}

/** Clears the lessons' completion so they must be studied again, from the first one. */
export async function clearLessons(ctx: CourseCtx, lessonIds: string[]) {
  if (lessonIds.length === 0) return;
  const { error } = await ctx.admin
    .from("course_progress")
    .delete()
    .eq("student_id", ctx.user.id)
    .eq("course_slug", ctx.course.slug)
    .eq("kind", "lesson")
    .in("item_id", lessonIds);
  if (error) throw new Error(error.message);
}
