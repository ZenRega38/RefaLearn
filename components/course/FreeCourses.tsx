"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type FreeCourse = { id: string; title: string; course_slug: string; cover_image_url: string | null; category: string | null };

/**
 * Free interactive courses on the student dashboard: every active store
 * material that links to a course and costs 0. The admin manages them on
 * the materials page like any other product.
 */
export function FreeCourses({ title = "Kursus Gratis" }: { title?: string }) {
  const [supabase] = useState(() => createClient());
  const [courses, setCourses] = useState<FreeCourse[]>([]);

  useEffect(() => {
    let alive = true;
    supabase
      .from("materials")
      .select("id, title, course_slug, cover_image_url, category")
      .eq("is_active", true)
      .eq("price", 0)
      .not("course_slug", "is", null)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (alive && data) setCourses(data as FreeCourse[]);
      });
    return () => {
      alive = false;
    };
  }, [supabase]);

  if (courses.length === 0) return null;
  return (
    <section className="space-y-3 font-[var(--font-inter)]">
      <h2 className="text-2xl font-[var(--font-kalam)] text-[var(--color-ink)]">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/learn/${c.course_slug}`}
            className="group flex items-center gap-4 p-4 rounded-[var(--radius-card)] border-2 border-[var(--color-success-green)]/50 bg-white hover:shadow-[var(--shadow-card-hover)] transition-shadow"
          >
            {c.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.cover_image_url} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
            ) : (
              <span className="w-16 h-16 rounded-lg bg-[var(--color-success-green)]/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-8 h-8 text-[var(--color-success-green)]" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-success-green)]">Gratis · Interaktif</span>
              <p className="font-bold text-[var(--color-ink)] leading-snug">{c.title}</p>
              {c.category && <p className="text-xs text-[var(--color-ink-soft)]">{c.category}</p>}
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-brand-blue)] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
