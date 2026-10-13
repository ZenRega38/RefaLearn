import "server-only";
import { youtubeId, type YoutubeCheck } from "@/lib/youtube";

/**
 * Does this link point to a video that exists and may be embedded? Asks
 * YouTube's oEmbed endpoint (cached for an hour). When YouTube can't be
 * reached the result is "unknown": readers don't see the video until a later
 * check succeeds, and the admin isn't told the link is broken.
 */
export async function checkYoutube(url: string | null | undefined): Promise<YoutubeCheck | null> {
  if (!url?.trim()) return null;
  const id = youtubeId(url);
  if (!id) return { ok: false, reason: "format" };
  try {
    const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = (await res.json()) as { title?: string };
      return { ok: true, id, title: data.title ?? null };
    }
    // 400/401/403/404: removed, private, or embedding turned off.
    if (res.status >= 400 && res.status < 500) return { ok: false, reason: "unavailable" };
    return { ok: false, reason: "unknown" };
  } catch {
    return { ok: false, reason: "unknown" };
  }
}
