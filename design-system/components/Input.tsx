/**
 * design-system/components/Input.tsx
 * Qeltrava AI Design System – Input
 *
 * Sizes:   sm | md | lg
 * States:  default | focus | error | disabled | readonly
 * Slots:   leftIcon, rightIcon, prefix, suffix
 * ARIA:    aria-invalid, aria-describedby wired to error/hint ids
 */
import React from 'react';
import { cn, focusRing } from '../utils';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?:        InputSize;
  label?:       string;
  hint?:        string;
  error?:       string;
  leftIcon?:    React.ReactNode;
  rightIcon?:   React.ReactNode;
  prefix?:      string;
  suffix?:      string;
  fullWidth?:   boolean;
  inputId?:     string;
}

const sizeMap: Record<InputSize, { input: string; icon: string }> = {
  sm: {
    input: 'h-[var(--input-height-sm)] px-[var(--input-padding-x-sm)] text-[var(--font-size-sm)]',
    icon:  'px-[var(--space-2)]',
  },
  md: {
    input: 'h-[var(--input-height-md)] px-[var(--input-padding-x-md)] text-[var(--font-size-base)]',
    icon:  'px-[var(--space-3)]',
  },
  lg: {
    input: 'h-[var(--input-height-lg)] px-[var(--input-padding-x-lg)] text-[var(--font-size-md)]',
    icon:  'px-[var(--space-4)]',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size       = 'md',
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      fullWidth  = false,
      inputId,
      className,
      disabled,
      readOnly,
      id,
      ...props
    },
    ref
  ) => {
    const resolvedId = inputId ?? id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId    = resolvedId ? `${resolvedId}-error` : undefined;
    const hintId     = resolvedId ? `${resolvedId}-hint` : undefined;
    const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

    const { input: inputSize, icon: iconSize } = sizeMap[size];
    const hasError   = Boolean(error);
    const isDisabled = disabled;

    const wrapperClasses = cn(
      'relative flex items-center',
      'bg-[var(--input-bg)] text-[var(--color-text-primary)]',
      'border rounded-[var(--input-radius)]',
      'transition-[var(--transition-hover)]',
      hasError
        ? 'border-[var(--input-border-error)]'
        : 'border-[var(--input-border)] hover:border-[var(--color-border-strong)]',
      isDisabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
      fullWidth ? 'w-full' : 'w-auto'
    );

    return (
      <div className={cn('flex flex-col gap-[var(--space-1-5)]', fullWidth ? 'w-full' : undefined, className)}>
        {label && (
          <label
            htmlFor={resolvedId}
            className="text-[var(--font-size-label)] font-[var(--font-weight-label)] text-[var(--color-text-primary)] leading-[var(--line-height-snug)]"
          >
            {label}
          </label>
        )}

        <div className={wrapperClasses}>
          {/* Left icon / prefix */}
          {leftIcon && (
            <span aria-hidden="true" className={cn('text-[var(--color-text-secondary)] shrink-0', iconSize)}>
              {leftIcon}
            </span>
          )}
          {prefix && (
            <span className={cn('text-[var(--color-text-secondary)] text-[var(--font-size-sm)] shrink-0 pl-[var(--space-3)] pr-[var(--space-1)]', 'select-none border-r border-[var(--color-border)] mr-[var(--space-2)]')}>
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={resolvedId}
            disabled={isDisabled}
            readOnly={readOnly}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              'flex-1 bg-transparent outline-none min-w-0',
              'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)]',
              'disabled:cursor-not-allowed read-only:cursor-default',
              inputSize,
              // Remove horizontal padding when icon/prefix/suffix occupies that slot
              (leftIcon || prefix)  && 'pl-0',
              (rightIcon || suffix) && 'pr-0',
              focusRing
            )}
            {...props}
          />

          {suffix && (
            <span className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] shrink-0 pr-[var(--space-3)] pl-[var(--space-1)] border-l border-[var(--color-border)] ml-[var(--space-2)] select-none">
              {suffix}
            </span>
          )}
          {rightIcon && (
            <span aria-hidden="true" className={cn('text-[var(--color-text-secondary)] shrink-0', iconSize)}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* Focus ring as box-shadow on wrapper */}
        <style>{`
          .input-wrapper:focus-within {
            box-shadow: var(--input-shadow-focus);
            border-color: var(--input-border-focus);
          }
        `}</style>

        {error && (
          <p id={errorId} role="alert" className="text-[var(--font-size-caption)] text-[var(--color-danger)] leading-[var(--line-height-snug)]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)] leading-[var(--line-height-snug)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
