import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { examDetail, submissionDetail, type ExamAttemptRow, type SubmissionRow } from "@/lib/course/activity";

export const dynamic = "force-dynamic";

/** GET ?source=submission|exam — one logged attempt with every answer, the key and the explanation. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  const source = request.nextUrl.searchParams.get("source");
  const admin = createAdminClient();

  let detail;
  if (source === "exam") {
    const { data } = await admin
      .from("course_attempts")
      .select("id, student_id, course_slug, kind, started_at, submitted_at, answers, total_score")
      .eq("id", id)
      .not("submitted_at", "is", null)
      .maybeSingle();
    if (!data) return jsonError("Data tidak ditemukan.", 404);
    detail = examDetail(data as ExamAttemptRow);
  } else {
    const { data } = await admin
      .from("course_submissions")
      .select("id, student_id, course_slug, item_id, kind, score, max_score, passed, answers, created_at")
      .eq("id", id)
      .maybeSingle();
    if (!data) return jsonError("Data tidak ditemukan.", 404);
    detail = submissionDetail(data as SubmissionRow);
  }

  const { data: person } = await admin.from("profiles").select("full_name, role").eq("id", detail.studentId).maybeSingle();
  return NextResponse.json({ ...detail, studentName: person?.full_name || "Tanpa nama", studentRole: person?.role || "student" });
}
