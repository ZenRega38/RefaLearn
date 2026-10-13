import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getDayType, getSessionPrice, type DayType } from "@/lib/pricing";
import { overlaps } from "@/lib/rrule-helpers";
import { addDays, endTimeOf, firstBatchUntil, MAX_OFFER_SESSIONS, ONGOING_HORIZON_DAYS, occurrences, patternDates, type SchedulePlan } from "@/lib/schedule-plan";
import { nowTimeStr, todayStr } from "@/lib/time";

/** Why an occurrence can't be scheduled. */
export type Clash = "taken" | "blackout" | "past";

export type PlannedSession = {
  date: string;
  start_time: string;
  end_time: string;
  day_type: DayType;
  price: number;
  pattern_key: string;
};

type Busy = { date: string; start_time: string; end_time: string };

/** Times already taken between two dates: pending/accepted sessions and pending offers. */
async function busyTimes(admin: SupabaseClient, from: string, to: string, ignoreOffer?: string): Promise<Busy[]> {
  const [{ data: sessions }, { data: offers }] = await Promise.all([
    admin.from("sessions").select("date, start_time, end_time").in("status", ["pending", "accepted"]).gte("date", from).lte("date", to),
    admin.from("schedule_offers").select("id, sessions").eq("status", "pending"),
  ]);
  const fromOffers = (offers || [])
    .filter((o) => o.id !== ignoreOffer)
    .flatMap((o) => (o.sessions as Busy[]).filter((s) => s.date >= from && s.date <= to));
  return [...((sessions || []) as Busy[]), ...fromOffers];
}

async function blackoutDays(admin: SupabaseClient, from: string, to: string): Promise<Set<string>> {
  const { data } = await admin.from("blackout_dates").select("date").gte("date", from).lte("date", to);
  return new Set((data || []).map((b) => b.date as string));
}

function clashOf(o: Busy, busy: Busy[], blackouts: Set<string>, today: string, now: string): Clash | null {
  if (o.date < today || (o.date === today && o.start_time <= now)) return "past";
  if (blackouts.has(o.date)) return "blackout";
  if (busy.some((b) => b.date === o.date && overlaps(o.start_time, o.end_time, b.start_time.slice(0, 5), b.end_time.slice(0, 5)))) return "taken";
  return null;
}

/**
 * The first batch of a plan with prices and clashes. Ongoing plans cover
 * ONGOING_HORIZON_DAYS; the daily cron adds the rest later.
 */
export async function previewPlan(admin: SupabaseClient, plan: SchedulePlan) {
  const today = todayStr();
  const until = firstBatchUntil(plan, today);
  const list = occurrences(plan, until);
  const [busy, blackouts] = await Promise.all([busyTimes(admin, plan.startDate, until), blackoutDays(admin, plan.startDate, until)]);
  const now = nowTimeStr();
  const sessions = list.map((o) => ({
    date: o.date,
    start_time: o.start_time,
    end_time: o.end_time,
    day_type: getDayType(o.date),
    price: getSessionPrice(o.date),
    pattern_key: o.pattern_key,
    clash: clashOf(o, busy, blackouts, today, now),
  }));
  return { until, sessions, tooMany: sessions.length > MAX_OFFER_SESSIONS };
}

/**
 * Daily cron: keeps every auto-extending series (from an accepted admin
 * schedule) about ONGOING_HORIZON_DAYS ahead. Dates that clash with another
 * session or a blackout day are skipped. Returns how many sessions it added.
 */
export async function extendAssignedSeries(admin: SupabaseClient): Promise<number> {
  const today = todayStr();
  const horizon = addDays(today, ONGOING_HORIZON_DAYS);
  const { data: series } = await admin
    .from("recurring_series")
    .select("id, student_id, frequency, day_of_week, day_of_month, start_time, end_date, generated_until, contract_acceptance_id")
    .eq("status", "active")
    .eq("auto_extend", true);

  let added = 0;
  for (const s of series || []) {
    const from = addDays(s.generated_until ?? today, 1);
    const to = s.end_date && s.end_date < horizon ? s.end_date : horizon;
    if (from > to || !s.contract_acceptance_id) continue;

    const start = String(s.start_time).slice(0, 5);
    const dates = patternDates({ frequency: s.frequency, dayOfWeek: s.day_of_week, dayOfMonth: s.day_of_month }, from, to);
    const [busy, blackouts] = await Promise.all([busyTimes(admin, from, to), blackoutDays(admin, from, to)]);
    const rows = dates
      .map((date) => ({ date, start_time: start, end_time: endTimeOf(start) }))
      .filter((o) => !clashOf(o, busy, blackouts, today, "00:00"))
      .map((o) => ({
        student_id: s.student_id,
        series_id: s.id,
        ...o,
        day_type: getDayType(o.date),
        price: getSessionPrice(o.date),
        status: "accepted",
        contract_acceptance_id: s.contract_acceptance_id,
        notes: "Dijadwalkan oleh admin",
      }));

    if (rows.length > 0) {
      const { error } = await admin.from("sessions").insert(rows);
      if (error) {
        console.error("[schedule] extending series failed:", s.id, error);
        continue;
      }
      added += rows.length;
    }
    const done = !!s.end_date && to >= s.end_date;
    await admin.from("recurring_series").update({ generated_until: to, ...(done ? { auto_extend: false } : {}) }).eq("id", s.id);
  }
  return added;
}
