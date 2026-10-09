"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_CONTACT } from "@/lib/contact";
import { isSafeHttpUrl, toWhatsAppNumber } from "@/lib/format";

type Contact = {
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  instagram: string | null;
  tiktok: string | null;
};

const fallback: Contact = { ...DEFAULT_CONTACT, instagram: null, tiktok: null };

function displayPhone(wa: string) {
  // 628135627087 → +62 813 5627 087
  const d = toWhatsAppNumber(wa);
  return d.startsWith("62") ? `+62 ${d.slice(2, 5)} ${d.slice(5, 9)} ${d.slice(9)}`.trim() : `+${d}`;
}

export function Footer() {
  const [contact, setContact] = useState<Contact>(fallback);

  // Contact details come from /admin/settings; the defaults render first so
  // the footer never flashes empty.
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["contact_phone", "contact_email", "contact_address", "social_instagram", "social_tiktok"])
      .then(({ data }) => {
        if (!data) return;
        const get = (k: string) => (data.find((r) => r.key === k)?.value?.text as string | undefined)?.trim() || "";
        const phone = get("contact_phone");
        setContact({
          whatsapp: phone ? toWhatsAppNumber(phone) : fallback.whatsapp,
          whatsappDisplay: phone ? displayPhone(phone) : fallback.whatsappDisplay,
          email: get("contact_email") || fallback.email,
          address: get("contact_address") || fallback.address,
          instagram: isSafeHttpUrl(get("social_instagram")) ? get("social_instagram") : null,
          tiktok: isSafeHttpUrl(get("social_tiktok")) ? get("social_tiktok") : null,
        });
      });
  }, []);

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
              <li><Link href="/stories" className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">Stories</Link></li>
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
                <span className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  WhatsApp: <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>{contact.whatsappDisplay}</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href={`mailto:${contact.email}`} className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors font-[var(--font-inter)]">{contact.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{contact.address}</span>
              </li>
              {(contact.instagram || contact.tiktok) && (
                <li className="flex items-center gap-3 pl-[26px] text-sm font-[var(--font-inter)]">
                  {contact.instagram && (
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors">Instagram</a>
                  )}
                  {contact.tiktok && (
                    <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors">TikTok</a>
                  )}
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-line)]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            &copy; {new Date().getFullYear()} Refa Learn. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors font-[var(--font-inter)]">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors font-[var(--font-inter)]">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
