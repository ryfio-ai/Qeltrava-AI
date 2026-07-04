/**
 * design-system/utilities/typography.ts
 * Typography utility functions.
 */

/**
 * Maps heading levels (1-6) to their semantic font-size design tokens.
 */
export function getHeadingSizeClass(level: 1 | 2 | 3 | 4 | 5 | 6): string {
  const mapping = {
    1: 'text-[var(--font-size-heading-lg)] md:text-[var(--font-size-heading-xl)] font-bold tracking-tight',
    2: 'text-[var(--font-size-heading-md)] md:text-[var(--font-size-heading-lg)] font-bold tracking-tight',
    3: 'text-[var(--font-size-heading-sm)] md:text-[var(--font-size-heading-md)] font-semibold tracking-tight',
    4: 'text-[var(--font-size-heading-xs)] md:text-[var(--font-size-heading-sm)] font-semibold',
    5: 'text-[var(--font-size-subheading)] font-semibold',
    6: 'text-[var(--font-size-body-lg)] font-semibold',
  };
  return mapping[level] || '';
}
