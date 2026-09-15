import { getDay } from 'date-fns';

export type DayType = 'weekday' | 'saturday' | 'sunday';

/**
 * Determines the day type for pricing logic based on a given Date.
 */
export function getDayType(date: Date): DayType {
  const day = getDay(date); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  return 'weekday';
}

/**
 * Returns the price for a session based on the date.
 * SINGLE SOURCE OF TRUTH for session pricing.
 */
export function getSessionPrice(date: Date): number {
  const dayType = getDayType(date);
  
  switch (dayType) {
    case 'weekday':
      return 100000;
    case 'saturday':
      return 150000;
    case 'sunday':
      return 200000;
    default:
      return 100000; // Fallback
  }
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
