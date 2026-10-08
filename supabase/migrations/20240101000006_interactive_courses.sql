-- ============================================================================
-- Refa Learn — Interactive courses (TOEFL ITP Mastery)
--
-- Course content lives in the repo (content/), not the database. The
-- database only records:
--   - which store item unlocks which course (materials.course_slug)
--   - each student's completed lessons / passed level quizzes
--   - pretest and tryout attempts with their scores
--
-- All writes go through server routes (service role), so a student can't
-- mark lessons done or record a tryout score they didn't earn. Students can
-- read their own rows.
-- ============================================================================

alter table public.materials add column if not exists course_slug text;

create table if not exists public.course_progress (
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_slug text not null,
  item_id text not null,
  kind text not null check (kind in ('lesson', 'level_quiz')),
  score int,
  max_score int,
  passed boolean not null default false,
  completed_at timestamptz not null default now(),
  primary key (student_id, course_slug, item_id)
);

create table if not exists public.course_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_slug text not null,
  kind text not null check (kind in ('pretest', 'tryout')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  answers jsonb,
  result jsonb,
  total_score int
);

create index if not exists course_attempts_student_idx
  on public.course_attempts (student_id, course_slug, kind, started_at desc);

alter table public.course_progress enable row level security;
alter table public.course_attempts enable row level security;

drop policy if exists "Students can view own course progress" on public.course_progress;
create policy "Students can view own course progress"
  on public.course_progress for select
  using (auth.uid() = student_id);

drop policy if exists "Admins can manage course progress" on public.course_progress;
create policy "Admins can manage course progress"
  on public.course_progress for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Students can view own course attempts" on public.course_attempts;
create policy "Students can view own course attempts"
  on public.course_attempts for select
  using (auth.uid() = student_id);

drop policy if exists "Admins can manage course attempts" on public.course_attempts;
create policy "Admins can manage course attempts"
  on public.course_attempts for all
  using (public.is_admin())
  with check (public.is_admin());
