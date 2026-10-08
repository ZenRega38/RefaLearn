// Business-local time. Refa Learn operates from Tarakan, Kalimantan Utara,
// which is WITA (UTC+8, no daylight saving). Session dates and times are
// stored as wall-clock values in this zone; only "what time is it now"
// questions need converting.
export const APP_TIMEZONE = "Asia/Makassar";
export const APP_TIMEZONE_LABEL = "WITA";

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: APP_TIMEZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function zonedParts(at: Date) {
  const parts = partsFormatter.formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Today's date in the business timezone, as yyyy-MM-dd. */
export function todayStr(now: Date = new Date()): string {
  const p = zonedParts(now);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

/** Current wall-clock time in the business timezone, as HH:mm. */
export function nowTimeStr(now: Date = new Date()): string {
  const p = zonedParts(now);
  return `${pad(p.hour)}:${pad(p.minute)}`;
}

/** The real instant a business-local date + time refers to. */
export function localDateTimeToInstant(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const asIfUtc = Date.UTC(y, m - 1, d, hh, mm);
  const p = zonedParts(new Date(asIfUtc));
  const offsetMs = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - asIfUtc;
  return new Date(asIfUtc - offsetMs);
}

/** Hours from now until a business-local date + time (negative if past). */
export function hoursUntil(date: string, time: string, now: Date = new Date()): number {
  return (localDateTimeToInstant(date, time).getTime() - now.getTime()) / 3_600_000;
}

/** Calendar arithmetic on yyyy-MM-dd strings, timezone-free. */
export function addDaysStr(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return t.toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday, for a yyyy-MM-dd string. */
export function dayOfWeekStr(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/**
 * yyyy-MM-dd → a Date at LOCAL midnight of that calendar day, for UI
 * widgets (date pickers, date-fns `format`) that work in the viewer's
 * timezone. Never use the result for arithmetic or comparisons with "now".
 */
export function dateStrToLocalDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Inverse of dateStrToLocalDate — reads the viewer-local calendar day. */
export function localDateToDateStr(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** The calendar month before the one containing `now`, in business time. */
export function previousPeriod(now: Date = new Date()): { month: number; year: number } {
  const [y, m] = todayStr(now).split("-").map(Number);
  return m === 1 ? { month: 12, year: y - 1 } : { month: m - 1, year: y };
}

/** "HH:mm:ss" or "HH:mm" → minutes since midnight. */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}
