import { dayOfWeekStr } from "@/lib/time";

export type DayType = 'weekday' | 'saturday' | 'sunday';

/**
 * SINGLE SOURCE OF TRUTH for session pricing (IDR per 90-minute session).
 * Every page, server route and the contract template read from here.
 */
export const SESSION_PRICES: Record<DayType, number> = {
  weekday: 100000,
  saturday: 150000,
  sunday: 200000,
};

export const DAY_TYPE_LABELS: Record<DayType, string> = {
  weekday: 'Senin – Jumat',
  saturday: 'Sabtu',
  sunday: 'Minggu',
};

/**
 * Day type for a session date. Prefer passing the stored yyyy-MM-dd
 * string — it is timezone-free. A Date is read in the viewer's local
 * calendar (as react-day-picker hands it over).
 */
export function getDayType(date: Date | string): DayType {
  const day = typeof date === 'string' ? dayOfWeekStr(date) : date.getDay();

  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  return 'weekday';
}

/** Price for a session on the given date. */
export function getSessionPrice(date: Date | string): number {
  return SESSION_PRICES[getDayType(date)];
}

/**
 * Format price as IDR currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
