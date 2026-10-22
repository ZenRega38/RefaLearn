"use client";

import { Handshake } from "lucide-react";
import { isSafeHttpUrl } from "@/lib/format";
import { useTr } from "@/components/i18n/LangProvider";

export type Partner = { name: string; logo_url: string | null; url: string | null };

/**
 * "In partnership with …" for a store material. `chip` is the small white
 * label on a catalog card cover; `full` is the row under the title on the
 * detail page (links to the partner's site when one is set).
 */
export function PartnerBadge({ partner, variant }: { partner: Partner; variant: "chip" | "full" }) {
  const tr = useTr();
  const logo = partner.logo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={partner.logo_url} alt={partner.name} className={variant === "chip" ? "h-5 w-auto max-w-[3rem] object-contain" : "h-10 w-auto max-w-[6rem] object-contain"} />
  ) : (
    <Handshake className={variant === "chip" ? "w-4 h-4 text-[var(--color-brand-blue)]" : "w-8 h-8 text-[var(--color-brand-blue)]"} />
  );

  if (variant === "chip") {
    return (
      <span className="inline-flex items-center gap-1.5 max-w-full rounded-full bg-white/95 border border-[var(--color-line)] shadow-sm pl-1.5 pr-2.5 py-1 font-[var(--font-inter)]" title={`${tr("Bekerja sama dengan", "In partnership with")} ${partner.name}`}>
        {logo}
        <span className="text-[11px] font-semibold text-[var(--color-ink)] truncate">{partner.name}</span>
      </span>
    );
  }

  const inner = (
    <span className="inline-flex items-center gap-3 rounded-[var(--radius-card)] bg-white border-2 border-[var(--color-line)] px-4 py-2.5 font-[var(--font-inter)]">
      {logo}
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">{tr("Bekerja sama dengan", "In partnership with")}</span>
        <span className="block text-sm font-bold text-[var(--color-ink)]">{partner.name}</span>
      </span>
    </span>
  );
  return isSafeHttpUrl(partner.url) ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-block hover:shadow-md transition-shadow rounded-[var(--radius-card)]">{inner}</a>
  ) : (
    inner
  );
}
