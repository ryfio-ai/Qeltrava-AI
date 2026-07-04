/**
 * design-system/components/Alert.tsx
 * Qeltrava AI Design System – Alert
 *
 * Variants:  info | success | warning | danger | neutral
 * Sizes:     sm | md
 * Features:  dismissible, icon slot, action slot, title+description
 */
'use client';
import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps {
  variant?:     AlertVariant;
  title?:       string;
  children?:    React.ReactNode;
  dismissible?: boolean;
  onDismiss?:   () => void;
  icon?:        React.ReactNode;
  action?:      React.ReactNode;
  className?:   string;
}

const variantConfig: Record<AlertVariant, {
  bg: string; border: string; title: string; body: string; icon: React.ComponentType<{ size?: number; className?: string }>; iconClass: string;
}> = {
  info: {
    bg:        'bg-[var(--color-info-bg)]',
    border:    'border-[var(--color-info)]/30',
    title:     'text-[var(--color-info)]',
    body:      'text-[var(--color-text-primary)]',
    icon:      Info,
    iconClass: 'text-[var(--color-info)]',
  },
  success: {
    bg:        'bg-[var(--color-success-bg)]',
    border:    'border-[var(--color-success)]/30',
    title:     'text-[var(--color-success)]',
    body:      'text-[var(--color-text-primary)]',
    icon:      CheckCircle,
    iconClass: 'text-[var(--color-success)]',
  },
  warning: {
    bg:        'bg-[var(--color-warning-bg)]',
    border:    'border-[var(--color-warning)]/40',
    title:     'text-[var(--color-warning)]',
    body:      'text-[var(--color-text-primary)]',
    icon:      AlertTriangle,
    iconClass: 'text-[var(--color-warning)]',
  },
  danger: {
    bg:        'bg-[var(--color-danger-bg)]',
    border:    'border-[var(--color-danger)]/30',
    title:     'text-[var(--color-danger)]',
    body:      'text-[var(--color-text-primary)]',
    icon:      XCircle,
    iconClass: 'text-[var(--color-danger)]',
  },
  neutral: {
    bg:        'bg-[var(--color-bg-subtle)]',
    border:    'border-[var(--color-border)]',
    title:     'text-[var(--color-text-primary)]',
    body:      'text-[var(--color-text-secondary)]',
    icon:      Info,
    iconClass: 'text-[var(--color-text-secondary)]',
  },
};

export function Alert({
  variant     = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);
  const { bg, border, title: titleColor, body: bodyColor, icon: DefaultIcon, iconClass } = variantConfig[variant];

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-[var(--space-3)] p-[var(--space-4)]',
        'rounded-[var(--radius-lg)] border',
        bg, border,
        className
      )}
    >
      <span className={cn('mt-[2px] shrink-0', iconClass)} aria-hidden="true">
        {icon ?? <DefaultIcon size={18} />}
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-snug)] mb-[var(--space-1)]', titleColor)}>
            {title}
          </p>
        )}
        {children && (
          <div className={cn('text-[var(--font-size-sm)] leading-[var(--line-height-relaxed)]', bodyColor)}>
            {children}
          </div>
        )}
        {action && <div className="mt-[var(--space-3)]">{action}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss alert"
          className="shrink-0 p-[var(--space-1)] rounded-[var(--radius-sm)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X size={14} aria-hidden />
        </button>
      )}
    </div>
  );
}
