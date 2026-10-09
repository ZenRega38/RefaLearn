import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/api-auth";
import { computeUnlocks, getCourse } from "@/lib/course/content";
import { convertedScore, isCorrect, totalScore } from "@/lib/course/grading";
import type { Course, Exam, ExamResult, ProgressItem, Question, Response, SectionResult } from "@/lib/course/types";

/**
 * A course is free when an active store material links to it at price 0.
 * The admin controls this from the materials page, like any other product.
 */
export async function isFreeCourse(admin: SupabaseClient, slug: string): Promise<boolean> {
  const { data } = await admin
    .from("materials")
    .select("id")
    .eq("course_slug", slug)
    .eq("is_active", true)
    .eq("price", 0)
    .limit(1);
  return !!data && data.length > 0;
}

/**
 * Can this user use the course? Admins always can; anyone signed in can
 * when it is free; otherwise they need a confirmed order of a material
 * linked to it.
 */
export async function hasCourseAccess(admin: SupabaseClient, userId: string, role: string, slug: string): Promise<boolean> {
  if (role === "admin") return true;
  if (await isFreeCourse(admin, slug)) return true;
  const { data: materials } = await admin.from("materials").select("id").eq("course_slug", slug);
  const ids = (materials || []).map((m) => m.id as string);
  if (ids.length === 0) return false;
  const { data: orders } = await admin
    .from("material_orders")
    .select("id")
    .eq("student_id", userId)
    .eq("status", "confirmed")
    .overlaps("material_ids", ids)
    .limit(1);
  return !!orders && orders.length > 0;
}

export async function loadProgress(admin: SupabaseClient, userId: string, slug: string): Promise<ProgressItem[]> {
  const { data } = await admin
    .from("course_progress")
    .select("item_id, kind, score, max_score, passed")
    .eq("student_id", userId)
    .eq("course_slug", slug);
  return (data || []).map((r) => ({ itemId: r.item_id, kind: r.kind, score: r.score, maxScore: r.max_score, passed: r.passed }));
}

/** Levels the admin has opened, for courses with admin locks. */
export async function loadOpenLevels(admin: SupabaseClient, slug: string): Promise<Set<string>> {
  const { data } = await admin.from("course_level_access").select("level_id").eq("course_slug", slug).eq("is_open", true);
  return new Set((data || []).map((r) => r.level_id as string));
}

/**
 * The levels a user may enter: admins see every level (they preview and
 * host modules before opening them), students only the opened ones.
 * Undefined for courses without admin locks.
 */
export async function levelsOpenFor(admin: SupabaseClient, course: Course, role: string): Promise<Set<string> | undefined> {
  if (!course.adminLocks) return undefined;
  if (role === "admin") return new Set(course.levels.map((l) => l.id));
  return loadOpenLevels(admin, course.slug);
}

/**
 * Everything a course API route needs: the course, the caller, whether they
 * own it, and what they've unlocked. Returns an error tuple otherwise.
 */
export async function courseContext(slug: string) {
  const course = getCourse(slug);
  if (!course) return { ok: false as const, error: "Kursus tidak ditemukan.", status: 404 };

  const auth = await requireUser();
  if (!auth.ok) return { ok: false as const, error: auth.error, status: auth.status };

  const admin = createAdminClient();
  const [access, progress, openLevels] = await Promise.all([
    hasCourseAccess(admin, auth.user.id, auth.profile.role, slug),
    loadProgress(admin, auth.user.id, slug),
    levelsOpenFor(admin, course, auth.profile.role),
  ]);
  const unlocks = computeUnlocks(course, progress, openLevels);

  return { ok: true as const, course, user: auth.user, profile: auth.profile, admin, access, progress, unlocks };
}

/** Grades a set of responses against questions; unanswered = wrong. */
export function gradeQuestions(questions: Question[], responses: Record<string, Response | null>) {
  return questions.map((q) => {
    const response = responses[q.id] ?? null;
    return { id: q.id, correct: isCorrect(q, response), response, question: q };
  });
}

export function gradeExam(exam: Exam, responses: Record<string, Response | null>) {
  const review = exam.sections.flatMap((s) => gradeQuestions(s.questions, responses));
  const sections: SectionResult[] = exam.sections.map((s) => {
    const ids = new Set(s.questions.map((q) => q.id));
    const correct = review.filter((r) => ids.has(r.id) && r.correct).length;
    return { skill: s.skill, correct, total: s.questions.length, converted: convertedScore(s.skill, correct, s.questions.length) };
  });
  return { sections, total: totalScore(sections.map((s) => s.converted)), review };
}

export function examMinutes(exam: Exam): number {
  return exam.sections.reduce((n, s) => n + s.minutes, 0);
}

/** Rebuilds the full review (questions + keys) for a stored attempt. */
export function buildExamResult(
  exam: Exam,
  attempt: { id: string; kind: "pretest" | "tryout"; answers: Record<string, Response | null> | null; submitted_at: string; started_at: string }
): ExamResult {
  const graded = gradeExam(exam, attempt.answers || {});
  const elapsedMin = (Date.parse(attempt.submitted_at) - Date.parse(attempt.started_at)) / 60000;
  return {
    attemptId: attempt.id,
    kind: attempt.kind,
    sections: graded.sections,
    totalScore: graded.total,
    review: graded.review,
    overtime: elapsedMin > examMinutes(exam) + 5,
    submittedAt: attempt.submitted_at,
  };
}
