-- ============================================================================
-- Schedules assigned by the admin ("jadwal dari admin")
--
-- The admin builds a schedule for a student (one-off, daily, weekly or
-- monthly, a start time per day, sessions always SESSION_MINUTES long, end
-- date optional). It is saved as a schedule_offer. The student accepts it by
-- signing the current contract — exactly like a booking, so every session
-- still carries a contract acceptance (agent.md Do-Not-List) — and only then
-- are the sessions created, already accepted. Declining or an admin cancel
-- just closes the offer.
--
-- While an offer waits, its times count as taken for everyone else
-- (get_booked_slots), so nobody books them in between.
--
-- Ongoing schedules (no end date, or an end date beyond the first batch)
-- become recurring_series with auto_extend; the daily cron adds sessions so
-- there are always ~60 days ahead, until the admin stops the schedule or
-- its end date is reached.
-- ============================================================================

create table if not exists public.schedule_offers (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  -- lib/schedule-plan.ts SchedulePlan and its Pattern[] (one per repeating rule)
  plan jsonb not null,
  patterns jsonb not null,
  -- The first batch: [{date, start_time, end_time, day_type, price, pattern_key}]
  sessions jsonb not null check (jsonb_typeof(sessions) = 'array' and jsonb_array_length(sessions) between 1 and 120),
  batch_until date not null,
  note text check (note is null or length(note) <= 1000),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled')),
  decline_reason text check (decline_reason is null or length(decline_reason) <= 500),
  acceptance_id uuid references public.contract_acceptances(id),
  created_at timestamptz not null default now(),
  responded_at timestamptz
);

create index if not exists schedule_offers_student_idx on public.schedule_offers (student_id, created_at desc);
create index if not exists schedule_offers_pending_idx on public.schedule_offers (status) where status = 'pending';

alter table public.schedule_offers enable row level security;

drop policy if exists "Students can view own schedule offers" on public.schedule_offers;
create policy "Students can view own schedule offers"
  on public.schedule_offers for select
  using (auth.uid() = student_id);

drop policy if exists "Admins can manage schedule offers" on public.schedule_offers;
create policy "Admins can manage schedule offers"
  on public.schedule_offers for all
  using (public.is_admin())
  with check (public.is_admin());

-- Repeating rules of an accepted offer -------------------------------------------

alter table public.recurring_series
  add column if not exists frequency text not null default 'weekly',
  add column if not exists day_of_month int,
  add column if not exists auto_extend boolean not null default false,
  add column if not exists generated_until date,
  add column if not exists contract_acceptance_id uuid references public.contract_acceptances(id),
  add column if not exists offer_id uuid references public.schedule_offers(id) on delete set null;

alter table public.recurring_series drop constraint if exists recurring_series_frequency_check;
alter table public.recurring_series add constraint recurring_series_frequency_check
  check (frequency in ('weekly', 'monthly'));

alter table public.recurring_series drop constraint if exists recurring_series_day_of_month_check;
alter table public.recurring_series add constraint recurring_series_day_of_month_check
  check (day_of_month is null or day_of_month between 1 and 31);

-- Pending offers hold their times -----------------------------------------------

create or replace function public.get_booked_slots(p_from date, p_to date)
returns table (date date, start_time time, end_time time)
language sql
stable
security definer
set search_path = public
as $$
  select s.date, s.start_time, s.end_time
  from public.sessions s
  where s.status in ('pending', 'accepted')
    and s.date between p_from and p_to
  union all
  select (x->>'date')::date, (x->>'start_time')::time, (x->>'end_time')::time
  from public.schedule_offers o
  cross join lateral jsonb_array_elements(o.sessions) as x
  where o.status = 'pending'
    and (x->>'date')::date between p_from and p_to;
$$;

grant execute on function public.get_booked_slots(date, date) to anon, authenticated;

-- Accepting an offer: signature + series + sessions in one transaction ---------

create or replace function public.accept_schedule_offer(
  p_offer uuid,
  p_contract uuid,
  p_typed_name text,
  p_signer_role text,
  p_guardian_name text,
  p_ip text,
  p_user_agent text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_offer public.schedule_offers;
  v_acceptance uuid;
  v_pattern jsonb;
  v_series uuid;
  v_series_map jsonb := '{}'::jsonb;
  v_end date;
  v_session_ids uuid[];
begin
  select * into v_offer from public.schedule_offers where id = p_offer for update;
  if not found or v_offer.status <> 'pending' then
    raise exception 'This schedule is no longer waiting for approval';
  end if;

  insert into public.contract_acceptances
    (student_id, contract_id, typed_full_name, signer_role, guardian_name, ip_address, user_agent)
  values
    (v_offer.student_id, p_contract, p_typed_name, p_signer_role, p_guardian_name, p_ip, p_user_agent)
  returning id into v_acceptance;

  v_end := nullif(v_offer.plan->>'endDate', '')::date;

  for v_pattern in select * from jsonb_array_elements(v_offer.patterns) loop
    if v_pattern->>'frequency' in ('weekly', 'monthly') then
      insert into public.recurring_series
        (student_id, day_of_week, start_time, start_date, end_date, status, frequency, day_of_month,
         auto_extend, generated_until, contract_acceptance_id, offer_id)
      values (
        v_offer.student_id,
        coalesce((v_pattern->>'dayOfWeek')::int, extract(dow from (v_offer.plan->>'startDate')::date)::int),
        (v_pattern->>'startTime')::time,
        (v_offer.plan->>'startDate')::date,
        v_end,
        'active',
        v_pattern->>'frequency',
        (v_pattern->>'dayOfMonth')::int,
        v_end is null or v_end > v_offer.batch_until,
        v_offer.batch_until,
        v_acceptance,
        v_offer.id
      )
      returning id into v_series;
      v_series_map := v_series_map || jsonb_build_object(v_pattern->>'key', v_series);
    end if;
  end loop;

  with inserted as (
    insert into public.sessions
      (student_id, series_id, date, start_time, end_time, day_type, price, status, contract_acceptance_id, notes)
    select
      v_offer.student_id,
      (v_series_map->>(s->>'pattern_key'))::uuid,
      (s->>'date')::date,
      (s->>'start_time')::time,
      (s->>'end_time')::time,
      s->>'day_type',
      (s->>'price')::int,
      'accepted',
      v_acceptance,
      'Dijadwalkan oleh admin'
    from jsonb_array_elements(v_offer.sessions) as s
    returning id
  )
  select array_agg(id) into v_session_ids from inserted;

  update public.schedule_offers
  set status = 'accepted', acceptance_id = v_acceptance, responded_at = now()
  where id = p_offer;

  return jsonb_build_object('acceptance_id', v_acceptance, 'session_ids', to_jsonb(v_session_ids));
end;
$$;

revoke all on function public.accept_schedule_offer(uuid, uuid, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.accept_schedule_offer(uuid, uuid, text, text, text, text, text) to service_role;
