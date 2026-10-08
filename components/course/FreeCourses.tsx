import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES } from "@/lib/course/registry";
import { Picture } from "@/components/course/pictures";

/** Cards for the free interactive courses, shown in the store and the student dashboard. */
export function FreeCourses({ title = "Kursus Gratis" }: { title?: string }) {
  const free = COURSES.filter((c) => "free" in c && c.free);
  if (free.length === 0) return null;
  return (
    <section className="space-y-3 font-[var(--font-inter)]">
      <h2 className="text-2xl font-[var(--font-kalam)] text-[var(--color-ink)]">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {free.map((c) => (
          <Link
            key={c.slug}
            href={`/learn/${c.slug}`}
            className="group flex items-center gap-4 p-4 rounded-[var(--radius-card)] border-2 border-[var(--color-success-green)]/50 bg-white hover:shadow-[var(--shadow-card-hover)] transition-shadow"
          >
            {"pic" in c && <Picture name={c.pic} className="w-16 h-16 shrink-0" />}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-success-green)]">Gratis · Interaktif</span>
              <p className="font-bold text-[var(--color-ink)] leading-snug">{c.title}</p>
              {"blurb" in c && <p className="text-xs text-[var(--color-ink-soft)] line-clamp-2">{c.blurb}</p>}
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-brand-blue)] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
