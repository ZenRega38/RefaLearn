import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  variant?: "default" | "sketch" | "interactive";
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "default",
  className = "",
  onClick,
}: CardProps) {
  // A padding passed in (p-0, p-4, …) replaces the default p-6. Both would
  // otherwise land in the class list and the CSS order, not the caller,
  // would decide which one wins.
  const customPadding = /(^|\s)p-(\d|\[)/.test(className);
  const baseClass = `bg-white rounded-[var(--radius-card)] ${customPadding ? "" : "p-6 "}transition-all duration-300`;

  const variantClasses = {
    default: "border border-[var(--color-line)] shadow-sm",
    sketch: "sketch-card", // Uses the global CSS utility for the hand-drawn border look
    interactive: "border border-[var(--color-line)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer",
  };

  const combinedClasses = `${baseClass} ${variantClasses[variant]} ${className}`;

  if (onClick || variant === "interactive") {
    return (
      <div
        className={combinedClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={combinedClasses}>{children}</div>;
}