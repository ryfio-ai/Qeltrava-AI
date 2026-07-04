/**
 * design-system/components/Textarea.tsx
 * Qeltrava AI Design System – Textarea
 *
 * Sizes:    sm | md | lg
 * States:   default | focus | error | disabled | readonly
 * Features: auto-resize, character count, label, hint, error
 */
'use client';
import React, { useCallback } from 'react';
import { cn, focusRing } from '../utils';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?:        TextareaSize;
  label?:       string;
  hint?:        string;
  error?:       string;
  maxLength?:   number;
  autoResize?:  boolean;
  fullWidth?:   boolean;
  inputId?:     string;
}

const sizeMap: Record<TextareaSize, string> = {
  sm: 'p-[var(--input-padding-x-sm)] text-[var(--font-size-sm)] min-h-[80px]',
  md: 'p-[var(--input-padding-x-md)] text-[var(--font-size-base)] min-h-[100px]',
  lg: 'p-[var(--input-padding-x-lg)] text-[var(--font-size-md)] min-h-[120px]',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size       = 'md',
      label,
      hint,
      error,
      maxLength,
      autoResize = false,
      fullWidth  = false,
      inputId,
      className,
      disabled,
      onChange,
      value,
      defaultValue,
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

    const [charCount, setCharCount] = React.useState(
      () => String(value ?? defaultValue ?? '').length
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        if (autoResize) {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }
        onChange?.(e);
      },
      [autoResize, onChange]
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

        <textarea
          ref={ref}
          id={resolvedId}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            'bg-[var(--input-bg)] text-[var(--color-text-primary)]',
            'border rounded-[var(--input-radius)] outline-none',
            'placeholder:text-[var(--color-text-placeholder)]',
            'transition-[var(--transition-hover)]',
            'resize-y leading-[var(--line-height-relaxed)]',
            autoResize ? 'resize-none overflow-hidden' : 'resize-y',
            hasError
              ? 'border-[var(--input-border-error)]'
              : 'border-[var(--input-border)] hover:border-[var(--color-border-strong)]',
            'focus:border-[var(--input-border-focus)] focus:shadow-[var(--input-shadow-focus)]',
            disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
            fullWidth ? 'w-full' : undefined,
            sizeMap[size],
            focusRing
          )}
          {...props}
        />

        <div className="flex items-center justify-between">
          {error ? (
            <p id={errorId} role="alert" className="text-[var(--font-size-caption)] text-[var(--color-danger)] leading-[var(--line-height-snug)]">
              {error}
            </p>
          ) : hint ? (
            <p id={hintId} className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)] leading-[var(--line-height-snug)]">
              {hint}
            </p>
          ) : <span />}

          {maxLength && (
            <span className={cn(
              'text-[var(--font-size-caption)] tabular-nums',
              charCount >= maxLength
                ? 'text-[var(--color-danger)]'
                : 'text-[var(--color-text-tertiary)]'
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
