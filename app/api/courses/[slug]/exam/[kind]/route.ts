import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { getExam } from "@/lib/course/content";
import { toPublicQuestion } from "@/lib/course/grading";
import { buildExamResult, courseContext, examMinutes } from "@/lib/course/server";
import type { ExamKind, Response } from "@/lib/course/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string; kind: string }> };

const isKind = (k: string): k is ExamKind => k === "pretest" || k === "tryout";

/** Section layout for the review screen (ids in order + passages). */
function layoutOf(exam: ReturnType<typeof getExam>) {
  return exam.sections.map((s) => ({ skill: s.skill, title: s.title, questionIds: s.questions.map((q) => q.id), passages: s.passages ?? [] }));
}

async function load(slug: string, kind: string) {
  if (!isKind(kind)) return { ok: false as const, error: "Jenis ujian tidak dikenal.", status: 404 };
  const ctx = await courseContext(slug);
  if (!ctx.ok) return ctx;
  if (kind === "tryout") {
    if (!ctx.access) return { ok: false as const, error: "Kursus ini belum Anda miliki.", status: 403 };
    if (!ctx.unlocks.tryoutUnlocked) {
      return { ok: false as const, error: "Tryout terbuka setelah semua materi dan Big Quiz selesai.", status: 403 };
    }
  }
  return { ...ctx, kind, exam: getExam(ctx.course, kind) };
}

/** GET ?attemptId= — a finished attempt with full review. */
export async function GET(request: NextRequest, { params }: Params) {
  const { slug, kind } = await params;
  const ctx = await load(slug, kind);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);

  const attemptId = request.nextUrl.searchParams.get("attemptId");
  if (!attemptId) return jsonError("attemptId wajib diisi.");

  const { data: attempt } = await ctx.admin
    .from("course_attempts")
    .select("id, kind, answers, started_at, submitted_at")
    .eq("id", attemptId)
    .eq("student_id", ctx.user.id)
    .eq("kind", ctx.kind)
    .maybeSingle();

  if (!attempt?.submitted_at) return jsonError("Hasil tidak ditemukan.", 404);
  return NextResponse.json({ result: buildExamResult(ctx.exam, attempt), layout: layoutOf(ctx.exam) });
}

/**
 * POST { action: "start" } — begin (or resume) an attempt; returns the exam
 * without keys and the server's start time, so the timer survives a reload.
 * POST { action: "submit", attemptId, responses } — grade and store.
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { slug, kind } = await params;
  const ctx = await load(slug, kind);
  if (!ctx.ok) return jsonError(ctx.error, ctx.status);

  const body = await readJson<{ action?: string; attemptId?: string; responses?: Record<string, Response | null> }>(request);
  const limitMs = examMinutes(ctx.exam) * 60_000;

  if (body?.action === "start") {
    // Resume an unfinished attempt that still has time left.
    const { data: open } = await ctx.admin
      .from("course_attempts")
      .select("id, started_at")
      .eq("student_id", ctx.user.id)
      .eq("course_slug", slug)
      .eq("kind", ctx.kind)
      .is("submitted_at", null)
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let attempt = open && Date.now() - Date.parse(open.started_at) < limitMs ? open : null;
    if (!attempt) {
      const { data, error } = await ctx.admin
        .from("course_attempts")
        .insert([{ student_id: ctx.user.id, course_slug: slug, kind: ctx.kind }])
        .select("id, started_at")
        .single();
      if (error || !data) return jsonError(error?.message || "Gagal memulai ujian.", 500);
      attempt = data;
    }

    return NextResponse.json({
      attemptId: attempt.id,
      startedAt: attempt.started_at,
      serverNow: new Date().toISOString(),
      exam: {
        kind: ctx.exam.kind,
        title: ctx.exam.title,
        sections: ctx.exam.sections.map((s) => ({
          skill: s.skill,
          title: s.title,
          minutes: s.minutes,
          directions: s.directions,
          parts: s.parts,
          passages: s.passages ?? [],
          questions: s.questions.map(toPublicQuestion),
        })),
      },
    });
  }

  if (body?.action === "submit") {
    if (!body.attemptId) return jsonError("attemptId wajib diisi.");
    const { data: attempt } = await ctx.admin
      .from("course_attempts")
      .select("id, kind, started_at, submitted_at")
      .eq("id", body.attemptId)
      .eq("student_id", ctx.user.id)
      .eq("kind", ctx.kind)
      .maybeSingle();
    if (!attempt) return jsonError("Sesi ujian tidak ditemukan.", 404);
    if (attempt.submitted_at) return jsonError("Ujian ini sudah dikumpulkan.", 409);

    const answers = body.responses || {};
    const submittedAt = new Date().toISOString();
    const result = buildExamResult(ctx.exam, { ...attempt, answers, submitted_at: submittedAt });

    const { error } = await ctx.admin
      .from("course_attempts")
      .update({
        answers,
        submitted_at: submittedAt,
        total_score: result.totalScore,
        result: { sections: result.sections, totalScore: result.totalScore, overtime: result.overtime },
      })
      .eq("id", attempt.id);
    if (error) return jsonError(error.message, 500);

    return NextResponse.json({ result, layout: layoutOf(ctx.exam) });
  }

  return jsonError("Aksi tidak dikenal.");
}
