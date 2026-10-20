import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { quizSet } from "@/lib/course/content";
import { courseContext, gradeQuestions, logSubmission } from "@/lib/course/server";
import { cooldownMinutes, MAX_ATTEMPTS, quizSeconds, type AttemptState, type AttemptSummary, type RestartInfo } from "@/lib/course/attempt-rules";
import type { Course, Level, LevelQuiz, Response } from "@/lib/course/types";
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
  restarted_at: string | null;
};

const COLUMNS = "id, attempt_no, started_at, deadline_at, draft, submitted_at, auto_submitted, answers, score, max_score, passed, counted, restarted_at";

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
// by studying the material behind that quiz again. Starting over stamps
// `restarted_at` on the round's attempts (which stop counting); the lessons
// of that chapter finished before that moment must be studied again, in
// order from the first one, before a new round of attempts opens. Nothing
// else is touched: other chapters stay open, every saved result stays, and
// the best score is kept.

type RoundRow = { counted: boolean; restarted_at: string | null; started_at: string };

/** When the student started over, if the new round hasn't begun yet; otherwise null. */
export function pendingRestart(rows: RoundRow[]): string | null {
  const marker = rows.reduce<string | null>((m, r) => (r.restarted_at && (!m || r.restarted_at > m) ? r.restarted_at : m), null);
  if (!marker) return null;
  return rows.some((r) => r.counted && r.started_at > marker) ? null : marker;
}

/** When each lesson of a course was (last) completed, by lesson id. */
export async function lessonCompletions(admin: SupabaseClient, studentId: string, slug: string): Promise<Map<string, string>> {
  const { data } = await admin
    .from("course_progress")
    .select("item_id, completed_at")
    .eq("student_id", studentId)
    .eq("course_slug", slug)
    .eq("kind", "lesson")
    .eq("passed", true);
  return new Map((data || []).map((r) => [r.item_id as string, r.completed_at as string]));
}

/** A lesson counts as studied again when it was completed after the restart. */
const studied = (completions: Map<string, string>, id: string, marker: string | null) => {
  const at = completions.get(id);
  return !!at && (!marker || at > marker);
};

export function restartInfo(
  lessons: { id: string; title: string }[],
  completions: Map<string, string>,
  marker: string | null,
  state: AttemptState
): RestartInfo {
  const list = lessons.map((l) => ({ id: l.id, title: l.title, done: studied(completions, l.id, marker) }));
  return {
    available: !state.unlimited && state.left <= 0 && !state.open,
    pending: !!marker && list.some((l) => !l.done),
    lessons: list,
  };
}

/**
 * Lessons that must be studied again after starting over: the lessons of
 * each chapter whose pretest/posttest the student restarted (and, for the
 * course tryout, the chapter that opens it), finished before the restart.
 */
export async function lessonsToRestudy(admin: SupabaseClient, studentId: string, course: Course): Promise<Set<string>> {
  const [{ data: quizRows }, { data: examRows }, completions] = await Promise.all([
    admin
      .from("course_quiz_attempts")
      .select("item_id, counted, restarted_at, started_at")
      .eq("student_id", studentId)
      .eq("course_slug", course.slug)
      .not("restarted_at", "is", null),
    course.tryout
      ? admin
          .from("course_attempts")
          .select("counted, restarted_at, started_at")
          .eq("student_id", studentId)
          .eq("course_slug", course.slug)
          .eq("kind", "tryout")
      : Promise.resolve({ data: [] as RoundRow[] }),
    lessonCompletions(admin, studentId, course.slug),
  ]);
  const out = new Set<string>();
  if (!quizRows?.length && !(examRows as RoundRow[] | null)?.some((r) => r.restarted_at)) return out;

  const tryoutLevel = course.levels.find((l) => l.id === course.tryoutAfterLevel) ?? course.levels.at(-1);
  for (const level of course.levels) {
    const quizIds = [level.quiz.id, ...(level.pretest ? [level.pretest.id] : [])];
    const markers = quizIds.map((id) => pendingRestart(((quizRows || []) as (RoundRow & { item_id: string })[]).filter((r) => r.item_id === id)));
    if (level === tryoutLevel) markers.push(pendingRestart((examRows || []) as RoundRow[]));
    const marker = markers.reduce<string | null>((m, x) => (x && (!m || x > m) ? x : m), null);
    if (!marker) continue;
    for (const lesson of level.lessons) {
      if (completions.has(lesson.id) && !studied(completions, lesson.id, marker)) out.add(lesson.id);
    }
  }
  return out;
}
