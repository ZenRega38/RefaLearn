-- ============================================================================
-- Refa Learn — Slide decks per course module
--
-- The admin attaches one share link (Google Slides, Google Drive, Canva, or a
-- direct PDF/PPT file) to a module from the course page (/learn/[slug]); the
-- page shows it in a viewer. Only for courses with `slideLinks` (English
-- Day). Students receive the link through the course outline API, and only
-- for modules they may enter, so there is no read policy for them here.
-- ============================================================================

create table if not exists public.course_level_slides (
  course_slug text not null,
  level_id text not null,
  url text not null check (url ~* '^https?://' and char_length(url) <= 2000),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null,
  primary key (course_slug, level_id)
);

alter table public.course_level_slides enable row level security;

drop policy if exists "Admins manage module slides" on public.course_level_slides;
create policy "Admins manage module slides"
  on public.course_level_slides for all
  using (public.is_admin())
  with check (public.is_admin());
