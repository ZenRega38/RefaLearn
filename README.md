# Refa Learn

> Bridging Borders, Embracing The World!

Company profile and booking site for a private English tutor in Tarakan, Kalimantan Utara. Students book 1-on-1 sessions, sign a class agreement at booking time, get billed monthly for completed sessions only ("pay after class"), buy downloadable study materials, and chat with the tutor in real time.

Built with Next.js (App Router), Supabase, and Tailwind. See `GUIDE/agent.md` for the full build spec and `GUIDE/IMPLEMENTATION_PLAN.md` for the reasoning behind the business rules.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16, App Router, TypeScript strict |
| Styling | Tailwind CSS v4 (tokens live in `app/globals.css` under `@theme`, not a config file) |
| Hand-drawn UI | `roughjs` + `rough-notation` |
| Backend | Supabase — Postgres, Auth, Storage, Realtime |
| Forms | `react-hook-form` + `zod` |
| Scheduling | `react-day-picker`, custom slot grid, `rrule` |
| Rich text | Tiptap |
| Email | Resend |
| Captcha | Cloudflare Turnstile |
| Tests | Vitest (`npm test`) |

**Timezone is Asia/Makassar (WITA, UTC+8)** — Tarakan's local time. Session dates/times are stored as wall-clock values in that zone; `lib/time.ts` is the only place that converts "now". Change `APP_TIMEZONE` there if the business ever moves.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000. Before committing run `npm test` (scheduling/pricing unit tests), `npm run test:db` (applies every migration to an in-memory Postgres and checks the RLS rules and database functions) and `npm run lint`.

### Database setup

Migrations live in `supabase/migrations/` and apply in filename order:

| File | What it does |
|---|---|
| `…000000_initial_schema.sql` | All tables, base RLS, `handle_new_user` signup trigger |
| `…000001_storage_buckets.sql` | Private `payment-proofs` and `material-files` buckets |
| `…000002_hardening.sql` | Indexes, `updated_at` triggers, double-booking index, Realtime, tightened RLS |
| `…000003_reschedule_cancellation.sql` | Reschedule requests, cancellation fees, prepayments |
| `…000004_series_fee_and_invoice_breakdown.sql` | `invoices.fee_amount`, auto-closing weekly series |
| `…000005_security_and_integrity.sql` | Role lock-down, server-only write paths, overlap constraint, atomic booking/invoicing functions, chat read receipts + attachments, public image bucket |

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

Or paste each file into the SQL Editor, in order.

**Before applying `…000005`,** check for overlapping active bookings — it adds an exclusion constraint that fails if any exist (query at the top of the file). It also merges duplicate chat conversations per student.

**After applying `…000005`:** new signups can no longer choose their role. Promote an admin in the SQL editor:

```sql
update public.profiles set role = 'admin' where id = '<auth user id>';
```

### Supabase Auth settings

- **URL Configuration → Redirect URLs:** add `https://<your-domain>/auth/callback` (and `http://localhost:3000/auth/callback` for dev). Sign-up confirmation and password-reset links land there.
- **Attack Protection → Captcha:** enable Turnstile with your secret key (the site key goes in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`).

### Seed data

```bash
node scripts/seed-users.mjs   # creates the 3 accounts and promotes the admin
# then run supabase/seed.sql in the SQL editor (local/dev only)
```

Seeded logins (all password `Password123!`): `admin@refalearn.com` (admin), `siswa1@refalearn.com`, `siswa2@refalearn.com`. Never run the seed against production.

## Project layout

```
app/
  (public)/       home, news, alumni, schedule, materials (+ checkout), about,
                  terms, privacy, login, register, forgot/reset password
  (protected)/    /dashboard — sessions, invoices, purchased materials, profile
  admin/          availability, sessions, invoices, materials, orders,
                  prepayments, news, alumni, partners, chat, contracts, settings
  api/            availability, bookings, sessions (cancel/reschedule),
                  materials (orders/download), chat notify, admin actions, crons
  auth/callback   email-link landing (confirmation, password recovery)
components/       ui, sketch, booking, chat, news, alumni, admin, dashboard
lib/
  supabase/       client (browser), server (cookies), public (cookie-less), admin (service role)
  pricing.ts      day type + price — the only place prices are defined
  policy.ts       session length, cancellation fee/notice, invoice due days
  time.ts         business timezone helpers
  availability.ts the one server-side "open slots" computation
  invoicing.ts    monthly invoice run (atomic, per student)
  contract-template.ts  Indonesian-law Session Agreement template
tests/            Vitest unit tests
supabase/         migrations + seed
```

## Rules worth knowing before you change anything

- **Prices are defined only in `lib/pricing.ts`;** fees and deadlines only in `lib/policy.ts`. The homepage table, the booking route and the contract template all read from there.
- **Students never write prices, statuses or amounts.** Booking, cancelling, rescheduling and ordering go through `app/api/*` routes that compute values server-side and write with the service role (`lib/supabase/admin.ts`, server-only). RLS gives students no INSERT on sessions, orders, fees or prepayments.
- **The service role key never reaches the client.** `lib/supabase/admin.ts`, `lib/email.ts`, `lib/invoicing.ts` and `lib/availability.ts` import `server-only`, so the build fails if one is pulled into a client component.
- **A session can't exist without a contract acceptance,** and no two active sessions may overlap — both enforced by database constraints. `contract_acceptances` is append-only; a contract version that has been signed can't be edited.
- **Only `completed` sessions get billed.** Never `cancelled` or `no_show`. Invoicing picks up any completed session not yet on an invoice, so marking a session complete late lands it on the next (or a supplementary) invoice.
- **Storage:** `payment-proofs`, `material-files`, `chat-attachments` are private (signed URLs only). `public-assets` is public-read, admin-write, for covers/photos/logos.
- **Material categories are admin-managed** (`site_settings.material_categories`), not an enum.
- **Contract text, prices, and form fields use Inter,** never a script font.

## Session Agreement (contract)

`/admin/contracts` → **Terbitkan Versi Baru** → **Muat Template** loads a Bahasa Indonesia agreement drafted around KUHPerdata, UU ITE + PP 71/2019 (electronic contracts and signatures), UU Perlindungan Konsumen (standard-clause limits, BPSK), UU PDP (personal data, children), UU Hak Cipta, and Pengadilan Negeri Tarakan as forum. It fills in the founder name and contact details from Settings and pulls prices, fees and due dates from the code. Students (≥21 or married) sign themselves; otherwise a parent/guardian signs. Each acceptance records name, signer role, time, IP and user agent.

It is a drafting starting point, **not legal advice** — have an advokat or notaris in Tarakan review it before relying on it.

## Invoicing & crons

`lib/invoicing.ts` is the single implementation, called from:

- `GET /api/cron/generate-invoices` — 00:00 UTC on the 1st (08:00 WITA), per `vercel.json`
- `POST /api/admin/invoices/generate` — "Generate Now" in `/admin/invoices`
- `GET /api/cron/daily` — 01:00 UTC daily: flags invoices past due (`INVOICE_DUE_DAYS`) as `overdue` and emails the student. Students with a past-due invoice can't make new bookings.

Both crons require `Authorization: Bearer $CRON_SECRET`:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/generate-invoices
```

## Deployment

Deploy to Vercel. Add every variable from `.env.example` to the project's environment settings. Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, the sitemap and email links) and point `RESEND_FROM_EMAIL` at a domain verified in Resend, or students won't receive email.
