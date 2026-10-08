"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, ArrowRight, LayoutGrid, List } from "lucide-react";

export type NewsListItem = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  cover_image_url: string | null;
  excerpt: string;
  formattedDate: string;
};

/** Client-side grid/list toggle + category filter over server-fetched posts. */
export function NewsBrowser({ posts }: { posts: NewsListItem[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState("Semua");
  const categories = ["Semua", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))];
  const visible = category === "Semua" ? posts : posts.filter((p) => p.category === category);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold font-[var(--font-inter)] transition-colors ${category === cat
                ? "bg-[var(--color-brand-blue)] text-white"
                : "bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white border border-[var(--color-line)] rounded-full p-1 shrink-0">
          <button
            onClick={() => setView("grid")}
            aria-label="Tampilan grid"
            aria-pressed={view === "grid"}
            className={`p-2 rounded-full transition-colors ${view === "grid" ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="Tampilan daftar"
            aria-pressed={view === "list"}
            className={`p-2 rounded-full transition-colors ${view === "list" ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada story di kategori ini.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((post) => (
            <Link href={`/stories/${post.slug}`} key={post.id} className="group h-full flex">
              <Card variant="sketch" className="p-0 overflow-hidden flex flex-col w-full hover:border-[var(--color-brand-blue)] transition-colors duration-300">
                {post.cover_image_url ? (
                  <div className="w-full h-48 bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    {post.category ? <Badge variant="blue">{post.category}</Badge> : <span />}
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.formattedDate}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold font-[var(--font-inter)] leading-snug mb-3 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-coral)] font-[var(--font-inter)]">
                    Baca selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((post) => (
            <Link href={`/stories/${post.slug}`} key={post.id} className="group block">
              <Card variant="sketch" className="p-0 overflow-hidden flex flex-col sm:flex-row hover:border-[var(--color-brand-blue)] transition-colors duration-300">
                <div className="sm:w-56 h-40 sm:h-auto shrink-0 bg-[var(--color-paper-bg-alt)] border-b sm:border-b-0 sm:border-r border-[var(--color-line)] overflow-hidden flex items-center justify-center">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="font-[var(--font-kalam)] text-2xl text-[var(--color-line)] opacity-50">Refa Learn</span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {post.category && <Badge variant="blue">{post.category}</Badge>}
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.formattedDate}
                    </div>
                  </div>
                  <h2 className="text-lg font-bold font-[var(--font-inter)] leading-snug mb-2 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
