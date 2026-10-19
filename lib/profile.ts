/**
 * Profile completeness rules for booking a class.
 *
 * Any logged-in student can grab free or paid materials with an incomplete
 * profile, but booking a schedule needs a complete one so the admin can
 * verify the student by hand before accepting the booking: contact details,
 * school or campus and NISN/NIM, domicile, and a parent/guardian's name and phone — unless
 * the student declares they are over 21. Shared by the profile page, the schedule
 * page and POST /api/bookings so all three agree on what "complete" means.
 */

/** Below this age (Indonesian civil-law majority) a guardian's name is required. */
export const ADULT_AGE = 21;

export const MIN_ADDRESS_LENGTH = 15;

/** Columns to select from `profiles` for a completeness check. */
export const PROFILE_COMPLETION_COLUMNS =
  "full_name, phone, birth_date, is_adult, guardian_name, guardian_phone, school_name, nisn_nim, address, latitude, longitude";

export type ProfileCompletion = {
  full_name: string | null;
  phone: string | null;
  birth_date: string | null;
  /** The student ticked "I am over 21": guardian details become optional. */
  is_adult: boolean | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  school_name: string | null;
  nisn_nim: string | null;
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

/** The "over 21" tick contradicts a birth date that says otherwise. */
export function adultClaimConflicts(p: Pick<Partial<ProfileCompletion>, "is_adult" | "birth_date">, today: string): boolean {
  return !!p.is_adult && needsGuardian(p.birth_date, today);
}

/** Guardian name and phone are needed unless the student credibly ticked "over 21". */
export function requiresGuardianContact(p: Pick<Partial<ProfileCompletion>, "is_adult" | "birth_date">, today: string): boolean {
  return !p.is_adult || adultClaimConflicts(p, today);
}

export const digitsOf = (value: string | null | undefined) => (value ?? "").replace(/\D/g, "");

export function isValidPhone(value: string | null | undefined): boolean {
  return digitsOf(value).length >= 9;
}

/**
 * NISN (school, 10 digits) or NIM (university, format varies by campus).
 * Either can be checked against national records even after graduating,
 * without asking for a NIK. Accepts 5–25 letters, digits, dots, dashes or
 * slashes with at least five digits.
 */
export function isValidNisnNim(value: string | null | undefined): boolean {
  const v = (value ?? "").trim();
  return /^[A-Za-z0-9./-]{5,25}$/.test(v) && digitsOf(v).length >= 5;
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

const MISSING_LABELS = {
  id: {
    profile: "Data profil",
    fullName: "Nama lengkap",
    phone: "Nomor WhatsApp",
    birthDate: "Tanggal lahir",
    adultClaim: `Centang "di atas ${ADULT_AGE} tahun" tidak sesuai tanggal lahir`,
    guardianName: "Nama orang tua/wali",
    guardianPhone: "Nomor HP orang tua/wali",
    school: "Asal sekolah/kampus",
    nisn: "NISN/NIM",
    address: "Alamat lengkap domisili",
    location: "Titik lokasi (koordinat)",
  },
  en: {
    profile: "Profile details",
    fullName: "Full name",
    phone: "WhatsApp number",
    birthDate: "Date of birth",
    adultClaim: `The "over ${ADULT_AGE}" box doesn't match your date of birth`,
    guardianName: "Parent/guardian name",
    guardianPhone: "Parent/guardian phone number",
    school: "School/university",
    nisn: "NISN/NIM",
    address: "Full home address",
    location: "Map location (coordinates)",
  },
};

/**
 * Human-readable list of what is still missing (Indonesian by default; the
 * student-facing pages ask for English). Empty means the profile is complete
 * enough to book.
 */
export function missingProfileFields(p: Partial<ProfileCompletion> | null | undefined, today: string, lang: "id" | "en" = "id"): string[] {
  const L = MISSING_LABELS[lang];
  const missing: string[] = [];
  if (!p) return [L.profile];
  if (!p.full_name || p.full_name.trim().length < 2) missing.push(L.fullName);
  if (!isValidPhone(p.phone)) missing.push(L.phone);
  if (!isValidBirthDate(p.birth_date, today)) missing.push(L.birthDate);
  if (adultClaimConflicts(p, today)) {
    missing.push(L.adultClaim);
  }
  if (requiresGuardianContact(p, today)) {
    if (!p.guardian_name || p.guardian_name.trim().length < 2) missing.push(L.guardianName);
    if (!isValidPhone(p.guardian_phone)) missing.push(L.guardianPhone);
  }
  if (!p.school_name || p.school_name.trim().length < 3) missing.push(L.school);
  if (!isValidNisnNim(p.nisn_nim)) missing.push(L.nisn);
  if (!p.address || p.address.trim().length < MIN_ADDRESS_LENGTH) missing.push(L.address);
  if (!isValidCoordinate(p.latitude, p.longitude)) missing.push(L.location);
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
