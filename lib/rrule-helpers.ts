import { RRule, Weekday } from 'rrule';
import { SESSION_MINUTES } from '@/lib/policy';
import { minutesToTime, timeToMinutes } from '@/lib/time';

export type AvailabilityRule = {
  id: string;
  day_of_week: number | null; // 0=Sun, 1=Mon, etc. (null for one-off)
  specific_date: string | null;
  start_time: string; // HH:mm[:ss]
  end_time: string;   // HH:mm[:ss]
  is_recurring: boolean;
  recurrence_end_date: string | null;
  is_active: boolean;
};

export type BlackoutDate = {
  id: string;
  date: string;
  reason: string | null;
};

export type BookedSlot = {
  date: string;       // yyyy-MM-dd
  start_time: string; // HH:mm[:ss]
  end_time: string;
};

/**
 * One bookable 90-minute slot. `date` is a yyyy-MM-dd string in business
 * time (WITA) — deliberately not a Date, so no browser timezone can shift
 * it to a neighbouring day.
 */
export type Slot = {
  date: string;
  start_time: string; // HH:mm
  end_time: string;   // HH:mm
  rule_id: string;
};

// Map JS day (0=Sun) to RRule day
const jsDayToRRuleDay = (day: number): Weekday => {
  const map = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
  return map[day];
};

// rrule works in "floating UTC": build inputs with Date.UTC and read results
// with getUTC* / toISOString. Mixing in local-time Dates is what used to
// shift every recurring slot forward a day in UTC+7/+8 browsers.
const utcDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const toDateStr = (d: Date) => d.toISOString().slice(0, 10);

/** Splits an availability window into back-to-back SESSION_MINUTES slots. */
function splitWindow(startTime: string, endTime: string): { start: string; end: string }[] {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  if (end <= start) return [];

  // A window shorter than one session is offered as-is: the admin created it
  // on purpose (e.g. a 60-minute trial slot).
  if (end - start < SESSION_MINUTES) {
    return [{ start: minutesToTime(start), end: minutesToTime(end) }];
  }

  const out: { start: string; end: string }[] = [];
  for (let t = start; t + SESSION_MINUTES <= end; t += SESSION_MINUTES) {
    out.push({ start: minutesToTime(t), end: minutesToTime(t + SESSION_MINUTES) });
  }
  return out;
}

export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return timeToMinutes(aStart) < timeToMinutes(bEnd) && timeToMinutes(bStart) < timeToMinutes(aEnd);
}

/**
 * Expands availability rules into concrete open slots between two dates
 * (inclusive, yyyy-MM-dd). Removes blackout dates, slots that overlap an
 * existing pending/accepted session, and — when `now` is given — slots on
 * today's date that have already started.
 */
export function generateAvailableSlots(
  rules: AvailabilityRule[],
  blackoutDates: BlackoutDate[],
  fromDate: string,
  toDate: string,
  booked: BookedSlot[] = [],
  now?: { date: string; time: string },
): Slot[] {
  const blackout = new Set(blackoutDates.map((b) => b.date));
  const slots: Slot[] = [];
  const seen = new Set<string>();

  const push = (date: string, rule: AvailabilityRule) => {
    if (date < fromDate || date > toDate || blackout.has(date)) return;
    for (const w of splitWindow(rule.start_time, rule.end_time)) {
      const key = `${date} ${w.start}`;
      if (seen.has(key)) continue;
      if (now && (date < now.date || (date === now.date && w.start <= now.time))) continue;
      if (booked.some((b) => b.date === date && overlaps(w.start, w.end, b.start_time, b.end_time))) continue;
      seen.add(key);
      slots.push({ date, start_time: w.start, end_time: w.end, rule_id: rule.id });
    }
  };

  for (const rule of rules.filter((r) => r.is_active)) {
    if (rule.is_recurring && rule.day_of_week !== null) {
      const until = rule.recurrence_end_date && rule.recurrence_end_date < toDate
        ? rule.recurrence_end_date
        : toDate;
      if (until < fromDate) continue;

      const rrule = new RRule({
        freq: RRule.WEEKLY,
        byweekday: [jsDayToRRuleDay(rule.day_of_week)],
        dtstart: utcDate(fromDate),
        until: utcDate(until),
      });

      for (const d of rrule.all()) push(toDateStr(d), rule);
    } else if (!rule.is_recurring && rule.specific_date) {
      push(rule.specific_date, rule);
    }
  }

  return slots.sort((a, b) =>
    a.date === b.date ? a.start_time.localeCompare(b.start_time) : a.date.localeCompare(b.date)
  );
}

/** The same weekday + time, `count` weeks in a row, starting at `date`. */
export function weeklyDates(date: string, count: number): string[] {
  const rrule = new RRule({ freq: RRule.WEEKLY, count, dtstart: utcDate(date) });
  return rrule.all().map(toDateStr);
}
