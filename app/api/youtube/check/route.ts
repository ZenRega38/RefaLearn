import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { checkYoutube } from "@/lib/youtube-server";

export const dynamic = "force-dynamic";

/** POST { urls: string[] } — admin-only check of story video links. */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const body = await readJson<{ urls?: unknown }>(request);
  const urls = Array.from(new Set(Array.isArray(body?.urls) ? body.urls.filter((u): u is string => typeof u === "string" && !!u.trim()) : [])).slice(0, 50);
  const entries = await Promise.all(urls.map(async (url) => [url, await checkYoutube(url)] as const));
  return NextResponse.json({ results: Object.fromEntries(entries) });
}
