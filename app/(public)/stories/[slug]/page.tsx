import { createPublicClient } from "@/lib/supabase/public";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ShareButtons } from "@/components/news/ShareButtons";
import { Calendar, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { formatTimestamp } from "@/lib/format";
import { siteUrl } from "@/lib/site";

export const revalidate = 60; // Revalidate every minute

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('news_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  return data;
}

const excerptOf = (html: string) => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? `${text.substring(0, 160)}...` : text;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  const excerpt = excerptOf(post.content);

  return {
    title: post.title,
    description: excerpt,
    alternates: { canonical: `/stories/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: excerpt,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.published_at
    ? formatTimestamp(post.published_at, 'dd MMMM yyyy')
    : '';

  // Related posts: same category first, topped up with the latest others.
  const supabase = createPublicClient();
  const { data: candidates } = await supabase
    .from('news_posts')
    .select('id, title, slug, category, published_at')
    .eq('status', 'published')
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(12);
  const related = [
    ...(candidates || []).filter((p) => post.category && p.category === post.category),
    ...(candidates || []).filter((p) => !post.category || p.category !== post.category),
  ].slice(0, 3);

  const url = `${siteUrl()}/stories/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    author: { '@type': 'Organization', name: 'Refa Learn' },
    mainEntityOfPage: url,
  };

  return (
    <PaperBackground>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <article className="pt-24 pb-20 relative">
        <div className="container-main max-w-3xl mx-auto">

          <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)] mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Stories
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {post.category && <Badge variant="blue">{post.category}</Badge>}
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-inter)] leading-tight text-[var(--color-ink)] mb-8">
              {post.title}
            </h1>

            {post.cover_image_url && (
              <div className="w-full aspect-[16/9] rounded-[var(--radius-card)] overflow-hidden mb-10 border-2 border-[var(--color-line)] shadow-[var(--shadow-sketch)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div
            className="prose-content prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-6 border-t border-dashed border-[var(--color-line)]">
            <ShareButtons url={url} title={post.title} />
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl mb-6">Stories Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/stories/${r.slug}`} className="group">
                    <Card variant="sketch" className="p-4 h-full">
                      {r.category && <Badge variant="blue" className="mb-2">{r.category}</Badge>}
                      <h3 className="font-bold font-[var(--font-inter)] text-[var(--color-ink)] group-hover:text-[var(--color-brand-blue)] transition-colors leading-snug">
                        {r.title}
                      </h3>
                      {r.published_at && (
                        <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-2">{formatTimestamp(r.published_at)}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </PaperBackground>
  );
}
