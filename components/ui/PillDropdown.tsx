"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type PillOption = { key: string; label: string };

/**
 * A category filter as one pill-shaped button. Tapping it opens a panel of
 * pills that wrap onto new lines — no sideways-scrolling row of pills.
 */
export function PillDropdown({
  options,
  value,
  onChange,
  label = "Kategori",
  className = "",
}: {
  options: PillOption[];
  value: string;
  onChange: (key: string) => void;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.key === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-[var(--font-inter)] bg-[var(--color-brand-blue)] text-white shadow-sm hover:bg-[var(--color-brand-blue-light)] transition-colors max-w-full"
      >
        <span className="opacity-80 font-medium">{label}:</span>
        <span className="truncate">{selected?.label}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full mt-2 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-3 shadow-[var(--shadow-float)] animate-scale-in"
        >
          <div className="flex flex-wrap gap-2">
            {options.map((o) => {
              const active = o.key === selected?.key;
              return (
                <button
                  key={o.key}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold font-[var(--font-inter)] transition-colors ${
                    active
                      ? "bg-[var(--color-brand-blue)] text-white"
                      : "bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]"
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
