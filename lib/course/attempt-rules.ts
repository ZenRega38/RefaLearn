// Client-safe rules for timed attempts, shared by the API routes and the
// pages that explain them to the student.
//
// Quizzes, chapter pretests/posttests, Big Quizzes and tryouts: at most
// three attempts per round, the best one counts, a short break between
// attempts, and one total timer that submits automatically. After three,
// the student may start over from the lessons for a new round. Lesson checkpoints are free
// practice: timed, but unlimited and never blocking.

export const MAX_ATTEMPTS = 3;

/** Break between two attempts: 1 minute per 10 questions, from 1 to 5 minutes. */
export function cooldownMinutes(questions: number): number {
  return Math.min(5, Math.max(1, Math.ceil(questions / 10)));
}

/** Total time for a quiz: the course's pace per question (60 s by default), at least 2 minutes. */
export function quizSeconds(questions: number, secondsPerQuestion?: number | null): number {
  return Math.max(120, questions * (secondsPerQuestion || 60));
}

/** Total time for a lesson checkpoint (retries of missed questions included): 90 s per question, at least 3 minutes. */
export function checkpointSeconds(questions: number): number {
  return Math.max(180, questions * 90);
}

/** Answers that arrive this long after the deadline still count (slow networks, auto-submit in flight). */
export const SUBMIT_GRACE_MS = 60_000;

/** One attempt as the student sees it in the attempt log. */
export type AttemptSummary = {
  id: string;
  no: number;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  maxScore: number | null;
  passed: boolean | null;
  autoSubmitted: boolean;
  /** False once the admin reset the attempts (kept in the log, not in the limit). */
  counted: boolean;
};

/** Where a student stands on one quiz or exam. */
export type AttemptState = {
  max: number;
  used: number;
  left: number;
  /** No new attempt before this time (ISO), or null. */
  cooldownUntil: string | null;
  /** An attempt in progress, with the server's deadline. */
  open: { id: string; no: number; deadline: string } | null;
  /** Oldest first. */
  attempts: AttemptSummary[];
  /** The admin previews without limits. */
  unlimited: boolean;
  serverNow: string;
};

/**
 * Out of attempts, a student starts over by going back to the start of the
 * material: the lessons behind the quiz must be studied again before a new
 * round of attempts opens. No one has to unlock anything by hand.
 */
export type RestartInfo = {
  /** Out of attempts, nothing in progress: the student may start over. */
  available: boolean;
  /** Started over, and the lessons below aren't all studied again yet. */
  pending: boolean;
  lessons: { id: string; title: string; done: boolean }[];
};

/** Milliseconds → "m:ss" (or "h:mm:ss"). */
export function clock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}
