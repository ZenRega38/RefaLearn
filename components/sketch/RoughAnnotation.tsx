// Goes in: components/sketch/RoughAnnotation.tsx
//
// Replaces the `react-rough-notation` package, which pins a React 18 peer
// dependency and so can't be installed alongside React 19 without
// --legacy-peer-deps. `rough-notation` itself is framework-agnostic and is
// already a direct dependency, so this wraps it directly.
//
// It also resolves CSS custom properties before handing the colour over —
// see resolveColor below.

"use client";

import { ReactNode, useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export type AnnotationType =
    | "underline"
    | "box"
    | "circle"
    | "highlight"
    | "strike-through"
    | "crossed-off"
    | "bracket";

interface RoughAnnotationProps {
    children: ReactNode;
    type: AnnotationType;
    color?: string;
    show?: boolean;
    animate?: boolean;
    animationDuration?: number;
    strokeWidth?: number;
    padding?: number | [number, number, number, number];
    multiline?: boolean;
    className?: string;
}

/**
 * rough-notation passes `color` straight into the SVG `stroke` attribute.
 * Browsers do NOT resolve `var(--token)` inside SVG presentation attributes —
 * the value is treated as invalid and the stroke falls back to black. Since
 * every call site in this project passes a design token, resolve it against
 * the document root first.
 *
 * Runs in useEffect only, so `document` is always available.
 */
function resolveColor(color: string): string {
    if (!color.startsWith("var(")) return color;

    const name = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();

    return resolved || "#232323"; // --color-ink, as a last resort
}

export function RoughAnnotation({
    children,
    type,
    color = "var(--color-brand-blue)",
    show = true,
    animate = true,
    animationDuration = 800,
    strokeWidth = 2,
    padding = 5,
    multiline = false,
    className = "",
}: RoughAnnotationProps) {
    const ref = useRef<HTMLSpanElement>(null);

    // `padding` may be a tuple, which is a fresh array identity on every
    // render and would retrigger the effect forever. Compare by value.
    const paddingKey = JSON.stringify(padding);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const annotation = annotate(el, {
            type,
            color: resolveColor(color),
            animate,
            animationDuration,
            strokeWidth,
            padding: JSON.parse(paddingKey),
            multiline,
        });

        if (show) annotation.show();

        // Removes the injected SVG. Without this, toggling props or
        // unmounting leaves orphaned annotation layers stacked on the page.
        return () => annotation.remove();
    }, [type, color, show, animate, animationDuration, strokeWidth, multiline, paddingKey]);

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {children}
        </span>
    );
}
