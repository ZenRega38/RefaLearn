import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { computeUnlocks, getCourse } from "@/lib/course/content";
import { examMinutes, hasCourseAccess, isFreeCourse, loadOpenLevels, loadProgress } from "@/lib/course/server";
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
  let role = "guest";
  let progress: ProgressItem[] = [];
  let attempts: { id: string; kind: string; total_score: number | null; submitted_at: string | null; started_at: string }[] = [];

  if (user) {
    loggedIn = true;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    role = profile?.role || "student";
    [access, progress] = await Promise.all([
      hasCourseAccess(admin, user.id, role, slug),
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

  const isAdmin = role === "admin";
  // Students only enter opened levels; the admin sees every level (to
  // preview and host it) but also gets the real open state to manage it.
  const [studentOpen, free, { data: material }, { data: running }] = await Promise.all([
    course.adminLocks ? loadOpenLevels(admin, slug) : Promise.resolve(undefined),
    isFreeCourse(admin, slug),
    admin
      .from("materials")
      .select("slug, price")
      .eq("course_slug", slug)
      .eq("is_active", true)
      .order("price", { ascending: true })
      .limit(1)
      .maybeSingle(),
    isAdmin
      ? admin
          .from("live_sessions")
          .select("id, pin, level_id, status")
          .eq("course_slug", slug)
          .neq("status", "ended")
          .gte("created_at", new Date(Date.now() - 6 * 3600_000).toISOString())
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: null }),
  ]);
  const openLevels = isAdmin && course.adminLocks ? new Set(course.levels.map((l) => l.id)) : studentOpen;
  const unlocks = computeUnlocks(course, progress, openLevels);
  const byId = new Map(progress.map((p) => [p.itemId, p]));
  const liveByLevel = new Map<string, { id: string; pin: string; status: string }>();
  for (const s of running || []) if (!liveByLevel.has(s.level_id)) liveByLevel.set(s.level_id, { id: s.id, pin: s.pin, status: s.status });

  const count = (e: NonNullable<typeof course.pretest>) => e.sections.reduce((n, s) => n + s.questions.length, 0);
  const quizInfo = (q: { id: string; title: string; questions: unknown[]; passPercent: number }) => ({
    id: q.id,
    title: q.title,
    questions: q.questions.length,
    passPercent: q.passPercent,
    unlocked: access && unlocks.unlocked.has(q.id),
    passed: unlocks.done.has(q.id),
    score: byId.get(q.id)?.score ?? null,
    maxScore: byId.get(q.id)?.maxScore ?? null,
  });

  return NextResponse.json({
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    labels: course.labels,
    comingSoon: course.comingSoon ?? null,
    mascot: course.mascot ?? null,
    free,
    openOrder: !!course.openOrder,
    adminLocks: !!course.adminLocks,
    isAdmin,
    quizSecondsPerQuestion: course.quizSecondsPerQuestion ?? null,
    loggedIn,
    access,
    store: material ? { slug: material.slug, price: material.price } : null,
    progress: { completed: unlocks.completedItems, total: unlocks.totalItems },
    levels: course.levels.map((level) => ({
      id: level.id,
      title: level.title,
      description: level.description,
      targetScore: level.targetScore,
      cover: level.cover ?? [],
      locked: unlocks.lockedLevels.has(level.id),
      hasLive: !!level.live,
      // Admin-only: whether students can enter this level, and its running live quiz.
      openForStudents: isAdmin ? (course.adminLocks ? !!studentOpen?.has(level.id) : true) : undefined,
      live: isAdmin ? liveByLevel.get(level.id) ?? null : undefined,
      pretest: level.pretest ? quizInfo(level.pretest) : null,
      lessons: level.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        skill: l.skill,
        summary: l.summary,
        minutes: l.minutes ?? null,
        unlocked: access && unlocks.unlocked.has(l.id),
        done: unlocks.done.has(l.id),
      })),
      quiz: quizInfo(level.quiz),
    })),
    pretest: course.pretest
      ? {
          title: course.pretest.title,
          description: course.pretest.description,
          minutes: examMinutes(course.pretest),
          questions: count(course.pretest),
          attempts: attempts.filter((a) => a.kind === "pretest"),
        }
      : null,
    tryout: course.tryout
      ? {
          title: course.tryout.title,
          description: course.tryout.description,
          minutes: examMinutes(course.tryout),
          questions: count(course.tryout),
          unlocked: access && unlocks.tryoutUnlocked,
          attempts: attempts.filter((a) => a.kind === "tryout"),
        }
      : null,
  });
}
