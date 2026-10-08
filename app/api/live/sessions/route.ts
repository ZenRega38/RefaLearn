import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_SECONDS, generatePin, getLiveSet } from "@/lib/live/server";

export const dynamic = "force-dynamic";

/**
 * POST { slug, levelId } — the admin opens a live-quiz lobby for a module.
 * If one is already running for that module, it is reused.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ slug?: string; levelId?: string }>(request);
  const set = body?.slug && body.levelId ? getLiveSet(body.slug, body.levelId) : null;
  if (!set || !body?.slug || !body.levelId) return jsonError("Live quiz untuk modul ini tidak ditemukan.", 404);

  const admin = createAdminClient();
  const { data: running } = await admin
    .from("live_sessions")
    .select("id, pin")
    .eq("course_slug", body.slug)
    .eq("level_id", body.levelId)
    .neq("status", "ended")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (running) return NextResponse.json(running);

  let pin: string;
  try {
    pin = await generatePin(admin);
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Gagal membuat PIN.", 500);
  }
  const { data, error } = await admin
    .from("live_sessions")
    .insert({
      pin,
      course_slug: body.slug,
      level_id: body.levelId,
      title: set.title,
      question_count: set.questions.length,
      seconds: set.seconds ?? DEFAULT_SECONDS,
      host_id: auth.user.id,
    })
    .select("id, pin")
    .single();
  if (error || !data) return jsonError("Gagal membuat lobi.", 500);
  return NextResponse.json(data);
}
