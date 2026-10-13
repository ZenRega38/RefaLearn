// YouTube links for stories. Client-safe: parsing only; the "does the video
// still exist and allow embedding" check is server-side (lib/youtube-server).

const ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * The 11-character video id from any common YouTube link — watch?v=,
 * youtu.be/, /shorts/, /live/, /embed/, with or without www/m — or null.
 */
export function youtubeId(url: string | null | undefined): string | null {
  const raw = (url ?? "").trim();
  if (!raw) return null;
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, "");
  let id: string | null = null;
  if (host === "youtu.be") {
    id = u.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (u.pathname === "/watch") id = u.searchParams.get("v");
    else {
      const m = u.pathname.match(/^\/(shorts|live|embed|v)\/([^/?#]+)/);
      id = m?.[2] ?? null;
    }
  }
  return id && ID.test(id) ? id : null;
}

/** Privacy-friendly embed URL; never autoplays. */
export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

export function youtubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export type YoutubeCheck =
  | { ok: true; id: string; title: string | null }
  /** format: not a YouTube video link. unavailable: removed, private or not
   * embeddable. unknown: YouTube couldn't be reached to check. */
  | { ok: false; reason: "format" | "unavailable" | "unknown" };

/** A link the admin must fix (not just "couldn't check right now"). */
export function isBrokenVideo(check: YoutubeCheck | null | undefined): boolean {
  return !!check && !check.ok && check.reason !== "unknown";
}

/** Admin-facing explanation of a failed check. */
export function youtubeProblem(check: YoutubeCheck): string | null {
  if (check.ok) return null;
  if (check.reason === "format") return "Link YouTube tidak dikenali. Contoh yang benar: https://www.youtube.com/watch?v=xxxxxxxxxxx atau https://youtu.be/xxxxxxxxxxx";
  if (check.reason === "unavailable") return "Video tidak bisa diputar: tidak ditemukan, privat, atau pemiliknya mematikan embed. Pembaca tidak akan melihat video ini.";
  return "Video belum bisa dicek ke YouTube saat ini. Coba lagi sebentar lagi.";
}
