-- ============================================================================
-- Refa Learn — Hardening migration
-- Goes in: supabase/migrations/20240101000002_hardening.sql
--
-- Adds what the initial schema left out:
--   1. is_admin() helper            — avoids RLS recursion on `profiles`
--   2. updated_at triggers          — the columns existed but never updated
--   3. Indexes                      — none existed at all
--   4. Double-booking unique index  — agent.md Do-Not-List #4, was JS-only
--   5. Realtime publication         — chat subscribes but DB never published
--   6. Tightened RLS                — students could self-confirm invoices
--   7. Append-only contract audit   — enforced by trigger, not just policy gaps
--
-- !! RUN THE PRE-FLIGHT CHECK IN THE GUIDE BEFORE APPLYING (step 4 will fail
--    if your DB already has duplicate bookings from testing).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. is_admin()
--
-- A policy ON `profiles` that checks `role = 'admin'` by selecting FROM
-- `profiles` causes infinite recursion. SECURITY DEFINER bypasses RLS inside
-- the function body, which breaks the cycle. The existing policies on other
-- tables don't recurse, but they re-run a subquery per row — you can switch
-- them to is_admin() later for a free performance win.
-- ----------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;


-- ----------------------------------------------------------------------------
-- 2. updated_at auto-touch
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists sessions_set_updated_at on public.sessions;
create trigger sessions_set_updated_at
  before update on public.sessions
  for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

drop trigger if exists materials_set_updated_at on public.materials;
create trigger materials_set_updated_at
  before update on public.materials
  for each row execute function public.set_updated_at();

drop trigger if exists news_posts_set_updated_at on public.news_posts;
create trigger news_posts_set_updated_at
  before update on public.news_posts
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- 3. Indexes
--
-- Every one of these backs a query that already exists in the app — the
-- dashboard session list, the invoice period lookup, the slot-clash check,
-- the chat message fetch, the public slug lookups.
-- ----------------------------------------------------------------------------

create index if not exists sessions_student_id_idx        on public.sessions (student_id);
create index if not exists sessions_date_idx              on public.sessions (date);
create index if not exists sessions_status_idx            on public.sessions (status);
create index if not exists sessions_status_date_idx       on public.sessions (status, date);
create index if not exists sessions_series_id_idx         on public.sessions (series_id);

create index if not exists invoices_student_id_idx        on public.invoices (student_id);
create index if not exists invoices_period_idx            on public.invoices (period_year, period_month);
create index if not exists invoices_status_idx            on public.invoices (status);

create index if not exists material_orders_student_id_idx on public.material_orders (student_id);
create index if not exists material_orders_status_idx     on public.material_orders (status);

create index if not exists chat_messages_conversation_idx on public.chat_messages (conversation_id, created_at);
create index if not exists chat_messages_unread_idx       on public.chat_messages (conversation_id) where is_read = false;
create index if not exists chat_conversations_last_msg_idx on public.chat_conversations (last_message_at desc);
create index if not exists chat_conversations_student_idx on public.chat_conversations (student_id);

create index if not exists news_posts_status_published_idx on public.news_posts (status, published_at desc);

create index if not exists materials_category_idx         on public.materials (category);
create index if not exists materials_active_idx           on public.materials (is_active);

create index if not exists availability_rules_active_idx  on public.availability_rules (is_active, day_of_week);
create index if not exists blackout_dates_date_idx        on public.blackout_dates (date);

create index if not exists contract_acceptances_student_idx on public.contract_acceptances (student_id);

create index if not exists alumni_order_idx               on public.alumni (order_index);
create index if not exists partners_order_idx             on public.partners (order_index);


-- ----------------------------------------------------------------------------
-- 4. Double-booking guard
--
-- agent.md: "Do not allow two pending/accepted sessions to occupy the same
-- date+time slot." The app checks this in JS immediately before inserting,
-- but two concurrent requests can both pass that check. This makes the
-- database itself refuse the second write.
--
-- `declined`, `cancelled`, `no_show` and `completed` are deliberately outside
-- the predicate — a slot that was declined must become bookable again.
-- ----------------------------------------------------------------------------

create unique index if not exists sessions_unique_active_slot
  on public.sessions (date, start_time)
  where status in ('pending', 'accepted');


-- ----------------------------------------------------------------------------
-- 5. Realtime
--
-- ChatWidget and /admin/chat both call .on('postgres_changes', ...). Without
-- these two statements the subscription connects, reports SUBSCRIBED, and
-- then silently never fires — messages only appear on a manual refresh.
--
-- REPLICA IDENTITY FULL is needed so UPDATE/DELETE events carry the old row,
-- which the admin conversation list relies on.
-- ----------------------------------------------------------------------------

alter table public.chat_messages replica identity full;
alter table public.chat_conversations replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.chat_messages;
exception
  when duplicate_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.chat_conversations;
exception
  when duplicate_object then null;
end;
$$;


-- ----------------------------------------------------------------------------
-- 6a. profiles — was readable by literally anyone
--
-- The original policy was `for select using (true)`, which exposed every
-- student's full name and phone number to anonymous visitors. agent.md
-- Section 7: "users can read/update their own row; admins can read all."
-- ----------------------------------------------------------------------------

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin());


-- ----------------------------------------------------------------------------
-- 6b. sessions — students could set their own status
--
-- The old policy was `for update using (auth.uid() = student_id)` with no
-- WITH CHECK, so a student could mark their own session `completed` (forcing
-- it into an invoice) or rewrite `price` to 0. Now they may only cancel.
-- ----------------------------------------------------------------------------

drop policy if exists "Students can update own sessions (limited)" on public.sessions;

create policy "Students can cancel own sessions"
  on public.sessions for update
  using (auth.uid() = student_id and status in ('pending', 'accepted'))
  with check (auth.uid() = student_id and status = 'cancelled');


-- ----------------------------------------------------------------------------
-- 6c. invoices — students could confirm their own payment
--
-- Same shape of hole: `using (auth.uid() = student_id)` with no WITH CHECK
-- let a student PATCH status straight to 'confirmed'. The policy below caps
-- the only reachable state at 'proof_uploaded'; the trigger stops them
-- rewriting the amount on the way through.
-- ----------------------------------------------------------------------------

drop policy if exists "Students can update own invoices (proof upload)" on public.invoices;

create policy "Students can upload own invoice proof"
  on public.invoices for update
  using (
    auth.uid() = student_id
    and status in ('sent', 'overdue', 'rejected', 'proof_uploaded')
  )
  with check (
    auth.uid() = student_id
    and status = 'proof_uploaded'
  );

create or replace function public.guard_invoice_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Service role / cron has no auth.uid(); it is trusted server-side code.
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if new.total_amount  is distinct from old.total_amount
  or new.session_ids   is distinct from old.session_ids
  or new.period_month  is distinct from old.period_month
  or new.period_year   is distinct from old.period_year
  or new.student_id    is distinct from old.student_id
  or new.confirmed_at  is distinct from old.confirmed_at then
    raise exception 'Only an admin can change invoice amounts, period or confirmation';
  end if;

  return new;
end;
$$;

drop trigger if exists invoices_guard_columns on public.invoices;
create trigger invoices_guard_columns
  before update on public.invoices
  for each row execute function public.guard_invoice_columns();


-- ----------------------------------------------------------------------------
-- 6d. material_orders — same treatment
-- ----------------------------------------------------------------------------

drop policy if exists "Students can update own material orders (proof upload)" on public.material_orders;

create policy "Students can upload own order proof"
  on public.material_orders for update
  using (
    auth.uid() = student_id
    and status in ('pending', 'rejected', 'proof_uploaded')
  )
  with check (
    auth.uid() = student_id
    and status = 'proof_uploaded'
  );

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

  return new;
end;
$$;

drop trigger if exists material_orders_guard_columns on public.material_orders;
create trigger material_orders_guard_columns
  before update on public.material_orders
  for each row execute function public.guard_material_order_columns();


-- ----------------------------------------------------------------------------
-- 7. contract_acceptances is append-only
--
-- No UPDATE or DELETE policy exists, so RLS already denies both for normal
-- users. This trigger extends that to the service-role key too — an audit
-- record backing a signed agreement shouldn't be rewritable by anything.
-- ----------------------------------------------------------------------------

create or replace function public.block_contract_acceptance_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'contract_acceptances is append-only and cannot be modified or deleted';
end;
$$;

drop trigger if exists contract_acceptances_append_only on public.contract_acceptances;
create trigger contract_acceptances_append_only
  before update or delete on public.contract_acceptances
  for each row execute function public.block_contract_acceptance_mutation();
