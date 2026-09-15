import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "sketch";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      href,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass = "inline-flex items-center justify-center gap-2 font-[var(--font-inter)] font-semibold transition-all duration-200";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      sketch: "bg-white border-2 border-[var(--color-ink)] text-[var(--color-ink)] shadow-[var(--shadow-sketch)] hover:shadow-[var(--shadow-sketch-hover)] hover:-translate-y-0.5 rounded-[var(--radius-sketch)]",
      ghost: "bg-transparent text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-ink)] rounded-md",
    };

    const combinedClasses = `${baseClass} ${sizeClasses[size]} ${variantClasses[variant]} ${
      disabled || isLoading ? "opacity-60 cursor-not-allowed transform-none hover:transform-none hover:shadow-none" : ""
    } ${className}`;

    if (href && !disabled && !isLoading) {
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
