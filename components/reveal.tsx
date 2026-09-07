"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { revealUp, DISTANCE } from "../lib/motion-tokens";

export default function Reveal({
  children,
  distance = DISTANCE.md,
  delay = 0,
  className = ""
}: {
  children: ReactNode;
  distance?: number;
  /** Stagger offset in seconds — use index * 0.08 or so across a grid of cards. */
  delay?: number;
  className?: string;
}) {
  const { transition, ...rest } = revealUp(distance);
  return (
    <motion.div
      className={className}
      {...rest}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}