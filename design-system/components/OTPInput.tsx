'use client';
/**
 * design-system/components/OTPInput.tsx
 * Qeltrava AI Design System – OTPInput
 *
 * Configurable n-digit segmented input, auto-advances on entry, auto-regresses on backspace.
 * Handles clipboard paste values and conforms to WCAG/ARIA guidelines for verification components.
 */
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import type { BaseComponentProps, Size } from '../types';

export interface OTPInputProps extends BaseComponentProps {
  /** Number of verification code digits. Default is 6 */
  length?:      number;
  /** Size variant. Default is 'md' */
  size?:        Size;
  /** Triggered when the user enters all digits */
  onComplete?:  (value: string) => void;
  /** Triggered whenever any digit is updated */
  onChange?:    (value: string) => void;
  /** Whether the input is disabled. Default is false */
  disabled?:    boolean;
  /** Labeled input grouping description */
  ariaLabel?:   string;
}

const sizeClasses: Record<Size, string> = {
  xs: 'w-8 h-10 text-base rounded-[var(--radius-sm)]',
  sm: 'w-10 h-12 text-lg rounded-[var(--radius-md)]',
  md: 'w-12 h-14 text-xl rounded-[var(--radius-md)]',
  lg: 'w-14 h-16 text-2xl rounded-[var(--radius-lg)]',
  xl: 'w-16 h-20 text-3xl rounded-[var(--radius-xl)]',
};

export function OTPInput({
  length = 6,
  size = 'md',
  onComplete,
  onChange,
  disabled = false,
  ariaLabel = 'One-time password verification code',
  className,
  'data-testid': testId,
}: OTPInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Reset inputsRef when length changes
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDigits(Array(length).fill(''));
  }, [length]);

  const triggerChange = (nextDigits: string[]) => {
    const value = nextDigits.join('');
    if (onChange) onChange(value);
    if (value.length === length && onComplete) onComplete(value);
  };

  const handleChange = (index: number, val: string) => {
    // Only accept numbers
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      triggerChange(newDigits);
      return;
    }

    const singleDigit = cleanVal.charAt(cleanVal.length - 1);
    const newDigits = [...digits];
    newDigits[index] = singleDigit;
    setDigits(newDigits);
    triggerChange(newDigits);

    // Auto-advance
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Regress focus on backspace if current is already empty
        inputsRef.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        triggerChange(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, length);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < length; i++) {
      if (pasteData[i]) {
        newDigits[i] = pasteData[i]!;
      }
    }
    setDigits(newDigits);
    triggerChange(newDigits);

    // Focus last filled input or the last input
    const focusIndex = Math.min(pasteData.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex items-center gap-[var(--space-2)]', className)}
      data-testid={testId}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            'text-center bg-[var(--surface-1)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold',
            'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:border-transparent',
            'transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
            sizeClasses[size]
          )}
          aria-label={`Digit ${index + 1} of ${length}`}
          data-testid={testId ? `${testId}-digit-${index}` : undefined}
        />
      ))}
    </div>
  );
}
