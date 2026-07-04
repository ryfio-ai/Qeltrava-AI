/**
 * design-system/components/Badge.tsx
 * Qeltrava AI Design System – Badge
 *
 * Variants:  default | primary | success | warning | danger | info | outline
 * Sizes:     sm | md | lg
 * Features:  dot indicator, left/right icon slots, removable (onRemove)
 */
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
export type BadgeSize    = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?:   BadgeVariant;
  size?:      BadgeSize;
  dot?:       boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?:  () => void;
  children:   React.ReactNode;
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  primary:
    'bg-[var(--brand-navy-10)] text-[var(--brand-navy)] border border-[var(--brand-navy-20)]',
  success:
    'bg-[var(--color-success-bg)] text-[var(--color-success)] border border-[var(--color-success)]/30',
  warning:
    'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning)]/30',
  danger:
    'bg-[var(--color-danger-bg)] text-[var(--color-danger)] border border-[var(--color-danger)]/30',
  info:
    'bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info)]/30',
  outline:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)]',
};

const dotColorMap: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-text-tertiary)]',
  primary: 'bg-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger:  'bg-[var(--color-danger)]',
  info:    'bg-[var(--color-info)]',
  outline: 'bg-[var(--color-text-secondary)]',
};

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-[var(--font-size-xs)] px-[var(--space-1-5)] py-[var(--space-0-5)] gap-[var(--space-1)]',
  md: 'text-[var(--font-size-xs)] px-[var(--space-2)]   py-[var(--space-1)]   gap-[var(--space-1)]',
  lg: 'text-[var(--font-size-sm)] px-[var(--space-3)]   py-[var(--space-1-5)] gap-[var(--space-1-5)]',
};

export function Badge({
  variant   = 'default',
  size      = 'md',
  dot       = false,
  leftIcon,
  rightIcon,
  onRemove,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-badge)]',
        'font-[var(--font-weight-medium)] leading-[var(--line-height-none)]',
        'select-none whitespace-nowrap',
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('rounded-full w-[6px] h-[6px] shrink-0', dotColorMap[variant])}
        />
      )}
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className={cn(
            'ml-[var(--space-0-5)] -mr-[var(--space-0-5)] p-[var(--space-0-5)]',
            'rounded-full opacity-60 hover:opacity-100',
            'transition-opacity cursor-pointer'
          )}
        >
          <X size={10} aria-hidden />
        </button>
      )}
    </span>
  );
}
