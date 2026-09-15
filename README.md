# Refa Learn

> Bridging Borders, Embracing The World!

Company profile and booking site for a private English tutor in Indonesia. Students book 1-on-1 sessions, accept a class agreement at booking time, get billed monthly for completed sessions only ("pay after class"), buy downloadable study materials, and chat with the tutor in real time.

Built with Next.js (App Router), Supabase, and Tailwind. See `GUIDE/agent.md` for the full build spec and `GUIDE/IMPLEMENTATION_PLAN.md` for the reasoning behind the business rules.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16, App Router, TypeScript strict |
| Styling | Tailwind CSS v4 (tokens live in `app/globals.css` under `@theme`, not a config file) |
| Hand-drawn UI | `roughjs` + `react-rough-notation` |
| Backend | Supabase — Postgres, Auth, Storage, Realtime |
| Forms | `react-hook-form` + `zod` |
| Scheduling | `react-day-picker`, custom slot grid, `rrule` |
| Rich text | Tiptap |
| Email | Resend |

Timezone is Asia/Jakarta (WIB). All timestamps are stored in UTC and converted for display.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

### Database setup

Migrations live in `supabase/migrations/` and apply in filename order:

| File | What it does |
|---|---|
| `20240101000000_initial_schema.sql` | All tables, base RLS, `handle_new_user` signup trigger |
| `20240101000001_storage_buckets.sql` | Private `payment-proofs` and `material-files` buckets + their policies |
| `20240101000002_hardening.sql` | Indexes, `updated_at` triggers, double-booking constraint, Realtime publication, tightened RLS |

With the Supabase CLI:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

Or paste each file into the SQL Editor in the dashboard, in order.

**Before applying `20240101000002`,** check for existing duplicate bookings — it adds a unique constraint that will fail if any exist:

```sql
select date, start_time, count(*)
from public.sessions
where status in ('pending','accepted')
group by date, start_time
having count(*) > 1;
```

If that returns rows, resolve them (decline the later duplicates) before running the migration.

### Seed data

`supabase/seed.sql` creates one admin, two students, availability rules, a blackout date, news posts, alumni, six materials, and a version-1 contract so the booking flow is testable end to end.

```bash
npx supabase db reset   # local only — this drops everything first
```

Seeded logins (all password `Password123!`):

- `admin@refalearn.com` — admin
- `siswa1@refalearn.com`, `siswa2@refalearn.com` — students

Never run the seed against production.

## Project layout

```
app/
  (public)/       home, news, alumni, schedule, materials, about, login, register
  (protected)/    /dashboard — student sessions, invoices, purchased materials
  admin/          availability, sessions, invoices, materials, orders, news,
                  alumni, chat, contracts, settings
  api/            notify, admin invoice generation, monthly cron
components/
  ui/             Button, Card, Input, Navbar, Footer, RichTextEditor …
  sketch/         PaperBackground, SketchBox, SketchDivider, SketchUnderline
  booking/        DatePicker, TimeSlotGrid, ContractModal
  chat/           ChatWidget
  admin/          AdminSidebar
lib/
  supabase/       client (browser), server (optional service role), middleware
  pricing.ts      day type + price — the only place prices are defined
  invoicing.ts    completed sessions → monthly invoices (idempotent)
  rrule-helpers.ts, storage.ts, email.ts, api-auth.ts, errors.ts
types/            shared domain types
supabase/         migrations + seed
```

## Rules worth knowing before you change anything

These come from `GUIDE/agent.md` Section 10 and are enforced in more than one place:

- **Prices are defined only in `lib/pricing.ts`.** Weekday 100k, Saturday 150k, Sunday 200k (IDR). Nothing else hardcodes them.
- **The service role key never reaches the client.** It's only read inside `lib/supabase/server.ts`, and only when `createClient(true)` is called from server code.
- **A session can't exist without a contract acceptance.** The booking flow inserts `contract_acceptances` first, then links it. That table is append-only, enforced by trigger.
- **One active booking per date+time.** Checked in JS before insert and enforced by a partial unique index in the database.
- **Storage buckets are private.** Access is always through a short-lived signed URL from `lib/storage.ts`.
- **Only `completed` sessions get billed.** Never `cancelled` or `no_show`.
- **Material categories are free text, managed by the admin.** Don't turn them into a TypeScript enum.
- **Contract text, prices, and form fields use Inter,** never a script font.

## Invoicing

`lib/invoicing.ts` is the single implementation, called from two places:

- `GET /api/cron/generate-invoices` — runs monthly per `vercel.json`, authorised with `CRON_SECRET`
- `POST /api/admin/invoices/generate` — the "Generate Now" button in `/admin/invoices`, authorised by admin session

It's idempotent: a student already invoiced for a period is skipped, and any session already attached to an invoice is excluded. Safe to re-run after marking a session complete late.

To test the cron route locally:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/generate-invoices
```

## Deployment

Deploy to Vercel. Add every variable from `.env.example` to the project's environment settings — `vercel.json` already registers the monthly cron, but the route returns 401 until `CRON_SECRET` is set.

Set `NEXT_PUBLIC_SITE_URL` to the production domain and point `RESEND_FROM_EMAIL` at a domain verified in Resend, or students won't receive any email.