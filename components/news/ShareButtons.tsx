"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

/** WhatsApp / Facebook / X share links plus copy-link. Pure links — no
 * third-party scripts are loaded. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 font-[var(--font-inter)] text-sm">
      <span className="flex items-center gap-1.5 text-[var(--color-ink-soft)] font-semibold mr-1">
        <Share2 className="w-4 h-4" /> Bagikan:
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] transition-colors"
        >
          {l.label}
        </a>
      ))}
      <button
        onClick={copy}
        className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] transition-colors flex items-center gap-1.5"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-success-green)]" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? "Tersalin" : "Salin Link"}
      </button>
    </div>
  );
}
