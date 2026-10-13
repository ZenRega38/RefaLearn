import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

/** POST { action: "cancel" } — withdraw a schedule the student hasn't answered yet. */
export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const { id } = await params;
  const body = await readJson<{ action?: string }>(request);
  if (body?.action !== "cancel") return jsonError("Aksi tidak dikenal.");

  const { data, error } = await createAdminClient()
    .from("schedule_offers")
    .update({ status: "cancelled", responded_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id");
  if (error) return jsonError(errorMessage(error), 500);
  if (!data || data.length === 0) return jsonError("Jadwal ini sudah tidak menunggu persetujuan.", 409);
  return NextResponse.json({ ok: true });
}
