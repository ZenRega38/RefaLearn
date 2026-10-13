import { NextResponse } from "next/server";
import { jsonError, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkIn, loadStats } from "@/lib/gamification-server";

export const dynamic = "force-dynamic";

/** GET — the caller's XP, level, login streak and study streak. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const stats = await loadStats(createAdminClient(), auth.user.id);
  return NextResponse.json({ stats });
}

/** POST — daily check-in (the navbar calls it once a day): marks the login day and pays the daily XP once. */
export async function POST() {
  const auth = await requireUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const admin = createAdminClient();
  const awarded = await checkIn(admin, auth.user.id);
  const stats = await loadStats(admin, auth.user.id);
  return NextResponse.json({ awarded, stats });
}
