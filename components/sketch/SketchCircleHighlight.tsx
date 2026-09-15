"use client";

import { ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

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
    <span className={`inline-block ${className}`}>
      <RoughNotation
        type="circle"
        show={show}
        color={color}
        animate={animate}
        animationDuration={animationDuration}
        strokeWidth={strokeWidth}
        padding={padding}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
