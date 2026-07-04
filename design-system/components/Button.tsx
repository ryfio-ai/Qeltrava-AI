'use client';
/**
 * design-system/components/Button.tsx
 * Qeltrava AI Design System – Button
 *
 * Variants:  primary | secondary | ghost | danger | outline
 * Sizes:     xs | sm | md | lg | xl
 * States:    default | hover | active | focus | disabled | loading
 * As-prop:   renders as <button>, <a>, or any polymorphic element
 * ARIA:      aria-disabled, aria-busy, role propagation
 */
import React from 'react';
import { cn, focusRing } from '../utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  /** Render as anchor – passes all non-button HTML attrs */
  asChild?:   boolean;
  href?:      string;
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-text-inverted)] ' +
    'hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-active)] ' +
    'shadow-[var(--shadow-button)]',
  secondary:
    'bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] ' +
    'border border-[var(--color-border)] ' +
    'hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-border-strong)] ' +
    'active:bg-[var(--color-bg-subtle)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] ' +
    'hover:bg-[var(--state-hover-overlay)] ' +
    'active:bg-[var(--state-press-overlay)]',
  danger:
    'bg-[var(--color-danger)] text-white ' +
    'hover:opacity-90 active:opacity-100 active:scale-[0.98] ' +
    'shadow-[var(--shadow-button)]',
  outline:
    'bg-transparent text-[var(--color-primary)] ' +
    'border border-[var(--color-primary)] ' +
    'hover:bg-[var(--brand-navy-10)] hover:text-[var(--color-primary-hover)] ' +
    'hover:border-[var(--color-primary-hover)] ' +
    'active:bg-[var(--brand-navy-20)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs:  'h-[var(--button-height-xs)] px-[var(--space-3)] text-[var(--font-size-xs)] gap-[var(--space-1)]',
  sm:  'h-[var(--button-height-sm)] px-[var(--button-padding-x-sm)] text-[var(--font-size-sm)] gap-[var(--space-1-5)]',
  md:  'h-[var(--button-height-md)] px-[var(--button-padding-x-md)] text-[var(--font-size-sm)] gap-[var(--space-2)]',
  lg:  'h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] text-[var(--font-size-base)] gap-[var(--space-2)]',
  xl:  'h-[var(--button-height-xl)] px-[var(--space-10)] text-[var(--font-size-md)] gap-[var(--space-2-5)]',
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

function ButtonSpinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant    = 'primary',
      size       = 'md',
      loading    = false,
      leftIcon,
      rightIcon,
      fullWidth  = false,
      className,
      children,
      disabled,
      href,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // Base
      'relative inline-flex items-center justify-center select-none',
      'font-[var(--font-weight-button)] rounded-[var(--radius-button)]',
      'transition-[var(--transition-hover)]',
      'cursor-pointer whitespace-nowrap',
      focusRing,
      // Variant + size
      variantStyles[variant],
      sizeStyles[size],
      // States
      isDisabled && 'opacity-[var(--opacity-disabled)] pointer-events-none',
      fullWidth  && 'w-full',
      className
    );

    const content = (
      <>
        {loading  ? <ButtonSpinner /> : leftIcon}
        {children && <span>{children}</span>}
        {!loading && rightIcon}
      </>
    );

    // Render as anchor when href is provided
    if (href && !isDisabled) {
      return (
        <a href={href} className={classes} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
