import { Timer } from "lucide-react";
import { compareAtPrice, discountPercent, formatPrice, validBefore } from "@/lib/pricing";

const SIZES = {
  sm: { price: "text-sm", before: "text-[0.7rem]", badge: "text-[0.6rem] px-1.5 py-px" },
  md: { price: "text-lg", before: "text-xs", badge: "text-[0.65rem] px-1.5 py-0.5" },
  lg: { price: "text-3xl", before: "text-sm", badge: "text-xs px-2 py-0.5" },
} as const;

/**
 * A price with its struck-through "before" price and a discount badge.
 * Pass `before` for a material (its compare_at_price, null for none);
 * leave it out for a session price (lib/pricing's session table).
 * `inverted` is for dark/blue backgrounds. Free (0) shows "Gratis", and a
 * free item with a "before" price shows -100%.
 */
export function PriceTag({
  price,
  before: beforeProp,
  size = "md",
  align = "start",
  stacked = false,
  inverted = false,
  className = "",
}: {
  price: number;
  before?: number | null;
  size?: keyof typeof SIZES;
  align?: "start" | "center" | "end";
  /** Put the "before" price on its own line above the price. */
  stacked?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  const before = beforeProp === undefined ? compareAtPrice(price) : validBefore(price, beforeProp);
  const justify = align === "center" ? "justify-center" : align === "end" ? "justify-end" : "justify-start";
  const items = align === "center" ? "items-center" : align === "end" ? "items-end" : "items-start";

  const main = (
    <span className={`font-bold font-[var(--font-inter)] ${s.price} ${inverted ? "text-white" : "text-[var(--color-brand-blue)]"}`}>
      {price === 0 ? "Free" : formatPrice(price)}
    </span>
  );
  if (!before) return <span className={`inline-flex ${className}`}>{main}</span>;

  const strike = (
    <span className={`inline-flex items-center gap-1.5 ${justify}`}>
      <span className={`line-through font-[var(--font-inter)] ${s.before} ${inverted ? "text-white/70" : "text-[var(--color-ink-soft)]"}`}>{formatPrice(before)}</span>
      <span className={`rounded-full font-bold font-[var(--font-inter)] bg-[var(--color-accent-coral)] text-white ${s.badge}`}>-{discountPercent(price, before)}%</span>
    </span>
  );

  return stacked ? (
    <span className={`inline-flex flex-col ${items} leading-tight ${className}`}>
      {strike}
      {main}
    </span>
  ) : (
    <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 ${justify} ${className}`}>
      {main}
      {strike}
    </span>
  );
}

/** "Limited Time Offer" pill with a soft pulse. */
export function LimitedOffer({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider font-[var(--font-inter)] ${
        inverted ? "bg-white/15 text-white border border-white/30" : "bg-[var(--color-accent-coral)]/10 text-[var(--color-accent-coral)] border border-[var(--color-accent-coral)]/30"
      } ${className}`}
    >
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-coral)] opacity-60 animate-ping" />
        <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--color-accent-coral)]" />
      </span>
      <Timer className="w-3.5 h-3.5" />
      Limited Time Offer
    </span>
  );
}
