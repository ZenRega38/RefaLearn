-- ============================================================================
-- Live payment status for material orders
--
-- The payment page and "Materi Saya" listen to their own order rows, so the
-- moment an admin confirms (or rejects) a proof the student's screen flips
-- to "verified" without a refresh; the admin's order list refreshes when a
-- new proof arrives. Realtime respects RLS: students only receive their own
-- rows (policy "Students can view own material orders"), admins all rows.
-- ============================================================================

alter table public.material_orders replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.material_orders;
exception
  when duplicate_object then null;
end;
$$;
