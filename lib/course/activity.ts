import "server-only";
import { findLesson, findLevelQuiz, findTask, getCourse, getExam } from "@/lib/course/content";
import { buildExamResult, gradeQuestions } from "@/lib/course/server";
import type { ExamKind, Passage, Question, Response, SectionResult } from "@/lib/course/types";

// The admin's work log: every pretest, posttest, checkpoint, writing task
// (course_submissions) and course pretest/tryout (course_attempts), named
// after the course content it belongs to and regraded against its key.

export type ActivityKind = "level_pretest" | "level_quiz" | "checkpoint" | "writing" | ExamKind;
export type ActivitySource = "submission" | "exam";

export type SubmissionRow = {
  id: string;
  student_id: string;
  course_slug: string;
  item_id: string;
  kind: "level_pretest" | "level_quiz" | "checkpoint" | "writing";
  score: number | null;
  max_score: number | null;
  passed: boolean | null;
  answers: unknown;
  created_at: string;
};

export type ExamAttemptRow = {
  id: string;
  student_id: string;
  course_slug: string;
  kind: ExamKind;
  started_at: string;
  submitted_at: string;
  answers: Record<string, Response | null> | null;
  total_score: number | null;
};

export type ActivityEntry = {
  id: string;
  source: ActivitySource;
  kind: ActivityKind;
  studentId: string;
  courseSlug: string;
  courseTitle: string;
  /** Level / chapter / module title; null for course-wide exams. */
  levelTitle: string | null;
  itemTitle: string;
  score: number | null;
  maxScore: number | null;
  passed: boolean | null;
  /** False for results saved before answers were logged. */
  hasAnswers: boolean;
  at: string;
};

export type ActivityDetail = ActivityEntry & {
  review: { id: string; correct: boolean; response: Response | null; question: Question }[] | null;
  passages: Passage[];
  sections: SectionResult[] | null;
  writing: { text: string; words: number; prompt: string; minWords: number | null; maxWords: number | null; models: { label: string; text: string; note?: string }[]; rubric: string[] } | null;
};

function describe(slug: string, kind: ActivityKind, itemId: string) {
  const course = getCourse(slug);
  const base = { courseTitle: course?.title ?? slug, levelTitle: null as string | null, itemTitle: itemId };
  if (!course) return base;
  if (kind === "pretest" || kind === "tryout") return { ...base, itemTitle: getExam(course, kind)?.title ?? kind };
  if (kind === "level_pretest" || kind === "level_quiz") {
    const found = findLevelQuiz(course, itemId);
    return found ? { ...base, levelTitle: found.level.title, itemTitle: found.quiz.title } : base;
  }
  if (kind === "checkpoint") {
    const found = findLesson(course, itemId);
    return found ? { ...base, levelTitle: found.level.title, itemTitle: found.lesson.title } : base;
  }
  const found = findTask(course, itemId);
  return found ? { ...base, levelTitle: found.level.title, itemTitle: `${found.lesson.title} — ${found.task.title ?? "Writing"}` } : base;
}

export function submissionEntry(row: SubmissionRow): ActivityEntry {
  return {
    id: row.id,
    source: "submission",
    kind: row.kind,
    studentId: row.student_id,
    courseSlug: row.course_slug,
    ...describe(row.course_slug, row.kind, row.item_id),
    score: row.score,
    maxScore: row.max_score,
    passed: row.passed,
    hasAnswers: row.answers != null,
    at: row.created_at,
  };
}

export function examEntry(row: ExamAttemptRow): ActivityEntry {
  const course = getCourse(row.course_slug);
  const exam = course ? getExam(course, row.kind) : undefined;
  return {
    id: row.id,
    source: "exam",
    kind: row.kind,
    studentId: row.student_id,
    courseSlug: row.course_slug,
    ...describe(row.course_slug, row.kind, row.kind),
    score: row.total_score,
    maxScore: null,
    passed: null,
    hasAnswers: !!exam && row.answers != null,
    at: row.submitted_at,
  };
}

/** Full review of one logged quiz / checkpoint / writing task. */
export function submissionDetail(row: SubmissionRow): ActivityDetail {
  const entry = submissionEntry(row);
  const detail: ActivityDetail = { ...entry, review: null, passages: [], sections: null, writing: null };
  const course = getCourse(row.course_slug);
  if (!course || row.answers == null) return detail;

  if (row.kind === "writing") {
    const found = findTask(course, row.item_id);
    const answer = row.answers as { text?: string; words?: number };
    return {
      ...detail,
      writing: {
        text: answer.text ?? "",
        words: answer.words ?? 0,
        prompt: found?.task.prompt ?? "",
        minWords: found?.task.minWords ?? null,
        maxWords: found?.task.maxWords ?? null,
        models: found?.task.models ?? [],
        rubric: found?.task.rubric ?? [],
      },
    };
  }

  let questions: Question[] = [];
  let passages: Passage[] = [];
  if (row.kind === "checkpoint") {
    const found = findLesson(course, row.item_id);
    questions = found?.lesson.checkpoint ?? [];
    passages = found?.lesson.passages ?? [];
  } else {
    const found = findLevelQuiz(course, row.item_id);
    questions = found?.quiz.questions ?? [];
    passages = found?.quiz.passages ?? [];
  }
  const responses = row.answers as Record<string, Response | null>;
  // Checkpoints log only the questions answered; quizzes log every question.
  const asked = row.kind === "checkpoint" ? questions.filter((q) => q.id in responses) : questions;
  return { ...detail, review: gradeQuestions(asked, responses), passages };
}

/** Full review of one course pretest / tryout attempt. */
export function examDetail(row: ExamAttemptRow): ActivityDetail {
  const entry = examEntry(row);
  const course = getCourse(row.course_slug);
  const exam = course ? getExam(course, row.kind) : undefined;
  if (!exam || row.answers == null) return { ...entry, review: null, passages: [], sections: null, writing: null };
  const result = buildExamResult(exam, { ...row, answers: row.answers });
  return {
    ...entry,
    review: result.review,
    passages: exam.sections.flatMap((s) => s.passages ?? []),
    sections: result.sections,
    writing: null,
  };
}
