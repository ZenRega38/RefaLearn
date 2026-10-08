"use client";

import { useEffect } from "react";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Button } from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PaperBackground>
      <div className="container-main min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <h1 className="text-3xl md:text-4xl mb-4 text-[var(--color-brand-blue)]">Ups, terjadi kesalahan</h1>
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8 max-w-md">
          Halaman ini gagal dimuat. Silakan coba lagi — jika masalah berlanjut, hubungi kami melalui WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={reset}>Coba Lagi</Button>
          <Button href="/" variant="secondary">Kembali ke Beranda</Button>
        </div>
      </div>
    </PaperBackground>
  );
}
