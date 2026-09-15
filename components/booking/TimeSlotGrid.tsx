"use client";

import { Slot } from "@/lib/rrule-helpers";
import { Clock } from "lucide-react";
import { formatPrice, getSessionPrice } from "@/lib/pricing";

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

  const formatTimeStr = (time: string) => {
    return time.substring(0, 5); // Extract HH:mm
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot, index) => {
        const isSelected = selectedSlot?.rule_id === slot.rule_id && 
                           selectedSlot?.start_time === slot.start_time;
                           
        const price = getSessionPrice(slot.date);
        
        return (
          <button
            key={`${slot.rule_id}-${index}`}
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
              {formatTimeStr(slot.start_time)}
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
