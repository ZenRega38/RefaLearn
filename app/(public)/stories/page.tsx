import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { NewsBrowser, type NewsListItem } from "@/components/news/NewsBrowser";
import { formatTimestamp } from "@/lib/format";

// Server Component
export const metadata = {
  title: "Stories",
  description: "Cerita, pengalaman, tips belajar Bahasa Inggris, dan kabar terbaru dari Refa Learn Tarakan.",
  alternates: { canonical: "/stories" },
};

export const revalidate = 60; // Revalidate every minute

// Long enough to fill a card under even a one-line title; the card itself
// clamps it to the space that is left (see FillText in NewsBrowser).
const excerptOf = (html: string, length = 600) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= length) return text;
  const cut = text.substring(0, length);
  return `${cut.substring(0, cut.lastIndexOf(" "))}...`;
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
    formattedDate: post.published_at ? formatTimestamp(post.published_at, 'dd MMM yyyy', 'en') : '',
  }));

  return (
    <PaperBackground>
      <section className="pt-32 pb-16 relative">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl mb-6"><SketchBox color="var(--color-accent-yellow)">Stories</SketchBox></h1>
          <p className="text-lg text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            Stories, experiences, study tips and the latest news from Refa Learn.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">No stories have been published yet.</p>
            </div>
          ) : (
            <NewsBrowser posts={items} />
          )}
        </div>
      </section>
    </PaperBackground>
  );
}
