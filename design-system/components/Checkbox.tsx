/**
 * design-system/components/Checkbox.tsx
 * Qeltrava AI Design System – Checkbox
 *
 * Sizes:    sm | md | lg
 * States:   unchecked | checked | indeterminate | disabled | error
 * ARIA:     aria-checked (tri-state), aria-invalid, aria-describedby
 */
'use client';
import React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn, focusRing } from '../utils';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?:           CheckboxSize;
  label?:          string;
  hint?:           string;
  error?:          string;
  indeterminate?:  boolean;
  inputId?:        string;
}

const sizeMap: Record<CheckboxSize, { box: string; icon: number; text: string }> = {
  sm: { box: 'w-[14px] h-[14px] rounded-[var(--radius-xs)]', icon: 10, text: 'text-[var(--font-size-sm)]' },
  md: { box: 'w-[16px] h-[16px] rounded-[var(--radius-sm)]', icon: 11, text: 'text-[var(--font-size-base)]' },
  lg: { box: 'w-[20px] h-[20px] rounded-[var(--radius-md)]', icon: 14, text: 'text-[var(--font-size-md)]' },
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size          = 'md',
      label,
      hint,
      error,
      indeterminate = false,
      inputId,
      className,
      disabled,
      checked,
      defaultChecked,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const internalRef  = React.useRef<HTMLInputElement>(null);
    const resolvedRef  = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;
    const resolvedId   = inputId ?? id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId      = resolvedId ? `${resolvedId}-error` : undefined;
    const hintId       = resolvedId ? `${resolvedId}-hint` : undefined;
    const describedBy  = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
    const hasError     = Boolean(error);
    const { box, icon: iconSize, text: textSize } = sizeMap[size];

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className={cn('flex flex-col gap-[var(--space-1)]', className)}>
        <label className={cn('inline-flex items-start gap-[var(--space-2)] cursor-pointer', disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed')}>
          <span className={cn('relative flex items-center justify-center shrink-0 mt-[2px]', box,
            'border-2 transition-[var(--transition-hover)]',
            hasError      ? 'border-[var(--color-danger)]' : 'border-[var(--color-border-strong)]',
            (checked || indeterminate)
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
              : 'bg-[var(--input-bg)]',
            !disabled && 'hover:border-[var(--color-accent)]',
          )}>
            <input
              ref={resolvedRef}
              type="checkbox"
              id={resolvedId}
              disabled={disabled}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={onChange}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              className={cn('sr-only', focusRing)}
              {...props}
            />
            {indeterminate
              ? <Minus size={iconSize} className="text-white" aria-hidden />
              : checked
              ? <Check size={iconSize} className="text-white" aria-hidden />
              : null}
          </span>
          {label && (
            <span className={cn(textSize, 'text-[var(--color-text-primary)] font-[var(--font-weight-regular)] leading-[var(--line-height-snug)]')}>
              {label}
            </span>
          )}
        </label>

        {error ? (
          <p id={errorId} role="alert" className="text-[var(--font-size-caption)] text-[var(--color-danger)] ml-[calc(var(--space-4)+var(--space-2))]">{error}</p>
        ) : hint ? (
          <p id={hintId} className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)] ml-[calc(var(--space-4)+var(--space-2))]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
