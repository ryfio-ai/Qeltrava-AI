/**
 * design-system/components/Spinner.tsx
 * Qeltrava AI Design System – Spinner
 *
 * Sizes:    xs | sm | md | lg | xl
 * Colours:  inherit current colour via currentColor
 * ARIA:     role="status", aria-label
 */
import React from 'react';
import { cn } from '../utils';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?:      SpinnerSize;
  label?:     string;
  className?: string;
  color?:     string;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs:  12,
  sm:  16,
  md:  24,
  lg:  32,
  xl:  48,
};

export function Spinner({ size = 'md', label = 'Loading…', className, color }: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
      style={color ? { color } : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={px}
        height={px}
        aria-hidden="true"
        className="animate-spin"
      >
        <circle
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-20"
        />
        <path
          fill="currentColor"
          className="opacity-80"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

// ─── Full-page overlay spinner ────────────────────────────────────────────────

export function SpinnerOverlay({ label = 'Loading…' }: { label?: string }) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      className={cn(
        'fixed inset-0 z-[var(--z-overlay)]',
        'flex items-center justify-center',
        'bg-[var(--modal-backdrop)] backdrop-blur-[var(--blur-sm)]'
      )}
    >
      <Spinner size="xl" color="var(--color-text-inverted)" label={label} />
    </div>
  );
}
