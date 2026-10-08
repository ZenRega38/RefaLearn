import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/api-auth";
import { computeUnlocks, getCourse } from "@/lib/course/content";
import { convertedScore, isCorrect, totalScore } from "@/lib/course/grading";
import type { Exam, ExamResult, ProgressItem, Question, Response, SectionResult } from "@/lib/course/types";

/** Does this user own the course (confirmed purchase of a material linked to it)? Admins always do. */
export async function hasCourseAccess(admin: SupabaseClient, userId: string, role: string, slug: string): Promise<boolean> {
  if (role === "admin") return true;
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
  const [access, progress] = await Promise.all([
    hasCourseAccess(admin, auth.user.id, auth.profile.role, slug),
    loadProgress(admin, auth.user.id, slug),
  ]);
  const unlocks = computeUnlocks(course, progress);

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
