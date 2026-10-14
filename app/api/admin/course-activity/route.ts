import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { examEntry, submissionEntry, type ActivityEntry, type ExamAttemptRow, type SubmissionRow } from "@/lib/course/activity";

export const dynamic = "force-dynamic";

const PAGE = 100;
const SUBMISSION_KINDS = ["level_pretest", "level_quiz", "checkpoint", "writing"];
const EXAM_KINDS = ["pretest", "tryout"];

/**
 * GET ?course=&student=&kind=&before= — the work log, newest first: chapter
 * pretests/posttests, lesson checkpoints, writing tasks and course
 * pretest/tryout attempts. `before` (an ISO time) loads the next page.
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const q = request.nextUrl.searchParams;
  const course = q.get("course") || "";
  const student = q.get("student") || "";
  const kind = q.get("kind") || "";
  const before = q.get("before") || "";
  const admin = createAdminClient();

  const wantSubmissions = !kind || SUBMISSION_KINDS.includes(kind);
  const wantExams = !kind || EXAM_KINDS.includes(kind);

  const submissions = async () => {
    if (!wantSubmissions) return [];
    let query = admin
      .from("course_submissions")
      .select("id, student_id, course_slug, item_id, kind, score, max_score, passed, answers, created_at")
      .order("created_at", { ascending: false })
      .limit(PAGE + 1);
    if (course) query = query.eq("course_slug", course);
    if (student) query = query.eq("student_id", student);
    if (kind) query = query.eq("kind", kind);
    if (before) query = query.lt("created_at", before);
    const { data, error } = await query;
    if (error) throw error;
    return ((data || []) as SubmissionRow[]).map(submissionEntry);
  };

  const exams = async () => {
    if (!wantExams) return [];
    let query = admin
      .from("course_attempts")
      .select("id, student_id, course_slug, kind, started_at, submitted_at, answers, total_score")
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(PAGE + 1);
    if (course) query = query.eq("course_slug", course);
    if (student) query = query.eq("student_id", student);
    if (kind) query = query.eq("kind", kind);
    if (before) query = query.lt("submitted_at", before);
    const { data, error } = await query;
    if (error) throw error;
    return ((data || []) as ExamAttemptRow[]).map(examEntry);
  };

  let merged: ActivityEntry[];
  try {
    const [a, b] = await Promise.all([submissions(), exams()]);
    merged = [...a, ...b].sort((x, y) => y.at.localeCompare(x.at));
  } catch {
    return jsonError("Gagal memuat log pengerjaan.", 500);
  }

  const entries = merged.slice(0, PAGE);
  const ids = [...new Set(entries.map((e) => e.studentId))];
  const { data: people } = ids.length
    ? await admin.from("profiles").select("id, full_name, role").in("id", ids)
    : { data: [] };
  const byId = new Map((people || []).map((p) => [p.id as string, p]));

  return NextResponse.json({
    entries: entries.map((e) => ({ ...e, studentName: byId.get(e.studentId)?.full_name || "Tanpa nama", studentRole: byId.get(e.studentId)?.role || "student" })),
    hasMore: merged.length > PAGE,
  });
}
