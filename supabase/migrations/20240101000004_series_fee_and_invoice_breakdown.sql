-- ============================================================================
-- Refa Learn — invoice fee breakdown + auto-close recurring_series
-- ============================================================================

-- 1. Invoice breakdown ---------------------------------------------------------
-- Supaya siswa & admin bisa lihat berapa dari total_amount itu murni harga
-- kelas, dan berapa yang denda pembatalan nyangkut dari bulan sebelumnya.
alter table public.invoices add column if not exists fee_amount integer not null default 0;


-- 2. Auto-tutup recurring_series ------------------------------------------------
-- Begitu SEMUA sesi dalam satu rangkaian sudah di status akhir (completed/
-- cancelled/no_show/declined), series-nya otomatis ditutup:
--   - 'cancelled' kalau semuanya cancelled
--   - 'completed' kalau ada minimal satu yang selesai
-- Selama masih ada sesi pending/accepted, series tetap 'active'.

create or replace function public.sync_recurring_series_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_series_id uuid;
  still_open int;
  any_completed int;
  any_cancelled int;
begin
  target_series_id := coalesce(new.series_id, old.series_id);
  if target_series_id is null then
    return new;
  end if;

  select count(*) filter (where status in ('pending', 'accepted')),
         count(*) filter (where status = 'completed'),
         count(*) filter (where status = 'cancelled')
    into still_open, any_completed, any_cancelled
    from public.sessions
    where series_id = target_series_id;

  if still_open = 0 then
    update public.recurring_series
    set status = case when any_completed > 0 then 'completed' else 'cancelled' end
    where id = target_series_id
      and status = 'active';
  end if;

  return new;
end;
$$;

drop trigger if exists sessions_sync_series_status on public.sessions;
create trigger sessions_sync_series_status
  after update of status on public.sessions
  for each row execute function public.sync_recurring_series_status();


-- 3. recurring_series.status perlu terima nilai baru ---------------------------
alter table public.recurring_series drop constraint if exists recurring_series_status_check;
alter table public.recurring_series add constraint recurring_series_status_check
  check (status in ('active', 'completed', 'cancelled'));