-- ============================================================================
-- Refa Learn — Chapter pretests + admin-granted material access
--
-- 1. Courses can now have a pretest per chapter (Bab), recorded as
--    course_progress.kind = 'level_pretest'.
-- 2. An admin can give a student a material for free. A grant is simply a
--    confirmed material_orders row with source = 'grant' and a zero total,
--    so every existing access check (downloads, course access, purchased
--    materials staying visible) works unchanged. Revoking deletes the row.
-- ============================================================================

alter table public.course_progress drop constraint if exists course_progress_kind_check;
alter table public.course_progress
  add constraint course_progress_kind_check check (kind in ('lesson', 'level_quiz', 'level_pretest'));

alter table public.material_orders add column if not exists source text not null default 'purchase';
alter table public.material_orders drop constraint if exists material_orders_source_check;
alter table public.material_orders
  add constraint material_orders_source_check check (source in ('purchase', 'grant'));
alter table public.material_orders add column if not exists granted_by uuid references public.profiles(id);
alter table public.material_orders add column if not exists note text;

-- A grant is always free and already confirmed.
alter table public.material_orders drop constraint if exists material_orders_grant_shape;
alter table public.material_orders
  add constraint material_orders_grant_shape
  check (source <> 'grant' or (total_amount = 0 and status = 'confirmed'));

create index if not exists material_orders_source_idx on public.material_orders (source);

-- Students must not be able to turn their own order into a grant.
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
  or new.confirmed_at is distinct from old.confirmed_at
  or new.source       is distinct from old.source
  or new.granted_by   is distinct from old.granted_by then
    raise exception 'Only an admin can change order contents or confirmation';
  end if;

  if new.proof_url is distinct from old.proof_url
     and (new.proof_url is null or new.proof_url not like 'orders/' || auth.uid()::text || '/%') then
    raise exception 'Invalid proof path';
  end if;

  return new;
end;
$$;
