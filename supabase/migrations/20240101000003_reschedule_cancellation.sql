-- ============================================================================
-- Refa Learn — Reschedule requests, cancellation fee, prepaid bookings
-- ============================================================================

-- 1. Reschedule requests -----------------------------------------------------
create table public.reschedule_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.sessions(id) not null,
  student_id uuid references public.profiles(id) not null,
  original_date date not null,
  original_start_time time not null,
  requested_date date not null,
  requested_start_time time not null,
  requested_end_time time not null,
  reason text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  created_at timestamptz default now() not null,
  resolved_at timestamptz
);

alter table public.reschedule_requests enable row level security;

create policy "Students can view own reschedule requests"
  on public.reschedule_requests for select
  using (auth.uid() = student_id);

-- Student hanya boleh minta reschedule untuk sesi miliknya sendiri yang
-- masih pending/accepted (belum lewat / belum selesai).
create policy "Students can create own reschedule requests"
  on public.reschedule_requests for insert
  with check (
    auth.uid() = student_id
    and status = 'pending'
    and exists (
      select 1 from public.sessions
      where id = session_id
        and student_id = auth.uid()
        and status in ('pending', 'accepted')
    )
  );

create policy "Admins can manage all reschedule requests"
  on public.reschedule_requests for all
  using (public.is_admin());

create index reschedule_requests_session_idx on public.reschedule_requests (session_id);
create index reschedule_requests_status_idx on public.reschedule_requests (status);


-- 2. Cancellation fees --------------------------------------------------------
-- Satu baris = satu AKSI cancel (bisa mencakup banyak session_ids sekaligus),
-- bukan satu baris per sesi. Itu yang bikin dendanya flat 50rb per aksi.
create table public.cancellation_fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  session_ids uuid[] not null,
  amount int not null default 50000,
  status text not null default 'unpaid' check (status in ('unpaid', 'waived', 'invoiced')),
  invoice_id uuid references public.invoices(id),
  created_at timestamptz default now() not null,
  resolved_at timestamptz
);

alter table public.cancellation_fees enable row level security;

create policy "Students can view own cancellation fees"
  on public.cancellation_fees for select
  using (auth.uid() = student_id);

-- Jumlah dan status dikunci di level policy — student bisa mencatat bahwa
-- pembatalan terjadi, tapi tidak bisa nulis nominal sendiri atau langsung
-- menandai lunas/gratis buat dirinya sendiri.
create policy "Students can record their own cancellation fee"
  on public.cancellation_fees for insert
  with check (
    auth.uid() = student_id
    and amount = 50000
    and status = 'unpaid'
    and invoice_id is null
  );

create policy "Admins can manage all cancellation fees"
  on public.cancellation_fees for all
  using (public.is_admin());

create index cancellation_fees_student_idx on public.cancellation_fees (student_id);
create index cancellation_fees_status_idx on public.cancellation_fees (status);


-- 3. Prepaid bookings ----------------------------------------------------------
-- Jalur pembayaran di muka (bukan bayar-setelah-kelas seperti biasa), dipakai
-- khusus supaya student dengan denda nyangkut bisa milih ini buat menghapus
-- dendanya. Mirip pola material_orders: upload bukti transfer, admin konfirmasi.
create table public.prepayments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  series_id uuid references public.recurring_series(id),
  session_ids uuid[] not null,
  total_amount int not null,
  status text not null default 'pending' check (status in ('pending','proof_uploaded','confirmed','rejected')),
  proof_url text,
  waived_fee_ids uuid[],
  created_at timestamptz default now() not null,
  confirmed_at timestamptz
);

alter table public.prepayments enable row level security;

create policy "Students can view own prepayments"
  on public.prepayments for select
  using (auth.uid() = student_id);

create policy "Students can create own prepayments"
  on public.prepayments for insert
  with check (auth.uid() = student_id and status = 'pending');

create policy "Students can upload own prepayment proof"
  on public.prepayments for update
  using (auth.uid() = student_id and status in ('pending', 'rejected'))
  with check (auth.uid() = student_id and status = 'proof_uploaded');

create policy "Admins can manage all prepayments"
  on public.prepayments for all
  using (public.is_admin());

create index prepayments_student_idx on public.prepayments (student_id);
create index prepayments_status_idx on public.prepayments (status);