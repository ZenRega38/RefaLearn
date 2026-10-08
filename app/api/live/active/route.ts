import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * GET ?course=slug&level=id — the live quiz currently running for a module,
 * if any (public: powers the "Live Quiz sedang berlangsung" banner inside
 * the module). Sessions older than 6 hours are treated as abandoned.
 */
export async function GET(request: NextRequest) {
  const course = request.nextUrl.searchParams.get("course");
  const level = request.nextUrl.searchParams.get("level");
  if (!course || !level) return NextResponse.json({ session: null });

  const admin = createAdminClient();
  const since = new Date(Date.now() - 6 * 3600_000).toISOString();
  const { data } = await admin
    .from("live_sessions")
    .select("pin, title, status")
    .eq("course_slug", course)
    .eq("level_id", level)
    .neq("status", "ended")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json({ session: data ?? null }, { headers: { "Cache-Control": "no-store" } });
}
