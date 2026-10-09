import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { advanceIfDue, buildState, control, sessionById } from "@/lib/live/server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

/** GET — the host screen state (full player list and answer counts). */
export async function GET(_req: Request, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const { id } = await params;
  const admin = createAdminClient();
  const found = await sessionById(admin, id);
  if (!found) return jsonError("Sesi tidak ditemukan.", 404);
  const session = await advanceIfDue(admin, found);
  return NextResponse.json(await buildState(admin, session, { host: true }));
}

/** POST { action: "start" | "next" | "end" | "kick", playerId? } — host controls. */
export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const { id } = await params;
  const body = await readJson<{ action?: string; playerId?: string }>(request);
  const admin = createAdminClient();
  const found = await sessionById(admin, id);
  if (!found) return jsonError("Sesi tidak ditemukan.", 404);
  const session = await advanceIfDue(admin, found);
  const error = await control(admin, session, body?.action ?? "", body?.playerId);
  if (error) return jsonError(error, 409);
  const updated = (await sessionById(admin, id)) ?? session;
  return NextResponse.json(await buildState(admin, updated, { host: true }));
}
