-- ============================================================================
-- Refa Learn — Admin-opened course modules + live (Kahoot-style) quizzes
--
-- 1. course_level_access: for courses whose modules open week by week, the
--    admin opens each module (level). Anyone may read which modules are
--    open; only an admin can change it. English Day starts with modules 1–2.
-- 2. live_sessions / live_players / live_answers: a live quiz hosted by the
--    admin. Players join without an account (nickname + PIN), so every read
--    and write goes through server routes with the service role. RLS is on
--    with no policies for the API roles, except admins may read.
-- ============================================================================

create table if not exists public.course_level_access (
  course_slug text not null,
  level_id text not null,
  is_open boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null,
  primary key (course_slug, level_id)
);

alter table public.course_level_access enable row level security;

drop policy if exists "Anyone can see which modules are open" on public.course_level_access;
create policy "Anyone can see which modules are open"
  on public.course_level_access for select
  using (true);

drop policy if exists "Admins manage module access" on public.course_level_access;
create policy "Admins manage module access"
  on public.course_level_access for all
  using (public.is_admin())
  with check (public.is_admin());

insert into public.course_level_access (course_slug, level_id, is_open)
values ('english-day', 'ed-m1', true), ('english-day', 'ed-m2', true)
on conflict (course_slug, level_id) do nothing;

-- ---------------------------------------------------------------------------
-- Live quiz
-- ---------------------------------------------------------------------------

create table if not exists public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  pin text not null check (pin ~ '^[0-9]{6}$'),
  course_slug text not null,
  level_id text not null,
  title text not null,
  status text not null default 'lobby'
    check (status in ('lobby', 'question', 'reveal', 'scoreboard', 'podium', 'ended')),
  current_index int not null default -1,
  question_count int not null check (question_count > 0),
  seconds int not null default 20 check (seconds between 5 and 120),
  question_started_at timestamptz,
  question_ends_at timestamptz,
  host_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);

-- A PIN is unique among sessions that are still running.
create unique index if not exists live_sessions_active_pin
  on public.live_sessions (pin) where status <> 'ended';
create index if not exists live_sessions_module_idx
  on public.live_sessions (course_slug, level_id, created_at desc);

create table if not exists public.live_players (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 20),
  avatar text not null default 'owl',
  token_hash text not null,
  score int not null default 0,
  streak int not null default 0,
  prev_rank int,
  joined_at timestamptz not null default now()
);

create unique index if not exists live_players_unique_name
  on public.live_players (session_id, lower(nickname));

create table if not exists public.live_answers (
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  player_id uuid not null references public.live_players(id) on delete cascade,
  q_index int not null,
  choice int not null,
  correct boolean not null,
  points int not null default 0,
  elapsed_ms int not null,
  answered_at timestamptz not null default now(),
  primary key (player_id, q_index)
);

create index if not exists live_answers_question_idx on public.live_answers (session_id, q_index);

alter table public.live_sessions enable row level security;
alter table public.live_players enable row level security;
alter table public.live_answers enable row level security;

drop policy if exists "Admins read live sessions" on public.live_sessions;
create policy "Admins read live sessions" on public.live_sessions for select using (public.is_admin());
drop policy if exists "Admins read live players" on public.live_players;
create policy "Admins read live players" on public.live_players for select using (public.is_admin());
drop policy if exists "Admins read live answers" on public.live_answers;
create policy "Admins read live answers" on public.live_answers for select using (public.is_admin());
