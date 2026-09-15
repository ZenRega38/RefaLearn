import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchDivider } from "@/components/sketch/SketchDivider";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { Mail, MessageCircle, MapPin, GraduationCap, Award } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
};

export default function AboutPage() {
  return (
    <PaperBackground>
      {/* Header */}
      <section className="pt-32 pb-16 relative">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Cerita <SketchBox color="var(--color-accent-coral)">Refa Learn</SketchBox></h1>
          <p className="text-lg text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            Berawal dari passion untuk menjembatani pelajar Indonesia dengan dunia melalui penguasaan Bahasa Inggris yang percaya diri.
          </p>
        </div>
      </section>

      <SketchDivider color="var(--color-line)" strokeWidth={2} />

      {/* Founder Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative">
                {/* Image Placeholder */}
                <div className="aspect-square bg-[var(--color-paper-bg-alt)] border-2 border-[var(--color-line)] rounded-[var(--radius-card)] overflow-hidden flex items-center justify-center">
                  <span className="text-[var(--color-ink-soft)] font-medium font-[var(--font-inter)]">Foto Founder</span>
                </div>
                {/* Sketch elements */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-dashed border-[var(--color-brand-blue)] rounded-[var(--radius-card)] -z-10" />
                <div className="absolute top-4 -left-4 font-[var(--font-caveat)] text-2xl text-[var(--color-accent-coral)] rotate-[-10deg]">
                  "Halo!"
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl mb-2">Refa</h2>
              <p className="text-[var(--color-brand-blue)] font-bold font-[var(--font-inter)] mb-6 tracking-wide uppercase text-sm">Founder & Lead Tutor</p>
              
              <div className="prose-content">
                <p>
                  Sebagai tutor berpengalaman yang juga aktif mengajar di platform EduTech ternama seperti Ruangguru, saya menyadari satu kendala besar yang sering dihadapi pelajar: <strong>kurangnya personalisasi dan kepercayaan.</strong>
                </p>
                <p>
                  Banyak kursus yang mengharuskan komitmen biaya besar di depan tanpa menjamin kecocokan metode belajar. Itulah sebabnya Refa Learn lahir dengan konsep <strong>Bayar Setelah Kelas</strong>. Kami percaya bahwa kepercayaan harus dibangun dari dua arah.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm font-[var(--font-inter)] bg-white px-3 py-1.5 rounded-full border border-[var(--color-line)] shadow-sm">
                    <GraduationCap className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    <span>English Education</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-[var(--font-inter)] bg-white px-3 py-1.5 rounded-full border border-[var(--color-line)] shadow-sm">
                    <Award className="w-4 h-4 text-[var(--color-accent-coral)]" />
                    <span>IELTS/TOEFL Expert</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-[var(--font-inter)] bg-white px-3 py-1.5 rounded-full border border-[var(--color-line)] shadow-sm">
                    <Award className="w-4 h-4 text-[var(--color-success-green)]" />
                    <span>Ruangguru Tutor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Co-founder Placeholder (if needed later) */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center mt-20 pt-20 border-t border-dashed border-[var(--color-line)] hidden">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="aspect-square bg-[var(--color-paper-bg-alt)] border-2 border-[var(--color-line)] rounded-[var(--radius-card)] overflow-hidden flex items-center justify-center">
                  <span className="text-[var(--color-ink-soft)] font-medium font-[var(--font-inter)]">Foto Co-Founder</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-dashed border-[var(--color-accent-yellow)] rounded-[var(--radius-card)] -z-10" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl mb-2">Nama Co-Founder</h2>
              <p className="text-[var(--color-brand-blue)] font-bold font-[var(--font-inter)] mb-6 tracking-wide uppercase text-sm">Co-Founder & Tutor</p>
              
              <div className="prose-content">
                <p>
                  Bio singkat mengenai co-founder akan dituliskan di sini. Menjelaskan latar belakang, keahlian, dan peran dalam memastikan kualitas pengajaran di Refa Learn tetap maksimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180 opacity-20 text-[var(--color-paper-bg-alt)]">
          <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="container-main relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            <Card variant="sketch" className="p-8 border-[var(--color-brand-blue)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--color-brand-blue)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <h2 className="text-2xl mb-4 text-[var(--color-brand-blue)]">Visi</h2>
              <p className="font-[var(--font-inter)] text-[var(--color-ink-soft)] text-lg leading-relaxed">
                Menjadi katalis pembelajaran Bahasa Inggris yang adaptif dan terpercaya bagi generasi muda Indonesia, mempersiapkan mereka untuk kompetisi akademik global tanpa batas.
              </p>
            </Card>

            <Card variant="sketch" className="p-8 border-[var(--color-accent-coral)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--color-accent-coral)"><path d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2 1 21z"/></svg>
              </div>
              <h2 className="text-2xl mb-4 text-[var(--color-accent-coral)]">Misi</h2>
              <ul className="space-y-4 font-[var(--font-inter)] text-[var(--color-ink-soft)] text-base">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[var(--color-accent-coral)]">1.</span>
                  Menyediakan sesi privat yang 100% dipersonalisasi berdasarkan tingkat kemampuan dan target siswa.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[var(--color-accent-coral)]">2.</span>
                  Membangun sistem pembayaran yang adil, transparan, dan berbasis kepercayaan penuh.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[var(--color-accent-coral)]">3.</span>
                  Menyediakan materi pembelajaran mandiri berkualitas (modul & latihan soal) yang mudah diakses.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Hubungi Kami */}
      <section className="section-padding bg-[var(--color-paper-bg-alt)] border-t border-[var(--color-line)]">
        <div className="container-main max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-8">Punya Pertanyaan?</h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/6280000000000" className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-[var(--radius-card)] border border-[var(--color-line)] hover:border-[var(--color-success-green)] hover:shadow-md transition-all group">
              <MessageCircle className="text-[var(--color-success-green)] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">WhatsApp</p>
                <p className="font-bold font-[var(--font-inter)] text-[var(--color-ink)]">+62 800 0000 0000</p>
              </div>
            </a>
            
            <a href="mailto:hello@refalearn.com" className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-[var(--radius-card)] border border-[var(--color-line)] hover:border-[var(--color-brand-blue)] hover:shadow-md transition-all group">
              <Mail className="text-[var(--color-brand-blue)] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">Email</p>
                <p className="font-bold font-[var(--font-inter)] text-[var(--color-ink)]">hello@refalearn.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </PaperBackground>
  );
}
