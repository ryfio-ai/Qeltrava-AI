'use client';
/**
 * design-system/components/StatCard.tsx
 * Qeltrava AI Design System – StatCard
 *
 * Displays a metrics visual box with trends, values, labels, and support for sparkline visual slots.
 * Features 4 status variants: default, success, warning, danger.
 */
import React from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps, StatusVariant } from '../types';

export type StatTrend = 'up' | 'down' | 'flat';

export interface StatCardProps extends BaseComponentProps {
  /** Metric value text to display, e.g. "124,800" or "$3,450.00" */
  value:        string;
  /** Label explanation for metric value */
  label:        string;
  /** Optional trend direction */
  trend?:       StatTrend;
  /** Trend change percentage or description text, e.g. "+12.3%" */
  trendLabel?:  string;
  /** Trend label description for screen readers, e.g., "increase from last week" */
  trendAria?:   string;
  /** Sparkline slot container (renders below value/label) */
  sparkline?:   React.ReactNode;
  /** Optional custom decoration icon */
  iconName?:    string;
  /** Styling variant. Default is 'default' */
  variant?:     Extract<StatusVariant, 'default' | 'success' | 'warning' | 'danger'>;
}

const trendIcons: Record<StatTrend, { icon: string; color: string }> = {
  up:   { icon: 'ArrowUpRight', color: 'text-[var(--color-status-success)] bg-[var(--color-status-success-bg)]' },
  down: { icon: 'ArrowDownRight', color: 'text-[var(--color-status-danger)] bg-[var(--color-status-danger-bg)]' },
  flat: { icon: 'MoveRight', color: 'text-[var(--color-text-tertiary)] bg-[var(--color-bg-subtle)]' },
};

const variantClasses: Record<'default' | 'success' | 'warning' | 'danger', string> = {
  default: 'bg-[var(--surface-1)] border-[var(--color-border)] text-[var(--color-text)]',
  success: 'bg-[var(--color-status-success-bg)]/20 border-[var(--color-status-success-border)] text-[var(--color-status-success-text)]',
  warning: 'bg-[var(--color-status-warning-bg)]/20 border-[var(--color-status-warning-border)] text-[var(--color-status-warning-text)]',
  danger:  'bg-[var(--color-status-danger-bg)]/20 border-[var(--color-status-danger-border)] text-[var(--color-status-danger-text)]',
};

export function StatCard({
  value,
  label,
  trend,
  trendLabel,
  trendAria,
  sparkline,
  iconName,
  variant = 'default',
  className,
  'data-testid': testId,
}: StatCardProps) {
  const trendConfig = trend ? trendIcons[trend] : null;

  return (
    <div
      className={cn(
        'p-[var(--space-5)] border rounded-[var(--radius-xl)] shadow-sm space-y-[var(--space-3)]',
        variantClasses[variant],
        className
      )}
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-[var(--space-3)]">
        <div className="space-y-[var(--space-0-5)]">
          <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)] uppercase tracking-[var(--tracking-wider)]">
            {label}
          </p>
          <p className="text-[var(--font-size-2xl)] md:text-[var(--font-size-3xl)] font-bold text-[var(--color-text)] tracking-[var(--tracking-tight)] leading-none">
            {value}
          </p>
        </div>

        {/* Decoration Icon */}
        {iconName && (
          <span className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
            <Icon name={iconName} size={16} />
          </span>
        )}
      </div>

      {/* Sparkline slots */}
      {sparkline && (
        <div className="w-full pt-[var(--space-1)]" aria-hidden="true">
          {sparkline}
        </div>
      )}

      {/* Trend Info */}
      {(trendConfig || trendLabel) && (
        <div className="flex items-center gap-[var(--space-1-5)] text-[var(--font-size-xs)]">
          {trendConfig && (
            <span className={cn('p-0.5 rounded-full inline-flex items-center justify-center', trendConfig.color)}>
              <Icon name={trendConfig.icon} size={10} />
            </span>
          )}
          {trendLabel && (
            <span className="font-semibold text-[var(--color-text)]">
              {trendLabel}
            </span>
          )}
          {trendAria && (
            <span className="sr-only">({trendAria})</span>
          )}
        </div>
      )}
    </div>
  );
}
export default StatCard;
