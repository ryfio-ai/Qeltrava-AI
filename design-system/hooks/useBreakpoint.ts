'use client';
/**
 * design-system/hooks/useBreakpoint.ts
 * Returns the current active breakpoint name and comparison utilities.
 */
import { useMediaQuery } from './useMediaQuery';
import { BREAKPOINTS, type Breakpoint } from '../constants/breakpoints';

export interface BreakpointState {
  /** Currently active breakpoint */
  current:  Breakpoint;
  /** True if viewport is ≥ given breakpoint */
  gte: (bp: Breakpoint) => boolean;
  /** True if viewport is < given breakpoint */
  lt:  (bp: Breakpoint) => boolean;
  /** Convenience flags */
  isXs:  boolean;
  isSm:  boolean;
  isMd:  boolean;
  isLg:  boolean;
  isXl:  boolean;
  is2xl: boolean;
  /** True on mobile (< md) */
  isMobile:  boolean;
  /** True on tablet (md–lg) */
  isTablet:  boolean;
  /** True on desktop (≥ lg) */
  isDesktop: boolean;
}

export function useBreakpoint(): BreakpointState {
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`);
  const isXl  = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const isLg  = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isMd  = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isSm  = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);

  const current: Breakpoint =
    is2xl ? '2xl' : isXl ? 'xl' : isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : 'xs';

  const widths = Object.values(BREAKPOINTS);
  const gte = (bp: Breakpoint) => widths.indexOf(BREAKPOINTS[current]) >= widths.indexOf(BREAKPOINTS[bp]);
  const lt  = (bp: Breakpoint) => !gte(bp);

  return {
    current,
    gte, lt,
    isXs:      current === 'xs',
    isSm:      current === 'sm',
    isMd:      current === 'md',
    isLg:      current === 'lg',
    isXl:      current === 'xl',
    is2xl:     current === '2xl',
    isMobile:  lt('md'),
    isTablet:  gte('md') && lt('lg'),
    isDesktop: gte('lg'),
  };
}
