-- ============================================================================
-- Seed Data for Refa Learn (local/dev only — do not run against production)
--
-- Auth users are NOT created here. `insert into auth.users` with a hand-built
-- crypt() password works against Supabase's local/Docker stack, but is not
-- reliable against a hosted Cloud project — GoTrue there does not always
-- accept a hand-crafted password hash, so logins fail with "Invalid login
-- credentials" even though the row looks correct.
--
-- Run scripts/seed-users.mjs first (node scripts/seed-users.mjs). It creates
-- the same 3 accounts — same fixed UUIDs, same password (Password123!) —
-- through Supabase's Admin API, which lets GoTrue hash the password itself.
-- The on_auth_user_created trigger still fires and still creates the
-- matching public.profiles row exactly as before.
--
-- THEN run this file.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 2. Site settings
-- Existing hero/contact/social keys, plus the keys the expanded Admin
-- Settings page (Step 4) will manage. Text here mirrors what's currently
-- hardcoded on /about so switching that page to read from settings (Step 5)
-- changes nothing visually.
-- ----------------------------------------------------------------------------

insert into public.site_settings (key, value)
values
  ('hero_title', '{"text": "Bridging Borders, Embracing The World!"}'),
  ('hero_subtitle', '{"text": "Refa Learn adalah platform les privat Bahasa Inggris interaktif dengan sistem bayar setelah kelas. Tingkatkan kemampuan bahasa Inggris-mu untuk TOEFL, IELTS, atau komunikasi sehari-hari bersama tutor profesional."}'),
  ('contact_email', '{"text": "hello@refalearn.com"}'),
  ('contact_phone', '{"text": "6281234567890"}'),
  ('contact_address', '{"text": "Jl. Pendidikan No. 123, Jakarta Selatan, 12345"}'),
  ('social_instagram', '{"text": "https://instagram.com/refalearn"}'),
  ('social_tiktok', '{"text": "https://tiktok.com/@refalearn"}'),
  ('bank_details', '{"bank_name": "Bank Central Asia (BCA)", "account_number": "1234567890", "account_name": "Refa Learn"}'),
  ('ewallet_details', '{"provider": "GoPay", "number": "081234567890", "account_name": "Refa Learn"}'),
  ('about_content', '{"text": "Berawal dari passion untuk menjembatani pelajar Indonesia dengan dunia melalui penguasaan Bahasa Inggris yang percaya diri."}'),
  ('founder_bio', '{"name": "Refa", "title": "Founder & Lead Tutor", "text": "Sebagai tutor berpengalaman yang juga aktif mengajar di platform EduTech ternama seperti Ruangguru, saya menyadari satu kendala besar yang sering dihadapi pelajar: kurangnya personalisasi dan kepercayaan. Banyak kursus yang mengharuskan komitmen biaya besar di depan tanpa menjamin kecocokan metode belajar. Itulah sebabnya Refa Learn lahir dengan konsep Bayar Setelah Kelas. Kami percaya bahwa kepercayaan harus dibangun dari dua arah."}'),
  ('cofounder_bio', '{"name": "", "title": "", "text": ""}'),
  ('mission', '{"text": "Menyediakan sesi privat yang 100% dipersonalisasi berdasarkan tingkat kemampuan dan target siswa.|Membangun sistem pembayaran yang adil, transparan, dan berbasis kepercayaan penuh.|Menyediakan materi pembelajaran mandiri berkualitas (modul & latihan soal) yang mudah diakses."}'),
  ('vision', '{"text": "Menjadi katalis pembelajaran Bahasa Inggris yang adaptif dan terpercaya bagi generasi muda Indonesia, mempersiapkan mereka untuk kompetisi akademik global tanpa batas."}'),
  ('cancellation_policy', '{"text": "Pembatalan sesi dapat dilakukan maksimal 12 jam sebelum jadwal dimulai tanpa dikenakan biaya. Pembatalan mendadak dapat memengaruhi ketersediaan jadwal berikutnya."}'),
  ('late_payment_policy', '{"text": "Invoice bulanan jatuh tempo 7 hari setelah diterbitkan. Keterlambatan pembayaran dapat menunda penjadwalan sesi baru hingga pembayaran dikonfirmasi."}')
on conflict (key) do update set value = excluded.value;

-- ----------------------------------------------------------------------------
-- 3. Availability rules + blackout date
-- ----------------------------------------------------------------------------

insert into public.availability_rules (day_of_week, start_time, end_time, is_recurring)
values
  (1, '09:00:00', '11:00:00', true), -- Monday
  (1, '13:00:00', '15:00:00', true),
  (2, '10:00:00', '12:00:00', true), -- Tuesday
  (3, '09:00:00', '11:00:00', true), -- Wednesday
  (4, '13:00:00', '15:00:00', true), -- Thursday
  (5, '10:00:00', '12:00:00', true)  -- Friday
;

insert into public.blackout_dates (date, reason)
values
  ((current_date + interval '14 days')::date, 'Libur Nasional')
;

-- ----------------------------------------------------------------------------
-- 4. Contract (booking is disabled site-wide until a contracts row exists)
-- ----------------------------------------------------------------------------

insert into public.contracts (id, version, content, effective_date)
values (
  'aaaaaaaa-0000-0000-0000-000000000001',
  1,
  '<h3>Ketentuan Sesi Les Privat Refa Learn</h3><p>Dengan mengajukan permintaan sesi ini, saya menyetujui hal-hal berikut:</p><ol><li>Sesi berdurasi sesuai slot yang dipilih dan dimulai tepat waktu.</li><li>Pembatalan dilakukan maksimal 12 jam sebelum jadwal, atau sesi tetap dapat ditagihkan.</li><li>Pembayaran dilakukan setelah sesi selesai (Bayar Setelah Kelas), melalui invoice bulanan.</li><li>Materi dan rekaman sesi (jika ada) hanya untuk penggunaan pribadi siswa.</li><li>Refa Learn berhak menolak atau menjadwalkan ulang permintaan sesi sesuai ketersediaan.</li></ol><p><em>Placeholder — ganti dengan teks kontrak final sebelum go-live.</em></p>',
  current_date
)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 5. News posts (2 published, 1 draft)
-- ----------------------------------------------------------------------------

insert into public.news_posts (title, slug, category, content, status, published_at, cover_image_url)
values
  (
    'Tips Meraih Skor TOEFL 600 dalam 3 Bulan',
    'tips-meraih-skor-toefl-600',
    'Tips Belajar',
    '<p>Meraih skor TOEFL 600 bukanlah hal yang mustahil jika kamu memiliki strategi yang tepat. Berikut adalah panduan langkah demi langkah untuk mempersiapkan diri selama 3 bulan.</p><ol><li><strong>Bulan 1: Fokus pada Grammar dan Vocabulary.</strong> Perkuat dasar-dasar bahasa Inggrismu.</li><li><strong>Bulan 2: Latihan Listening dan Reading.</strong> Biasakan diri dengan format soal dan manajemen waktu.</li><li><strong>Bulan 3: Try Out Rutin.</strong> Lakukan simulasi ujian setiap minggu.</li></ol>',
    'published',
    now(),
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ),
  (
    'Pendaftaran Batch 5 Dibuka!',
    'pendaftaran-batch-5-dibuka',
    'Pengumuman',
    '<p>Kami dengan bangga mengumumkan bahwa pendaftaran untuk Batch 5 resmi dibuka! Dapatkan diskon 20% untuk pendaftaran di minggu pertama.</p><p>Kelas akan dimulai pada awal bulan depan. Kuota sangat terbatas, jadi segera daftarkan dirimu!</p>',
    'published',
    now(),
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ),
  (
    '5 Kesalahan Umum Saat Speaking IELTS',
    '5-kesalahan-umum-speaking-ielts',
    'Tips Belajar',
    '<p>Draft — artikel ini masih dalam proses penulisan. Akan membahas kesalahan umum kandidat saat sesi IELTS Speaking dan cara memperbaikinya.</p>',
    'draft',
    null,
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  );

-- ----------------------------------------------------------------------------
-- 6. Alumni (4, across different categories)
-- ----------------------------------------------------------------------------

insert into public.alumni (id, name, photo_url, achievement_title, achievement_detail, testimonial_text, category, is_featured, order_index)
values
  (
    'bbbbbbbb-0000-0000-0000-000000000001',
    'Budi Santoso', 'https://i.pravatar.cc/150?img=11',
    'Penerima Beasiswa LPDP', 'Master in Data Science, University of Melbourne',
    'Berkat bimbingan intensif dari tutor Refa Learn, skor IELTS saya naik dari 6.0 menjadi 7.5 hanya dalam 2 bulan. Sangat merekomendasikan program ini!',
    'Beasiswa Luar Negeri', true, 1
  ),
  (
    'bbbbbbbb-0000-0000-0000-000000000002',
    'Siti Aminah', 'https://i.pravatar.cc/150?img=5',
    'Skor TOEFL 620', 'Diterima Kerja di Perusahaan Multinasional',
    'Sistem belajarnya sangat fleksibel dan tutornya sabar banget. Materi yang diberikan juga sangat relevan dengan soal-soal ujian yang sebenarnya.',
    'Karir', true, 2
  ),
  (
    'bbbbbbbb-0000-0000-0000-000000000003',
    'Made Wirawan', 'https://i.pravatar.cc/150?img=13',
    'Diterima di Universitas Indonesia', 'Jurusan Sastra Inggris, jalur SNBT',
    'Persiapan grammar dan reading yang intensif sangat membantu saya lolos ujian masuk. Terima kasih Refa Learn!',
    'Akademik', false, 3
  ),
  (
    'bbbbbbbb-0000-0000-0000-000000000004',
    'Nadia Putri', 'https://i.pravatar.cc/150?img=9',
    'Skor IELTS 7.0', 'Persiapan Kuliah S1 di Malaysia',
    'Baru 3 bulan belajar tapi progressnya kerasa banget, terutama di bagian writing dan speaking.',
    'Ujian', false, 4
  )
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- 7. Materials — one per founder-defined category (IELTS, TOEFL, Umum,
-- Mahasiswa, SMA 12, SMA 11). Category is free text/admin-managed, not an
-- enum — see agent.md Section 6.9.
-- ----------------------------------------------------------------------------

insert into public.materials (category, title, slug, description, price, is_active, cover_image_url, file_url)
values
  (
    'IELTS',
    'Mastering IELTS Writing Task 2',
    'mastering-ielts-writing-task-2',
    '<p>Buku panduan komprehensif untuk menaklukkan IELTS Writing Task 2. Berisi rumus struktur paragraf, kosakata tingkat tinggi, dan puluhan contoh esai band 8+.</p>',
    150000, true,
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/ielts-writing.pdf'
  ),
  (
    'TOEFL',
    'TOEFL ITP Listening Bank Soal',
    'toefl-itp-listening-bank-soal',
    '<p>Kumpulan soal latihan Listening TOEFL ITP lengkap dengan kunci jawaban dan transkrip audio, disusun berdasarkan pola soal terbaru.</p>',
    100000, true,
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/toefl-listening.pdf'
  ),
  (
    'Umum',
    'Grammar for Beginners: 30 Days Challenge',
    'grammar-for-beginners-30-days',
    '<p>Lembar kerja harian untuk memperbaiki tata bahasa (grammar) dasar kamu dalam 30 hari. Cocok untuk pemula yang ingin membangun pondasi kuat.</p>',
    50000, true,
    'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/grammar-30-days.pdf'
  ),
  (
    'Mahasiswa',
    'Tips Interview Beasiswa Luar Negeri',
    'tips-interview-beasiswa',
    '<p>Rekaman webinar eksklusif berdurasi 2 jam yang membahas strategi dan pertanyaan umum dalam wawancara beasiswa internasional (LPDP, AAS, Chevening).</p>',
    0, true,
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/interview-video.mp4'
  ),
  (
    'SMA 12',
    'Persiapan UTBK Bahasa Inggris',
    'persiapan-utbk-bahasa-inggris',
    '<p>Rangkuman materi dan latihan soal Bahasa Inggris UTBK, fokus pada reading comprehension dan structure & written expression.</p>',
    75000, true,
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/utbk-english.pdf'
  ),
  (
    'SMA 11',
    'Vocabulary Builder untuk Kelas 11',
    'vocabulary-builder-kelas-11',
    '<p>500+ kosakata penting beserta contoh kalimat, disusun per tema, untuk membantu siswa kelas 11 memperluas kosakata secara terstruktur.</p>',
    50000, true,
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/vocab-kelas-11.pdf'
  )
on conflict (slug) do nothing;

-- ----------------------------------------------------------------------------
-- 8. Partners
-- ----------------------------------------------------------------------------

insert into public.partners (name, logo_url, url, order_index)
values
  ('Universitas Indonesia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png', '#', 1),
  ('LPDP', 'https://lpdp.kemenkeu.go.id/storage/website/images/64f16cd9c2a6b-logo-lpdp.png', '#', 2),
  ('AAS', 'https://www.australiaawardsindonesia.org/assets/images/logo.png', '#', 3);