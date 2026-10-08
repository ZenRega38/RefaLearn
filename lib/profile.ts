/**
 * Profile completeness rules for booking a class.
 *
 * Any logged-in student can grab free materials, but booking a schedule
 * needs a complete profile so the admin can verify the student by hand
 * before accepting the booking. Shared by the profile page, the schedule
 * page and POST /api/bookings so all three agree on what "complete" means.
 */

/** Below this age (Indonesian civil-law majority) a guardian's name is required. */
export const ADULT_AGE = 21;

export const MIN_ADDRESS_LENGTH = 15;

/** Columns to select from `profiles` for a completeness check. */
export const PROFILE_COMPLETION_COLUMNS = "full_name, phone, birth_date, guardian_name, address, latitude, longitude";

export type ProfileCompletion = {
  full_name: string | null;
  phone: string | null;
  birth_date: string | null;
  guardian_name: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Whole years between a yyyy-MM-dd birth date and a yyyy-MM-dd "today". */
export function ageOn(birthDate: string, today: string): number {
  const [by, bm, bd] = birthDate.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  let age = ty - by;
  if (tm < bm || (tm === bm && td < bd)) age -= 1;
  return age;
}

export function isValidBirthDate(birthDate: string | null | undefined, today: string): birthDate is string {
  if (!birthDate || !DATE_RE.test(birthDate)) return false;
  const [y, m, d] = birthDate.split("-").map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d));
  const real = probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d;
  return real && y >= 1900 && birthDate <= today;
}

/** True when the student is under 21 on `today`. Unknown birth dates count as "not yet known", so false. */
export function needsGuardian(birthDate: string | null | undefined, today: string): boolean {
  return isValidBirthDate(birthDate, today) && ageOn(birthDate, today) < ADULT_AGE;
}

export function isValidCoordinate(lat: number | null | undefined, lng: number | null | undefined): boolean {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !(lat === 0 && lng === 0)
  );
}

/**
 * Human-readable (Indonesian) list of what is still missing. Empty means the
 * profile is complete enough to book.
 */
export function missingProfileFields(p: Partial<ProfileCompletion> | null | undefined, today: string): string[] {
  const missing: string[] = [];
  if (!p) return ["Data profil"];
  if (!p.full_name || p.full_name.trim().length < 2) missing.push("Nama lengkap");
  if (!p.phone || p.phone.replace(/\D/g, "").length < 9) missing.push("Nomor WhatsApp");
  if (!isValidBirthDate(p.birth_date, today)) {
    missing.push("Tanggal lahir");
  } else if (needsGuardian(p.birth_date, today) && (!p.guardian_name || p.guardian_name.trim().length < 2)) {
    missing.push(`Nama orang tua/wali (wajib untuk usia di bawah ${ADULT_AGE} tahun)`);
  }
  if (!p.address || p.address.trim().length < MIN_ADDRESS_LENGTH) missing.push("Alamat lengkap domisili");
  if (!isValidCoordinate(p.latitude, p.longitude)) missing.push("Titik lokasi (koordinat)");
  return missing;
}

export function isProfileComplete(p: Partial<ProfileCompletion> | null | undefined, today: string): boolean {
  return missingProfileFields(p, today).length === 0;
}

/**
 * Reads coordinates typed or pasted by the user: "-3.3, 117.6", "-3.3 117.6",
 * or a Google Maps link containing "@lat,lng", "q=lat,lng", "ll=lat,lng",
 * or "!3dLAT!4dLNG". Returns null when nothing valid is found.
 */
export function parseCoordinates(text: string): { latitude: number; longitude: number } | null {
  const input = text.trim();
  if (!input) return null;
  const num = String.raw`(-?\d{1,3}(?:\.\d+)?)`;
  const patterns = [
    new RegExp(String.raw`!3d${num}!4d${num}`),
    new RegExp(String.raw`@${num},\s*${num}`),
    new RegExp(String.raw`[?&](?:q|query|ll|destination)=${num}(?:,|%2C)\s*${num}`, "i"),
    new RegExp(String.raw`^${num}\s*[,;\s]\s*${num}$`),
  ];
  for (const re of patterns) {
    const m = input.match(re);
    if (m) {
      const latitude = Number(m[1]);
      const longitude = Number(m[2]);
      if (isValidCoordinate(latitude, longitude)) return { latitude, longitude };
    }
  }
  return null;
}

export function googleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

/** Case- and spacing-insensitive name match, used for typed e-signatures. */
export function sameName(a: string | null | undefined, b: string | null | undefined): boolean {
  const norm = (s: string | null | undefined) => (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  return norm(a).length > 0 && norm(a) === norm(b);
}
