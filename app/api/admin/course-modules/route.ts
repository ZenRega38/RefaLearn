import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCourse } from "@/lib/course/content";

export const dynamic = "force-dynamic";

/**
 * POST { slug, levelId, open } — open or lock one module for students.
 * Used by the admin controls on the course page (/learn/[slug]).
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ slug?: string; levelId?: string; open?: boolean }>(request);
  const course = body?.slug ? getCourse(body.slug) : null;
  if (!course?.adminLocks) return jsonError("Kursus tidak ditemukan.", 404);
  if (!course.levels.some((l) => l.id === body?.levelId)) return jsonError("Modul tidak ditemukan.", 404);
  if (typeof body?.open !== "boolean") return jsonError("Status modul tidak valid.");

  const admin = createAdminClient();
  const { error } = await admin.from("course_level_access").upsert(
    { course_slug: course.slug, level_id: body.levelId, is_open: body.open, updated_at: new Date().toISOString(), updated_by: auth.user.id },
    { onConflict: "course_slug,level_id" }
  );
  if (error) return jsonError("Gagal menyimpan status modul.", 500);
  return NextResponse.json({ ok: true });
}
