import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]"
          >
            {label}
            {props.required && <span className="text-[var(--color-accent-coral)] ml-1">*</span>}
          </label>
        )}
        
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`input-field resize-y min-h-[100px] ${
            error ? "!border-[var(--color-danger-red)] focus:!shadow-[0_0_0_3px_rgba(194,75,75,0.1)]" : ""
          } ${className}`}
          {...props}
        />

        {(error || helperText) && (
          <p className={`text-xs mt-0.5 font-[var(--font-inter)] ${error ? "text-[var(--color-danger-red)]" : "text-[var(--color-ink-soft)]"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
