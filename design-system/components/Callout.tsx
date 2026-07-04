'use client';
/**
 * design-system/components/Callout.tsx
 * Qeltrava AI Design System – Callout
 *
 * Render block-level highlighted content containing titles, body paragraphs, and action links.
 * Available in 5 status variants (default, info, success, warning, danger).
 */
import React from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps, StatusVariant } from '../types';

export interface CalloutProps extends BaseComponentProps {
  children?:    React.ReactNode;
  /** Title of the callout box */
  title?:       string;
  /** Action elements block (usually buttons or links) */
  actions?:     React.ReactNode;
  /** Variant of the callout. Default is 'default' */
  variant?:     StatusVariant;
  /** Icon name override. If not specified, a default icon for the variant is rendered */
  iconName?:    string;
}

const variantStyles: Record<StatusVariant, { container: string; iconColor: string; titleColor: string; defaultIcon: string }> = {
  default: {
    container: 'bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-text)]',
    iconColor: 'text-[var(--color-text-secondary)]',
    titleColor: 'text-[var(--color-text)]',
    defaultIcon: 'Info',
  },
  info: {
    container: 'bg-[var(--color-status-info-bg)] border-[var(--color-status-info-border)] text-[var(--color-status-info-text)]',
    iconColor: 'text-[var(--color-status-info-text)]',
    titleColor: 'text-[var(--color-status-info-text)]',
    defaultIcon: 'Info',
  },
  success: {
    container: 'bg-[var(--color-status-success-bg)] border-[var(--color-status-success-border)] text-[var(--color-status-success-text)]',
    iconColor: 'text-[var(--color-status-success)]',
    titleColor: 'text-[var(--color-status-success-text)]',
    defaultIcon: 'CheckCircle2',
  },
  warning: {
    container: 'bg-[var(--color-status-warning-bg)] border-[var(--color-status-warning-border)] text-[var(--color-status-warning-text)]',
    iconColor: 'text-[var(--color-status-warning)]',
    titleColor: 'text-[var(--color-status-warning-text)]',
    defaultIcon: 'AlertTriangle',
  },
  danger: {
    container: 'bg-[var(--color-status-danger-bg)] border-[var(--color-status-danger-border)] text-[var(--color-status-danger-text)]',
    iconColor: 'text-[var(--color-status-danger)]',
    titleColor: 'text-[var(--color-status-danger-text)]',
    defaultIcon: 'XCircle',
  },
  neutral: {
    container: 'bg-[var(--color-bg-subtle)] border-[var(--color-border)] text-[var(--color-text-secondary)]',
    iconColor: 'text-[var(--color-text-tertiary)]',
    titleColor: 'text-[var(--color-text)]',
    defaultIcon: 'HelpCircle',
  },
};

export function Callout({
  children,
  title,
  actions,
  variant = 'default',
  iconName,
  className,
  'data-testid': testId,
}: CalloutProps) {
  const styles = variantStyles[variant];
  const finalIconName = iconName || styles.defaultIcon;

  return (
    <div
      className={cn(
        'flex gap-[var(--space-4)] p-[var(--space-5)] border rounded-[var(--radius-lg)] text-[var(--font-size-sm)]',
        styles.container,
        className
      )}
      role="region"
      aria-label={title || 'Callout information'}
      data-testid={testId}
    >
      {/* Icon Column */}
      {finalIconName !== 'none' && (
        <span className={cn('shrink-0 mt-0.5', styles.iconColor)}>
          <Icon name={finalIconName} size={18} />
        </span>
      )}

      {/* Content Column */}
      <div className="flex-1 min-w-0 space-y-1">
        {title && (
          <h5 className={cn('font-semibold text-[var(--font-size-sm)] leading-tight', styles.titleColor)}>
            {title}
          </h5>
        )}
        {children && (
          <div className="text-[var(--color-text-secondary)] leading-normal">
            {children}
          </div>
        )}
        {actions && (
          <div className="flex items-center gap-[var(--space-4)] pt-[var(--space-2)]">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
