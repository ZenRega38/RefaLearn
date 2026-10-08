// Runs every migration in supabase/migrations against PGlite (Postgres in
// WASM) with minimal stubs for Supabase's auth/storage schemas and API
// roles, then exercises the RLS policies, guard triggers and database
// functions the app relies on.
//
// Usage: npm run test:db
import { PGlite } from "@electric-sql/pglite";
import { btree_gist } from "@electric-sql/pglite/contrib/btree_gist";
import { uuid_ossp } from "@electric-sql/pglite/contrib/uuid_ossp";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), "..", "supabase", "migrations");
const db = new PGlite({ extensions: { btree_gist, uuid_ossp } });

let failures = 0;
const ok = (name) => console.log("  ✓", name);
const bad = (name, err) => { failures++; console.log("  ✗", name, "—", err); };
const check = (cond, name, detail) => { if (cond) ok(name); else bad(name, detail); };

async function expectOk(name, fn) {
  try { const r = await fn(); ok(name); return r; } catch (e) { bad(name, e.message); }
}
async function expectFail(name, fn, pattern) {
  try { await fn(); bad(name, "expected failure but succeeded"); }
  catch (e) {
    if (pattern && !pattern.test(e.message)) bad(name, `wrong error: ${e.message}`);
    else ok(`${name} (refused: ${e.message.slice(0, 70)})`);
  }
}

// Run `sql` as a given role + auth.uid() inside a transaction.
async function as(role, uid, sql, params = []) {
  return db.transaction(async (tx) => {
    await tx.exec(`set local role ${role}`);
    await tx.query(`select set_config('request.jwt.claim.sub', $1, true)`, [uid || ""]);
    return tx.query(sql, params);
  });
}

await db.exec(`
  create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key, email text, raw_user_meta_data jsonb);
  create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create schema storage;
  create table storage.buckets (id text primary key, name text, public boolean);
  create table storage.objects (id uuid default gen_random_uuid() primary key, bucket_id text, name text);
  create function storage.foldername(name text) returns text[] language sql immutable as $$
    select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1] $$;
  create publication supabase_realtime;
  grant usage on schema auth, storage to anon, authenticated, service_role;
  grant execute on function auth.uid() to anon, authenticated, service_role;
`);

console.log("Migrations:");
for (const f of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
  try {
    await db.exec(readFileSync(join(dir, f), "utf8"));
    ok(f);
  } catch (e) {
    bad(f, e.message);
    console.log("ABORT"); process.exit(1);
  }
  // Supabase grants table access to the API roles by default.
  await db.exec(`
    grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to anon, authenticated, service_role;
    grant all on all sequences in schema public to anon, authenticated, service_role;
    grant all on storage.objects, storage.buckets to anon, authenticated, service_role;
  `);
}

const ADMIN = "11111111-1111-1111-1111-111111111111";
const S1 = "22222222-2222-2222-2222-222222222222";
const S2 = "33333333-3333-3333-3333-333333333333";

console.log("\nRoles:");
await db.query(`insert into auth.users values ($1,'a@x','{"full_name":"Admin","role":"admin"}'),($2,'s1@x','{"full_name":"Dewi","role":"admin"}'),($3,'s2@x','{"full_name":"Rian"}')`, [ADMIN, S1, S2]);
const roles = await db.query(`select id, role from profiles order by id`);
check(roles.rows.every((r) => r.role === "student"), "signup ignores role metadata (all student)", JSON.stringify(roles.rows));
await db.query(`update profiles set role='admin' where id=$1`, [ADMIN]);
await expectFail("student cannot promote self", () => as("authenticated", S1, `update profiles set role='admin' where id=$1`, [S1]), /admin/i);
await expectOk("student can edit own name", () => as("authenticated", S1, `update profiles set full_name='Dewi L' where id=$1`, [S1]));
const other = await as("authenticated", S1, `update profiles set full_name='x' where id=$1 returning id`, [S2]);
check(other.rows.length === 0, "student cannot edit another profile", "updated");

console.log("\nBooking:");
const contract = (await db.query(`insert into contracts (version, content, effective_date) values (1,'<p>c</p>', current_date) returning id`)).rows[0].id;
await expectFail("student cannot insert contract acceptance directly", () => as("authenticated", S1,
  `insert into contract_acceptances (student_id, contract_id, typed_full_name) values ($1,$2,'Dewi')`, [S1, contract]), /row-level security/);
await expectFail("authenticated cannot call create_booking", () => as("authenticated", S1,
  `select create_booking($1,$2,'Dewi','student',null,null,null,'[]'::jsonb,false)`, [S1, contract]), /permission denied/);

const sess = (d, t = "16:00", e = "17:30") => ({ date: d, start_time: t, end_time: e, day_type: "weekday", price: 100000 });
const b1 = await expectOk("service_role books a 2-week series", () => as("service_role", null,
  `select create_booking($1,$2,'Dewi','student',null,'1.2.3.4','UA',$3::jsonb,false) as r`, [S1, contract, JSON.stringify([sess("2030-01-07"), sess("2030-01-14")])]));
const booking = b1?.rows[0].r;
check(booking?.series_id && booking.session_ids.length === 2, "series + 2 sessions created", JSON.stringify(booking));

await expectFail("student cannot insert session directly (even with a real acceptance)", () => as("authenticated", S1,
  `insert into sessions (student_id,date,start_time,end_time,day_type,price,status,contract_acceptance_id) values ($1,'2030-03-04','16:00','17:30','weekday',0,'completed',$2)`, [S1, booking.acceptance_id]), /row-level security/);
const accBefore = (await db.query(`select count(*)::int c from contract_acceptances`)).rows[0].c;
await expectFail("overlapping booking refused", () => as("service_role", null,
  `select create_booking($1,$2,'Rian','student',null,null,null,$3::jsonb,false)`, [S2, contract, JSON.stringify([sess("2030-01-07", "16:30", "18:00")])]), /conflicting key|exclusion|sessions_no_overlap/);
const accAfter = (await db.query(`select count(*)::int c from contract_acceptances`)).rows[0].c;
check(accBefore === accAfter, "failed booking left no orphan acceptance", `${accBefore} -> ${accAfter}`);
await expectOk("adjacent slot is fine", () => as("service_role", null,
  `select create_booking($1,$2,'Rian','student',null,null,null,$3::jsonb,false)`, [S2, contract, JSON.stringify([sess("2030-01-07", "17:30", "19:00")])]));
const booked = await as("anon", null, `select * from get_booked_slots('2030-01-01','2030-01-31')`);
check(booked.rows.length === 3, "anon sees all booked slots (no names)", booked.rows.length);
await expectFail("session without acceptance refused", () => db.query(
  `insert into sessions (student_id,date,start_time,end_time,day_type,price) values ($1,'2030-02-01','10:00','11:30','weekday',100000)`, [S2]), /contract acceptance/);
await expectFail("signed contract cannot be edited", () => db.query(`update contracts set content='x' where id=$1`, [contract]), /cannot be modified/);
await expectFail("student cannot cancel via direct update", () => as("authenticated", S1,
  `update sessions set status='cancelled' where student_id=$1 returning id`, [S1]).then((r) => { if (r.rows.length === 0) throw new Error("no rows (RLS)"); }), /RLS|row-level/);

console.log("\nInvoicing:");
const [sA, sB] = booking.session_ids;
await db.query(`update sessions set status='accepted' where id = any($1)`, [[sA, sB]]);
await db.query(`update sessions set status='completed' where id=$1`, [sA]);
await db.query(`insert into cancellation_fees (student_id, session_ids, amount) values ($1, '{}', 50000)`, [S1]);
await expectFail("authenticated cannot call create_invoice_for_student", () => as("authenticated", ADMIN, `select create_invoice_for_student($1,1,2030)`, [S1]), /permission denied/);
const inv1 = (await as("service_role", null, `select create_invoice_for_student($1,1,2030) as id`, [S1])).rows[0].id;
const i1 = (await db.query(`select total_amount, fee_amount, session_ids from invoices where id=$1`, [inv1])).rows[0];
check(i1.total_amount === 150000 && i1.fee_amount === 50000 && i1.session_ids.length === 1, "invoice = 1 session + fee (150000)", JSON.stringify(i1));
const again = (await as("service_role", null, `select create_invoice_for_student($1,1,2030) as id`, [S1])).rows[0].id;
check(again === null, "re-run bills nothing twice", again);
await db.query(`update sessions set status='completed' where id=$1`, [sB]);
const inv2 = (await as("service_role", null, `select create_invoice_for_student($1,1,2030) as id`, [S1])).rows[0].id;
const i2 = inv2 && (await db.query(`select total_amount, fee_amount from invoices where id=$1`, [inv2])).rows[0];
check(i2 && i2.total_amount === 100000 && i2.fee_amount === 0, "late-completed session lands on supplementary invoice", JSON.stringify(i2));

console.log("\nInvoice guards:");
await expectFail("student cannot confirm own invoice", () => as("authenticated", S1, `update invoices set status='confirmed' where id=$1`, [inv1]), /row-level security/);
await expectFail("student cannot point proof at another folder", () => as("authenticated", S1,
  `update invoices set status='proof_uploaded', proof_url=$2 where id=$1`, [inv1, `invoices/${S2}/x.jpg`]), /Invalid proof path/);
await expectFail("student cannot use a javascript: proof", () => as("authenticated", S1,
  `update invoices set status='proof_uploaded', proof_url='javascript:alert(1)' where id=$1`, [inv1]), /Invalid proof path/);
await expectOk("student uploads valid proof", () => as("authenticated", S1,
  `update invoices set status='proof_uploaded', proof_url=$2 where id=$1`, [inv1, `invoices/${S1}/${inv1}-1.jpg`]));
await db.query(`update invoices set generated_at = now() - interval '10 days' where id=$1`, [inv2]);
const overdue = (await as("service_role", null, `select mark_overdue_invoices(7) as n`)).rows[0].n;
check(overdue === 1, "mark_overdue_invoices flags the past-due one", overdue);

console.log("\nMaterials & prepayments:");
const mat = (await db.query(`insert into materials (category,title,slug,price,is_active) values ('IELTS','M','m',100000,true) returning id`)).rows[0].id;
await expectFail("student cannot create a free confirmed order", () => as("authenticated", S1,
  `insert into material_orders (student_id, material_ids, total_amount, status) values ($1, $2, 0, 'confirmed')`, [S1, [mat]]), /row-level security/);
const order = (await db.query(`insert into material_orders (student_id, material_ids, total_amount, status) values ($1,$2,100000,'confirmed') returning id`, [S1, [mat]])).rows[0].id;
await db.query(`update materials set is_active=false where id=$1`, [mat]);
const seen = await as("authenticated", S1, `select id from materials where id=$1`, [mat]);
const notSeen = await as("authenticated", S2, `select id from materials where id=$1`, [mat]);
check(seen.rows.length === 1 && notSeen.rows.length === 0, "buyer still sees hidden material, others don't", `${seen.rows.length}/${notSeen.rows.length}`);
const pre = (await db.query(`insert into prepayments (student_id, session_ids, total_amount, waived_fee_ids) values ($1,'{}',100000,'{}') returning id`, [S2])).rows[0].id;
await expectFail("student cannot shrink prepayment total", () => as("authenticated", S2,
  `update prepayments set status='proof_uploaded', total_amount=1, proof_url=$2 where id=$1`, [pre, `prepayments/${S2}/a.jpg`]), /Only an admin/);
void order;

console.log("\nReschedule:");
const r = (await db.query(`insert into reschedule_requests (session_id, student_id, original_date, original_start_time, requested_date, requested_start_time, requested_end_time) values ($1,$2,'2030-01-07','17:30','2030-01-08','09:00','10:30') returning id`,
  [(await db.query(`select id from sessions where student_id=$1`, [S2])).rows[0].id, S2])).rows[0].id;
await expectFail("second pending request for same session refused", () => db.query(`insert into reschedule_requests (session_id, student_id, original_date, original_start_time, requested_date, requested_start_time, requested_end_time) select session_id, student_id, original_date, original_start_time, requested_date, requested_start_time, requested_end_time from reschedule_requests where id=$1`, [r]), /duplicate key/);
await expectFail("student cannot approve reschedule", () => as("authenticated", S2, `select approve_reschedule($1,'weekday',100000,null)`, [r]), /Admin only/);
await expectOk("admin approves reschedule atomically", () => as("authenticated", ADMIN, `select approve_reschedule($1,'weekday',100000,'ok')`, [r]));
const moved = (await db.query(`select s.date::text d, rr.status from reschedule_requests rr join sessions s on s.id=rr.session_id where rr.id=$1`, [r])).rows[0];
check(moved.d === "2030-01-08" && moved.status === "approved", "session moved + request approved", JSON.stringify(moved));

console.log("\nChat:");
const conv = (await as("authenticated", S1, `insert into chat_conversations (student_id) values ($1) returning id`, [S1])).rows[0].id;
await expectFail("second conversation for same student refused", () => as("authenticated", S1, `insert into chat_conversations (student_id) values ($1)`, [S1]), /duplicate key/);
const before = (await db.query(`select last_message_at from chat_conversations where id=$1`, [conv])).rows[0].last_message_at;
const msg = (await as("authenticated", S1, `insert into chat_messages (conversation_id, sender_id, content) values ($1,$2,'halo') returning id`, [conv, S1])).rows[0].id;
const afterTs = (await db.query(`select last_message_at from chat_conversations where id=$1`, [conv])).rows[0].last_message_at;
check(afterTs >= before, "message insert bumps last_message_at", `${before} ${afterTs}`);
const selfRead = await as("authenticated", S1, `update chat_messages set is_read=true where id=$1 returning id`, [msg]);
check(selfRead.rows.length === 0, "sender cannot mark own message read", "updated");
await expectOk("admin (recipient) marks it read", () => as("authenticated", ADMIN, `update chat_messages set is_read=true where id=$1`, [msg]));
await expectFail("recipient cannot rewrite content", () => as("authenticated", ADMIN, `update chat_messages set content='edited' where id=$1`, [msg]), /read flag/);

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures ? 1 : 0);
