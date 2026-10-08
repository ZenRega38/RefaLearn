"use client";

import { DayPicker } from "react-day-picker";
import { id } from "date-fns/locale";
import "react-day-picker/style.css";

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
      borderRadius: "var(--radius-sketch)",
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
      {/* react-day-picker v9+/v10 class names (rdp-root, rdp-selected …) —
          the old v8 names (rdp, rdp-day_selected) no longer match anything. */}
      <style>{`
        .rdp-root {
          --rdp-day-width: 40px;
          --rdp-day-height: 40px;
          --rdp-accent-color: var(--color-brand-blue);
          --rdp-accent-background-color: var(--color-paper-bg-alt);
          --rdp-today-color: var(--color-accent-coral);
          margin: 0;
        }
        .rdp-selected .rdp-day_button {
          background-color: var(--color-brand-blue);
          color: white;
          border: none;
          border-radius: var(--radius-sketch);
          box-shadow: var(--shadow-sketch);
        }
        .rdp-day_button {
          border-radius: var(--radius-sketch);
        }
        .rdp-day:not(.rdp-disabled):not(.rdp-selected) .rdp-day_button:hover {
          background-color: rgba(43, 76, 126, 0.1);
        }
        .rdp-weekday {
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
