import { afterEach, describe, expect, it, vi } from "vitest";
import { siteUrl } from "@/lib/site";

describe("siteUrl", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("uses the real domain in production, even if a deployment URL leaks into the env", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://refa-learn-abc123-refa5.vercel.app");
    vi.stubEnv("VERCEL_URL", "refa-learn-abc123-refa5.vercel.app");
    expect(siteUrl()).toBe("https://refalearn.web.id");
  });

  it("lets SITE_URL override the production domain", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("SITE_URL", "https://www.refalearn.web.id/");
    expect(siteUrl()).toBe("https://www.refalearn.web.id");
  });

  it("uses the preview deployment or localhost elsewhere", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "refa-learn-git-x-refa5.vercel.app");
    expect(siteUrl()).toBe("https://refa-learn-git-x-refa5.vercel.app");
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("VERCEL_URL", "");
    expect(siteUrl()).toBe("http://localhost:3000");
  });
});
