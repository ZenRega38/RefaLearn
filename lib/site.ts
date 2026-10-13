/** The public domain search engines and emails should point to. */
export const PRODUCTION_ORIGIN = "https://refalearn.web.id";

/**
 * Absolute site origin for canonical URLs, the sitemap, share links and
 * email buttons. Server-side only.
 *
 * Production always uses the real domain (SITE_URL can override it), never
 * a per-deployment *.vercel.app address: those are login-protected, so
 * Google rejected every sitemap URL and canonical link pointing at them.
 * Elsewhere: NEXT_PUBLIC_SITE_URL, then the preview deployment, then localhost.
 */
export function siteUrl(): string {
  const origin =
    process.env.VERCEL_ENV === "production"
      ? process.env.SITE_URL || PRODUCTION_ORIGIN
      : process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return origin.replace(/\/$/, "");
}
