// Replaces: components/sketch/SketchBox.tsx

"use client";

import { ReactNode } from "react";
import { RoughAnnotation } from "./RoughAnnotation";

interface SketchBoxProps {
  children: ReactNode;
  color?: string;
  show?: boolean;
  animate?: boolean;
  animationDuration?: number;
  strokeWidth?: number;
  className?: string;
}

export function SketchBox({
  children,
  color = "var(--color-brand-blue)",
  show = true,
  animate = true,
  animationDuration = 800,
  strokeWidth = 2,
  className = "",
}: SketchBoxProps) {
  return (
    <RoughAnnotation
      type="box"
      color={color}
      show={show}
      animate={animate}
      animationDuration={animationDuration}
      strokeWidth={strokeWidth}
      className={className}
    >
      {children}
    </RoughAnnotation>
  );
}