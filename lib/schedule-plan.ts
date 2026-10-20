// Schedules an admin assigns to a student. Pure and client-safe: the admin
// form previews with it, the API builds the offer with it, and the daily cron
// extends ongoing schedules with it. Dates are "yyyy-MM-dd" calendar days
// (WITA wall clock), times "HH:MM".

import { SESSION_MINUTES } from "@/lib/policy";

export type Repeat = "none" | "daily" | "weekly" | "monthly";

export type SchedulePlan = {
  startDate: string;
  repeat: Repeat;
  /** Daily / weekly: start time per weekday (0 = Sunday … 6 = Saturday). */
  dayTimes: Partial<Record<number, string>>;
  /** One-off / monthly: the start time. */
  time: string;
  /** Last day (inclusive). Null for a repeating schedule = continues until stopped. */
  endDate: string | null;
};

/** One repeating rule of a plan; becomes one recurring_series row. */
export type Pattern = {
  key: string;
  frequency: "once" | "weekly" | "monthly";
  dayOfWeek: number | null;
  dayOfMonth: number | null;
  startTime: string;
};

export type Occurrence = { date: string; start_time: string; end_time: string; pattern_key: string };

export const WEEKDAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** Monday first, the way people read a week. */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Ongoing schedules are generated this far ahead, then extended daily. */
export const ONGOING_HORIZON_DAYS = 60;
/** Upper bound for one offer, so a typo can't create years of sessions. */
export const MAX_OFFER_SESSIONS = 120;

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const fromMinutes = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** The end of a session that starts at `start` (always SESSION_MINUTES long). */
export function endTimeOf(start: string): string {
  return fromMinutes(toMinutes(start) + SESSION_MINUTES);
}

/** A start time whose session still ends the same day. */
export function isValidStart(start: string | undefined | null): start is string {
  return !!start && TIME_RE.test(start) && toMinutes(start) + SESSION_MINUTES <= 24 * 60;
}

export function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + delta)).toISOString().slice(0, 10);
}

export function dayOfWeek(day: string): number {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** The repeating rules behind a plan (daily is weekly on all chosen days). */
export function patternsOf(plan: SchedulePlan): Pattern[] {
  if (plan.repeat === "none") return [{ key: "once", frequency: "once", dayOfWeek: null, dayOfMonth: null, startTime: plan.time }];
  if (plan.repeat === "monthly") {
    const dom = Number(plan.startDate.slice(8, 10));
    return [{ key: `m${dom}`, frequency: "monthly", dayOfWeek: null, dayOfMonth: dom, startTime: plan.time }];
  }
  return WEEK_ORDER.filter((d) => plan.dayTimes[d]).map((d) => ({
    key: `w${d}`,
    frequency: "weekly" as const,
    dayOfWeek: d,
    dayOfMonth: null,
    startTime: plan.dayTimes[d]!,
  }));
}

/** Dates a pattern falls on between `from` and `to` (inclusive). */
export function patternDates(p: Pick<Pattern, "frequency" | "dayOfWeek" | "dayOfMonth">, from: string, to: string): string[] {
  const out: string[] = [];
  if (from > to) return out;
  if (p.frequency === "weekly" && p.dayOfWeek !== null) {
    let d = from;
    const shift = (p.dayOfWeek - dayOfWeek(d) + 7) % 7;
    d = addDays(d, shift);
    for (; d <= to; d = addDays(d, 7)) out.push(d);
  } else if (p.frequency === "monthly" && p.dayOfMonth !== null) {
    let [y, m] = from.split("-").map(Number);
    for (let i = 0; i < 1200; i++) {
      const probe = new Date(Date.UTC(y, m - 1, p.dayOfMonth));
      // Months without that day (e.g. the 31st) are skipped.
      if (probe.getUTCMonth() === m - 1) {
        const d = probe.toISOString().slice(0, 10);
        if (d > to) break;
        if (d >= from) out.push(d);
      } else if (`${y}-${String(m).padStart(2, "0")}-01` > to) break;
      m += 1;
      if (m > 12) {
        m = 1;
        y += 1;
      }
    }
  }
  return out;
}

/** The last date a plan's first batch covers. */
export function firstBatchUntil(plan: SchedulePlan, today: string): string {
  if (plan.repeat === "none") return plan.startDate;
  const horizon = addDays(today > plan.startDate ? today : plan.startDate, ONGOING_HORIZON_DAYS);
  return plan.endDate && plan.endDate < horizon ? plan.endDate : horizon;
}

/** Every session of the plan from its start date up to `until`, in date/time order. */
export function occurrences(plan: SchedulePlan, until: string): Occurrence[] {
  const list: Occurrence[] = [];
  for (const p of patternsOf(plan)) {
    const dates = p.frequency === "once" ? [plan.startDate] : patternDates(p, plan.startDate, until);
    for (const date of dates) list.push({ date, start_time: p.startTime, end_time: endTimeOf(p.startTime), pattern_key: p.key });
  }
  return list.sort((a, b) => (a.date + a.start_time).localeCompare(b.date + b.start_time));
}

/** Problems with a plan, in Indonesian, for the admin form. Empty = valid. */
export function planProblems(plan: SchedulePlan, today: string): string[] {
  const problems: string[] = [];
  if (!DATE_RE.test(plan.startDate)) problems.push("Tanggal mulai belum diisi.");
  else if (plan.startDate < today) problems.push("Tanggal mulai tidak boleh di masa lalu.");
  if (plan.repeat === "none" || plan.repeat === "monthly") {
    if (!isValidStart(plan.time)) problems.push("Jam mulai belum diisi atau terlalu malam (sesi harus selesai sebelum 24:00).");
  } else {
    const days = Object.entries(plan.dayTimes).filter(([, t]) => t);
    if (days.length === 0) problems.push("Pilih minimal satu hari.");
    for (const [d, t] of days) if (!isValidStart(t)) problems.push(`Jam mulai hari ${WEEKDAYS_ID[Number(d)]} belum benar.`);
  }
  if (plan.repeat !== "none" && plan.endDate) {
    if (!DATE_RE.test(plan.endDate)) problems.push("Tanggal akhir tidak valid.");
    else if (plan.endDate < plan.startDate) problems.push("Tanggal akhir harus setelah tanggal mulai.");
  }
  return problems;
}

/** Short summary, e.g. "Setiap minggu: Senin 16:00, Kamis 19:00 · berlanjut terus"
 * (Indonesian by default; the student dashboard asks for English). */
export function planSummary(plan: SchedulePlan, lang: "id" | "en" = "id"): string {
  if (lang === "en") {
    const until = plan.repeat === "none" ? "" : plan.endDate ? ` · until ${plan.endDate}` : " · ongoing";
    if (plan.repeat === "none") return `Once, ${plan.startDate} at ${plan.time}`;
    if (plan.repeat === "monthly") return `Every month on day ${Number(plan.startDate.slice(8, 10))} at ${plan.time}${until}`;
    const daysEn = WEEK_ORDER.filter((d) => plan.dayTimes[d]).map((d) => `${WEEKDAYS_EN[d]} ${plan.dayTimes[d]}`).join(", ");
    return `${plan.repeat === "daily" ? "Every day" : "Every week"}: ${daysEn}${until}`;
  }
  const range = plan.repeat === "none" ? "" : plan.endDate ? ` · sampai ${plan.endDate}` : " · berlanjut terus";
  if (plan.repeat === "none") return `Sekali, ${plan.startDate} pukul ${plan.time}`;
  if (plan.repeat === "monthly") return `Setiap bulan tanggal ${Number(plan.startDate.slice(8, 10))} pukul ${plan.time}${range}`;
  const days = WEEK_ORDER.filter((d) => plan.dayTimes[d]).map((d) => `${WEEKDAYS_ID[d]} ${plan.dayTimes[d]}`).join(", ");
  return `${plan.repeat === "daily" ? "Setiap hari" : "Setiap minggu"}: ${days}${range}`;
}
