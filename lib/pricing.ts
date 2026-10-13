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

/**
 * "Harga coret": the higher price shown struck through next to a real price,
 * with a "Limited Time Offer" label. Keyed by the real price so materials
 * and sessions share it; prices not listed here show no strike-through.
 * Only display — every charge, invoice and order uses the real price.
 */
export const COMPARE_AT_PRICES: Record<number, number> = {
  // sessions
  100000: 120000,
  150000: 200000,
  200000: 250000,
  // materials
  49000: 100000,
  99000: 150000,
  199000: 300000,
  249000: 400000,
};

/** The struck-through "before" price for a real price, or null. */
export function compareAtPrice(price: number): number | null {
  const before = COMPARE_AT_PRICES[price];
  return before && before > price ? before : null;
}

/** Whole-number discount percentage, e.g. 99000 vs 150000 → 34. */
export function discountPercent(price: number, before: number): number {
  return Math.round((1 - price / before) * 100);
}
