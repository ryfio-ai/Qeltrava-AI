'use client';
/**
 * design-system/components/SearchInput.tsx
 * Qeltrava AI Design System – SearchInput
 *
 * Search input element decorated with Lucide Search and X icons.
 * Supports auto-debouncing onChange callbacks, clear interactions, and loading spinner states.
 */
import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { cn } from '../utils';
import { useDebounce } from '../hooks/useDebounce';
import { Icon } from './Icon';
import { Spinner } from './Spinner';
import type { BaseComponentProps, Size } from '../types';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>, BaseComponentProps {
  /** Size of input. Default is 'md' */
  size?:        Size;
  /** Whether the search is currently loading/performing query. Default is false */
  loading?:     boolean;
  /** Callback triggered when value changes (optionally debounced) */
  onChange?:    (value: string) => void;
  /** Debounce delay in milliseconds. Default is 0 (immediate) */
  debounceMs?:  number;
  /** Icon name to display. Default is 'Search' */
  iconName?:    string;
}

const sizeClasses: Record<Size, { input: string; container: string; leftIcon: string; rightIcon: string; rightOffset: string }> = {
  xs: {
    container: 'h-7',
    input: 'pl-7 pr-7 text-[var(--font-size-xs)] rounded-[var(--radius-md)]',
    leftIcon: 'left-2.5',
    rightIcon: 'right-2.5',
    rightOffset: 'pr-7',
  },
  sm: {
    container: 'h-8',
    input: 'pl-8 pr-8 text-[var(--font-size-sm)] rounded-[var(--radius-md)]',
    leftIcon: 'left-3',
    rightIcon: 'right-3',
    rightOffset: 'pr-8',
  },
  md: {
    container: 'h-10',
    input: 'pl-9 pr-9 text-[var(--font-size-md)] rounded-[var(--radius-lg)]',
    leftIcon: 'left-3.5',
    rightIcon: 'right-3.5',
    rightOffset: 'pr-9',
  },
  lg: {
    container: 'h-12',
    input: 'pl-11 pr-11 text-[var(--font-size-lg)] rounded-[var(--radius-lg)]',
    leftIcon: 'left-4',
    rightIcon: 'right-4',
    rightOffset: 'pr-11',
  },
  xl: {
    container: 'h-14',
    input: 'pl-12 pr-12 text-[var(--font-size-xl)] rounded-[var(--radius-xl)]',
    leftIcon: 'left-4.5',
    rightIcon: 'right-4.5',
    rightOffset: 'pr-12',
  },
};

const iconSizes: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  size = 'md',
  loading = false,
  onChange,
  debounceMs = 0,
  iconName = 'Search',
  value: valueProp,
  defaultValue,
  className,
  disabled,
  'data-testid': testId,
  placeholder = 'Search...',
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  const [value, setValue] = useState<string>(() => {
    if (valueProp !== undefined) return String(valueProp);
    if (defaultValue !== undefined) return String(defaultValue);
    return '';
  });

  // Track props updates
  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(String(valueProp));
    }
  }, [valueProp]);

  // Debounce the state value
  const debouncedValue = useDebounce(value, debounceMs);

  // Trigger onChange with debounced value if debounce is used
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (debounceMs > 0 && onChange) {
      onChange(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setValue(nextVal);
    if (debounceMs === 0 && onChange) {
      onChange(nextVal);
    }
  };

  const handleClear = () => {
    setValue('');
    if (onChange) {
      onChange('');
    }
    inputRef.current?.focus();
  };

  const currentSize = sizeClasses[size];
  const currentIconSize = iconSizes[size];

  return (
    <div
      className={cn(
        'relative flex items-center w-full',
        currentSize.container,
        className
      )}
      data-testid={testId}
    >
      {/* Search Icon */}
      <span
        className={cn(
          'absolute text-[var(--color-text-tertiary)] flex items-center pointer-events-none z-10',
          currentSize.leftIcon
        )}
      >
        <Icon name={iconName} size={currentIconSize} />
      </span>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        aria-label="Search"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'w-full h-full bg-[var(--surface-1)] border border-[var(--color-border)] text-[var(--color-text)]',
          'placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:border-transparent',
          'transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
          currentSize.input,
          value.length > 0 && currentSize.rightOffset
        )}
        {...props}
      />

      {/* Action Right Panel (Spinner or Clear Button) */}
      <div
        className={cn(
          'absolute flex items-center gap-1 z-10',
          currentSize.rightIcon
        )}
      >
        {loading ? (
          <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} />
        ) : (
          value.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'p-0.5 rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]',
                'focus:outline-none focus:ring-1 focus:ring-[var(--focus-ring-color)]'
              )}
              aria-label="Clear search text"
            >
              <Icon name="X" size={currentIconSize - 2} />
            </button>
          )
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;
