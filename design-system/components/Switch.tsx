/**
 * design-system/components/Switch.tsx
 * Qeltrava AI Design System – Switch (toggle)
 *
 * Sizes:   sm | md | lg
 * States:  off | on | disabled
 * ARIA:    role="switch", aria-checked
 */
'use client';
import React from 'react';
import { cn, focusRing } from '../utils';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  checked?:    boolean;
  defaultChecked?: boolean;
  onChange?:   (checked: boolean) => void;
  disabled?:   boolean;
  label?:      string;
  hint?:       string;
  size?:       SwitchSize;
  id?:         string;
  className?:  string;
}

const sizeMap: Record<SwitchSize, { track: string; thumb: string; translate: string; text: string }> = {
  sm: {
    track:     'w-[32px] h-[18px] rounded-full',
    thumb:     'w-[12px] h-[12px] top-[3px] left-[3px] rounded-full',
    translate: 'translate-x-[14px]',
    text:      'text-[var(--font-size-sm)]',
  },
  md: {
    track:     'w-[40px] h-[22px] rounded-full',
    thumb:     'w-[14px] h-[14px] top-[4px] left-[4px] rounded-full',
    translate: 'translate-x-[18px]',
    text:      'text-[var(--font-size-base)]',
  },
  lg: {
    track:     'w-[48px] h-[26px] rounded-full',
    thumb:     'w-[18px] h-[18px] top-[4px] left-[4px] rounded-full',
    translate: 'translate-x-[22px]',
    text:      'text-[var(--font-size-md)]',
  },
};

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  label,
  hint,
  size      = 'md',
  id,
  className,
}: SwitchProps) {
  const [isOn, setIsOn] = React.useState(checked ?? defaultChecked);
  const isControlled    = checked !== undefined;
  const active          = isControlled ? checked : isOn;
  const { track, thumb, translate, text } = sizeMap[size];

  const toggle = () => {
    if (disabled) return;
    const next = !active;
    if (!isControlled) setIsOn(next);
    onChange?.(next);
  };

  return (
    <div className={cn('flex flex-col gap-[var(--space-1)]', className)}>
      <label className={cn('inline-flex items-center gap-[var(--space-2-5)] cursor-pointer', disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed')}>
        <button
          type="button"
          role="switch"
          id={id}
          aria-checked={active}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            'relative shrink-0 transition-colors duration-[var(--duration-200)]',
            track,
            active ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]',
            focusRing
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute bg-white shadow-[var(--shadow-xs)] transition-transform duration-[var(--duration-200)]',
              thumb,
              active && translate
            )}
          />
        </button>
        {label && (
          <span className={cn(text, 'text-[var(--color-text-primary)] leading-[var(--line-height-snug)] select-none')}>
            {label}
          </span>
        )}
      </label>
      {hint && (
        <p className="text-[var(--font-size-caption)] text-[var(--color-text-secondary)] ml-[calc(var(--space-10)+var(--space-2-5))]">
          {hint}
        </p>
      )}
    </div>
  );
}
