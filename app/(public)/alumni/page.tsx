import { createClient } from "@/lib/supabase/server";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SketchBox } from "@/components/sketch/SketchBox";
import { SketchDivider } from "@/components/sketch/SketchDivider";
import { Quote } from "lucide-react";

export const metadata = {
  title: "Testimoni Alumni",
};

export const revalidate = 60; // Revalidate every minute

export default async function AlumniPage() {
  const supabase = await createClient();
  
  // Fetch alumni
  const { data: alumniList } = await supabase
    .from('alumni')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  // Get unique categories for simple filtering (client-side in a real app, but server-rendered here for simplicity)
  // For a more advanced version, we'd use a client component for filtering.
  // Here we just display all of them grouped or in a grid.

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {alumniList.map((alumni) => (
                <Card key={alumni.id} variant="sketch" className="p-6 md:p-8 flex flex-col h-full relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--color-paper-bg-alt)] -z-0" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-paper-bg)] border-2 border-[var(--color-line)] flex items-center justify-center overflow-hidden shrink-0 shadow-[var(--shadow-sketch)]">
                        {alumni.photo_url ? (
                          <img src={alumni.photo_url} alt={alumni.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-xl text-[var(--color-ink-soft)]">{alumni.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-[var(--color-ink)] font-[var(--font-inter)]">{alumni.name}</h3>
                        {alumni.category && (
                          <Badge variant="outline" className="mt-1 bg-white">{alumni.category}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6 p-4 bg-[var(--color-paper-bg-alt)] rounded-[var(--radius-sketch)] border border-[var(--color-line)] border-dashed">
                      <div className="font-bold text-[var(--color-brand-blue)] text-lg leading-tight mb-1">{alumni.achievement_title}</div>
                      <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{alumni.achievement_detail}</div>
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-[var(--color-ink)] font-[var(--font-inter)] text-sm italic leading-relaxed">
                        "{alumni.testimonial_text}"
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <SketchDivider color="var(--color-accent-yellow)" strokeWidth={3} className="opacity-50" />
      
      <section className="section-padding text-center">
        <div className="container-main max-w-3xl mx-auto">
          <h2 className="text-3xl mb-6 font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Siap menjadi cerita sukses berikutnya?
          </h2>
          <a href="/schedule" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg">
            Booking Sesi Pertama Anda
          </a>
        </div>
      </section>
    </PaperBackground>
  );
}
