import type { Metadata } from "next";
import { CourseLayoutClient } from "@/components/course/CourseLayoutClient";
import { COURSES } from "@/lib/course/registry";
import { storeCopy } from "@/lib/course/store-copy";
import { courseLd, ldJson } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { createPublicClient } from "@/lib/supabase/public";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

/** Title and description for search results and link previews. */
export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const copy = storeCopy(slug);
  const title = copy?.title ?? COURSES.find((c) => c.slug === slug)?.title;
  if (!title) return {};
  const description = (copy?.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title: `${title} — Kursus Interaktif`,
    description: description || undefined,
    keywords: [title, "kursus bahasa Inggris online", "kursus interaktif", "Refa Learn"],
    alternates: { canonical: `/learn/${slug}` },
    openGraph: { type: "website", title, description: description || undefined },
  };
}

export default async function CourseLayout({ children, params }: Props) {
  const { slug } = await params;
  const copy = storeCopy(slug);
  // The page itself renders in the browser; this gives search engines the
  // course name, description and price without running JavaScript.
  const { data: material } = copy
    ? await createPublicClient().from("materials").select("price, cover_image_url").eq("course_slug", slug).eq("is_active", true).order("price").limit(1).maybeSingle()
    : { data: null };
  return (
    <CourseLayoutClient slug={slug}>
      {copy && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: ldJson(
              courseLd({
                name: copy.title,
                description: copy.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
                url: `${siteUrl()}/learn/${slug}`,
                price: material?.price ?? null,
                image: material?.cover_image_url ?? null,
              })
            ),
          }}
        />
      )}
      {children}
    </CourseLayoutClient>
  );
}
