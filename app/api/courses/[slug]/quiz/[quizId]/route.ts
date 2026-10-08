import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { findLevelQuiz } from "@/lib/course/content";
import { toPublicQuestion } from "@/lib/course/grading";
import { courseContext, gradeQuestions } from "@/lib/course/server";
import type { Response } from "@/lib/course/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; quizId: string }> };

/** GET — the level's big quiz WITHOUT keys (graded on the server). */
export async function GET(_req: Request, { params }: Params) {
  const { slug, quizId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findLevelQuiz(ctx.course, quizId);
  if (!found) return jsonError("Quiz tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(quizId)) return jsonError("Selesaikan bagian sebelumnya terlebih dahulu.", 403);

  return NextResponse.json({
    isPretest: found.isPretest,
    labels: ctx.course.labels,
    quiz: {
      id: found.quiz.id,
      title: found.quiz.title,
      passPercent: found.quiz.passPercent,
      passages: found.quiz.passages ?? [],
      questions: found.quiz.questions.map(toPublicQuestion),
    },
    level: { id: found.level.id, title: found.level.title },
  });
}

/** POST { responses } — grade, record the best result, return the review. */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, quizId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findLevelQuiz(ctx.course, quizId);
  if (!found) return jsonError("Quiz tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(quizId)) return jsonError("Quiz ini belum terbuka.", 403);

  const body = await readJson<{ responses?: Record<string, Response | null> }>(request);
  const review = gradeQuestions(found.quiz.questions, body?.responses || {});
  const score = review.filter((r) => r.correct).length;
  const max = review.length;
  // A chapter pretest is diagnostic: taking it is enough to move on.
  const passed = found.isPretest || (score / max) * 100 >= found.quiz.passPercent;

  // Keep the best attempt: never downgrade a pass or a higher score.
  const previous = ctx.progress.find((p) => p.itemId === quizId);
  if (!previous || (previous.score ?? 0) < score || (!previous.passed && passed)) {
    const { error } = await ctx.admin.from("course_progress").upsert(
      {
        student_id: ctx.user.id,
        course_slug: slug,
        item_id: quizId,
        kind: found.isPretest ? "level_pretest" : "level_quiz",
        score: Math.max(score, previous?.score ?? 0),
        max_score: max,
        passed: passed || !!previous?.passed,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "student_id,course_slug,item_id" }
    );
    if (error) return jsonError(error.message, 500);
  }

  return NextResponse.json({ score, max, passed, isPretest: found.isPretest, passPercent: found.quiz.passPercent, review });
}
