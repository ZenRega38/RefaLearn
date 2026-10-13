import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { courseLd, ldJson } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

// The detail page is a client component, so its <head> metadata lives here.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await createPublicClient()
    .from("materials")
    .select("title, description, cover_image_url, category")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!data) return { title: "Materi Tidak Ditemukan" };

  const description = (data.description || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title: data.title,
    description,
    keywords: [data.title, ...(data.category ? [data.category] : []), "materi bahasa Inggris", "Refa Learn"],
    alternates: { canonical: `/materials/${slug}` },
    openGraph: { title: data.title, description, images: data.cover_image_url ? [data.cover_image_url] : [] },
    twitter: { card: data.cover_image_url ? "summary_large_image" : "summary", title: data.title, description },
  };
}

// The detail page renders in the browser; the Course data below gives search
// engines its title, full description and price without running JavaScript.
export default async function MaterialLayout({ children, params }: Props) {
  const { slug } = await params;
  const { data } = await createPublicClient()
    .from("materials")
    .select("title, description, price, cover_image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return (
    <>
      {data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: ldJson(
              courseLd({
                name: data.title,
                description: (data.description || data.title).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
                url: `${siteUrl()}/materials/${slug}`,
                price: data.price,
                image: data.cover_image_url,
              })
            ),
          }}
        />
      )}
      {children}
    </>
  );
}
