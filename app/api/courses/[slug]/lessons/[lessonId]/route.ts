import { NextResponse, type NextRequest } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { findLesson } from "@/lib/course/content";
import { courseContext, gradeQuestions, logSubmission } from "@/lib/course/server";
import type { Response } from "@/lib/course/types";
import { recordActivity } from "@/lib/gamification-server";
import { XP } from "@/lib/gamification";

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

  // Reading a lesson counts as a study day (and pays a little XP the first time).
  const xp = await recordActivity(ctx.admin, ctx.user.id, { study: true, award: { source: "lesson_read", ref: `${slug}:${lessonId}`, xp: XP.lessonRead } });

  const lessons = found.level.lessons;
  return NextResponse.json({
    xp,
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

/**
 * POST { responses? } — mark the lesson complete (after its checkpoint was
 * cleared). `responses` are the first try of each checkpoint question; they
 * go into the work log so the admin sees what was missed.
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, lessonId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findLesson(ctx.course, lessonId);
  if (!found) return jsonError("Materi tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(lessonId)) return jsonError("Materi ini belum terbuka.", 403);

  const body = await readJson<{ responses?: Record<string, Response | null> }>(request);
  if (body?.responses && found.lesson.checkpoint.length > 0) {
    const review = gradeQuestions(found.lesson.checkpoint, body.responses);
    await logSubmission(ctx.admin, {
      studentId: ctx.user.id,
      slug,
      itemId: lessonId,
      kind: "checkpoint",
      score: review.filter((r) => r.correct).length,
      maxScore: review.length,
      passed: true,
      answers: Object.fromEntries(review.map((r) => [r.id, r.response])),
    });
  }

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

  const xp = await recordActivity(ctx.admin, ctx.user.id, { study: true, award: { source: "lesson_done", ref: `${slug}:${lessonId}`, xp: XP.lessonDone } });
  return NextResponse.json({ ok: true, xp });
}
