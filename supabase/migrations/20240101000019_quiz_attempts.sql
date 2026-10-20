-- ============================================================================
-- Refa Learn — Timed quiz attempts (max 3, resumable)
--
-- Level quizzes (chapter pretests, posttests, Big Quizzes, module tryouts)
-- used to run entirely in the browser: leaving the page lost the answers,
-- and there was no limit or timer. Now every attempt is a row:
--
--   started_at / deadline_at  the server's clock, so the timer survives a
--                             reload or a different device
--   draft                     answers autosaved while the attempt is open
--   submitted_at              set on submit, or by the server when the
--                             deadline passed (auto_submitted = true)
--   attempt_no                1, 2, 3 … — picks the question set for
--                             tryouts with parallel versions
--   counted                   false once the student starts over: after
--                             three attempts they go back to the start of
--                             the material, study the lessons again, and
--                             get a new round (history is kept)
--
-- Course pretest / tryout attempts (course_attempts) get the same draft,
-- auto-submit and counted columns. Attempts made before this migration
-- don't count toward the new three-attempt limit.
--
-- course_progress still keeps the best result (it drives unlocking) and
-- course_submissions still logs every submitted attempt for the admin.
-- Writes go through server routes (service role) only.
-- ============================================================================

create table if not exists public.course_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_slug text not null,
  item_id text not null,
  attempt_no int not null check (attempt_no >= 1),
  started_at timestamptz not null default now(),
  deadline_at timestamptz not null,
  draft jsonb not null default '{}'::jsonb,
  draft_saved_at timestamptz,
  submitted_at timestamptz,
  auto_submitted boolean not null default false,
  answers jsonb,
  score int,
  max_score int,
  passed boolean,
  counted boolean not null default true,
  check (deadline_at > started_at)
);

create index if not exists course_quiz_attempts_student_idx
  on public.course_quiz_attempts (student_id, course_slug, item_id, started_at desc);

-- At most one unfinished attempt per student and quiz, so two tabs
-- pressing Start at once can't open two timers.
create unique index if not exists course_quiz_attempts_one_open_idx
  on public.course_quiz_attempts (student_id, course_slug, item_id)
  where submitted_at is null;

alter table public.course_quiz_attempts enable row level security;

drop policy if exists "Students can view own quiz attempts" on public.course_quiz_attempts;
create policy "Students can view own quiz attempts"
  on public.course_quiz_attempts for select
  using (auth.uid() = student_id);

drop policy if exists "Admins can manage quiz attempts" on public.course_quiz_attempts;
create policy "Admins can manage quiz attempts"
  on public.course_quiz_attempts for all
  using (public.is_admin())
  with check (public.is_admin());

-- Course pretest / tryout: autosave, auto-submit and the attempt limit.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'course_attempts' and column_name = 'counted'
  ) then
    alter table public.course_attempts
      add column draft jsonb,
      add column draft_saved_at timestamptz,
      add column auto_submitted boolean not null default false,
      add column counted boolean not null default true;
    -- Earlier attempts stay in the history but don't use up the new limit.
    update public.course_attempts set counted = false;
  end if;
end $$;
