import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { advanceIfDue, hashToken, sessionByPin, submitAnswer } from "@/lib/live/server";

export const dynamic = "force-dynamic";

/** POST { index, choice } with header x-live-token — answer the open question. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  const token = request.headers.get("x-live-token");
  const body = await readJson<{ index?: number; choice?: number }>(request);
  if (!token || typeof body?.index !== "number" || typeof body.choice !== "number") return jsonError("Invalid answer.");

  const admin = createAdminClient();
  const found = await sessionByPin(admin, pin);
  if (!found) return jsonError("Quiz not found.", 404);
  const { data: player } = await admin.from("live_players").select("id").eq("session_id", found.id).eq("token_hash", hashToken(token)).maybeSingle();
  if (!player) return jsonError("You haven't joined this lobby.", 403);

  const session = await advanceIfDue(admin, found);
  const error = await submitAnswer(admin, session, player.id, body.index, body.choice);
  if (error) return jsonError(error, 409);
  return NextResponse.json({ ok: true });
}
