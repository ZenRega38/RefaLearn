import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SketchBox } from "@/components/sketch/SketchBox";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, ArrowRight } from "lucide-react";

// Server Component
export const metadata = {
  title: "Berita & Artikel",
};

export const revalidate = 60; // Revalidate every minute

export default async function NewsIndexPage() {
  const supabase = await createClient();
  
  // Fetch published news posts
  const { data: posts } = await supabase
    .from('news_posts')
    .select('id, title, slug, category, published_at, cover_image_url, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

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
          {(!posts || posts.length === 0) ? (
            <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada artikel yang diterbitkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Extract brief excerpt from HTML content
                const excerpt = post.content
                  .replace(/<[^>]+>/g, '') // Strip HTML
                  .substring(0, 120) + '...';

                const formattedDate = post.published_at 
                  ? format(parseISO(post.published_at), 'dd MMM yyyy', { locale: id })
                  : '';

                return (
                  <Link href={`/news/${post.slug}`} key={post.id} className="group h-full flex">
                    <Card variant="sketch" className="p-0 overflow-hidden flex flex-col w-full hover:border-[var(--color-brand-blue)] transition-colors duration-300">
                      {post.cover_image_url ? (
                        <div className="w-full h-48 bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] overflow-hidden">
                          <img 
                            src={post.cover_image_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] flex items-center justify-center">
                          <span className="font-[var(--font-kalam)] text-3xl text-[var(--color-line)] opacity-50">Refa Learn</span>
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          {post.category ? (
                            <Badge variant="blue">{post.category}</Badge>
                          ) : (
                            <span />
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-bold font-[var(--font-inter)] leading-snug mb-3 group-hover:text-[var(--color-brand-blue)] transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm mb-6 flex-1 line-clamp-3">
                          {excerpt}
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-coral)] font-[var(--font-inter)]">
                          Baca selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PaperBackground>
  );
}
