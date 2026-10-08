-- ============================================================================
-- Refa Learn — Security & data-integrity pass
--
--   1. Signup can no longer choose its own role; nobody but an admin can
--      change `profiles.role`.
--   2. Students lose every direct INSERT/UPDATE path that let them set
--      prices, statuses or amounts. Booking, cancelling, rescheduling and
--      ordering now go through server routes (app/api/*) that compute prices
--      with lib/pricing.ts and write with the service role — atomically, via
--      the functions defined below.
--   3. Overlapping bookings are refused by the database (exclusion
--      constraint), not just identical start times.
--   4. Invoicing is atomic and catches up late-completed sessions.
--   5. Chat: one conversation per student, server-maintained
--      last_message_at, read receipts, private attachment bucket.
--   6. Public image bucket for covers/photos/logos (admin-write only).
--
-- PRE-FLIGHT: step 3 fails if two active bookings already overlap in time:
--   select a.id, b.id from sessions a join sessions b
--     on a.date = b.date and a.id < b.id
--    and a.status in ('pending','accepted') and b.status in ('pending','accepted')
--    and a.start_time < b.end_time and b.start_time < a.end_time;
-- Decline one of each pair before applying.
-- ============================================================================

create extension if not exists btree_gist;


-- ----------------------------------------------------------------------------
-- 1. Roles
-- ----------------------------------------------------------------------------

-- The role used to come from raw_user_meta_data, which the client controls.
-- Every signup is a student; admins are promoted by an existing admin (or in
-- the SQL editor).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'), ''), 'Unknown User'),
    new.raw_user_meta_data->>'phone',
    'student'
  );
  return new;
end;
$$;

drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.guard_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if new.role is distinct from old.role or new.id is distinct from old.id then
    raise exception 'Only an admin can change a profile role';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_columns on public.profiles;
create trigger profiles_guard_columns
  before update on public.profiles
  for each row execute function public.guard_profile_columns();


-- ----------------------------------------------------------------------------
-- 2. Remove student write paths that are now server-side
-- ----------------------------------------------------------------------------

drop policy if exists "Students can insert own sessions" on public.sessions;
drop policy if exists "Students can cancel own sessions" on public.sessions;
drop policy if exists "Students can insert acceptances" on public.contract_acceptances;
drop policy if exists "Students can insert own material orders" on public.material_orders;
drop policy if exists "Students can record their own cancellation fee" on public.cancellation_fees;
drop policy if exists "Students can create own prepayments" on public.prepayments;
drop policy if exists "Students can create own reschedule requests" on public.reschedule_requests;

drop policy if exists "Admins can manage all series" on public.recurring_series;
create policy "Admins can manage all series"
  on public.recurring_series for all
  using (public.is_admin())
  with check (public.is_admin());


-- ----------------------------------------------------------------------------
-- 3. Scheduling integrity
-- ----------------------------------------------------------------------------

alter table public.sessions drop constraint if exists sessions_time_order;
alter table public.sessions
  add constraint sessions_time_order check (end_time > start_time) not valid;

alter table public.availability_rules drop constraint if exists availability_rules_time_order;
alter table public.availability_rules
  add constraint availability_rules_time_order check (end_time > start_time) not valid;

-- Every new session must carry a signed agreement (agent.md Do-Not-List #3).
-- A trigger on INSERT rather than a CHECK: a NOT VALID check would still
-- block status updates on any older row created without an acceptance.
create or replace function public.require_session_contract()
returns trigger
language plpgsql
as $$
begin
  if new.contract_acceptance_id is null then
    raise exception 'A session cannot be created without a contract acceptance';
  end if;
  return new;
end;
$$;

drop trigger if exists sessions_require_contract on public.sessions;
create trigger sessions_require_contract
  before insert on public.sessions
  for each row execute function public.require_session_contract();

-- Two active sessions may not overlap at all (16:00–17:30 vs 16:30–18:00
-- slipped past the old exact-start-time unique index).
alter table public.sessions drop constraint if exists sessions_no_overlap;
alter table public.sessions
  add constraint sessions_no_overlap
  exclude using gist (
    date with =,
    tsrange(date + start_time, date + end_time) with &&
  ) where (status in ('pending', 'accepted'));

-- Only one open reschedule request per session.
create unique index if not exists reschedule_requests_one_pending
  on public.reschedule_requests (session_id)
  where status = 'pending';

-- Public, read-only view of which times are taken — the booking page needs
-- this to hide other students' slots, but must not see who booked them.
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
    and s.date between p_from and p_to;
$$;

grant execute on function public.get_booked_slots(date, date) to anon, authenticated;


-- ----------------------------------------------------------------------------
-- 4. Contract evidence
--
-- UU ITE Pasal 11 + PP 71/2019 Pasal 60: an electronic signature is valid
-- when the signer can be identified and the moment of signing and the
-- signed content can be proven. We already keep contract_id + typed name +
-- timestamp; add the technical context and who actually signed (a parent /
-- guardian for a student who lacks legal capacity).
-- ----------------------------------------------------------------------------

alter table public.contract_acceptances add column if not exists user_agent text;
alter table public.contract_acceptances add column if not exists signer_role text not null default 'student';
alter table public.contract_acceptances add column if not exists guardian_name text;

alter table public.contract_acceptances drop constraint if exists contract_acceptances_signer_role_check;
alter table public.contract_acceptances
  add constraint contract_acceptances_signer_role_check check (signer_role in ('student', 'guardian'));

-- A contract version that someone has already agreed to must never change.
create or replace function public.block_signed_contract_mutation()
returns trigger
language plpgsql
as $$
begin
  if exists (select 1 from public.contract_acceptances where contract_id = old.id) then
    raise exception 'Contract version % has acceptances and cannot be modified or deleted — publish a new version instead', old.version;
  end if;
  return coalesce(new, old);
end;
$$;

drop trigger if exists contracts_immutable_once_signed on public.contracts;
create trigger contracts_immutable_once_signed
  before update or delete on public.contracts
  for each row execute function public.block_signed_contract_mutation();

create unique index if not exists contracts_version_unique on public.contracts (version);


-- ----------------------------------------------------------------------------
-- 5. Atomic booking
--
-- Called only by app/api/bookings with the service role. Prices arrive
-- already computed by lib/pricing.ts (the single place prices are defined);
-- this function only guarantees all-or-nothing writes, so a failed insert
-- can't leave an orphaned (and undeletable) contract acceptance behind.
--
-- p_sessions: [{ "date": "2026-10-12", "start_time": "16:00", "end_time":
--               "17:30", "day_type": "weekday", "price": 100000 }, ...]
-- ----------------------------------------------------------------------------

create or replace function public.create_booking(
  p_student uuid,
  p_contract uuid,
  p_typed_name text,
  p_signer_role text,
  p_guardian_name text,
  p_ip text,
  p_user_agent text,
  p_sessions jsonb,
  p_prepay boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_acceptance uuid;
  v_series uuid;
  v_count int := jsonb_array_length(p_sessions);
  v_first jsonb := p_sessions -> 0;
  v_last jsonb := p_sessions -> (jsonb_array_length(p_sessions) - 1);
  v_session_ids uuid[];
  v_fee_ids uuid[];
  v_total int;
  v_prepayment uuid;
begin
  if v_count = 0 then
    raise exception 'No sessions to book';
  end if;

  insert into public.contract_acceptances
    (student_id, contract_id, typed_full_name, signer_role, guardian_name, ip_address, user_agent)
  values
    (p_student, p_contract, p_typed_name, p_signer_role, p_guardian_name, p_ip, p_user_agent)
  returning id into v_acceptance;

  if v_count > 1 then
    insert into public.recurring_series (student_id, day_of_week, start_time, start_date, end_date, status)
    values (
      p_student,
      extract(dow from (v_first->>'date')::date)::int,
      (v_first->>'start_time')::time,
      (v_first->>'date')::date,
      (v_last->>'date')::date,
      'active'
    )
    returning id into v_series;
  end if;

  with inserted as (
    insert into public.sessions
      (student_id, series_id, date, start_time, end_time, day_type, price, status, contract_acceptance_id)
    select
      p_student,
      v_series,
      (s->>'date')::date,
      (s->>'start_time')::time,
      (s->>'end_time')::time,
      s->>'day_type',
      (s->>'price')::int,
      'pending',
      v_acceptance
    from jsonb_array_elements(p_sessions) as s
    returning id, price
  )
  select array_agg(id), sum(price) into v_session_ids, v_total from inserted;

  if p_prepay then
    select array_agg(id) into v_fee_ids
    from public.cancellation_fees
    where student_id = p_student and status = 'unpaid';

    if v_fee_ids is not null then
      insert into public.prepayments (student_id, series_id, session_ids, total_amount, waived_fee_ids, status)
      values (p_student, v_series, v_session_ids, v_total, v_fee_ids, 'pending')
      returning id into v_prepayment;
    end if;
  end if;

  return jsonb_build_object(
    'acceptance_id', v_acceptance,
    'series_id', v_series,
    'session_ids', to_jsonb(v_session_ids),
    'total', v_total,
    'prepayment_id', v_prepayment
  );
end;
$$;

revoke all on function public.create_booking(uuid, uuid, text, text, text, text, text, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.create_booking(uuid, uuid, text, text, text, text, text, jsonb, boolean) to service_role;


-- Admin approves a reschedule: move the session and close the request in
-- one transaction. Runs as the caller, so admin RLS still applies; the
-- exclusion constraint refuses a slot that has been taken meanwhile.
create or replace function public.approve_reschedule(
  p_request uuid,
  p_day_type text,
  p_price int,
  p_note text
)
returns void
language plpgsql
set search_path = public
as $$
declare
  v_req public.reschedule_requests;
begin
  if not public.is_admin() then
    raise exception 'Admin only';
  end if;

  select * into v_req from public.reschedule_requests where id = p_request and status = 'pending' for update;
  if not found then
    raise exception 'Reschedule request is no longer pending';
  end if;

  update public.sessions
  set date = v_req.requested_date,
      start_time = v_req.requested_start_time,
      end_time = v_req.requested_end_time,
      day_type = p_day_type,
      price = p_price
  where id = v_req.session_id
    and status in ('pending', 'accepted');

  if not found then
    raise exception 'Session can no longer be rescheduled';
  end if;

  update public.reschedule_requests
  set status = 'approved', admin_note = p_note, resolved_at = now()
  where id = p_request;
end;
$$;

grant execute on function public.approve_reschedule(uuid, text, int, text) to authenticated;


-- ----------------------------------------------------------------------------
-- 6. Invoicing
-- ----------------------------------------------------------------------------

alter table public.prepayments drop constraint if exists prepayments_status_check;
alter table public.prepayments
  add constraint prepayments_status_check
  check (status in ('pending', 'proof_uploaded', 'confirmed', 'rejected', 'cancelled'));

-- One student's invoice for everything billable up to the end of the given
-- period: completed sessions not yet on any invoice (so a session marked
-- complete late is picked up by the next run) plus unpaid cancellation
-- fees. Locked per student, so the cron and "Generate Now" racing each
-- other can't bill the same session twice. Returns null if nothing is due.
create or replace function public.create_invoice_for_student(
  p_student uuid,
  p_month int,
  p_year int
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_period_end date := (make_date(p_year, p_month, 1) + interval '1 month' - interval '1 day')::date;
  v_session_ids uuid[];
  v_session_total int;
  v_fee_ids uuid[];
  v_fee_total int;
  v_invoice uuid;
begin
  perform pg_advisory_xact_lock(hashtext('refalearn-invoice:' || p_student::text));

  select coalesce(array_agg(s.id order by s.date, s.start_time), '{}'), coalesce(sum(s.price), 0)
    into v_session_ids, v_session_total
  from public.sessions s
  where s.student_id = p_student
    and s.status = 'completed'
    and s.date <= v_period_end
    and not exists (select 1 from public.invoices i where s.id = any(i.session_ids))
    and not exists (
      select 1 from public.prepayments p
      where s.id = any(p.session_ids) and p.status in ('proof_uploaded', 'confirmed')
    );

  select coalesce(array_agg(f.id), '{}'), coalesce(sum(f.amount), 0)
    into v_fee_ids, v_fee_total
  from public.cancellation_fees f
  where f.student_id = p_student
    and f.status = 'unpaid'
    and f.created_at < ((v_period_end + 1)::timestamp at time zone 'Asia/Makassar');

  if v_session_total + v_fee_total <= 0 then
    return null;
  end if;

  insert into public.invoices
    (student_id, period_month, period_year, session_ids, total_amount, fee_amount, status)
  values
    (p_student, p_month, p_year, v_session_ids, v_session_total + v_fee_total, v_fee_total, 'sent')
  returning id into v_invoice;

  if array_length(v_fee_ids, 1) > 0 then
    update public.cancellation_fees
    set status = 'invoiced', invoice_id = v_invoice, resolved_at = now()
    where id = any(v_fee_ids);
  end if;

  -- A prepayment the student never paid for is void once those sessions
  -- are billed the normal way — otherwise paying it later would double-pay.
  if array_length(v_session_ids, 1) > 0 then
    update public.prepayments
    set status = 'cancelled'
    where status in ('pending', 'rejected')
      and session_ids && v_session_ids;
  end if;

  return v_invoice;
end;
$$;

revoke all on function public.create_invoice_for_student(uuid, int, int) from public, anon, authenticated;
grant execute on function public.create_invoice_for_student(uuid, int, int) to service_role;

-- Flags unpaid invoices past their due date. Called by the daily cron.
create or replace function public.mark_overdue_invoices(p_due_days int)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  update public.invoices
  set status = 'overdue'
  where status = 'sent'
    and generated_at < now() - make_interval(days => p_due_days);
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.mark_overdue_invoices(int) from public, anon, authenticated;
grant execute on function public.mark_overdue_invoices(int) to service_role;

-- Students may pay an overdue invoice too (the old policy already allowed
-- 'overdue' in USING; nothing to change there).


-- ----------------------------------------------------------------------------
-- 7. Column guards — proof paths must point at the student's own folder
-- ----------------------------------------------------------------------------

create or replace function public.guard_invoice_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if new.total_amount  is distinct from old.total_amount
  or new.fee_amount    is distinct from old.fee_amount
  or new.session_ids   is distinct from old.session_ids
  or new.period_month  is distinct from old.period_month
  or new.period_year   is distinct from old.period_year
  or new.student_id    is distinct from old.student_id
  or new.confirmed_at  is distinct from old.confirmed_at then
    raise exception 'Only an admin can change invoice amounts, period or confirmation';
  end if;

  if new.proof_url is distinct from old.proof_url
     and (new.proof_url is null or new.proof_url not like 'invoices/' || auth.uid()::text || '/%') then
    raise exception 'Invalid proof path';
  end if;

  return new;
end;
$$;

create or replace function public.guard_material_order_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if new.total_amount is distinct from old.total_amount
  or new.material_ids is distinct from old.material_ids
  or new.student_id   is distinct from old.student_id
  or new.confirmed_at is distinct from old.confirmed_at then
    raise exception 'Only an admin can change order contents or confirmation';
  end if;

  if new.proof_url is distinct from old.proof_url
     and (new.proof_url is null or new.proof_url not like 'orders/' || auth.uid()::text || '/%') then
    raise exception 'Invalid proof path';
  end if;

  return new;
end;
$$;

create or replace function public.guard_prepayment_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if new.total_amount   is distinct from old.total_amount
  or new.session_ids    is distinct from old.session_ids
  or new.waived_fee_ids is distinct from old.waived_fee_ids
  or new.series_id      is distinct from old.series_id
  or new.student_id     is distinct from old.student_id
  or new.confirmed_at   is distinct from old.confirmed_at then
    raise exception 'Only an admin can change prepayment amounts or contents';
  end if;

  if new.proof_url is distinct from old.proof_url
     and (new.proof_url is null or new.proof_url not like 'prepayments/' || auth.uid()::text || '/%') then
    raise exception 'Invalid proof path';
  end if;

  return new;
end;
$$;

drop trigger if exists prepayments_guard_columns on public.prepayments;
create trigger prepayments_guard_columns
  before update on public.prepayments
  for each row execute function public.guard_prepayment_columns();


-- ----------------------------------------------------------------------------
-- 8. Materials
-- ----------------------------------------------------------------------------

-- A purchase is permanent: the buyer keeps seeing the item even after the
-- admin hides it from the catalog.
drop policy if exists "Students can view purchased materials" on public.materials;
create policy "Students can view purchased materials"
  on public.materials for select
  using (
    exists (
      select 1 from public.material_orders mo
      where mo.student_id = auth.uid()
        and mo.status = 'confirmed'
        and materials.id = any(mo.material_ids)
    )
  );


-- ----------------------------------------------------------------------------
-- 9. Chat
-- ----------------------------------------------------------------------------

-- Merge duplicate conversations (created by the old widget on every mount)
-- into each student's oldest one, then forbid duplicates.
with ranked as (
  select id,
         row_number() over (partition by student_id order by created_at, id) as rn,
         first_value(id) over (partition by student_id order by created_at, id) as keep_id
  from public.chat_conversations
)
update public.chat_messages m
set conversation_id = r.keep_id
from ranked r
where m.conversation_id = r.id and r.rn > 1;

with ranked as (
  select id, row_number() over (partition by student_id order by created_at, id) as rn
  from public.chat_conversations
)
delete from public.chat_conversations c
using ranked r
where c.id = r.id and r.rn > 1;

create unique index if not exists chat_conversations_student_unique
  on public.chat_conversations (student_id);

alter table public.chat_messages alter column content set default '';

-- Students had no UPDATE policy on conversations, so their client-side
-- `last_message_at` bump silently did nothing and the admin inbox never
-- reordered. Maintain it from the database instead.
create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.chat_conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists chat_messages_touch_conversation on public.chat_messages;
create trigger chat_messages_touch_conversation
  after insert on public.chat_messages
  for each row execute function public.touch_conversation_on_message();

-- Read receipts: the recipient (never the sender) may flip is_read.
drop policy if exists "Recipients can mark messages read" on public.chat_messages;
create policy "Recipients can mark messages read"
  on public.chat_messages for update
  using (
    sender_id <> auth.uid()
    and exists (
      select 1 from public.chat_conversations c
      where c.id = chat_messages.conversation_id
        and (c.student_id = auth.uid() or public.is_admin())
    )
  )
  with check (sender_id <> auth.uid());

create or replace function public.guard_chat_message_columns()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  if new.content is distinct from old.content
  or new.sender_id is distinct from old.sender_id
  or new.conversation_id is distinct from old.conversation_id
  or new.attachment_url is distinct from old.attachment_url
  or new.created_at is distinct from old.created_at then
    raise exception 'Only the read flag of a message can be changed';
  end if;
  return new;
end;
$$;

drop trigger if exists chat_messages_guard_columns on public.chat_messages;
create trigger chat_messages_guard_columns
  before update on public.chat_messages
  for each row execute function public.guard_chat_message_columns();

-- Attachments: {conversation_id}/{timestamp}-{filename}
insert into storage.buckets (id, name, public)
values ('chat-attachments', 'chat-attachments', false)
on conflict (id) do nothing;

drop policy if exists "Conversation members can upload chat attachments" on storage.objects;
create policy "Conversation members can upload chat attachments"
on storage.objects for insert
with check (
  bucket_id = 'chat-attachments'
  and exists (
    select 1 from public.chat_conversations c
    where c.id::text = (storage.foldername(name))[1]
      and (c.student_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "Conversation members can view chat attachments" on storage.objects;
create policy "Conversation members can view chat attachments"
on storage.objects for select
using (
  bucket_id = 'chat-attachments'
  and exists (
    select 1 from public.chat_conversations c
    where c.id::text = (storage.foldername(name))[1]
      and (c.student_id = auth.uid() or public.is_admin())
  )
);


-- ----------------------------------------------------------------------------
-- 10. Public images (material covers, news covers, alumni photos, partner
-- logos). Readable by anyone through the public URL; only admins write.
-- ----------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do nothing;

drop policy if exists "Admins can manage public assets" on storage.objects;
create policy "Admins can manage public assets"
on storage.objects for all
using (bucket_id = 'public-assets' and public.is_admin())
with check (bucket_id = 'public-assets' and public.is_admin());
