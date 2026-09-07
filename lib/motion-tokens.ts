/**
 * Shared motion grammar. Every section-entry / transition animation on the
 * site should read these values instead of hardcoding its own duration or
 * easing curve — that's what makes scrolling feel like one directed
 * experience instead of four components that happen to sit on one page.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7
} as const;

export const DISTANCE = {
  sm: 12,
  md: 24,
  lg: 48
} as const;

/** Standard "enters from below, settles" reveal used for section headers
 *  and major content blocks as they scroll into view. */
export function revealUp(distance: number = DISTANCE.md) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px -10% 0px" },
    transition: { duration: DURATION.slow, ease: EASE_OUT }
  };
}