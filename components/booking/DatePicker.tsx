"use client";

import { DayPicker } from "react-day-picker";
import { id } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { isSameDay } from "date-fns";

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  availableDates: Date[];
  disabledDays?: (date: Date) => boolean;
}

export function DatePicker({ selected, onSelect, availableDates, disabledDays }: DatePickerProps) {
  
  // Custom modifier to highlight dates that have available slots
  const modifiers = {
    available: availableDates,
  };

  const modifiersStyles = {
    available: {
      fontWeight: "bold",
      color: "var(--color-brand-blue)",
      backgroundColor: "rgba(242, 193, 78, 0.2)", // accent-yellow transparent
    },
  };

  // Custom disabled logic: if disabledDays func is provided use it, 
  // otherwise disable past dates
  const defaultDisabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="bg-white p-4 rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-[var(--shadow-sketch)] flex justify-center">
      <style>{`
        .rdp {
          --rdp-cell-size: 40px;
          --rdp-accent-color: var(--color-brand-blue);
          --rdp-background-color: var(--color-paper-bg-alt);
          margin: 0;
        }
        .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
          background-color: var(--color-brand-blue);
          color: white;
          border-radius: var(--radius-sketch);
          box-shadow: var(--shadow-sketch);
        }
        .rdp-day:hover:not(.rdp-day_disabled) {
          border-radius: var(--radius-sketch);
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(43, 76, 126, 0.1);
        }
        .rdp-head_cell {
          font-family: var(--font-inter);
          font-weight: 600;
          color: var(--color-ink-soft);
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        .rdp-caption_label {
          font-family: var(--font-inter);
          font-weight: 700;
          color: var(--color-ink);
        }
      `}</style>
      
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={id}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={disabledDays || defaultDisabledDays}
        showOutsideDays
      />
    </div>
  );
}
