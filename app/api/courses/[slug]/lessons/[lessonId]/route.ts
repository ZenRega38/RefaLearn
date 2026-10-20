import { NextResponse, type NextRequest } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { findLesson } from "@/lib/course/content";
import { courseContext, gradeQuestions, logSubmission } from "@/lib/course/server";
import { lessonsToRestudy } from "@/lib/course/attempts";
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
  if (!ctx.access) return jsonError("You don't own this course yet.", 403);

  const found = findLesson(ctx.course, lessonId);
  if (!found) return jsonError("Lesson not found.", 404);
  if (!ctx.unlocks.unlocked.has(lessonId)) return jsonError("Finish the previous lesson first.", 403);

  // After starting over a quiz, its chapter is studied again in order.
  const restudy = await lessonsToRestudy(ctx.admin, ctx.user.id, ctx.course);
  if (found.level.lessons.slice(0, found.index).some((l) => restudy.has(l.id))) {
    return jsonError("Study the earlier lessons of this chapter again first.", 403);
  }

  // Reading a lesson counts as a study day (and pays a little XP the first time).
  const xp = await recordActivity(ctx.admin, ctx.user.id, { study: true, award: { source: "lesson_read", ref: `${slug}:${lessonId}`, xp: XP.lessonRead } });

  // Earlier checkpoint runs (first try of each question), newest first.
  const { data: log } = await ctx.admin
    .from("course_submissions")
    .select("id, score, max_score, answers, created_at")
    .eq("student_id", ctx.user.id)
    .eq("course_slug", slug)
    .eq("item_id", lessonId)
    .eq("kind", "checkpoint")
    .order("created_at", { ascending: false })
    .limit(20);

  const lessons = found.level.lessons;
  return NextResponse.json({
    xp,
    checkpointLog: (log || []).map((r) => ({ id: r.id, score: r.score, maxScore: r.max_score, answers: r.answers, at: r.created_at })),
    lesson: found.lesson,
    level: { id: found.level.id, title: found.level.title },
    position: { index: found.index, total: lessons.length },
    nextId: found.index + 1 < lessons.length ? lessons[found.index + 1].id : found.level.quiz.id,
    nextIsQuiz: found.index + 1 >= lessons.length,
    // To be studied again after starting over: shown as not done, sections in order.
    done: ctx.unlocks.done.has(lessonId) && !restudy.has(lessonId),
    restudy: restudy.has(lessonId),
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
  if (!ctx.access) return jsonError("You don't own this course yet.", 403);

  const found = findLesson(ctx.course, lessonId);
  if (!found) return jsonError("Lesson not found.", 404);
  if (!ctx.unlocks.unlocked.has(lessonId)) return jsonError("This lesson isn't open yet.", 403);
  const restudy = await lessonsToRestudy(ctx.admin, ctx.user.id, ctx.course);
  if (found.level.lessons.slice(0, found.index).some((l) => restudy.has(l.id))) {
    return jsonError("Study the earlier lessons of this chapter again first.", 403);
  }

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
