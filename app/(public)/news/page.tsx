import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { NewsBrowser, type NewsListItem } from "@/components/news/NewsBrowser";
import { formatTimestamp } from "@/lib/format";

// Server Component
export const metadata = {
  title: "Berita & Artikel",
  description: "Tips belajar Bahasa Inggris, informasi program terbaru, dan pengumuman dari Refa Learn Tarakan.",
  alternates: { canonical: "/news" },
};

export const revalidate = 60; // Revalidate every minute

const excerptOf = (html: string, length = 120) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export default async function NewsIndexPage() {
  const supabase = createPublicClient();

  // Fetch published news posts
  const { data: posts } = await supabase
    .from('news_posts')
    .select('id, title, slug, category, published_at, cover_image_url, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const items: NewsListItem[] = (posts || []).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    cover_image_url: post.cover_image_url,
    excerpt: excerptOf(post.content),
    formattedDate: post.published_at ? formatTimestamp(post.published_at) : '',
  }));

  return (
    <PaperBackground>
      <section className="pt-32 pb-16 relative">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Info & <SketchBox color="var(--color-accent-yellow)">Artikel</SketchBox></h1>
          <p className="text-lg text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            Tips belajar Bahasa Inggris, informasi program terbaru, dan pengumuman dari Refa Learn.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada artikel yang diterbitkan.</p>
            </div>
          ) : (
            <NewsBrowser posts={items} />
          )}
        </div>
      </section>
    </PaperBackground>
  );
}
