/**
 * design-system/utils.ts
 * Shared utility: class-name merger consumed by every DS component.
 * Uses clsx for conditional classes + tailwind-merge to deduplicate
 * conflicting Tailwind utilities at the call site.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Focusable interactive element guard */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-[color:var(--focus-ring-color)] focus-visible:ring-offset-[length:var(--focus-ring-offset)]';
