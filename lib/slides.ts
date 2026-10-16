// Slide-deck links for course modules. Client-safe: parsing only. The admin
// pastes a share link (Google Slides, Google Drive, Canva, or a direct
// PDF/PPT file) and the course page shows it in an iframe.

export type SlideEmbed = {
  /** What the iframe loads. */
  embedUrl: string;
  /** The "open in a new tab" link. */
  openUrl: string;
  /** Portrait documents (PDF) get a taller frame than 16:9 decks. */
  shape: "wide" | "tall";
};

const ID = /^[A-Za-z0-9_-]{10,}$/;

/**
 * The embeddable form of a share link, or null for a link we can't show:
 *
 * - Google Slides  docs.google.com/presentation/d/<id>/edit  (also /d/e/<id>/pub)
 * - Google Docs    docs.google.com/document/d/<id>/edit
 * - Google Drive   drive.google.com/file/d/<id>/view, open?id=<id>, uc?id=<id>
 *                  (any file Drive can preview: PDF, PPTX, DOCX…)
 * - Canva          canva.com/design/<id>/<key>/view
 * - A direct https link to a .pdf, or a .ppt/.pptx (via the Office viewer)
 *
 * Google files must be shared as "anyone with the link can view".
 */
export function slideEmbed(url: string | null | undefined): SlideEmbed | null {
  const raw = (url ?? "").trim();
  if (!raw) return null;
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = u.hostname.replace(/^www\./, "");
  const path = u.pathname;

  if (host === "docs.google.com") {
    const published = path.match(/^\/presentation\/d\/e\/([^/]+)/);
    if (published && ID.test(published[1])) {
      const base = `https://docs.google.com/presentation/d/e/${published[1]}`;
      return { embedUrl: `${base}/embed?start=false&loop=false`, openUrl: `${base}/pub`, shape: "wide" };
    }
    const doc = path.match(/^\/(presentation|document)\/d\/([^/]+)/);
    if (doc && ID.test(doc[2])) {
      const base = `https://docs.google.com/${doc[1]}/d/${doc[2]}`;
      return { embedUrl: `${base}/preview`, openUrl: `${base}/view`, shape: doc[1] === "document" ? "tall" : "wide" };
    }
    return null;
  }

  if (host === "drive.google.com") {
    const id = path.match(/^\/file\/d\/([^/]+)/)?.[1] ?? ((path === "/open" || path === "/uc") ? u.searchParams.get("id") : null);
    if (!id || !ID.test(id)) return null;
    const base = `https://drive.google.com/file/d/${id}`;
    return { embedUrl: `${base}/preview`, openUrl: `${base}/view`, shape: "wide" };
  }

  if (host === "canva.com") {
    const m = path.match(/^\/design\/([^/]+)\/([^/]+)/);
    if (!m) return null;
    const base = `https://www.canva.com/design/${m[1]}/${m[2]}/view`;
    return { embedUrl: `${base}?embed`, openUrl: base, shape: "wide" };
  }

  // A file hosted anywhere else. https only: an http frame is blocked on an https page.
  if (u.protocol !== "https:") return null;
  const file = u.toString();
  if (/\.pdf$/i.test(path)) return { embedUrl: file, openUrl: file, shape: "tall" };
  if (/\.pptx?$/i.test(path)) {
    return { embedUrl: `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file)}`, openUrl: file, shape: "wide" };
  }
  return null;
}
