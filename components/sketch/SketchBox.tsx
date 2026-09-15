"use client";

import { ReactNode } from "react";
import { RoughNotation } from "react-rough-notation";

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
    <span className={`inline-block ${className}`}>
      <RoughNotation
        type="box"
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
