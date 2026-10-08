/**
 * Accepts only same-site relative paths for post-login redirects, so
 * `?next=https://evil.example` or `?next=//evil.example` can't bounce a
 * freshly logged-in user off-site.
 */
export function safeNextPath(value: string | null | undefined, fallback: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}
