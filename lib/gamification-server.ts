import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { addDays, computeStreak, levelInfo, levelTitle, milestoneAt, XP, type ActivityDay, type GamificationStats, type XpSource } from "@/lib/gamification";
import { todayStr } from "@/lib/time";

type Award = { source: XpSource; ref: string; xp: number };

/**
 * Marks today as a login and/or study day and awards XP once per action.
 * A study day may also complete a study-streak milestone, which pays a
 * one-off bonus. Returns the XP awarded now (0 if it already paid out).
 *
 * Never throws: XP is a bonus, so a failure here must not break saving a
 * lesson or a quiz. Pass the service-role client.
 */
export async function recordActivity(admin: SupabaseClient, userId: string, opts: { login?: boolean; study?: boolean; award?: Award }): Promise<number> {
  try {
    const day = todayStr();
    const { data, error } = await admin.rpc("record_activity", {
      p_user: userId,
      p_day: day,
      p_login: !!opts.login,
      p_study: !!opts.study,
      p_source: opts.award?.source ?? null,
      p_ref: opts.award?.ref ?? null,
      p_xp: opts.award?.xp ?? 0,
    });
    if (error) throw error;
    let awarded = Number(data) || 0;
    if (opts.study) awarded += await awardStreakMilestone(admin, userId, day);
    return awarded;
  } catch (err) {
    console.error("recordActivity failed", err);
    return 0;
  }
}

/** The daily check-in: first sign-in of the day pays XP.dailyLogin. */
export function checkIn(admin: SupabaseClient, userId: string) {
  return recordActivity(admin, userId, { login: true, award: { source: "daily_login", ref: todayStr(), xp: XP.dailyLogin } });
}

async function awardStreakMilestone(admin: SupabaseClient, userId: string, today: string): Promise<number> {
  const { data } = await admin
    .from("daily_activity")
    .select("day")
    .eq("user_id", userId)
    .eq("studied", true)
    .gte("day", addDays(today, -120))
    .order("day", { ascending: false });
  const streak = computeStreak((data || []).map((r) => r.day as string), today);
  const milestone = streak.doneToday ? milestoneAt(streak.current) : null;
  if (!milestone) return 0;
  // One bonus per milestone per streak: the ref names the day the streak started.
  const start = addDays(today, -(streak.current - 1));
  const { data: paid } = await admin.rpc("record_activity", {
    p_user: userId,
    p_day: today,
    p_login: false,
    p_study: true,
    p_source: "streak_bonus",
    p_ref: `study-${milestone.days}-${start}`,
    p_xp: milestone.xp,
  });
  return Number(paid) || 0;
}

/** XP, level and both streaks for one user. */
export async function loadStats(admin: SupabaseClient, userId: string): Promise<GamificationStats> {
  const today = todayStr();
  const { data } = await admin.from("daily_activity").select("day, logged_in, studied, xp").eq("user_id", userId).order("day", { ascending: true });
  const rows: ActivityDay[] = (data || []).map((r) => ({ day: r.day as string, loggedIn: !!r.logged_in, studied: !!r.studied, xp: Number(r.xp) || 0 }));

  const totalXp = rows.reduce((n, r) => n + r.xp, 0);
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const recent: ActivityDay[] = Array.from({ length: 28 }, (_, i) => {
    const day = addDays(today, i - 27);
    return byDay.get(day) ?? { day, loggedIn: false, studied: false, xp: 0 };
  });
  const level = levelInfo(totalXp);

  return {
    totalXp,
    level,
    title: levelTitle(level.level),
    // Studying requires being signed in, so a study day is also a login day.
    login: computeStreak(rows.filter((r) => r.loggedIn || r.studied).map((r) => r.day), today),
    study: computeStreak(rows.filter((r) => r.studied).map((r) => r.day), today),
    today,
    recent,
    xpToday: byDay.get(today)?.xp ?? 0,
  };
}
