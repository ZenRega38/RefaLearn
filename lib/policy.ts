// Business rules that more than one place (UI copy, server routes, the
// contract template) must agree on. Prices themselves live in lib/pricing.ts.

/** Every session is 90 minutes. */
export const SESSION_MINUTES = 90;

/** Flat fee per cancellation ACTION (not per session) for late cancellations. */
export const CANCELLATION_FEE_AMOUNT = 50000;

/**
 * Cancelling an accepted session at least this many hours before it starts
 * is free. Cancelling a request the admin hasn't accepted yet is always free.
 */
export const FREE_CANCELLATION_NOTICE_HOURS = 12;

/** A monthly invoice is due this many days after it is issued. */
export const INVOICE_DUE_DAYS = 7;

/** How far ahead students can book. */
export const BOOKING_WINDOW_MONTHS = 2;

/** Weekly-series sizes offered at booking time. */
export const SESSION_COUNT_OPTIONS = [1, 4, 8, 12, 16, 24];
