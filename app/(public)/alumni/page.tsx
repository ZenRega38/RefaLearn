import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { AlumniGrid, type AlumniItem } from "@/components/alumni/AlumniGrid";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { SketchDivider } from "@/components/sketch/SketchDivider";

export const metadata = {
  title: "Testimoni Alumni",
  description: "Cerita sukses alumni les privat Bahasa Inggris Refa Learn Tarakan — IELTS, TOEFL, beasiswa, dan sekolah.",
  alternates: { canonical: "/alumni" },
};

export const revalidate = 60; // Revalidate every minute

export default async function AlumniPage() {
  const supabase = createPublicClient();
  
  // Fetch alumni
  const { data: alumniList } = await supabase
    .from('alumni')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <PaperBackground>
      <section className="pt-32 pb-16 relative">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Cerita <SketchBox color="var(--color-accent-coral)">Sukses</SketchBox> Alumni</h1>
          <p className="text-lg text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            Bergabunglah dengan ratusan siswa lainnya yang telah mencapai target mereka bersama Refa Learn.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main">
          {(!alumniList || alumniList.length === 0) ? (
            <div className="text-center py-20 bg-white/50 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada data alumni yang dipublikasikan.</p>
            </div>
          ) : (
            <AlumniGrid alumni={alumniList as AlumniItem[]} />
          )}
        </div>
      </section>

      <SketchDivider color="var(--color-accent-yellow)" strokeWidth={3} className="opacity-50" />
      
      <section className="section-padding text-center">
        <div className="container-main max-w-3xl mx-auto">
          <h2 className="text-3xl mb-6 font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Siap menjadi cerita sukses berikutnya?
          </h2>
          <Link href="/schedule" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg">
            Booking Sesi Pertama Anda
          </Link>
        </div>
      </section>
    </PaperBackground>
  );
}
