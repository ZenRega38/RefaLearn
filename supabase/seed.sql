-- Seed Data for Refa Learn

-- 1. Create a mock admin user (assuming they sign up with this email)
-- (In Supabase local dev, you'd insert into auth.users, but for seed we can just insert into profiles if we have the ID)
-- Let's just create a generic admin profile (requires a valid auth ID, so we use a dummy one for now, or just let handle_new_user do it during actual signup)
insert into public.profiles (id, role, full_name, phone)
values 
  ('00000000-0000-0000-0000-000000000000', 'admin', 'Admin Refa', '081234567890')
on conflict (id) do nothing;

-- 2. Insert Settings
insert into public.site_settings (key, value)
values
  ('hero_title', '{"text": "Bridging Borders, Embracing The World!"}'),
  ('hero_subtitle', '{"text": "Refa Learn adalah platform les privat Bahasa Inggris interaktif dengan sistem bayar setelah kelas. Tingkatkan kemampuan bahasa Inggris-mu untuk TOEFL, IELTS, atau komunikasi sehari-hari bersama tutor profesional."}'),
  ('contact_email', '{"text": "hello@refalearn.com"}'),
  ('contact_phone', '{"text": "6281234567890"}'),
  ('contact_address', '{"text": "Jl. Pendidikan No. 123, Jakarta Selatan, 12345"}'),
  ('social_instagram', '{"text": "https://instagram.com/refalearn"}'),
  ('social_tiktok', '{"text": "https://tiktok.com/@refalearn"}')
on conflict (key) do update set value = excluded.value;

-- 3. Insert Availability Rules
insert into public.availability_rules (day_of_week, start_time, end_time, is_recurring)
values
  (1, '09:00:00', '11:00:00', true), -- Monday
  (1, '13:00:00', '15:00:00', true),
  (2, '10:00:00', '12:00:00', true), -- Tuesday
  (3, '09:00:00', '11:00:00', true), -- Wednesday
  (4, '13:00:00', '15:00:00', true), -- Thursday
  (5, '10:00:00', '12:00:00', true)  -- Friday
;

-- 4. Insert News Posts
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
  );

-- 5. Insert Materials
insert into public.materials (category, title, slug, description, price, is_active, cover_image_url, file_url)
values
  (
    'E-Book',
    'Mastering IELTS Writing Task 2',
    'mastering-ielts-writing-task-2',
    '<p>Buku panduan komprehensif untuk menaklukkan IELTS Writing Task 2. Berisi rumus struktur paragraf, kosakata tingkat tinggi, dan puluhan contoh esai band 8+.</p>',
    150000,
    true,
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/ielts-writing.pdf'
  ),
  (
    'Worksheet',
    'Grammar for Beginners: 30 Days Challenge',
    'grammar-for-beginners-30-days',
    '<p>Lembar kerja harian untuk memperbaiki tata bahasa (grammar) dasar kamu dalam 30 hari. Cocok untuk pemula yang ingin membangun pondasi kuat.</p>',
    50000,
    true,
    'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/grammar-30-days.pdf'
  ),
  (
    'Video Course',
    'Tips Interview Beasiswa Luar Negeri',
    'tips-interview-beasiswa',
    '<p>Rekaman webinar eksklusif berdurasi 2 jam yang membahas strategi dan pertanyaan umum dalam wawancara beasiswa internasional (LPDP, AAS, Chevening).</p>',
    0,
    true,
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://example.com/files/interview-video.mp4'
  );

-- 6. Insert Alumni
insert into public.alumni (name, photo_url, achievement_title, achievement_detail, testimonial_text, category, is_featured, order_index)
values
  (
    'Budi Santoso',
    'https://i.pravatar.cc/150?img=11',
    'Penerima Beasiswa LPDP',
    'Master in Data Science, University of Melbourne',
    'Berkat bimbingan intensif dari tutor Refa Learn, skor IELTS saya naik dari 6.0 menjadi 7.5 hanya dalam 2 bulan. Sangat merekomendasikan program ini!',
    'Beasiswa Luar Negeri',
    true,
    1
  ),
  (
    'Siti Aminah',
    'https://i.pravatar.cc/150?img=5',
    'Skor TOEFL 620',
    'Diterima Kerja di Perusahaan Multinasional',
    'Sistem belajarnya sangat fleksibel dan tutornya sabar banget. Materi yang diberikan juga sangat relevan dengan soal-soal ujian yang sebenarnya.',
    'Karir',
    true,
    2
  );

-- 7. Insert Partners
insert into public.partners (name, logo_url, url, order_index)
values
  ('Universitas Indonesia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png', '#', 1),
  ('LPDP', 'https://lpdp.kemenkeu.go.id/storage/website/images/64f16cd9c2a6b-logo-lpdp.png', '#', 2),
  ('AAS', 'https://www.australiaawardsindonesia.org/assets/images/logo.png', '#', 3);
