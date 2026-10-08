import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { ALL_COURSES, getCourse } from "@/lib/course/content";
import { loadOpenLevels } from "@/lib/course/server";

export const dynamic = "force-dynamic";

/**
 * GET — courses whose modules the admin opens week by week, with each
 * module's open state and whether it has a live quiz. Also lists any live
 * session still running so the admin can return to it.
 */
export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const admin = createAdminClient();

  const courses = await Promise.all(
    ALL_COURSES.filter((c) => c.adminLocks || c.levels.some((l) => l.live)).map(async (course) => {
      const open = course.adminLocks ? await loadOpenLevels(admin, course.slug) : null;
      return {
        slug: course.slug,
        title: course.title,
        adminLocks: !!course.adminLocks,
        levels: course.levels.map((l) => ({
          id: l.id,
          title: l.title,
          open: open ? open.has(l.id) : true,
          live: l.live ? { title: l.live.title, questions: l.live.questions.length } : null,
        })),
      };
    })
  );

  const { data: running } = await admin
    .from("live_sessions")
    .select("id, pin, course_slug, level_id, title, status, created_at")
    .neq("status", "ended")
    .order("created_at", { ascending: false });

  return NextResponse.json({ courses, running: running || [] });
}

/** POST { slug, levelId, open } — open or lock one module. */
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
