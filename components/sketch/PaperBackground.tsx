"use client";

import { ReactNode } from "react";

interface PaperBackgroundProps {
  children: ReactNode;
  variant?: "default" | "alt" | "dots";
  className?: string;
}

export function PaperBackground({
  children,
  variant = "default",
  className = "",
}: PaperBackgroundProps) {
  const getBgClass = () => {
    switch (variant) {
      case "alt":
        return "paper-bg-alt";
      case "dots":
        return "paper-dots";
      case "default":
      default:
        return "paper-bg";
    }
  };

  return (
    <div className={`${getBgClass()} min-h-full w-full ${className}`}>
      {children}
    </div>
  );
}
