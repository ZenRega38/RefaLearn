-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- PROFILES (Auth Extension)
-- ==============================================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  role text not null default 'student' check (role in ('admin', 'student')),
  full_name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." 
  on profiles for select using (true);

create policy "Users can insert their own profile." 
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile." 
  on profiles for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'Unknown User'),
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ==============================================================================
-- AVAILABILITY & SCHEDULING
-- ==============================================================================

create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week int,              -- 0-6 (0=Sunday), null if one-off
  specific_date date,            -- set instead of day_of_week for one-off slots
  start_time time not null,
  end_time time not null,
  is_recurring boolean default true not null,
  recurrence_end_date date,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

create table public.blackout_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  reason text
);

-- RLS for availability
alter table public.availability_rules enable row level security;
alter table public.blackout_dates enable row level security;

create policy "Availability rules viewable by everyone" on availability_rules for select using (true);
create policy "Only admin can manage availability" on availability_rules for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "Blackout dates viewable by everyone" on blackout_dates for select using (true);
create policy "Only admin can manage blackout dates" on blackout_dates for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);


-- ==============================================================================
-- BOOKING & SESSIONS
-- ==============================================================================

create table public.recurring_series (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  day_of_week int not null,
  start_time time not null,
  start_date date not null,
  end_date date,
  status text default 'active' check (status in ('active','paused','ended')) not null,
  created_at timestamptz default now() not null
);

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  version int not null,
  content text not null,          
  effective_date date not null,
  created_at timestamptz default now() not null
);

create table public.contract_acceptances (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  contract_id uuid references public.contracts(id) not null,
  typed_full_name text not null,
  accepted_at timestamptz default now() not null,
  ip_address text
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  series_id uuid references public.recurring_series(id),
  date date not null,
  start_time time not null,
  end_time time not null,
  day_type text not null check (day_type in ('weekday','saturday','sunday')),
  price int not null,
  status text not null default 'pending'
    check (status in ('pending','accepted','declined','completed','cancelled','no_show')),
  contract_acceptance_id uuid references public.contract_acceptances(id),
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS for Booking & Sessions
alter table public.recurring_series enable row level security;
alter table public.contracts enable row level security;
alter table public.contract_acceptances enable row level security;
alter table public.sessions enable row level security;

create policy "Students can view their own series" on recurring_series for select using (auth.uid() = student_id);
create policy "Admins can view all series" on recurring_series for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Contracts viewable by everyone" on contracts for select using (true);
create policy "Admins can manage contracts" on contracts for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Students can view own acceptances" on contract_acceptances for select using (auth.uid() = student_id);
create policy "Admins can view all acceptances" on contract_acceptances for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Students can insert acceptances" on contract_acceptances for insert with check (auth.uid() = student_id);

create policy "Students can view own sessions" on sessions for select using (auth.uid() = student_id);
create policy "Students can insert own sessions" on sessions for insert with check (auth.uid() = student_id);
create policy "Students can update own sessions (limited)" on sessions for update using (auth.uid() = student_id); -- Will need more specific checks in app
create policy "Admins can manage all sessions" on sessions for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));


-- ==============================================================================
-- INVOICING
-- ==============================================================================

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  period_month int not null,
  period_year int not null,
  session_ids uuid[] not null,
  total_amount int not null,
  status text not null default 'draft'
    check (status in ('draft','sent','proof_uploaded','confirmed','overdue','rejected')),
  proof_url text,
  generated_at timestamptz default now() not null,
  confirmed_at timestamptz,
  updated_at timestamptz default now() not null
);

-- RLS for Invoicing
alter table public.invoices enable row level security;

create policy "Students can view own invoices" on invoices for select using (auth.uid() = student_id);
create policy "Students can update own invoices (proof upload)" on invoices for update using (auth.uid() = student_id);
create policy "Admins can manage all invoices" on invoices for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));


-- ==============================================================================
-- MATERIALS STORE
-- ==============================================================================

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  category text not null,          
  title text not null,
  slug text unique not null,
  description text,
  price int not null default 100000,
  file_url text,
  cover_image_url text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.material_orders (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  material_ids uuid[] not null,
  total_amount int not null,
  status text not null default 'pending'
    check (status in ('pending','proof_uploaded','confirmed','rejected')),
  proof_url text,
  created_at timestamptz default now() not null,
  confirmed_at timestamptz
);

-- RLS for Materials
alter table public.materials enable row level security;
alter table public.material_orders enable row level security;

create policy "Active materials viewable by everyone" on materials for select using (is_active = true);
create policy "Admins can view and manage all materials" on materials for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Students can view own material orders" on material_orders for select using (auth.uid() = student_id);
create policy "Students can insert own material orders" on material_orders for insert with check (auth.uid() = student_id);
create policy "Students can update own material orders (proof upload)" on material_orders for update using (auth.uid() = student_id);
create policy "Admins can manage all material orders" on material_orders for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));


-- ==============================================================================
-- CMS (NEWS, ALUMNI, PARTNERS, SETTINGS)
-- ==============================================================================

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover_image_url text,
  category text,
  content text not null,           
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  achievement_title text,
  achievement_detail text,
  testimonial_text text,
  category text,
  is_featured boolean default false,
  order_index int default 0,
  created_at timestamptz default now() not null
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  url text,
  order_index int default 0,
  created_at timestamptz default now() not null
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now() not null
);

-- RLS for CMS
alter table public.news_posts enable row level security;
alter table public.alumni enable row level security;
alter table public.partners enable row level security;
alter table public.site_settings enable row level security;

create policy "Published news viewable by everyone" on news_posts for select using (status = 'published');
create policy "Admins can manage all news" on news_posts for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Alumni viewable by everyone" on alumni for select using (true);
create policy "Admins can manage alumni" on alumni for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Partners viewable by everyone" on partners for select using (true);
create policy "Admins can manage partners" on partners for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Site settings viewable by everyone" on site_settings for select using (true);
create policy "Admins can manage site settings" on site_settings for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));


-- ==============================================================================
-- CHAT SYSTEM
-- ==============================================================================

create table public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) not null,
  last_message_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) not null,
  content text not null,
  attachment_url text,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- RLS for Chat
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

create policy "Students can view their own conversations" on chat_conversations for select using (auth.uid() = student_id);
create policy "Students can insert their own conversations" on chat_conversations for insert with check (auth.uid() = student_id);
create policy "Admins can view and manage all conversations" on chat_conversations for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can view messages in their conversations" on chat_messages for select using (
  exists (select 1 from chat_conversations where id = chat_messages.conversation_id and (student_id = auth.uid() or exists (select 1 from profiles where id = auth.uid() and role = 'admin')))
);
create policy "Users can insert messages in their conversations" on chat_messages for insert with check (
  sender_id = auth.uid() and exists (select 1 from chat_conversations where id = chat_messages.conversation_id and (student_id = auth.uid() or exists (select 1 from profiles where id = auth.uid() and role = 'admin')))
);
