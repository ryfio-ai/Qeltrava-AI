/**
 * design-system/constants/breakpoints.ts
 * Canonical breakpoint values, mirrored from design-system/tokens.ts.
 * Kept in a separate file to avoid circular imports in hooks.
 */

export const BREAKPOINTS = {
  xs:  0,
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** Returns the min-width media query string for a given breakpoint */
export function minWidth(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`;
}

/** Returns the max-width media query string for a given breakpoint */
export function maxWidth(bp: Breakpoint): string {
  const value = BREAKPOINTS[bp];
  return `(max-width: ${value - 1}px)`;
}
