import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { computeUnlocks, getCourse } from "@/lib/course/content";
import { examMinutes, hasCourseAccess, loadProgress } from "@/lib/course/server";
import type { ProgressItem } from "@/lib/course/types";

export const dynamic = "force-dynamic";

/**
 * GET /api/courses/:slug — the course outline (titles only, no content),
 * plus the caller's access, progress, unlocks and exam history. Works for
 * visitors too (outline only), so the store page can preview the syllabus.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return NextResponse.json({ error: "Kursus tidak ditemukan." }, { status: 404 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const admin = createAdminClient();

  let access = false;
  let loggedIn = false;
  let progress: ProgressItem[] = [];
  let attempts: { id: string; kind: string; total_score: number | null; submitted_at: string | null; started_at: string }[] = [];

  if (user) {
    loggedIn = true;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    [access, progress] = await Promise.all([
      hasCourseAccess(admin, user.id, profile?.role || "student", slug),
      loadProgress(admin, user.id, slug),
    ]);
    const { data } = await admin
      .from("course_attempts")
      .select("id, kind, total_score, submitted_at, started_at")
      .eq("student_id", user.id)
      .eq("course_slug", slug)
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false });
    attempts = data || [];
  }

  const unlocks = computeUnlocks(course, progress);
  const byId = new Map(progress.map((p) => [p.itemId, p]));
  const { data: material } = await admin
    .from("materials")
    .select("slug, price, is_active")
    .eq("course_slug", slug)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  const count = (e: typeof course.pretest) => e.sections.reduce((n, s) => n + s.questions.length, 0);

  return NextResponse.json({
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    loggedIn,
    access,
    store: material ? { slug: material.slug, price: material.price } : null,
    progress: { completed: unlocks.completedItems, total: unlocks.totalItems },
    levels: course.levels.map((level) => ({
      id: level.id,
      title: level.title,
      description: level.description,
      targetScore: level.targetScore,
      lessons: level.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        skill: l.skill,
        summary: l.summary,
        minutes: l.minutes,
        unlocked: access && unlocks.unlocked.has(l.id),
        done: unlocks.done.has(l.id),
      })),
      quiz: {
        id: level.quiz.id,
        title: level.quiz.title,
        questions: level.quiz.questions.length,
        passPercent: level.quiz.passPercent,
        unlocked: access && unlocks.unlocked.has(level.quiz.id),
        passed: unlocks.done.has(level.quiz.id),
        score: byId.get(level.quiz.id)?.score ?? null,
        maxScore: byId.get(level.quiz.id)?.maxScore ?? null,
      },
    })),
    pretest: {
      title: course.pretest.title,
      description: course.pretest.description,
      minutes: examMinutes(course.pretest),
      questions: count(course.pretest),
      attempts: attempts.filter((a) => a.kind === "pretest"),
    },
    tryout: {
      title: course.tryout.title,
      description: course.tryout.description,
      minutes: examMinutes(course.tryout),
      questions: count(course.tryout),
      unlocked: access && unlocks.tryoutUnlocked,
      attempts: attempts.filter((a) => a.kind === "tryout"),
    },
  });
}
