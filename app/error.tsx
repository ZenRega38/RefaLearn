"use client";

import { useEffect } from "react";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Button } from "@/components/ui/Button";
import { useTr } from "@/components/i18n/LangProvider";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const tr = useTr();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PaperBackground>
      <div className="container-main min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <h1 className="text-3xl md:text-4xl mb-4 text-[var(--color-brand-blue)]">{tr("Ups, terjadi kesalahan", "Oops, something went wrong")}</h1>
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8 max-w-md">
          {tr(
            "Halaman ini gagal dimuat. Silakan coba lagi — jika masalah berlanjut, hubungi kami melalui WhatsApp.",
            "This page failed to load. Please try again, and if the problem continues, contact us on WhatsApp."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={reset}>{tr("Coba Lagi", "Try Again")}</Button>
          <Button href="/" variant="secondary">{tr("Kembali ke Beranda", "Back to Home")}</Button>
        </div>
      </div>
    </PaperBackground>
  );
}
