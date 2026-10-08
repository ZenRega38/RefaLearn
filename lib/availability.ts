import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { addMonths } from "date-fns";
import {
  generateAvailableSlots,
  type AvailabilityRule,
  type BlackoutDate,
  type BookedSlot,
  type Slot,
} from "@/lib/rrule-helpers";
import { BOOKING_WINDOW_MONTHS } from "@/lib/policy";
import { nowTimeStr, todayStr } from "@/lib/time";

/** Last bookable date, yyyy-MM-dd. */
export function bookingHorizon(now: Date = new Date()): string {
  const [y, m, d] = todayStr(now).split("-").map(Number);
  return addMonths(new Date(Date.UTC(y, m - 1, d)), BOOKING_WINDOW_MONTHS).toISOString().slice(0, 10);
}

/**
 * The single server-side computation of open slots (agent.md 6.2), used by
 * the public slot picker, the reschedule picker, and every write that must
 * re-check a slot before taking it. `excludeSessionId` lets a reschedule
 * ignore the student's own session.
 */
export async function getOpenSlots(
  supabase: SupabaseClient,
  from: string,
  to: string,
  opts: { excludeSession?: { date: string; start_time: string } } = {}
): Promise<Slot[]> {
  const [{ data: rules, error: rulesError }, { data: blackouts, error: blackoutError }, { data: booked, error: bookedError }] =
    await Promise.all([
      supabase.from("availability_rules").select("*").eq("is_active", true),
      supabase.from("blackout_dates").select("*").gte("date", from).lte("date", to),
      supabase.rpc("get_booked_slots", { p_from: from, p_to: to }),
    ]);

  if (rulesError) throw rulesError;
  if (blackoutError) throw blackoutError;
  if (bookedError) throw bookedError;

  const taken = ((booked || []) as BookedSlot[]).filter(
    (b) =>
      !opts.excludeSession ||
      !(b.date === opts.excludeSession.date && b.start_time.slice(0, 5) === opts.excludeSession.start_time.slice(0, 5))
  );

  const now = new Date();
  return generateAvailableSlots(
    (rules || []) as AvailabilityRule[],
    (blackouts || []) as BlackoutDate[],
    from,
    to,
    taken,
    { date: todayStr(now), time: nowTimeStr(now) }
  );
}

export function findSlot(slots: Slot[], date: string, startTime: string): Slot | undefined {
  return slots.find((s) => s.date === date && s.start_time === startTime.slice(0, 5));
}
