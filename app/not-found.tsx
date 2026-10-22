import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Button } from "@/components/ui/Button";
import { getTr } from "@/lib/i18n-server";

export default async function NotFound() {
  const tr = await getTr();
  return (
    <PaperBackground>
      <div className="container-main min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <p className="font-[var(--font-kalam)] text-6xl text-[var(--color-line)] mb-4">404</p>
        <h1 className="text-3xl md:text-4xl mb-4">
          {tr("Halaman", "Page")} <SketchBox color="var(--color-accent-coral)">{tr("tidak ditemukan", "not found")}</SketchBox>
        </h1>
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8 max-w-md">
          {tr("Halaman yang Anda cari mungkin sudah dipindahkan atau tautannya salah.", "The page you're looking for may have moved, or the link may be wrong.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/">{tr("Kembali ke Beranda", "Back to Home")}</Button>
          <Button href="/schedule" variant="secondary">{tr("Lihat Jadwal", "See Schedule")}</Button>
        </div>
      </div>
    </PaperBackground>
  );
}
