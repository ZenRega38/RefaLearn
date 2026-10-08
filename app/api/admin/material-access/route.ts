import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserEmail, sendMaterialGrantedEmail } from "@/lib/email";

/**
 * POST { studentId, materialIds, note? } — give a student materials for free.
 * Stored as a confirmed, zero-total order with source = 'grant', so every
 * existing access check (downloads, interactive courses) just works.
 * Materials the student already owns or is paying for are skipped.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ studentId?: string; materialIds?: string[]; note?: string }>(request);
  const ids = Array.from(new Set(body?.materialIds || [])).filter((x) => typeof x === "string");
  if (!body?.studentId || ids.length === 0) return jsonError("Pilih siswa dan minimal satu materi.");

  const admin = createAdminClient();
  const [{ data: student }, { data: materials }, { data: existing }] = await Promise.all([
    admin.from("profiles").select("id, full_name, role").eq("id", body.studentId).maybeSingle(),
    admin.from("materials").select("id, title").in("id", ids),
    admin.from("material_orders").select("material_ids").eq("student_id", body.studentId).in("status", ["pending", "proof_uploaded", "confirmed"]),
  ]);

  if (!student || student.role !== "student") return jsonError("Siswa tidak ditemukan.", 404);

  const owned = new Set((existing || []).flatMap((o) => o.material_ids as string[]));
  const toGrant = (materials || []).filter((m) => !owned.has(m.id));
  if (toGrant.length === 0) return jsonError("Siswa ini sudah memiliki (atau sedang membeli) semua materi yang dipilih.", 409);

  const { error } = await admin.from("material_orders").insert([
    {
      student_id: student.id,
      material_ids: toGrant.map((m) => m.id),
      total_amount: 0,
      status: "confirmed",
      source: "grant",
      granted_by: auth.user.id,
      note: (body.note || "").trim().slice(0, 300) || null,
      confirmed_at: new Date().toISOString(),
    },
  ]);
  if (error) return jsonError(errorMessage(error), 500);

  try {
    const email = await getUserEmail(student.id);
    if (email) await sendMaterialGrantedEmail(email, { studentName: student.full_name || "Siswa", titles: toGrant.map((m) => m.title) });
  } catch (err) {
    console.error("[admin/material-access] notify failed:", err);
  }

  return NextResponse.json({ ok: true, granted: toGrant.length, skipped: ids.length - toGrant.length });
}

/** DELETE { orderId } — revoke a grant. Purchases can't be revoked here. */
export async function DELETE(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ orderId?: string }>(request);
  if (!body?.orderId) return jsonError("orderId wajib diisi.");

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("material_orders")
    .delete()
    .eq("id", body.orderId)
    .eq("source", "grant")
    .select("id");
  if (error) return jsonError(errorMessage(error), 500);
  if (!data || data.length === 0) return jsonError("Akses pemberian tidak ditemukan.", 404);

  return NextResponse.json({ ok: true });
}
