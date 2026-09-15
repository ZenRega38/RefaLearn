# agent.md — Refa Learn Build Instructions

You are building **Refa Learn**, a company-profile + booking website for a solo private English tutor in Indonesia. Slogan: "Bridging Borders, Embracing The World!"

This file is your persistent operating context. Read it fully before writing code. For *why* a rule exists (business logic, policy rationale), see `IMPLEMENTATION_PLAN.md` in the same repo root — this file tells you *what to build*, that one tells you *why*.

Build in the phase order given in Section 9. Do not skip ahead — later phases depend on schema and components from earlier ones. At the end of each phase, verify against that phase's acceptance criteria before moving on.

---

## 1. Tech Stack (fixed — do not substitute without asking)

- **Framework:** Next.js, App Router, TypeScript, strict mode.
- **Styling:** Tailwind CSS.
- **Sketch/line-art rendering:** `roughjs` (hand-drawn SVG shapes) and `rough-notation` (animated hand-drawn annotations over text/elements).
- **Backend:** Supabase — Postgres database, Supabase Auth, Supabase Storage, Supabase Realtime. Use the Supabase JS client; use the service role key **only** in server-side code, never exposed to the client.
- **Forms/validation:** `react-hook-form` + `zod`.
- **Date/calendar:** `react-day-picker` for date selection UI; a custom-built time-slot grid component (not a generic event-calendar library) for slot selection; `rrule` for all recurring-availability and recurring-session-series logic.
- **Rich text editor (News CMS):** `Tiptap`.
- **Transactional email:** `Resend`.
- **Timezone default:** `Asia/Jakarta` (WIB, UTC+7) — store all timestamps in UTC in the database, convert for display; make the timezone a Settings value, not a hardcoded constant.

---

## 2. Repository Structure

```
/app
  /(public)
    /page.tsx                  → Home
    /news/page.tsx              → News list (list/grid toggle)
    /news/[slug]/page.tsx       → News detail
    /alumni/page.tsx
    /schedule/page.tsx          → Book a Session (+ My Schedule when logged in)
    /materials/page.tsx
    /materials/[slug]/page.tsx
    /about/page.tsx
    /login/page.tsx
    /register/page.tsx
  /dashboard
    /page.tsx                   → My Sessions
    /invoices/page.tsx
    /purchases/page.tsx
  /admin
    /page.tsx                   → Overview
    /availability/page.tsx
    /requests/page.tsx
    /sessions/page.tsx
    /invoices/page.tsx
    /materials/page.tsx
    /news/page.tsx
    /alumni/page.tsx
    /chat/page.tsx
    /settings/page.tsx
  /api or /actions               → server actions / route handlers per module
/components
  /ui                            → buttons, cards, badges, inputs (Tailwind + rough.js primitives)
  /sketch                        → SketchDivider, SketchCircleHighlight, SketchUnderline, PaperBackground
  /booking                       → DatePicker, TimeSlotGrid, ContractModal
  /chat                          → ChatWidget, ChatWindow, ConversationList
/lib
  /supabase                      → client.ts (browser), server.ts (service role, server-only)
  /pricing.ts                    → day-type + price calculation (single source of truth, see Section 6)
  /rrule-helpers.ts
/types                           → generated Supabase types + shared domain types
/supabase
  /migrations                    → SQL migration files, one per schema change
```

---

## 3. Design Tokens

Implement these as Tailwind theme extensions / CSS variables — do not hardcode hex values in components.

```
--paper-bg:        #FBF6EC
--paper-bg-alt:     #F3EEE0
--ink:              #232323
--ink-soft:         #5C574E
--brand-blue:       #2B4C7E
--accent-coral:     #E8734A
--accent-yellow:    #F2C14E
--success-green:    #4C8C6B
--warning-amber:    #D9A441
--danger-red:       #C24B4B
--line:             #D8D0BD
```

Fonts (Google Fonts, load via `next/font/google`):
- Display/headings: **Kalam**
- Accents/quotes: **Caveat**
- Body/forms/prices/contract text: **Inter** — never substitute a script font here, this is a hard rule (readability of prices and legal text is non-negotiable).

Rules:
- Max two typefaces visible per screen (one display + Inter).
- `rough-notation` highlights are reserved for: the price table, the "Pay After Class" badge, and primary CTAs — don't overuse or it loses meaning.
- All interactive elements (buttons, calendar cells, form inputs) must have a clean, generously-sized hit area even if their visual border is sketch-styled — sketch the frame, not the tap target.

---

## 4. Data Model

Implement as Postgres tables via Supabase migrations. Use `uuid` primary keys, `created_at`/`updated_at` timestamps with defaults, and enable Row Level Security (RLS) on every table — see Section 7 for policy rules.

```sql
-- profiles (extends auth.users)
profiles (
  id uuid primary key references auth.users(id),
  role text not null check (role in ('admin','student')),
  full_name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz default now()
)

availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week int,              -- 0-6, null if one-off
  specific_date date,            -- set instead of day_of_week for one-off slots
  start_time time not null,
  end_time time not null,
  is_recurring boolean default true,
  recurrence_end_date date,
  is_active boolean default true,
  created_at timestamptz default now()
)

blackout_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  reason text
)

recurring_series (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  day_of_week int not null,
  start_time time not null,
  start_date date not null,
  end_date date,
  status text default 'active' check (status in ('active','paused','ended'))
)

sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) not null,
  series_id uuid references recurring_series(id),
  date date not null,
  start_time time not null,
  end_time time not null,
  day_type text not null check (day_type in ('weekday','saturday','sunday')),
  price int not null,
  status text not null default 'pending'
    check (status in ('pending','accepted','declined','completed','cancelled','no_show')),
  contract_acceptance_id uuid references contract_acceptances(id),
  notes text,
  created_at timestamptz default now()
)

contracts (
  id uuid primary key default gen_random_uuid(),
  version int not null,
  content text not null,          -- full contract text, this version
  effective_date date not null
)

contract_acceptances (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) not null,
  contract_id uuid references contracts(id) not null,
  typed_full_name text not null,
  accepted_at timestamptz default now(),
  ip_address text
)

invoices (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) not null,
  period_month int not null,
  period_year int not null,
  session_ids uuid[] not null,
  total_amount int not null,
  status text not null default 'draft'
    check (status in ('draft','sent','proof_uploaded','confirmed','overdue','rejected')),
  proof_url text,
  generated_at timestamptz default now(),
  confirmed_at timestamptz
)

materials (
  id uuid primary key default gen_random_uuid(),
  category text not null,          -- admin-managed, not an enum — see Section 6
  title text not null,
  slug text unique not null,
  description text,
  price int not null default 100000,
  file_url text,
  cover_image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
)

material_orders (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) not null,
  material_ids uuid[] not null,
  total_amount int not null,
  status text not null default 'pending'
    check (status in ('pending','proof_uploaded','confirmed','rejected')),
  proof_url text,
  created_at timestamptz default now(),
  confirmed_at timestamptz
)

news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover_image_url text,
  category text,
  content text not null,           -- Tiptap JSON or HTML
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now()
)

alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  achievement_title text,
  achievement_detail text,
  testimonial_text text,
  category text,
  is_featured boolean default false,
  order_index int default 0
)

partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  url text,
  order_index int default 0
)

chat_conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id) not null,
  last_message_at timestamptz default now()
)

chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references chat_conversations(id) not null,
  sender_id uuid references profiles(id) not null,
  content text not null,
  attachment_url text,
  is_read boolean default false,
  created_at timestamptz default now()
)

site_settings (
  key text primary key,
  value jsonb not null
  -- keys: bank_details, ewallet_details, about_content, founder_bio,
  -- cofounder_bio, mission, vision, contact_info, cancellation_policy,
  -- late_payment_policy
)
```

---

## 5. Route Map

| Route | Access | Notes |
|---|---|---|
| `/` | public | Home |
| `/news` | public | list/grid toggle, client-side state |
| `/news/[slug]` | public | |
| `/alumni` | public | filterable grid |
| `/schedule` | public (booking requires login) | date picker → slot grid → contract modal |
| `/materials` | public | catalog |
| `/materials/[slug]` | public | detail + add to order |
| `/about` | public | |
| `/login`, `/register` | public | Supabase Auth |
| `/dashboard`, `/dashboard/invoices`, `/dashboard/purchases` | student (own data only) | |
| `/admin/*` | admin only | all modules from Section 2 |

---

## 6. Feature Logic — Build Notes

### 6.1 Pricing (`lib/pricing.ts`)
Single function, single source of truth — every place that needs a session price calls this, nothing hardcodes day-type prices elsewhere:
```ts
function getDayType(date: Date): 'weekday' | 'saturday' | 'sunday' { ... }
function getSessionPrice(date: Date): number {
  // weekday: 100000, saturday: 150000, sunday: 200000
}
```

### 6.2 Availability → open slots
Given `availability_rules` (recurring + one-off) minus `blackout_dates` minus already-`accepted`/`pending` sessions in that slot, compute the open slots for a given date range. Use `rrule` to expand recurring rules into concrete dates. This computation should be a single server function reused by both the public `/schedule` picker and the admin availability view — don't duplicate the logic client-side.

### 6.3 Booking → contract → request
1. Student selects date + slot on `/schedule`.
2. Before submission, render the **current** `contracts` row's content in a modal (fetch the latest `effective_date <= today`, highest `version`).
3. Require: checkbox ticked + typed full name matching their profile name (or at least non-empty) before "Submit Request" is enabled.
4. On submit: insert a `contract_acceptances` row, then insert the `sessions` row with `status = 'pending'` and `contract_acceptance_id` linked. Price and day_type computed via `lib/pricing.ts`.
5. Prevent double-booking: reject if another `pending` or `accepted` session already occupies that exact date+time.

### 6.4 Admin accept/decline
Updates `sessions.status`. On accept, the slot is now excluded from future availability computation (Section 6.2 handles this automatically since it already excludes pending/accepted). On decline, notify student (in-app + email via Resend).

### 6.5 Marking sessions complete
Admin action on `/admin/sessions`. Only `completed` sessions are eligible for invoicing — build the invoice query to filter on this status explicitly.

### 6.6 Monthly invoice generation
Build as a scheduled job (Supabase cron / Vercel cron, whichever fits your deployment) that runs on the 1st of each month:
1. For each student with `completed` sessions dated in the previous calendar month and not already invoiced, create one `invoices` row summing `sessions.price`, with `session_ids` array populated.
2. Set `status = 'sent'`, notify student.
Also build a manual "Generate Now" trigger in `/admin/invoices` for testing and edge cases (e.g., a session marked completed late).

### 6.7 Payment proof flow (sessions + materials)
Both `invoices` and `material_orders` follow the same pattern: student uploads an image to Supabase Storage → row's `proof_url` set, status moves to `proof_uploaded`/`pending` review → admin confirms (`status = confirmed`, unlock material downloads / mark invoice paid) or rejects (status reverts, student notified to re-upload).

### 6.8 Real-time chat
- One `chat_conversations` row per student (create on first message).
- Use Supabase Realtime (Postgres change subscriptions) on `chat_messages` filtered by `conversation_id` so both sides see new messages instantly without polling.
- `ChatWidget` component: floating button site-wide when a student/admin is logged in, expands to a popup (mobile: full-screen sheet; desktop: bottom-right panel or side drawer).
- Admin `/admin/chat` shows all conversations sorted by `last_message_at`, with unread counts.

### 6.9 Materials categories
`materials.category` is a free-text field managed via the admin Materials CMS (a simple category list in `site_settings` or its own small `material_categories` table) — do **not** hardcode an enum of category values, since the founder explicitly wants to add categories later without a code change.

---

## 7. Row Level Security (RLS) — required, not optional

- `profiles`: users can read/update their own row; admins can read all.
- `sessions`, `invoices`, `material_orders`, `chat_messages`: students can only read/write rows where `student_id` (or `sender_id`/conversation ownership) matches `auth.uid()`; admins can read/write all.
- `news_posts`, `alumni`, `materials`, `partners`: public can read where `status = 'published'` / `is_active = true`; only admins can write.
- `contracts`: public can read; only admins can write.
- `contract_acceptances`: student can read their own; admin can read all; nobody can update/delete (append-only, it's an audit record).
- Storage buckets: `payment-proofs` and `material-files` must **not** be public — serve via signed URLs generated server-side, scoped to the requesting user's own records (or admin).

---

## 8. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never in client bundle
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
CRON_SECRET=                       # protects the monthly invoice cron endpoint
```

---

## 9. Build Phases & Acceptance Criteria

Work through these in order. Each phase's acceptance criteria must pass before starting the next.

| # | Phase | Acceptance criteria |
|---|---|---|
| 0 | Setup + design system | Next.js + Tailwind + Supabase client wired up; Kalam/Caveat/Inter loaded; palette tokens in Tailwind config; `PaperBackground`, `SketchDivider`, one `rough.js` component render correctly on mobile (375px) and desktop |
| 1 | Static pages | Home and About render with placeholder copy/images, fully responsive |
| 2 | Auth | Register/login work via Supabase Auth; `profiles` row created on signup; role-based redirect (admin → `/admin`, student → `/dashboard`) |
| 3 | News | Admin can create/edit/publish a post via Tiptap; public list (grid+list toggle) and detail page render published posts only |
| 4 | Alumni | Admin CRUD works; public grid with category filter works; featured items surface correctly |
| 5 | Availability + Booking | Admin can set a recurring rule and a blackout date; public `/schedule` shows correct open slots reflecting both; submitting a request requires contract acceptance and correctly blocks double-booking |
| 6 | Session lifecycle | Admin can accept/decline a pending request; accepted session appears in student's My Schedule; admin can mark completed/no-show/cancelled |
| 7 | Invoicing | Manually triggering "Generate Now" correctly aggregates the prior month's completed sessions into one invoice with correct total; proof upload + admin confirm updates status correctly end-to-end |
| 8 | Materials store | Catalog filters by category; checkout creates an order; proof upload + admin confirm unlocks download in student dashboard |
| 9 | Chat | Message sent from student appears in admin inbox in real time without refresh, and vice versa; unread counts update correctly |
| 10 | Polish | Full mobile QA pass on every page; meta tags + sitemap for News/Alumni; deploy to the founder's domain |

---

## 10. Explicit Do-Not List

- Do not hardcode day-type prices anywhere except `lib/pricing.ts`.
- Do not expose the Supabase service role key to any client component.
- Do not allow a session request to be submitted without a recorded `contract_acceptances` row.
- Do not allow two `pending`/`accepted` sessions to occupy the same date+time slot.
- Do not make payment-proof or material-file storage buckets public.
- Do not hardcode materials categories as a fixed enum/list in code — they must be admin-editable.
- Do not set contract, pricing, or form text in a script/handwritten font.
- Do not bill `cancelled` or `no_show` sessions by default — only `completed` — unless the founder's confirmed late-cancellation policy (Section 7.2 of `IMPLEMENTATION_PLAN.md`) says otherwise, in which case make it a Settings toggle, not a hardcoded assumption.

---

## 11. Seed Data (for local/dev testing)

Create a seed script that inserts: 1 admin profile, 2 student profiles, 3 recurring availability rules + 1 blackout date, 2 sample `news_posts` (1 draft, 1 published), 4 `alumni` entries across different categories, 6 `materials` (one per category from the founder's list: IELTS, TOEFL, Umum, Mahasiswa, SMA 12, SMA 11), and one `contracts` row (version 1) with placeholder clause text so the booking flow is testable end-to-end before real copy is ready.
