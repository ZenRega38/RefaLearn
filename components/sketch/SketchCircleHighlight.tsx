// Replaces: components/sketch/SketchCircleHighlight.tsx

"use client";

import { ReactNode } from "react";
import { RoughAnnotation } from "./RoughAnnotation";

interface SketchCircleHighlightProps {
  children: ReactNode;
  color?: string;
  show?: boolean;
  animate?: boolean;
  animationDuration?: number;
  strokeWidth?: number;
  padding?: number | [number, number, number, number];
  className?: string;
}

export function SketchCircleHighlight({
  children,
  color = "var(--color-accent-yellow)",
  show = true,
  animate = true,
  animationDuration = 800,
  strokeWidth = 3,
  padding = 5,
  className = "",
}: SketchCircleHighlightProps) {
  return (
    <RoughAnnotation
      type="circle"
      color={color}
      show={show}
      animate={animate}
      animationDuration={animationDuration}
      strokeWidth={strokeWidth}
      padding={padding}
      className={className}
    >
      {children}
    </RoughAnnotation>
  );
}