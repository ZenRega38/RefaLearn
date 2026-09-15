import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, icon, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]"
          >
            {label}
            {props.required && <span className="text-[var(--color-accent-coral)] ml-1">*</span>}
          </label>
        )}
        
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-[var(--color-ink-soft)] flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={`input-field ${icon ? "pl-10" : ""} ${
              error ? "!border-[var(--color-danger-red)] focus:!shadow-[0_0_0_3px_rgba(194,75,75,0.1)]" : ""
            } ${className}`}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <p className={`text-xs mt-0.5 font-[var(--font-inter)] ${error ? "text-[var(--color-danger-red)]" : "text-[var(--color-ink-soft)]"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
