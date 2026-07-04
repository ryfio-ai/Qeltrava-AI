/**
 * design-system/components/Select.tsx
 * Qeltrava AI Design System – Select (native)
 *
 * A token-styled wrapper around the native <select> element.
 * Sizes: sm | md | lg
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, focusRing } from '../utils';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value:    string;
  label:    string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?:      SelectSize;
  label?:     string;
  hint?:      string;
  error?:     string;
  options?:   SelectOption[];
  fullWidth?: boolean;
  inputId?:   string;
}

const sizeMap: Record<SelectSize, string> = {
  sm: 'h-[var(--input-height-sm)] pl-[var(--input-padding-x-sm)] pr-[var(--space-8)] text-[var(--font-size-sm)]',
  md: 'h-[var(--input-height-md)] pl-[var(--input-padding-x-md)] pr-[var(--space-10)] text-[var(--font-size-base)]',
  lg: 'h-[var(--input-height-lg)] pl-[var(--input-padding-x-lg)] pr-[var(--space-12)] text-[var(--font-size-md)]',
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size       = 'md',
      label,
      hint,
      error,
      options,
      fullWidth  = false,
      inputId,
      className,
      disabled,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const resolvedId  = inputId ?? id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId     = resolvedId ? `${resolvedId}-error` : undefined;
    const hintId      = resolvedId ? `${resolvedId}-hint` : undefined;
    const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
    const hasError    = Boolean(error);

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

        <div className={cn('relative', fullWidth ? 'w-full' : 'w-auto')}>
          <select
            ref={ref}
            id={resolvedId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              'appearance-none w-full',
              'bg-[var(--input-bg)] text-[var(--color-text-primary)]',
              'border rounded-[var(--input-radius)] outline-none cursor-pointer',
              'transition-[var(--transition-hover)]',
              hasError
                ? 'border-[var(--input-border-error)]'
                : 'border-[var(--input-border)] hover:border-[var(--color-border-strong)]',
              'focus:border-[var(--input-border-focus)] focus:shadow-[var(--input-shadow-focus)]',
              disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
              sizeMap[size],
              focusRing
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown
            aria-hidden="true"
            size={16}
            className="pointer-events-none absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
          />
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-[var(--font-size-caption)] text-[var(--color-danger)]">{error}</p>
        ) : hint ? (
          <p id={hintId} className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
