/**
 * design-system/components/Radio.tsx
 * Qeltrava AI Design System – Radio & RadioGroup
 *
 * Sizes:   sm | md | lg
 * States:  unchecked | checked | disabled | error
 * ARIA:    role="radiogroup", aria-invalid, aria-describedby
 */
import React from 'react';
import { cn, focusRing } from '../utils';

export type RadioSize = 'sm' | 'md' | 'lg';

const dotMap: Record<RadioSize, { outer: string; dot: string; text: string }> = {
  sm: { outer: 'w-[14px] h-[14px]', dot: 'w-[6px]  h-[6px]',  text: 'text-[var(--font-size-sm)]' },
  md: { outer: 'w-[16px] h-[16px]', dot: 'w-[8px]  h-[8px]',  text: 'text-[var(--font-size-base)]' },
  lg: { outer: 'w-[20px] h-[20px]', dot: 'w-[10px] h-[10px]', text: 'text-[var(--font-size-md)]' },
};

// ─── Radio ───────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?:      RadioSize;
  label?:     string;
  hint?:      string;
  error?:     string;
  inputId?:   string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ size = 'md', label, hint, error, inputId, className, disabled, checked, id, ...props }, ref) => {
    const resolvedId  = inputId ?? id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError    = Boolean(error);
    const { outer, dot, text: textSize } = dotMap[size];

    return (
      <div className={cn('flex flex-col gap-[var(--space-1)]', className)}>
        <label className={cn('inline-flex items-start gap-[var(--space-2)] cursor-pointer', disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed')}>
          <span className={cn(
            'relative flex items-center justify-center shrink-0 mt-[2px] rounded-full border-2',
            'transition-[var(--transition-hover)]',
            outer,
            hasError      ? 'border-[var(--color-danger)]' : 'border-[var(--color-border-strong)]',
            checked
              ? 'bg-[var(--input-bg)] border-[var(--color-accent)]'
              : 'bg-[var(--input-bg)]',
            !disabled && 'hover:border-[var(--color-accent)]',
          )}>
            <input
              ref={ref}
              type="radio"
              id={resolvedId}
              disabled={disabled}
              checked={checked}
              className={cn('sr-only', focusRing)}
              {...props}
            />
            {checked && (
              <span className={cn('rounded-full bg-[var(--color-accent)]', dot)} aria-hidden />
            )}
          </span>
          {label && (
            <span className={cn(textSize, 'text-[var(--color-text-primary)] leading-[var(--line-height-snug)]')}>
              {label}
            </span>
          )}
        </label>
        {error && (
          <p role="alert" className="text-[var(--font-size-caption)] text-[var(--color-danger)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export interface RadioGroupOption {
  value:     string;
  label:     string;
  hint?:     string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name:       string;
  value?:     string;
  onChange?:  (value: string) => void;
  options:    RadioGroupOption[];
  size?:      RadioSize;
  label?:     string;
  error?:     string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  size      = 'md',
  label,
  error,
  direction = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <fieldset
      role="radiogroup"
      aria-invalid={Boolean(error)}
      className={cn('border-none p-0 m-0', className)}
    >
      {label && (
        <legend className="text-[var(--font-size-label)] font-[var(--font-weight-label)] text-[var(--color-text-primary)] mb-[var(--space-2)]">
          {label}
        </legend>
      )}
      <div className={cn(
        'flex gap-[var(--space-3)]',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            disabled={opt.disabled}
            label={opt.label}
            hint={opt.hint}
            size={size}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-[var(--space-1-5)] text-[var(--font-size-caption)] text-[var(--color-danger)]">{error}</p>
      )}
    </fieldset>
  );
}
