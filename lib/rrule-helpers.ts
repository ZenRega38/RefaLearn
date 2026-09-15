import { RRule, Weekday } from 'rrule';
import { parseISO, isSameDay, startOfDay, addMonths } from 'date-fns';

export type AvailabilityRule = {
  id: string;
  day_of_week: number | null; // 0=Sun, 1=Mon, etc. (null for one-off)
  specific_date: string | null;
  start_time: string; // HH:mm
  end_time: string;   // HH:mm
  is_recurring: boolean;
  recurrence_end_date: string | null;
  is_active: boolean;
};

export type BlackoutDate = {
  id: string;
  date: string;
  reason: string | null;
};

export type Slot = {
  date: Date;
  start_time: string;
  end_time: string;
  rule_id: string;
};

// Map JS day (0=Sun) to RRule day
const jsDayToRRuleDay = (day: number): Weekday => {
  const map = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
  return map[day];
};

/**
 * Expands availability rules into concrete date slots for a given range (e.g. next 3 months).
 * Automatically filters out blackout dates.
 * 
 * Does NOT filter out already booked sessions (that must be done by querying the sessions table).
 */
export function generateAvailableSlots(
  rules: AvailabilityRule[],
  blackoutDates: BlackoutDate[],
  startDate: Date = new Date(),
  endDate: Date = addMonths(new Date(), 2) // Default to 2 months ahead
): Slot[] {
  const slots: Slot[] = [];
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  const activeRules = rules.filter(r => r.is_active);

  for (const rule of activeRules) {
    if (rule.is_recurring && rule.day_of_week !== null) {
      // Recurring rule
      const ruleEndDate = rule.recurrence_end_date 
        ? new Date(Math.min(parseISO(rule.recurrence_end_date).getTime(), end.getTime()))
        : end;

      const rrule = new RRule({
        freq: RRule.WEEKLY,
        byweekday: [jsDayToRRuleDay(rule.day_of_week)],
        dtstart: start,
        until: ruleEndDate,
      });

      const dates = rrule.all();

      dates.forEach(date => {
        // Check if date is a blackout date
        const isBlackout = blackoutDates.some(b => isSameDay(parseISO(b.date), date));
        
        if (!isBlackout) {
          slots.push({
            date: date,
            start_time: rule.start_time,
            end_time: rule.end_time,
            rule_id: rule.id,
          });
        }
      });
    } else if (!rule.is_recurring && rule.specific_date) {
      // One-off rule
      const ruleDate = startOfDay(parseISO(rule.specific_date));
      
      // Check if it falls within our window and isn't blacked out
      if (ruleDate >= start && ruleDate <= end) {
        const isBlackout = blackoutDates.some(b => isSameDay(parseISO(b.date), ruleDate));
        
        if (!isBlackout) {
          slots.push({
            date: ruleDate,
            start_time: rule.start_time,
            end_time: rule.end_time,
            rule_id: rule.id,
          });
        }
      }
    }
  }

  // Sort slots by date and time
  return slots.sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return a.date.getTime() - b.date.getTime();
    }
    return a.start_time.localeCompare(b.start_time);
  });
}
