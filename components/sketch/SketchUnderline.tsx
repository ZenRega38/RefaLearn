// Replaces: components/sketch/SketchUnderline.tsx

"use client";

import { ReactNode } from "react";
import { RoughAnnotation } from "./RoughAnnotation";

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
    <RoughAnnotation
      type="underline"
      color={color}
      show={show}
      animate={animate}
      animationDuration={animationDuration}
      strokeWidth={strokeWidth}
      // Headings wrap on mobile; without this the underline only draws
      // under the first line.
      multiline
      className={className}
    >
      {children}
    </RoughAnnotation>
  );
}