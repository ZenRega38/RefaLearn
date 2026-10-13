import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { addDays } from "@/lib/schedule-plan";
import { todayStr } from "@/lib/time";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

/**
 * POST { action: "stop", from: "yyyy-MM-dd" } — end an assigned schedule:
 * no more sessions are generated, and its sessions on or after `from` are
 * cancelled (by the admin, so no cancellation fee).
 */
export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const { id } = await params;
  const body = await readJson<{ action?: string; from?: string }>(request);
  if (body?.action !== "stop") return jsonError("Aksi tidak dikenal.");
  const from = body.from && /^\d{4}-\d{2}-\d{2}$/.test(body.from) ? body.from : todayStr();
  if (from < todayStr()) return jsonError("Tanggal berhenti tidak boleh di masa lalu.");

  const admin = createAdminClient();
  const { error: seriesError } = await admin
    .from("recurring_series")
    .update({ auto_extend: false, end_date: addDays(from, -1) })
    .eq("id", id);
  if (seriesError) return jsonError(errorMessage(seriesError), 500);

  const { data: cancelled, error } = await admin
    .from("sessions")
    .update({ status: "cancelled", notes: "Jadwal dihentikan oleh admin" })
    .eq("series_id", id)
    .in("status", ["pending", "accepted"])
    .gte("date", from)
    .select("id");
  if (error) return jsonError(errorMessage(error), 500);
  return NextResponse.json({ ok: true, cancelled: cancelled?.length ?? 0 });
}
