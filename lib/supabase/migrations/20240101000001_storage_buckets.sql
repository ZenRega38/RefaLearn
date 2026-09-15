-- Storage buckets for payment proofs and material files.
-- Both are PRIVATE (public = false) per agent.md Section 7 — access is only
-- ever granted via short-lived signed URLs, generated server/client-side
-- through lib/storage.ts, never a public bucket link.

insert into storage.buckets (id, name, public)
values
  ('payment-proofs', 'payment-proofs', false),
  ('material-files', 'material-files', false)
on conflict (id) do nothing;

-- storage.objects already has RLS enabled by default on Supabase projects,
-- but this is safe/idempotent to include explicitly.
alter table storage.objects enable row level security;

-- ---------------------------------------------------------------------
-- payment-proofs
-- Path convention: {invoices|orders}/{student_id}/{record_id}-{ts}.{ext}
-- so (storage.foldername(name))[2] is always the owning student's id.
-- ---------------------------------------------------------------------

create policy "Students can upload their own payment proofs"
on storage.objects for insert
with check (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Students can update their own payment proofs"
on storage.objects for update
using (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Students can view their own payment proofs"
on storage.objects for select
using (
  bucket_id = 'payment-proofs'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Admins can manage all payment proofs"
on storage.objects for all
using (
  bucket_id = 'payment-proofs'
  and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ---------------------------------------------------------------------
-- material-files
-- Path convention: {material_id}/{ts}-{filename}
-- so (storage.foldername(name))[1] is the material's id. Only admins ever
-- write here; students can only read a file if they have a confirmed order
-- that includes that material id.
-- ---------------------------------------------------------------------

create policy "Admins can manage material files"
on storage.objects for all
using (
  bucket_id = 'material-files'
  and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Students can view purchased material files"
on storage.objects for select
using (
  bucket_id = 'material-files'
  and exists (
    select 1 from public.material_orders mo
    where mo.student_id = auth.uid()
      and mo.status = 'confirmed'
      and (storage.foldername(name))[1]::uuid = any(mo.material_ids)
  )
);