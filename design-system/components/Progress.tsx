/**
 * design-system/components/Progress.tsx
 * Qeltrava AI Design System – Progress
 *
 * Components:  Progress (bar) | CircularProgress | Steps
 * Sizes:       xs(2px) | sm(4px) | md(8px) | lg(12px)
 * ARIA:        role="progressbar", aria-valuenow/min/max
 */
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils';

export type ProgressSize    = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

// ─── Linear Progress ──────────────────────────────────────────────────────────

export interface ProgressProps {
  value?:      number;   /* 0–100; undefined = indeterminate */
  size?:       ProgressSize;
  variant?:    ProgressVariant;
  label?:      string;
  showLabel?:  boolean;
  animated?:   boolean;
  className?:  string;
}

const heightMap: Record<ProgressSize, string> = {
  xs: 'h-[2px]',
  sm: 'h-[4px]',
  md: 'h-[8px]',
  lg: 'h-[12px]',
};

const fillColorMap: Record<ProgressVariant, string> = {
  default: 'bg-[var(--color-accent)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger:  'bg-[var(--color-danger)]',
};

export function Progress({
  value,
  size       = 'sm',
  variant    = 'default',
  label,
  showLabel  = false,
  animated   = false,
  className,
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const clampedValue    = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div className={cn('flex flex-col gap-[var(--space-1-5)]', className)}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)]">{label}</span>
          )}
          {showLabel && !isIndeterminate && (
            <span className="text-[var(--font-size-caption)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] tabular-nums">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className={cn(
          'w-full rounded-full overflow-hidden bg-[var(--color-border-subtle)]',
          heightMap[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-[var(--duration-500)] ease-[var(--easing-standard)]',
            fillColorMap[variant],
            isIndeterminate && 'animate-[indeterminate_1.5s_ease-in-out_infinite] w-[40%]',
            animated && !isIndeterminate && 'transition-[width_var(--duration-700)_var(--easing-entrance)]'
          )}
          style={!isIndeterminate ? { width: `${clampedValue}%` } : undefined}
        />
      </div>
    </div>
  );
}

// ─── Circular Progress ────────────────────────────────────────────────────────

export interface CircularProgressProps {
  value?:     number;
  size?:      number;
  stroke?:    number;
  variant?:   ProgressVariant;
  label?:     boolean;
  className?: string;
}

export function CircularProgress({
  value,
  size    = 48,
  stroke  = 4,
  variant = 'default',
  label   = false,
  className,
}: CircularProgressProps) {
  const isIndeterminate = value === undefined;
  const clampedValue    = Math.min(100, Math.max(0, value ?? 0));
  const r               = (size - stroke) / 2;
  const circumference   = 2 * Math.PI * r;
  const offset          = circumference - (clampedValue / 100) * circumference;

  const trackColors: Record<ProgressVariant, string> = {
    default: 'var(--color-accent)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger:  'var(--color-danger)',
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="var(--color-border-subtle)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={trackColors[variant]}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.7 : offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          className={isIndeterminate ? 'animate-spin' : 'transition-[stroke-dashoffset] duration-[var(--duration-500)]'}
        />
      </svg>
      {label && !isIndeterminate && (
        <span className="absolute text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] tabular-nums">
          {clampedValue}%
        </span>
      )}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

export interface Step {
  label:       string;
  description?: string;
}

export interface StepsProps {
  steps:       Step[];
  current:     number;   /* 0-indexed */
  orientation?: 'horizontal' | 'vertical';
  className?:  string;
}

export function Steps({ steps, current, orientation = 'horizontal', className }: StepsProps) {
  return (
    <ol
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'items-center' : 'flex-col gap-0',
        className
      )}
      aria-label="Progress steps"
    >
      {steps.map((step, i) => {
        const isComplete = i < current;
        const isActive   = i === current;
        const isLast     = i === steps.length - 1;

        return (
          <li
            key={i}
            aria-current={isActive ? 'step' : undefined}
            className={cn(
              'flex items-center',
              orientation === 'horizontal' ? 'flex-1 last:flex-none' : 'gap-0'
            )}
          >
            <div className={cn('flex', orientation === 'horizontal' ? 'flex-col items-center' : 'items-start gap-[var(--space-3)]')}>
              {/* Step indicator */}
              <div className={cn(
                'w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center shrink-0',
                'text-[var(--font-size-xs)] font-[var(--font-weight-semibold)]',
                'transition-colors duration-[var(--duration-200)]',
                isComplete ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                  : isActive ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-bg-page)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-tertiary)] bg-[var(--color-bg-page)]'
              )}>
                {isComplete ? <Check size={14} aria-hidden /> : <span>{i + 1}</span>}
              </div>

              {/* Labels */}
              <div className={cn('mt-[var(--space-1)]', orientation === 'horizontal' ? 'text-center' : 'mt-0')}>
                <p className={cn('text-[var(--font-size-sm)] font-[var(--font-weight-medium)]',
                  isActive ? 'text-[var(--color-text-heading)]' : 'text-[var(--color-text-secondary)]'
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector */}
            {!isLast && orientation === 'horizontal' && (
              <div className={cn('flex-1 h-[2px] mx-[var(--space-2)] transition-colors duration-[var(--duration-200)]',
                isComplete ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
              )} aria-hidden />
            )}
            {!isLast && orientation === 'vertical' && (
              <div className={cn('w-[2px] h-[var(--space-8)] ml-[13px] transition-colors duration-[var(--duration-200)]',
                isComplete ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
              )} aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
