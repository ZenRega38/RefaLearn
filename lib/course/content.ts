import "server-only";
import type { Course, ExamKind, Lesson, Level, LevelQuiz, ProgressItem } from "@/lib/course/types";
import { TOEFL_ITP } from "@/content/toefl-itp";
import { ENGLISH_SD_3 } from "@/content/english-sd-3";
import { ENGLISH_DAY } from "@/content/english-day";
import { ENGLISH_SD_1 } from "@/content/english-sd-1";
import { ENGLISH_SD_2 } from "@/content/english-sd-2";

const COURSES: Record<string, Course> = Object.fromEntries(
  [TOEFL_ITP, ENGLISH_SD_1, ENGLISH_SD_2, ENGLISH_SD_3, ENGLISH_DAY].map((c) => [c.slug, c])
);

export const ALL_COURSES = Object.values(COURSES);

export function getCourse(slug: string): Course | null {
  return COURSES[slug] ?? null;
}

export function findLesson(course: Course, lessonId: string): { level: Level; lesson: Lesson; index: number } | null {
  for (const level of course.levels) {
    const index = level.lessons.findIndex((l) => l.id === lessonId);
    if (index !== -1) return { level, lesson: level.lessons[index], index };
  }
  return null;
}

/** A level's end quiz (posttest) or its chapter pretest, by id. */
export function findLevelQuiz(course: Course, quizId: string): { level: Level; quiz: LevelQuiz; isPretest: boolean } | null {
  for (const level of course.levels) {
    if (level.quiz.id === quizId) return { level, quiz: level.quiz, isPretest: false };
    if (level.pretest?.id === quizId) return { level, quiz: level.pretest, isPretest: true };
  }
  return null;
}

export function getExam(course: Course, kind: ExamKind) {
  return kind === "pretest" ? course.pretest : course.tryout;
}

/**
 * Dicoding-style locking: lessons open one after another; a level's quiz
 * opens when its lessons are done; the next level opens when the previous
 * quiz is passed; the tryout opens when every level quiz is passed.
 */
export function computeUnlocks(course: Course, progress: ProgressItem[], openLevels?: ReadonlySet<string>) {
  const done = new Set(progress.filter((p) => p.passed).map((p) => p.itemId));
  const unlocked = new Set<string>();
  let previousOk = true;
  // Levels the admin hasn't opened yet (only for courses with admin locks).
  const lockedLevels = new Set(course.adminLocks ? course.levels.filter((l) => !openLevels?.has(l.id)).map((l) => l.id) : []);

  for (const level of course.levels) {
    if (lockedLevels.has(level.id)) {
      previousOk = false;
      continue;
    }
    if (course.openOrder) {
      // Self-paced review course: everything in an open level is open.
      if (level.pretest) unlocked.add(level.pretest.id);
      for (const lesson of level.lessons) unlocked.add(lesson.id);
      unlocked.add(level.quiz.id);
      continue;
    }
    // A chapter pretest opens with the chapter and must be taken (any score)
    // before its lessons.
    if (level.pretest) {
      if (previousOk) unlocked.add(level.pretest.id);
      previousOk = previousOk && done.has(level.pretest.id);
    }
    for (const lesson of level.lessons) {
      if (previousOk) unlocked.add(lesson.id);
      previousOk = previousOk && done.has(lesson.id);
    }
    if (previousOk) unlocked.add(level.quiz.id);
    previousOk = previousOk && done.has(level.quiz.id);
  }

  const totalItems = course.levels.reduce((n, l) => n + l.lessons.length + 1 + (l.pretest ? 1 : 0), 0);
  const completedItems = course.levels.reduce(
    (n, l) =>
      n +
      l.lessons.filter((x) => done.has(x.id)).length +
      (done.has(l.quiz.id) ? 1 : 0) +
      (l.pretest && done.has(l.pretest.id) ? 1 : 0),
    0
  );

  return { unlocked, done, lockedLevels, tryoutUnlocked: previousOk, totalItems, completedItems };
}
