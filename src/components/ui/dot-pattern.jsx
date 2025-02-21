"use client";

import { cn } from "@/lib/utils";

export const DotPattern = ({ 
  className,
  width = 20,
  height = 20,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = true,
  ...props 
}) => {
  return (
    <svg
      className={cn(
        "absolute inset-0 h-full w-full",
        glow && "[filter:drop-shadow(0_0_4px_rgba(79,70,229,0.4))]",
        className
      )}
      {...props}
    >
      <pattern
        id="dot-pattern"
        x={x}
        y={y}
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
      >
        <circle 
          cx={cx} 
          cy={cy} 
          r={cr} 
          className="fill-indigo-600/40 dark:fill-indigo-500/40"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
};