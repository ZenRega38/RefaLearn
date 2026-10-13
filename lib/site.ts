/**
 * Absolute site origin for canonical URLs, sitemap and share links.
 * NEXT_PUBLIC_SITE_URL wins; on Vercel without it, the project's production
 * domain (VERCEL_PROJECT_PRODUCTION_URL) is used so the sitemap never lists
 * localhost. Server-side only.
 */
export function siteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000")).replace(/\/$/, "");
}
