'use client';
/**
 * design-system/components/Banner.tsx
 * Qeltrava AI Design System – Banner
 *
 * Full-width, page-level global notifications. Dismissible and optionally sticky.
 */
import React, { useState } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps, StatusVariant } from '../types';

export interface BannerProps extends BaseComponentProps {
  children?:    React.ReactNode;
  /** Primary text/title of banner */
  message:      string;
  /** Status variant. Default is 'info' */
  variant?:     Extract<StatusVariant, 'info' | 'success' | 'warning' | 'danger'>;
  /** Sticky position. Default is false */
  sticky?:      boolean;
  /** Close callback. If provided, renders a close/dismiss X button */
  onClose?:     () => void;
  /** Action elements block (like text CTA buttons) */
  action?:      React.ReactNode;
}

const variantStyles: Record<'info' | 'success' | 'warning' | 'danger', { container: string; iconColor: string; defaultIcon: string }> = {
  info: {
    container: 'bg-[var(--color-status-info-bg)] border-[var(--color-status-info-border)] text-[var(--color-status-info-text)]',
    iconColor: 'text-[var(--color-status-info-text)]',
    defaultIcon: 'Info',
  },
  success: {
    container: 'bg-[var(--color-status-success-bg)] border-[var(--color-status-success-border)] text-[var(--color-status-success-text)]',
    iconColor: 'text-[var(--color-status-success)]',
    defaultIcon: 'CheckCircle2',
  },
  warning: {
    container: 'bg-[var(--color-status-warning-bg)] border-[var(--color-status-warning-border)] text-[var(--color-status-warning-text)]',
    iconColor: 'text-[var(--color-status-warning)]',
    defaultIcon: 'AlertTriangle',
  },
  danger: {
    container: 'bg-[var(--color-status-danger-bg)] border-[var(--color-status-danger-border)] text-[var(--color-status-danger-text)]',
    iconColor: 'text-[var(--color-status-danger)]',
    defaultIcon: 'XCircle',
  },
};

export function Banner({
  children,
  message,
  variant = 'info',
  sticky = false,
  onClose,
  action,
  className,
  'data-testid': testId,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = variantStyles[variant];

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-[var(--space-4)] px-[var(--space-6)] py-[var(--space-3)] border-b text-[var(--font-size-sm)]',
        sticky && 'sticky top-0 z-40',
        styles.container,
        className
      )}
      role="status"
      aria-live="polite"
      data-testid={testId}
    >
      <div className="flex items-center gap-[var(--space-3)] flex-1 min-w-0">
        <span className={cn('shrink-0', styles.iconColor)}>
          <Icon name={styles.defaultIcon} size={16} />
        </span>
        <div className="flex-1 min-w-0 font-medium">
          {message}
          {children && <div className="mt-1 font-normal opacity-90">{children}</div>}
        </div>
      </div>

      <div className="flex items-center gap-[var(--space-4)] shrink-0">
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
        
        {onClose && (
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-[var(--color-bg-hover)] transition-all focus:outline-none focus:ring-1 focus:ring-[var(--focus-ring-color)]"
            aria-label="Dismiss banner"
            data-testid={testId ? `${testId}-dismiss` : undefined}
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
