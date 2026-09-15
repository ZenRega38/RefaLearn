import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, helperText, icon, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label 
            htmlFor={selectId} 
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
          
          <select
            id={selectId}
            ref={ref}
            className={`input-field appearance-none pr-10 ${icon ? "pl-10" : ""} ${
              error ? "!border-[var(--color-danger-red)] focus:!shadow-[0_0_0_3px_rgba(194,75,75,0.1)]" : ""
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          
          <div className="absolute right-3 text-[var(--color-ink-soft)] pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = "Select";
