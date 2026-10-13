-- XP and streaks.
--
-- xp_events: one row per XP award. (user, source, ref) is unique, so the
-- same action can never pay out twice (re-reading a lesson, re-passing a
-- quiz, checking in twice on one day).
--
-- daily_activity: one row per user per day (business timezone, WITA),
-- recording whether they signed in and whether they studied (opened or
-- finished a lesson, took a quiz or an exam). Login and study streaks are
-- computed from these rows.
--
-- Both tables are written only by the server (service role); students can
-- read their own rows, admins can read and manage everything.

create table if not exists public.xp_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (source in ('daily_login', 'lesson_read', 'lesson_done', 'pretest', 'quiz_done', 'quiz_passed', 'exam', 'streak_bonus')),
  ref text not null check (length(ref) between 1 and 200),
  xp integer not null check (xp > 0 and xp <= 1000),
  created_at timestamptz not null default now(),
  unique (user_id, source, ref)
);

create index if not exists xp_events_user_idx on public.xp_events (user_id, created_at desc);

create table if not exists public.daily_activity (
  user_id uuid not null references public.profiles(id) on delete cascade,
  day date not null,
  logged_in boolean not null default false,
  studied boolean not null default false,
  xp integer not null default 0 check (xp >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.xp_events enable row level security;
alter table public.daily_activity enable row level security;

drop policy if exists "Users can view own xp events" on public.xp_events;
create policy "Users can view own xp events"
  on public.xp_events for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage xp events" on public.xp_events;
create policy "Admins can manage xp events"
  on public.xp_events for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Users can view own daily activity" on public.daily_activity;
create policy "Users can view own daily activity"
  on public.daily_activity for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage daily activity" on public.daily_activity;
create policy "Admins can manage daily activity"
  on public.daily_activity for all
  using (public.is_admin())
  with check (public.is_admin());

-- Award XP and mark the day in one round trip. Returns the XP actually
-- awarded (0 when this action already paid out). Service role only.
create or replace function public.record_activity(
  p_user uuid,
  p_day date,
  p_login boolean,
  p_study boolean,
  p_source text default null,
  p_ref text default null,
  p_xp integer default 0
) returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  awarded integer := 0;
begin
  if p_source is not null and p_xp > 0 then
    insert into public.xp_events (user_id, source, ref, xp)
    values (p_user, p_source, p_ref, p_xp)
    on conflict (user_id, source, ref) do nothing;
    if found then
      awarded := p_xp;
    end if;
  end if;

  insert into public.daily_activity as d (user_id, day, logged_in, studied, xp)
  values (p_user, p_day, p_login, p_study, awarded)
  on conflict (user_id, day) do update
    set logged_in = d.logged_in or excluded.logged_in,
        studied = d.studied or excluded.studied,
        xp = d.xp + excluded.xp,
        updated_at = now();

  return awarded;
end;
$$;

revoke all on function public.record_activity(uuid, date, boolean, boolean, text, text, integer) from public;
revoke all on function public.record_activity(uuid, date, boolean, boolean, text, text, integer) from anon, authenticated;
grant execute on function public.record_activity(uuid, date, boolean, boolean, text, text, integer) to service_role;
