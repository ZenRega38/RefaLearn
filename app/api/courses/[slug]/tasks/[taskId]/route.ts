import { NextResponse, type NextRequest } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { findTask } from "@/lib/course/content";
import { courseContext, logSubmission } from "@/lib/course/server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; taskId: string }> };

const MAX_CHARS = 20_000;

/** POST { text } — hand in a writing task; it lands in the admin's work log. */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, taskId } = await params;
  const ctx = await courseContext(slug);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);
  if (!ctx.access) return jsonError("Kursus ini belum Anda miliki.", 403);

  const found = findTask(ctx.course, taskId);
  if (!found || found.task.kind !== "writing") return jsonError("Tugas tidak ditemukan.", 404);
  if (!ctx.unlocks.unlocked.has(found.lesson.id)) return jsonError("Materi ini belum terbuka.", 403);

  const body = await readJson<{ text?: string }>(request);
  const text = (body?.text || "").trim();
  if (!text) return jsonError("Jawaban masih kosong.");
  if (text.length > MAX_CHARS) return jsonError("Jawaban terlalu panjang.");

  const words = text.split(/\s+/).length;
  await logSubmission(ctx.admin, {
    studentId: ctx.user.id,
    slug,
    itemId: taskId,
    kind: "writing",
    answers: { text, words, lessonId: found.lesson.id },
  });
  return NextResponse.json({ ok: true, submittedAt: new Date().toISOString() });
}
