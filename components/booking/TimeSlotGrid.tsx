"use client";

import { Slot } from "@/lib/rrule-helpers";
import { Clock } from "lucide-react";
import { formatPrice, getSessionPrice } from "@/lib/pricing";
import { APP_TIMEZONE_LABEL } from "@/lib/time";

interface TimeSlotGridProps {
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelect: (slot: Slot) => void;
  isLoading?: boolean;
}

export function TimeSlotGrid({ slots, selectedSlot, onSelect, isLoading = false }: TimeSlotGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-[var(--color-paper-bg-alt)] rounded-[var(--radius-sketch)] animate-pulse" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-8 bg-[var(--color-paper-bg-alt)] rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)]">
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          Tidak ada jadwal tersedia pada tanggal ini.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot) => {
        const isSelected = selectedSlot?.date === slot.date &&
                           selectedSlot?.start_time === slot.start_time;

        const price = getSessionPrice(slot.date);

        return (
          <button
            key={`${slot.date}-${slot.start_time}`}
            onClick={() => onSelect(slot)}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-[var(--radius-sketch)] transition-all duration-200 border-2 text-sm font-[var(--font-inter)]
              ${isSelected
                ? 'bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white shadow-[var(--shadow-sketch)] scale-[1.02]'
                : 'bg-white border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-brand-blue)]/50 hover:bg-[var(--color-paper-bg-alt)]'
              }
            `}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Clock className="w-3.5 h-3.5" />
              {slot.start_time}
              <span className={`text-[10px] font-normal ${isSelected ? 'text-white/80' : 'text-[var(--color-ink-soft)]'}`}>{APP_TIMEZONE_LABEL}</span>
            </div>

            <div className={`text-xs ${isSelected ? 'text-white/90' : 'text-[var(--color-ink-soft)]'}`}>
              {formatPrice(price)}
            </div>
          </button>
        );
      })}
    </div>
  );
}
