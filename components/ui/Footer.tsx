import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[var(--color-paper-bg-alt)] border-t-2 border-dashed border-[var(--color-line)] relative overflow-hidden">
      {/* Decorative notebook line */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[rgba(194,75,75,0.15)] hidden sm:block pointer-events-none" />

      <div className="container-main py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <Image src="/RefaLearn-Logo.png" alt="Refa Learn" width={36} height={36} className="rounded-md object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-[var(--font-kalam)] text-lg font-bold text-[var(--color-brand-blue)]">Refa Learn</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6 font-[var(--font-inter)] leading-relaxed">
              Bridging Borders, Embracing The World! Les private Bahasa Inggris di Tarakan, online maupun tatap muka, murah dan berkualitas, dengan sistem bayar setelah kelas.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="font-[var(--font-kalam)] text-lg text-[var(--color-brand-blue)] mb-4">Navigasi</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Home</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Tentang Kami</Link></li>
              <li><Link href="/news" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Berita & Artikel</Link></li>
              <li><Link href="/alumni" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Testimoni Alumni</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="font-[var(--font-kalam)] text-lg text-[var(--color-brand-blue)] mb-4">Layanan</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/schedule" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Booking Kelas</Link></li>
              <li><Link href="/materials" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Beli Materi</Link></li>
              <li><Link href="/login" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Student Login</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-[var(--font-kalam)] text-lg text-[var(--color-brand-blue)] mb-4">Hubungi Kami</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">WhatsApp: +62 800 0000 0000</span>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:hello@refalearn.com" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">hello@refalearn.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Indonesia</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-line)]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            &copy; {new Date().getFullYear()} Refa Learn. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors font-[var(--font-inter)]">Syarat & Ketentuan</Link>
            <Link href="#" className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors font-[var(--font-inter)]">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
