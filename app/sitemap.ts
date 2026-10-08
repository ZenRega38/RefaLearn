import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const supabase = createPublicClient();

  const [{ data: posts }, { data: materials }] = await Promise.all([
    supabase.from("news_posts").select("slug, updated_at").eq("status", "published"),
    supabase.from("materials").select("slug, updated_at").eq("is_active", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/schedule`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/alumni`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/materials`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticPages,
    ...(posts || []).map((p) => ({
      url: `${base}/news/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(materials || []).map((m) => ({
      url: `${base}/materials/${m.slug}`,
      lastModified: m.updated_at ? new Date(m.updated_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
