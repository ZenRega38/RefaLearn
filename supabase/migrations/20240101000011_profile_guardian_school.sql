-- ============================================================================
-- Profile: guardian phone, "21 and over" declaration, school/campus, NISN/NIM
--
-- Booking a class now also needs the student's school or campus and a
-- NISN (school) or NIM (university) — both can be checked against national
-- records even after graduating, without a NIK — and a parent/guardian's
-- name and phone, unless the student ticks "I am 21 or over" (is_adult).
-- Buying materials still needs none of this, so every new column stays
-- nullable. The rules live in lib/profile.ts and are enforced
-- by POST /api/bookings; these constraints only keep the stored values sane.
--
-- profiles is readable only by its owner and by admins, so these stay
-- private like the rest of the verification data.
-- ============================================================================

alter table public.profiles
  add column if not exists is_adult boolean not null default false,
  add column if not exists guardian_phone text,
  add column if not exists school_name text,
  add column if not exists nisn_nim text;

-- NISN is ten digits; a NIM's format varies by campus. Accept 5–25
-- letters, digits, dots, dashes or slashes.
alter table public.profiles drop constraint if exists profiles_nisn_nim_format;
alter table public.profiles add constraint profiles_nisn_nim_format
  check (nisn_nim is null or nisn_nim ~ '^[A-Za-z0-9./-]{5,25}$');

alter table public.profiles drop constraint if exists profiles_guardian_phone_length;
alter table public.profiles add constraint profiles_guardian_phone_length
  check (guardian_phone is null or length(guardian_phone) <= 30);

alter table public.profiles drop constraint if exists profiles_school_name_length;
alter table public.profiles add constraint profiles_school_name_length
  check (school_name is null or length(school_name) <= 200);
