-- ============================================================================
-- Refa Learn — Supabase security advisor fixes
--
-- 1. Trigger functions that run as SECURITY DEFINER were also callable as
--    RPCs (/rest/v1/rpc/...) by anyone. Triggers don't need that: PostgreSQL
--    checks EXECUTE only when a trigger is created, not when it fires, so
--    revoking it changes nothing for the triggers themselves.
-- 2. Five trigger functions had no fixed search_path; pin it to public.
-- 3. btree_gist moves out of the public (API) schema into `extensions`.
--    Existing exclusion constraints keep working (they reference the
--    operator classes directly).
--
-- Left as they are, on purpose:
--  - is_admin(): every RLS policy that checks for an admin calls it as the
--    signed-in user, so anon/authenticated must keep EXECUTE. It only says
--    whether the caller is an admin.
--  - get_booked_slots(): /api/availability calls it anonymously so the
--    public schedule can hide taken slots. It returns dates and times only,
--    no students.
--  - Leaked password protection is a setting in the Supabase dashboard
--    (Authentication → Policies/Passwords), not SQL.
-- ============================================================================

-- 1. Trigger functions are not RPCs.
revoke execute on function public.guard_invoice_columns() from public, anon, authenticated;
revoke execute on function public.guard_material_order_columns() from public, anon, authenticated;
revoke execute on function public.guard_prepayment_columns() from public, anon, authenticated;
revoke execute on function public.guard_profile_columns() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.sync_recurring_series_status() from public, anon, authenticated;
revoke execute on function public.touch_conversation_on_message() from public, anon, authenticated;

-- 2. Fixed search_path.
alter function public.block_contract_acceptance_mutation() set search_path = public;
alter function public.block_signed_contract_mutation() set search_path = public;
alter function public.guard_chat_message_columns() set search_path = public;
alter function public.require_session_contract() set search_path = public;
alter function public.set_updated_at() set search_path = public;

-- 3. Extensions live outside the API schema.
create schema if not exists extensions;
alter extension btree_gist set schema extensions;
