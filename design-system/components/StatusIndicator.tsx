'use client';
/**
 * design-system/components/StatusIndicator.tsx
 * Qeltrava AI Design System – StatusIndicator
 *
 * Displays a live color-coded status dot and text label.
 * Options for a pulsing dot indicator.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export type StatusIndicatorVariant = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface StatusIndicatorProps extends BaseComponentProps {
  /** Label description */
  label?:        string;
  /** Status variant. Default is 'operational' */
  variant?:     StatusIndicatorVariant;
  /** Enable pulsing animation on the indicator dot. Default is false */
  pulse?:       boolean;
  /** Custom size of dot. Default is 'md' */
  size?:        'sm' | 'md' | 'lg';
}

const statusColors: Record<StatusIndicatorVariant, { dot: string; pulse: string }> = {
  operational: {
    dot: 'bg-[var(--color-status-success)]',
    pulse: 'bg-[var(--color-status-success)]/40',
  },
  degraded: {
    dot: 'bg-[var(--color-status-warning)]',
    pulse: 'bg-[var(--color-status-warning)]/40',
  },
  outage: {
    dot: 'bg-[var(--color-status-danger)]',
    pulse: 'bg-[var(--color-status-danger)]/40',
  },
  maintenance: {
    dot: 'bg-[var(--color-text-tertiary)]',
    pulse: 'bg-[var(--color-text-tertiary)]/40',
  },
};

const dotSizes = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-4 w-4',
};

const labelSizes = {
  sm: 'text-[var(--font-size-xs)]',
  md: 'text-[var(--font-size-sm)]',
  lg: 'text-[var(--font-size-md)] font-medium',
};

export function StatusIndicator({
  label,
  variant = 'operational',
  pulse = false,
  size = 'md',
  className,
  'data-testid': testId,
}: StatusIndicatorProps) {
  const colors = statusColors[variant];

  const resolvedLabel = label || variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <div
      className={cn('inline-flex items-center gap-[var(--space-2)] font-medium text-[var(--color-text-secondary)]', className)}
      data-testid={testId}
    >
      <span className="relative flex shrink-0 justify-center items-center">
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full animate-ping opacity-75',
              colors.pulse,
              dotSizes[size]
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full',
            colors.dot,
            dotSizes[size]
          )}
          aria-hidden="true"
        />
      </span>
      <span className={cn('select-none capitalize text-left leading-none', labelSizes[size])}>
        {resolvedLabel}
      </span>
    </div>
  );
}
export default StatusIndicator;
