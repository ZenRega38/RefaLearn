import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "coral" | "blue" | "green" | "amber" | "red" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "coral",
  className = "",
}: BadgeProps) {
  const baseClass = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider font-[var(--font-inter)] transition-colors";
  
  const variantClasses = {
    coral: "bg-[var(--color-accent-coral)]/10 text-[var(--color-accent-coral)]",
    blue: "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]",
    green: "bg-[var(--color-success-green)]/15 text-[var(--color-success-green)]",
    amber: "bg-[var(--color-warning-amber)]/15 text-[var(--color-warning-amber)]",
    red: "bg-[var(--color-danger-red)]/15 text-[var(--color-danger-red)]",
    outline: "bg-transparent border border-[var(--color-line)] text-[var(--color-ink-soft)]",
  };

  const combinedClasses = `${baseClass} ${variantClasses[variant]} ${className}`;

  return <span className={combinedClasses}>{children}</span>;
}
