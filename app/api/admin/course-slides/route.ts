import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCourse } from "@/lib/course/content";
import { slideEmbed } from "@/lib/slides";

export const dynamic = "force-dynamic";

/**
 * POST { slug, levelId, url } — attach a slide deck link to one module, or
 * remove it when `url` is empty. Used by the admin on the course page.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ slug?: string; levelId?: string; url?: string }>(request);
  const course = body?.slug ? getCourse(body.slug) : null;
  if (!course?.slideLinks) return jsonError("Kursus tidak ditemukan.", 404);
  if (!course.levels.some((l) => l.id === body?.levelId)) return jsonError("Modul tidak ditemukan.", 404);
  const url = typeof body?.url === "string" ? body.url.trim() : "";

  const admin = createAdminClient();
  if (!url) {
    const { error } = await admin.from("course_level_slides").delete().eq("course_slug", course.slug).eq("level_id", body!.levelId!);
    if (error) return jsonError("Gagal menghapus slide.", 500);
    return NextResponse.json({ ok: true });
  }

  if (url.length > 2000 || !slideEmbed(url)) {
    return jsonError("Link belum didukung. Pakai link Google Slides, Google Drive, Canva, atau file .pdf/.pptx.");
  }
  const { error } = await admin.from("course_level_slides").upsert(
    { course_slug: course.slug, level_id: body!.levelId!, url: /^https?:\/\//i.test(url) ? url : `https://${url}`, updated_at: new Date().toISOString(), updated_by: auth.user.id },
    { onConflict: "course_slug,level_id" }
  );
  if (error) return jsonError("Gagal menyimpan slide.", 500);
  return NextResponse.json({ ok: true });
}
