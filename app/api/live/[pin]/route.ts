import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { advanceIfDue, buildState, hashToken, sessionByPin } from "@/lib/live/server";

export const dynamic = "force-dynamic";

/**
 * GET — what a player sees right now. No account needed: the player is
 * identified by the token they got when joining (header x-live-token).
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  const admin = createAdminClient();
  const found = await sessionByPin(admin, pin);
  if (!found) return jsonError("PIN tidak ditemukan. Cek lagi angkanya, ya.", 404);
  const session = await advanceIfDue(admin, found);

  let playerId: string | null = null;
  const token = request.headers.get("x-live-token");
  if (token) {
    const { data } = await admin.from("live_players").select("id").eq("session_id", session.id).eq("token_hash", hashToken(token)).maybeSingle();
    playerId = data?.id ?? null;
  }
  const state = await buildState(admin, session, { playerId });
  return NextResponse.json({ ...state, joined: !!playerId }, { headers: { "Cache-Control": "no-store" } });
}
