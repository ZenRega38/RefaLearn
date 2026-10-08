import "server-only";
import type { Course, ExamKind, Lesson, Level, LevelQuiz, ProgressItem } from "@/lib/course/types";
import { TOEFL_ITP } from "@/content/toefl-itp";

const COURSES: Record<string, Course> = { [TOEFL_ITP.slug]: TOEFL_ITP };

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

export function findLevelQuiz(course: Course, quizId: string): { level: Level; quiz: LevelQuiz } | null {
  const level = course.levels.find((l) => l.quiz.id === quizId);
  return level ? { level, quiz: level.quiz } : null;
}

export function getExam(course: Course, kind: ExamKind) {
  return kind === "pretest" ? course.pretest : course.tryout;
}

/**
 * Dicoding-style locking: lessons open one after another; a level's quiz
 * opens when its lessons are done; the next level opens when the previous
 * quiz is passed; the tryout opens when every level quiz is passed.
 */
export function computeUnlocks(course: Course, progress: ProgressItem[]) {
  const done = new Set(progress.filter((p) => p.passed).map((p) => p.itemId));
  const unlocked = new Set<string>();
  let previousOk = true;

  for (const level of course.levels) {
    for (const lesson of level.lessons) {
      if (previousOk) unlocked.add(lesson.id);
      previousOk = previousOk && done.has(lesson.id);
    }
    if (previousOk) unlocked.add(level.quiz.id);
    previousOk = previousOk && done.has(level.quiz.id);
  }

  const totalItems = course.levels.reduce((n, l) => n + l.lessons.length + 1, 0);
  const completedItems = course.levels.reduce(
    (n, l) => n + l.lessons.filter((x) => done.has(x.id)).length + (done.has(l.quiz.id) ? 1 : 0),
    0
  );

  return { unlocked, done, tryoutUnlocked: previousOk, totalItems, completedItems };
}
