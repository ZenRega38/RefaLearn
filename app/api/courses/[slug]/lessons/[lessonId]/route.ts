import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api-auth";
import { findLesson } from "@/lib/course/content";
import { courseContext } from "@/lib/course/server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; lessonId: string }> };

/**
 * GET — the full lesson (material + checkpoint with keys, for instant
 * Duolingo-style feedback). Only for owners, and only once unlocked.
 */
export async function GET(_req: Request, { params }: Params) {
  const { slug, lessonId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findLesson(ctx.course, lessonId);
  if (!found) return jsonError("Materi tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(lessonId)) return jsonError("Selesaikan materi sebelumnya terlebih dahulu.", 403);

  const lessons = found.level.lessons;
  return NextResponse.json({
    lesson: found.lesson,
    level: { id: found.level.id, title: found.level.title },
    position: { index: found.index, total: lessons.length },
    nextId: found.index + 1 < lessons.length ? lessons[found.index + 1].id : found.level.quiz.id,
    nextIsQuiz: found.index + 1 >= lessons.length,
    done: ctx.unlocks.done.has(lessonId),
    mascot: ctx.course.mascot ?? null,
    hasLive: !!found.level.live,
  });
}

/** POST — mark the lesson complete (after its checkpoint was cleared). */
export async function POST(_req: Request, { params }: Params) {
  const { slug, lessonId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findLesson(ctx.course, lessonId);
  if (!found) return jsonError("Materi tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(lessonId)) return jsonError("Materi ini belum terbuka.", 403);

  const { error } = await ctx.admin.from("course_progress").upsert(
    {
      student_id: ctx.user.id,
      course_slug: slug,
      item_id: lessonId,
      kind: "lesson",
      passed: true,
      score: found.lesson.checkpoint.length,
      max_score: found.lesson.checkpoint.length,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "student_id,course_slug,item_id" }
  );
  if (error) return jsonError(error.message, 500);

  return NextResponse.json({ ok: true });
}
