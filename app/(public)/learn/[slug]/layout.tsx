import type { Metadata } from "next";
import { CourseLayoutClient } from "@/components/course/CourseLayoutClient";
import { COURSES } from "@/lib/course/registry";
import { storeCopy } from "@/lib/course/store-copy";

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
    alternates: { canonical: `/learn/${slug}` },
    openGraph: { type: "website", title, description: description || undefined },
  };
}

export default async function CourseLayout({ children, params }: Props) {
  const { slug } = await params;
  return <CourseLayoutClient slug={slug}>{children}</CourseLayoutClient>;
}
