"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CategoryBadges } from "@/components/ui/CategoryBadges";
import { PillDropdown } from "@/components/ui/PillDropdown";
import { splitCategories } from "@/lib/format";
import { Calendar, ArrowRight, LayoutGrid, List } from "lucide-react";
import { useTr } from "@/components/i18n/LangProvider";

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
  const tr = useTr();
  // "" is "all categories".
  const [category, setCategory] = useState("");
  // A post can carry several comma-separated categories; each one becomes its own filter.
  const categories = Array.from(new Set(posts.flatMap((p) => splitCategories(p.category))));
  const visible = category === "" ? posts : posts.filter((p) => splitCategories(p.category).includes(category));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <PillDropdown
          options={[{ key: "", label: tr("Semua", "All") }, ...categories.map((c) => ({ key: c, label: c }))]}
          value={category}
          onChange={setCategory}
          className="w-full md:w-auto"
        />
        <div className="flex gap-1 bg-white border border-[var(--color-line)] rounded-full p-1 shrink-0">
          <button
            onClick={() => setView("grid")}
            aria-label={tr("Tampilan grid", "Grid view")}
            aria-pressed={view === "grid"}
            className={`p-2 rounded-full transition-colors ${view === "grid" ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label={tr("Tampilan daftar", "List view")}
            aria-pressed={view === "list"}
            className={`p-2 rounded-full transition-colors ${view === "list" ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">{tr("Belum ada story di kategori ini.", "No stories in this category yet.")}</p>
        </div>
      ) : view === "grid" ? (
        // auto-rows-fr: every card is as tall as the tallest one, across rows too.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
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
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <CategoryBadges category={post.category} />
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.formattedDate}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold font-[var(--font-inter)] leading-snug mb-3 line-clamp-3 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h2>

                  {/* The excerpt fills whatever height the title leaves, at least 3 lines. */}
                  <div className="relative flex-1 min-h-[3.75rem] mb-6">
                    <FillText text={post.excerpt} className="absolute inset-x-0 top-0 text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm" />
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-coral)] font-[var(--font-inter)]">
                    {tr("Baca selengkapnya", "Read more")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <CategoryBadges category={post.category} />
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

/**
 * Paragraph that shows as many whole lines as fit its parent's height and
 * ends with an ellipsis, so cards with short titles get more excerpt instead
 * of empty space. Starts at 3 lines until measured. The paragraph's own height
 * is capped at exactly that many lines: with -webkit-line-clamp alone, a box
 * taller than the clamped lines still shows a sliver of the next line.
 */
function FillText({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [fit, setFit] = useState<{ lines: number; lineHeight: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      if (lineHeight > 0) setFit({ lines: Math.max(1, Math.floor(box.clientHeight / lineHeight)), lineHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const lines = fit?.lines ?? 3;
  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        overflow: "hidden",
        maxHeight: fit ? fit.lines * fit.lineHeight : undefined,
      }}
    >
      {text}
    </p>
  );
}
