"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Quote } from "lucide-react";

export type AlumniItem = {
  id: string;
  name: string;
  photo_url: string | null;
  achievement_title: string | null;
  achievement_detail: string | null;
  testimonial_text: string | null;
  category: string | null;
};

/** Alumni cards with a category filter (client-side, same data). */
export function AlumniGrid({ alumni }: { alumni: AlumniItem[] }) {
  const [category, setCategory] = useState("Semua");
  const categories = ["Semua", ...Array.from(new Set(alumni.map((a) => a.category).filter((c): c is string => !!c)))];
  const visible = category === "Semua" ? alumni : alumni.filter((a) => a.category === category);

  return (
    <div className="space-y-8">
      {categories.length > 2 && (
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar justify-start md:justify-center">
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((item) => (
          <Card key={item.id} variant="sketch" className="p-6 md:p-8 flex flex-col h-full relative">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--color-paper-bg-alt)] -z-0" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-paper-bg)] border-2 border-[var(--color-line)] flex items-center justify-center overflow-hidden shrink-0 shadow-[var(--shadow-sketch)]">
                  {item.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-xl text-[var(--color-ink-soft)]">{item.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-ink)] font-[var(--font-inter)]">{item.name}</h3>
                  {item.category && (
                    <Badge variant="outline" className="mt-1 bg-white">{item.category}</Badge>
                  )}
                </div>
              </div>

              {(item.achievement_title || item.achievement_detail) && (
                <div className="mb-6 p-4 bg-[var(--color-paper-bg-alt)] rounded-[var(--radius-sketch)] border border-[var(--color-line)] border-dashed">
                  <div className="font-bold text-[var(--color-brand-blue)] text-lg leading-tight mb-1">{item.achievement_title}</div>
                  <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{item.achievement_detail}</div>
                </div>
              )}

              {item.testimonial_text && (
                <div className="mt-auto">
                  <p className="text-[var(--color-ink)] font-[var(--font-inter)] text-sm italic leading-relaxed">
                    &ldquo;{item.testimonial_text}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
