import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { dateStrToLocalDate } from "@/lib/time";

/** Formats a stored yyyy-MM-dd date in Indonesian, without timezone drift. */
export function formatDateStr(date: string, pattern = "dd MMM yyyy"): string {
  return format(dateStrToLocalDate(date.slice(0, 10)), pattern, { locale: id });
}

/** Formats a timestamptz (ISO string) in Indonesian. */
export function formatTimestamp(iso: string, pattern = "dd MMM yyyy"): string {
  return format(parseISO(iso), pattern, { locale: id });
}

/** "Oktober 2026" — month is 1-12. */
export function monthLabel(month: number, year: number): string {
  return format(new Date(year, month - 1, 1), "MMMM yyyy", { locale: id });
}

/** "Oktober" — month is 1-12. */
export function monthName(month: number): string {
  return format(new Date(2000, month - 1, 1), "MMMM", { locale: id });
}

export const hhmm = (time: string) => time.slice(0, 5);

/** Turns a title into a URL slug; falls back to a random suffix for titles
 * with no latin characters (which used to produce an empty slug). */
export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `post-${Math.random().toString(36).slice(2, 8)}`;
}

/** Only http(s) links may be opened or rendered as href — blocks javascript: URLs. */
export function isSafeHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** Normalises an Indonesian phone number to wa.me format (62…). */
export function toWhatsAppNumber(phone: string | null | undefined): string {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}
