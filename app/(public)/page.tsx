import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchCircleHighlight } from "@/components/sketch/SketchCircleHighlight";
import { SketchUnderline } from "@/components/sketch/SketchUnderline";
import { SketchDivider } from "@/components/sketch/SketchDivider";
import { Calendar, BookOpen, MessageCircle, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <PaperBackground>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-[var(--color-accent-yellow)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-[var(--color-accent-coral)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float delay-300" />

        <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="blue" className="mb-6 animate-fade-in-up">Les Private Bahasa Inggris di Tarakan</Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up delay-100">
            Les Bahasa Inggris Private Tarakan, <br className="hidden md:block" />
            <span className="text-[var(--color-accent-coral)]">Murah & Berkualitas!</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] mb-10 max-w-2xl mx-auto font-[var(--font-inter)] animate-fade-in-up delay-200">
            Bridging Borders, Embracing The World! Tingkatkan kemampuan Bahasa Inggris Anda bersama tutor private berpengalaman di Tarakan, tersedia kelas online maupun tatap muka. Spesialis persiapan IELTS, TOEFL, dan materi akademik dengan harga terjangkau.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <Button href="/schedule" size="lg" className="w-full sm:w-auto text-base">
              Lihat Jadwal & Booking
            </Button>
            <Button href="/materials" variant="sketch" size="lg" className="w-full sm:w-auto text-base group">
              Lihat Materi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* TRUST BADGE */}
          <div className="flex justify-center animate-scale-in delay-400">
            <div className="trust-badge flex-col sm:flex-row shadow-[var(--shadow-float)] bg-white/80 backdrop-blur-sm p-4 sm:p-5 border-2 border-[var(--color-line)] rounded-[var(--radius-card)]">
              <span className="text-3xl font-bold font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success-green)]" />
                <SketchUnderline color="var(--color-accent-coral)" strokeWidth={4}>Bayar Setelah Kelas Selesai</SketchUnderline>
              </span>
              <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] font-normal mt-2 sm:mt-0 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-dashed border-[var(--color-line)] max-w-xs text-left">
                Tanpa DP. Kelas berjalan, tagihan dikirim awal bulan berikutnya. Belajar dulu, bayar belakangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SketchDivider color="var(--color-accent-yellow)" strokeWidth={3} className="opacity-50" />

      {/* HOW IT WORKS */}
      <section className="section-padding bg-[var(--color-paper-bg-alt)]">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Cara Kerja Kami</h2>
            <p className="text-[var(--color-ink-soft)]">Proses simpel tanpa ribet, fokus pada pembelajaran Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Calendar className="w-8 h-8" />, title: "1. Pilih Jadwal", desc: "Tentukan hari dan jam yang sesuai dengan ketersediaan." },
              { icon: <FileText className="w-8 h-8" />, title: "2. Setujui Kesepakatan", desc: "Baca dan setujui syarat & ketentuan secara transparan." },
              { icon: <MessageCircle className="w-8 h-8" />, title: "3. Ikuti Kelas", desc: "Sesi privat 90 menit interaktif dan fokus ke target Anda." },
              { icon: <BookOpen className="w-8 h-8" />, title: "4. Bayar di Akhir", desc: "Invoice dikirim tanggal 1 setiap bulannya." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-[var(--color-brand-blue)] flex items-center justify-center text-[var(--color-brand-blue)] mb-6 shadow-[var(--shadow-sketch)] group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{step.desc}</p>

                {/* Connecting line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-[var(--color-line)] -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Badge variant="amber" className="mb-4">Investasi Belajar</Badge>
              <h2 className="text-3xl md:text-4xl mb-6 leading-snug">
                Harga Transparan, <br />
                <SketchCircleHighlight color="var(--color-accent-yellow)" padding={10}>
                  Kualitas Terjamin.
                </SketchCircleHighlight>
              </h2>
              <p className="text-[var(--color-ink-soft)] mb-8 font-[var(--font-inter)] text-lg">
                Biaya flat per sesi (90 menit). Tidak ada biaya pendaftaran terselubung. Anda hanya membayar sesi yang telah diselesaikan.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0 mt-0.5" />
                  <span>Durasi komprehensif <strong>90 menit</strong> per sesi.</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0 mt-0.5" />
                  <span>Materi disesuaikan dengan kebutuhan individu.</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0 mt-0.5" />
                  <span>Akses konsultasi & chat tutor di luar jam kelas.</span>
                </li>
              </ul>

              <Button href="/schedule">Pilih Jadwal Sekarang</Button>
            </div>

            <div className="lg:w-1/2 w-full max-w-lg">
              <Card variant="sketch" className="p-0 overflow-hidden bg-[var(--color-paper-bg)]">
                <div className="bg-[var(--color-brand-blue)] px-6 py-4 text-center">
                  <h3 className="text-white font-bold font-[var(--font-inter)] text-2xl mb-1">Paket Privat 1-on-1</h3>
                  <p className="text-orange-400 text-base sm:text-lg font-[var(--font-kalam)]">Harga per Sesi Private 90 Menit</p>
                </div>
                <div className="p-4 sm:p-6 bg-white overflow-x-auto">
                  <table className="w-full border-collapse text-sm sm:text-base">
                    <thead>
                      <tr>
                        <th className="text-left pb-3 border-b-2 border-[var(--color-line)] font-[var(--font-inter)] font-semibold text-[var(--color-ink)]">
                          Jadwal
                        </th>
                        <th className="text-center pb-3 border-b-2 border-[var(--color-line)] font-[var(--font-inter)] font-semibold text-[var(--color-brand-blue)]">
                          Refa Learn
                        </th>
                        <th className="text-center pb-3 border-b-2 border-l border-[var(--color-line)] font-[var(--font-inter)] font-semibold text-[var(--color-ink-soft)]">
                          EAC by Ruangguru
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 border-b border-dashed border-[var(--color-line)] font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                          Senin - Jumat
                        </td>
                        <td className="py-3 text-center border-b border-dashed border-[var(--color-line)] font-bold text-lg font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                          Rp 100.000
                        </td>
                        <td rowSpan={2} className="py-3 text-center align-middle border-b border-dashed border-l border-[var(--color-line)] font-bold font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                          Rp 736.250*
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 border-b border-dashed border-[var(--color-line)] font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                          Sabtu
                        </td>
                        <td className="py-3 text-center border-b border-dashed border-[var(--color-line)] font-bold text-lg font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                          Rp 150.000
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                          Minggu
                        </td>
                        <td className="py-3 text-center font-bold text-lg font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                          <SketchCircleHighlight color="var(--color-accent-coral)" strokeWidth={2} padding={5}>Rp 200.000</SketchCircleHighlight>
                        </td>
                        <td className="py-3 text-center border-l border-[var(--color-line)] font-bold font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                          ✕ Tutup
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-[10px] text-[var(--color-ink-soft)] font-[var(--font-inter)] italic mt-3">
                    *Estimasi harga per sesi EAC by Ruangguru, dihitung dari paket termurah mereka (4 Sesi Private / 3 Bulan = Rp 2.945.000).
                  </p>
                </div>
                <div className="bg-[var(--color-paper-bg-alt)] p-4 text-center border-t border-[var(--color-line)]">
                  <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] italic">
                    *Invoice akan direkapitulasi secara bulanan.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SketchDivider color="var(--color-brand-blue)" strokeWidth={2} className="opacity-30" />

      {/* TESTIMONIALS TEASER (Placeholder for Alumni module data) */}
      <section className="section-padding bg-[var(--color-paper-bg)]">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Cerita Sukses Alumni</h2>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Bergabunglah dengan mereka yang telah meraih targetnya.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder Testimonial 1 */}
            <Card variant="sketch" className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] flex items-center justify-center">
                  <span className="font-bold text-[var(--color-ink-soft)]">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">Andi Pratama</h4>
                  <p className="text-xs text-[var(--color-accent-coral)] font-bold">IELTS 7.5</p>
                </div>
              </div>
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm italic relative z-10">
                <span className="absolute -top-4 -left-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
                "Tutor sangat sabar dan mengerti area kelemahan saya. Dalam 2 bulan, writing score saya naik signifikan!"
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
              </p>
            </Card>
            {/* Placeholder Testimonial 2 */}
            <Card variant="sketch" className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] flex items-center justify-center">
                  <span className="font-bold text-[var(--color-ink-soft)]">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">Siti Nurbaya</h4>
                  <p className="text-xs text-[var(--color-brand-blue)] font-bold">Diterima di UI</p>
                </div>
              </div>
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm italic relative z-10">
                <span className="absolute -top-4 -left-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
                "Belajar SIMAK UI bahasa inggris jadi jauh lebih mudah dimengerti berkat Refa Learn. Sistem bayarnya juga gak bikin deg-degan di awal."
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
              </p>
            </Card>
            {/* Placeholder Testimonial 3 */}
            <Card variant="sketch" className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] flex items-center justify-center">
                  <span className="font-bold text-[var(--color-ink-soft)]">K</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">Kevin L.</h4>
                  <p className="text-xs text-[var(--color-success-green)] font-bold">TOEFL 580</p>
                </div>
              </div>
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm italic relative z-10">
                <span className="absolute -top-4 -left-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
                "Materi PDF nya sangat terstruktur dan sesi 90 menit itu sangat efektif karena kita fokus bedah soal. Recommended tutor!"
                <span className="absolute -bottom-4 -right-2 text-4xl text-[var(--color-line)] font-serif z-[-1]">"</span>
              </p>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Link href="/alumni" className="text-[var(--color-brand-blue)] font-bold hover:underline font-[var(--font-inter)] flex items-center justify-center gap-2">
              Lihat semua alumni <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </PaperBackground>
  );
}
