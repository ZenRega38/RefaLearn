"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface SketchDividerProps {
  color?: string;
  strokeWidth?: number;
  className?: string;
  width?: number | string;
}

export function SketchDivider({
  color = "var(--color-line)",
  strokeWidth = 2,
  className = "",
  width = "100%",
}: SketchDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous drawing
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    const rc = rough.svg(svgRef.current);
    
    // Get actual width or use a reasonable default for viewBox
    const widthNum = typeof width === "number" ? width : svgRef.current.clientWidth || 800;
    
    const node = rc.line(0, 10, widthNum, 10, {
      stroke: color,
      strokeWidth,
      roughness: 2,
      bowing: 1.5,
    });
    
    svgRef.current.appendChild(node);
  }, [color, strokeWidth, width]);

  return (
    <div className={`w-full flex justify-center overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        style={{ width, height: 20 }}
        className="max-w-full"
      />
    </div>
  );
}
