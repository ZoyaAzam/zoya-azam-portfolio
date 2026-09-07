"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** When true, this card becomes a column-subgrid container that inherits the
   *  outer bento grid's column tracks — use with <TiltCol> children. */
  subgrid?: boolean;
  /** When true, this card spans 4 outer row-tracks and becomes a row-subgrid
   *  container for them — use with <TiltRow> children. Lets content bands
   *  (header/title/body/footer) align across cards even when one card's
   *  description wraps longer than its neighbors'. */
  subgridRows?: boolean;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  subgrid = false,
  subgridRows = false,
  maxTilt = 6
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * maxTilt * 2;
    const rx = (0.5 - py) * maxTilt * 2;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-opacity", "1");
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot-opacity", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${subgrid ? "tilt-card--subgrid" : ""} ${
        subgridRows ? "tilt-card--subgrid-rows" : ""
      } ${className}`}
    >
      {children}
      <style jsx global>{`
        .tilt-card {
          position: relative;
          container-type: inline-size;
          transform: perspective(1100px) rotateX(var(--rx, 0deg))
            rotateY(var(--ry, 0deg));
          transform-style: preserve-3d;
          transition: transform 150ms ease-out;
        }
        .tilt-card--subgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* fallback: browsers without subgrid keep this */
          grid-template-columns: subgrid;
          align-content: start;
        }
        .tilt-card--subgrid-rows {
          display: grid;
          grid-row: span 4;
          grid-template-rows: repeat(4, auto); /* fallback for non-subgrid browsers */
          grid-template-rows: subgrid;
          align-content: start;
        }
        .tilt-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: var(--spot-opacity, 0);
          transition: opacity 200ms ease;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(0, 255, 102, 0.13),
            transparent 60%
          );
        }
        .tilt-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.5) 0px,
              rgba(255, 255, 255, 0.5) 1px,
              transparent 1px,
              transparent 3px
            ),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        @media (prefers-reduced-motion: reduce) {
          .tilt-card {
            transition: none;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/** Explicit column placement helpers for use inside a subgrid TiltCard. */
export function TiltCol({
  span = 1,
  className = "",
  children
}: {
  span?: 1 | 2;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ gridColumn: span === 2 ? "1 / -1" : undefined }}
    >
      {children}
    </div>
  );
}

/** Explicit row placement helper for use inside a subgridRows TiltCard —
 *  assigns a content band (header/title/body/footer) to a specific row
 *  track so it aligns with the same band on sibling cards. */
export function TiltRow({
  row,
  className = "",
  children
}: {
  row: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} style={{ gridRow: row }}>
      {children}
    </div>
  );
}