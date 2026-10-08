import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken, MAX_PLAYERS, newToken, sessionByPin } from "@/lib/live/server";
import { LIVE_AVATARS } from "@/lib/live/types";

export const dynamic = "force-dynamic";

/** POST { nickname, avatar } — join a live quiz without an account. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  const body = await readJson<{ nickname?: string; avatar?: string }>(request);
  const nickname = (body?.nickname ?? "").replace(/\s+/g, " ").trim().slice(0, 20);
  if (nickname.length < 2) return jsonError("Nama minimal 2 huruf.");
  const avatar = LIVE_AVATARS.includes(body?.avatar as (typeof LIVE_AVATARS)[number]) ? body!.avatar! : "owl";

  const admin = createAdminClient();
  const session = await sessionByPin(admin, pin);
  if (!session || session.status === "ended") return jsonError("Kuis ini tidak ditemukan atau sudah selesai.", 404);
  if (session.status === "podium") return jsonError("Kuis ini sudah selesai.", 409);

  const { count } = await admin.from("live_players").select("id", { count: "exact", head: true }).eq("session_id", session.id);
  if ((count ?? 0) >= MAX_PLAYERS) return jsonError("Lobi sudah penuh.", 409);

  const token = newToken();
  const { data, error } = await admin
    .from("live_players")
    .insert({ session_id: session.id, nickname, avatar, token_hash: hashToken(token) })
    .select("id")
    .single();
  if (error) return jsonError(error.code === "23505" ? "Nama itu sudah dipakai di lobi ini. Coba nama lain." : "Gagal masuk lobi.", error.code === "23505" ? 409 : 500);
  return NextResponse.json({ playerId: data.id, token });
}
