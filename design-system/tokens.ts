/**
 * design-system/tokens.ts
 * Qeltrava AI – TypeScript token exports
 *
 * These values are the CANONICAL definition of breakpoints and other
 * non-CSS-variable-accessible values (e.g. for use in JS media queries,
 * ResizeObserver callbacks, chart libraries, or animation configs).
 *
 * CSS custom properties remain the single source of truth at runtime.
 * This file exists only to expose constants that cannot be read from
 * CSS variables in JavaScript contexts.
 *
 * DO NOT duplicate token values here unless they cannot be consumed
 * via `var(--token-name)` in CSS/Tailwind.
 */

// ─── Breakpoints ─────────────────────────────────────────────────────────────
/** Pixel breakpoints (numeric, for use in JS/TS matchMedia, ResizeObserver, etc.) */
export const breakpoints = {
  xs:  480,
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Media query strings matching CSS breakpoints */
export const mediaQueries = {
  xs:  `(min-width: ${breakpoints.xs}px)`,
  sm:  `(min-width: ${breakpoints.sm}px)`,
  md:  `(min-width: ${breakpoints.md}px)`,
  lg:  `(min-width: ${breakpoints.lg}px)`,
  xl:  `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
} as const;

// ─── Brand Palette ────────────────────────────────────────────────────────────
/** Raw brand colour hex values – for chart libraries, canvas, SVG, etc. */
export const brandColors = {
  navy:       '#1B2A4A',
  navyDark:   '#111827',
  navySoft:   '#243656',
  navyHero:   '#151E33',
  blue:       '#2b70ab',
  blueLight:  '#3D8ECF',
  graphite:   '#2B2B2B',
  mist:       '#EAF1FA',
  white:      '#FFFFFF',
  green:      '#1FAA59',
  border:     '#D8E3F0',
} as const;

// ─── Chart Colours ────────────────────────────────────────────────────────────
/** Ordered chart colour sequence for data visualisation libraries */
export const chartColors = {
  blue:   '#2b70ab',
  green:  '#1FAA59',
  orange: '#F59E0B',
  red:    '#EF4444',
  purple: '#8B5CF6',
  teal:   '#14B8A6',
} as const;

/** Ordered array for sequential chart colour assignment */
export const chartColorSequence = Object.values(chartColors);

// ─── Animation / Motion ───────────────────────────────────────────────────────
/** Duration values in milliseconds (for use with Framer Motion, GSAP, etc.) */
export const durations = {
  instant: 0,
  75:      75,
  100:     100,
  150:     150,
  200:     200,
  250:     250,
  300:     300,
  350:     350,
  400:     400,
  500:     500,
  700:     700,
  1000:    1000,
} as const;

/** Easing cubic-bezier strings for JS animation libraries */
export const easings = {
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  entrance: [0.0, 0, 0.2, 1] as [number, number, number, number],
  exit:     [0.4, 0, 1, 1]   as [number, number, number, number],
  bounce:   [0.68, -0.55, 0.27, 1.55] as [number, number, number, number],
  spring:   [0.34, 1.56, 0.64, 1]     as [number, number, number, number],
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────
export const zIndex = {
  below:    -1,
  base:      0,
  raised:    10,
  dropdown:  100,
  sticky:    200,
  overlay:   300,
  modal:     400,
  toast:     500,
  tooltip:   600,
  skipLink:  900,
  max:       9999,
} as const;

// ─── Navigation / Layout ──────────────────────────────────────────────────────
/** Height values in pixels – for use in scroll offset calculations */
export const layout = {
  navHeight:              64,
  headerHeight:           64,
  headerHeightCompact:    48,
  sidebarWidth:           256,
  sidebarCollapsedWidth:  64,
  topbarHeight:           36,
  footerMinHeight:        80,
} as const;

// ─── Utility: Read a CSS variable from :root at runtime ──────────────────────
/**
 * Reads the computed value of a CSS custom property from the document root.
 * Useful for passing token values to canvas / WebGL / SVG APIs.
 *
 * @param name – The CSS variable name, e.g. '--color-primary'
 * @param element – Optional element to resolve from (defaults to document.documentElement)
 */
export function getCSSVar(name: string, element?: HTMLElement): string {
  if (typeof window === 'undefined') return '';
  const el = element ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(name).trim();
}

// ─── Utility: Get current theme ──────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'system' | 'high-contrast';

export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') return 'system';
  return (document.documentElement.getAttribute('data-theme') as Theme) ?? 'system';
}

export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('qeltrava-theme', theme);
  }
}

export function initTheme(): void {
  if (typeof document === 'undefined') return;
  const saved = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('qeltrava-theme') as Theme | null)
    : null;
  setTheme(saved ?? 'system');
}
