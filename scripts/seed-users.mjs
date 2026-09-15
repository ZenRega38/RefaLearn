// Goes in: scripts/seed-users.mjs
//
// Creates the 3 seeded accounts through Supabase's Admin API instead of a
// raw `insert into auth.users`.
//
// Why this exists: seed.sql used to hand-build auth.users rows with
// crypt(password, gen_salt('bf')). That works reliably against Supabase's
// local CLI/Docker stack, but on a hosted Cloud project GoTrue does not
// reliably accept a hand-crafted password hash — logins fail with "Invalid
// login credentials" even though the row exists and looks correct. This is
// a known, widely-reported gap between the local and hosted Auth schema,
// not a bug in this codebase's SQL. Going through admin.createUser() lets
// GoTrue hash the password itself, so it's guaranteed to be able to verify
// it later.
//
// `public.profiles` still gets created automatically — the on_auth_user_created
// trigger from the initial migration fires on any auth.users insert,
// including ones made through this API, and reads role/full_name/phone out
// of user_metadata exactly as before.
//
// Usage:
//   node scripts/seed-users.mjs
//
// Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in
// .env.local. Safe to re-run — existing users (matched by email) are
// skipped, not duplicated.

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// --- Load .env.local manually so this works with a plain `node` call,
// without adding a dotenv dependency just for a one-off script. ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');

try {
  const envFile = readFileSync(envPath, 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
} catch {
  console.error(`Could not read ${envPath}. Run this from the project root, after creating .env.local.`);
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PASSWORD = 'Password123!';

// Same fixed UUIDs seed.sql used to hardcode, kept identical so the rest of
// the seed data (sessions, invoices, chat) that references these IDs still
// lines up.
const USERS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'admin@refalearn.com',
    full_name: 'Admin Refa',
    phone: '081234567890',
    role: 'admin',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'siswa1@refalearn.com',
    full_name: 'Dewi Lestari',
    phone: '081298765432',
    role: 'student',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'siswa2@refalearn.com',
    full_name: 'Rian Hidayat',
    phone: '081211223344',
    role: 'student',
  },
];

async function main() {
  for (const u of USERS) {
    const { data, error } = await supabase.auth.admin.createUser({
      // Explicit id keeps this in sync with the rest of supabase/seed.sql,
      // which references these UUIDs directly (sessions.student_id, etc).
      id: u.id,
      email: u.email,
      password: PASSWORD,
      email_confirm: true, // skip the confirmation email for seeded accounts
      user_metadata: {
        full_name: u.full_name,
        phone: u.phone,
        role: u.role,
      },
    });

    if (error) {
      if (error.message.includes('already been registered') || error.code === 'email_exists') {
        console.log(`↷ ${u.email} already exists, skipping`);
        continue;
      }
      console.error(`✗ Failed to create ${u.email}:`, error.message);
      continue;
    }

    console.log(`✓ Created ${u.email} (${data.user.id})`);
  }

  console.log('\nDone. Password for all seeded accounts: Password123!');
  console.log('Now run the rest of supabase/seed.sql (site_settings, availability, materials, etc)');
  console.log('in the SQL Editor — it no longer needs the auth.users/auth.identities block.');
}

main();
