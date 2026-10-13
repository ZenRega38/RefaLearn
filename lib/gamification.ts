// XP, levels and streaks. Pure and client-safe: the server records activity
// (lib/gamification-server.ts), the dashboard and navbar render it.
//
// Days are calendar days in the business timezone (WITA, see lib/time.ts),
// as "yyyy-MM-dd" strings.

/** XP per action. Each action pays once (the database enforces it). */
export const XP = {
  /** First sign-in of the day. */
  dailyLogin: 5,
  /** Opening a lesson for the first time ("baca modul"). */
  lessonRead: 5,
  /** Clearing a lesson's checkpoint for the first time. */
  lessonDone: 20,
  /** Taking a chapter pretest / diagnostic for the first time. */
  pretest: 10,
  /** Submitting a level quiz for the first time. */
  quizDone: 10,
  /** Passing a level quiz for the first time (on top of quizDone). */
  quizPassed: 40,
  /** Finishing a full pretest or tryout exam. */
  exam: 30,
} as const;

/** Study-streak milestones and their one-off bonus XP. */
export const STREAK_MILESTONES: { days: number; xp: number }[] = [
  { days: 3, xp: 15 },
  { days: 7, xp: 50 },
  { days: 14, xp: 100 },
  { days: 30, xp: 250 },
  { days: 60, xp: 500 },
  { days: 100, xp: 1000 },
];

export type XpSource = "daily_login" | "lesson_read" | "lesson_done" | "pretest" | "quiz_done" | "quiz_passed" | "exam" | "streak_bonus";

// --- Levels -------------------------------------------------------------------

/** Total XP needed to reach `level` (level 1 starts at 0): 0, 100, 300, 600, 1000, … */
export function xpForLevel(level: number): number {
  return 50 * level * (level - 1);
}

export function levelInfo(totalXp: number) {
  const xp = Math.max(0, Math.floor(totalXp));
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  const floor = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, xp, intoLevel: xp - floor, levelSize: next - floor, toNext: next - xp, progress: (xp - floor) / (next - floor) };
}

const TITLES: [number, string][] = [
  [1, "Beginner"],
  [3, "Explorer"],
  [5, "Achiever"],
  [8, "Champion"],
  [12, "Master"],
  [16, "Legend"],
];

export function levelTitle(level: number): string {
  let title = TITLES[0][1];
  for (const [min, name] of TITLES) if (level >= min) title = name;
  return title;
}

// --- Days and streaks -----------------------------------------------------------

/** "2026-10-12" → "2026-10-11". Works on calendar dates, no timezone involved. */
export function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + delta));
  return t.toISOString().slice(0, 10);
}

export type StreakInfo = {
  /** Consecutive days up to today (or up to yesterday, when today isn't done yet). */
  current: number;
  best: number;
  /** Today already counts. */
  doneToday: boolean;
  /** The streak is alive but today isn't done yet — do something today to keep it. */
  atRisk: boolean;
};

/** Streak over a set of active days, as of `today`. */
export function computeStreak(days: Iterable<string>, today: string): StreakInfo {
  const set = new Set(days);
  const doneToday = set.has(today);

  let current = 0;
  let cursor = doneToday ? today : addDays(today, -1);
  while (set.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }

  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of [...set].sort()) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }

  return { current, best: Math.max(best, current), doneToday, atRisk: !doneToday && current > 0 };
}

/** The milestone reached exactly at this streak length, if any. */
export function milestoneAt(streak: number) {
  return STREAK_MILESTONES.find((m) => m.days === streak) ?? null;
}

/** The next milestone above the current streak. */
export function nextMilestone(streak: number) {
  return STREAK_MILESTONES.find((m) => m.days > streak) ?? null;
}

// --- What the API sends -----------------------------------------------------------

export type ActivityDay = { day: string; loggedIn: boolean; studied: boolean; xp: number };

export type GamificationStats = {
  totalXp: number;
  level: ReturnType<typeof levelInfo>;
  title: string;
  login: StreakInfo;
  study: StreakInfo;
  today: string;
  /** The last 28 days, oldest first. */
  recent: ActivityDay[];
  xpToday: number;
};

/** Window event the navbar listens to, to show "+XP" toasts and refresh the badge. */
export const XP_EVENT = "refa:xp";
export type XpEventDetail = { xp: number; label?: string };

/** Tell the navbar that the server just awarded XP. */
export function announceXp(xp: number | undefined | null, label?: string) {
  if (typeof window === "undefined" || !xp) return;
  window.dispatchEvent(new CustomEvent<XpEventDetail>(XP_EVENT, { detail: { xp, label } }));
}
