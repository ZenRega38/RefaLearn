"use client";

import { ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

interface SketchUnderlineProps {
  children: ReactNode;
  color?: string;
  show?: boolean;
  animate?: boolean;
  animationDuration?: number;
  strokeWidth?: number;
  className?: string;
}

export function SketchUnderline({
  children,
  color = "var(--color-accent-coral)",
  show = true,
  animate = true,
  animationDuration = 600,
  strokeWidth = 3,
  className = "",
}: SketchUnderlineProps) {
  return (
    <span className={`inline-block ${className}`}>
      <RoughNotation
        type="underline"
        show={show}
        color={color}
        animate={animate}
        animationDuration={animationDuration}
        strokeWidth={strokeWidth}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
