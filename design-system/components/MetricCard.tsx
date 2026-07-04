'use client';
/**
 * design-system/components/MetricCard.tsx
 * Qeltrava AI Design System – MetricCard
 *
 * KPI-focused widget showing large display numbers, description lines, delta changes, and decorative icons.
 */
import React from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface MetricCardProps extends BaseComponentProps {
  /** Large central KPI metric value string, e.g. "99.8%" */
  value:        string;
  /** Primary label description */
  label:        string;
  /** Subtitle / detail line below the metric value */
  sublabel?:    string;
  /** Delta change percentage / trend description, e.g. "+1.2% vs yesterday" */
  delta?:       string;
  /** Boolean indicating if delta represents positive progression. Default is true */
  deltaPositive?: boolean;
  /** Leading visual indicator icon */
  iconName?:    string;
}

export function MetricCard({
  value,
  label,
  sublabel,
  delta,
  deltaPositive = true,
  iconName,
  className,
  'data-testid': testId,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'p-[var(--space-6)] bg-[var(--surface-1)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-sm flex items-center justify-between gap-[var(--space-4)]',
        className
      )}
      data-testid={testId}
    >
      <div className="space-y-[var(--space-2)] min-w-0">
        <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)] leading-none truncate">
          {label}
        </p>
        
        <div className="space-y-[var(--space-0-5)]">
          <p className="text-[var(--font-size-3xl)] md:text-[var(--font-size-4xl)] font-bold text-[var(--color-text)] tracking-[var(--tracking-tight)] leading-none">
            {value}
          </p>
          {sublabel && (
            <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] truncate">
              {sublabel}
            </p>
          )}
        </div>

        {delta && (
          <div className="flex items-center gap-[var(--space-1)] text-[var(--font-size-xs)]">
            <span className={cn('inline-flex items-center gap-0.5 font-semibold', deltaPositive ? 'text-[var(--color-status-success)]' : 'text-[var(--color-status-danger)]')}>
              <Icon name={deltaPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
              {delta}
            </span>
          </div>
        )}
      </div>

      {/* Decorative Icon */}
      {iconName && (
        <span className="p-3.5 rounded-2xl bg-[var(--color-primary-hover)]/10 text-[var(--color-accent)] shrink-0 self-start">
          <Icon name={iconName} size={22} />
        </span>
      )}
    </div>
  );
}
export default MetricCard;
