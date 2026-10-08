import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

// The detail page is a client component, so its <head> metadata lives here.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await createPublicClient()
    .from("materials")
    .select("title, description, cover_image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!data) return { title: "Materi Tidak Ditemukan" };

  const description = (data.description || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title: data.title,
    description,
    alternates: { canonical: `/materials/${slug}` },
    openGraph: { title: data.title, description, images: data.cover_image_url ? [data.cover_image_url] : [] },
  };
}

export default function MaterialLayout({ children }: Props) {
  return children;
}
