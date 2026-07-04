/**
 * design-system/utilities/spacing.ts
 * Spacing utility functions.
 */

/**
 * Resolves a spacing token number (0-16) or custom string to a CSS variable value.
 * e.g., resolveSpace(4) -> 'var(--space-4)'
 */
export function resolveSpace(space: number | string | undefined): string {
  if (space === undefined) return '';
  if (typeof space === 'number') {
    // Valid spacing scales are 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 64
    const stringified = String(space).replace('.', '-');
    return `var(--space-${stringified})`;
  }
  return space;
}
