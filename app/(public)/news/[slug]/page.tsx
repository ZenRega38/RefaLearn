import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Badge } from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('news_posts')
    .select('title, content, cover_image_url')
    .eq('slug', slug)
    .single();

  if (!post) {
    return { title: 'Not Found' };
  }

  const excerpt = post.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...';

  return {
    title: post.title,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from('news_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post || post.status !== 'published') {
    notFound();
  }

  const formattedDate = post.published_at 
    ? format(parseISO(post.published_at), 'dd MMMM yyyy', { locale: id })
    : '';

  return (
    <PaperBackground>
      <article className="pt-24 pb-20 relative">
        <div className="container-main max-w-3xl mx-auto">
          
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)] mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Berita
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
          
        </div>
      </article>
    </PaperBackground>
  );
}
