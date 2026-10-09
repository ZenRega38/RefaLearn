-- ============================================================================
-- Profile completion for booking
--
-- Booking a class now needs a complete profile so the admin can verify the
-- student by hand before accepting: birth date, a guardian's name when the
-- student is under 21, full domicile address, and map coordinates.
-- Free materials still only need a login, so every column stays nullable.
-- The rules themselves live in lib/profile.ts and are enforced by
-- POST /api/bookings.
--
-- profiles is already readable only by its owner and by admins
-- (20240101000002_hardening.sql), which keeps address and location private.
-- ============================================================================

alter table public.profiles
  add column if not exists birth_date date,
  add column if not exists guardian_name text,
  add column if not exists address text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision;

alter table public.profiles drop constraint if exists profiles_latitude_range;
alter table public.profiles add constraint profiles_latitude_range
  check (latitude is null or latitude between -90 and 90);

alter table public.profiles drop constraint if exists profiles_longitude_range;
alter table public.profiles add constraint profiles_longitude_range
  check (longitude is null or longitude between -180 and 180);

-- Either both coordinates are set or neither is.
alter table public.profiles drop constraint if exists profiles_coordinates_pair;
alter table public.profiles add constraint profiles_coordinates_pair
  check ((latitude is null) = (longitude is null));

alter table public.profiles drop constraint if exists profiles_birth_date_sane;
alter table public.profiles add constraint profiles_birth_date_sane
  check (birth_date is null or birth_date >= date '1900-01-01');
