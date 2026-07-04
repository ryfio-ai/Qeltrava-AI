'use client';
/**
 * design-system/components/Combobox.tsx
 * Qeltrava AI Design System – Combobox
 *
 * Searchable dropdown with synchronous filtering.
 * Features full keyboard navigation and meets WAI-ARIA guidelines for combobox widgets.
 */
import React, { useRef, useState, useEffect, useId } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import { useClickOutside } from '../hooks/useClickOutside';
import type { BaseComponentProps, Size } from '../types';

export interface ComboboxOption {
  value:       string;
  label:       string;
  disabled?:   boolean;
}

export interface ComboboxProps extends BaseComponentProps {
  /** Selected option value */
  value?:      string;
  /** Options array list */
  options:     ComboboxOption[];
  /** Callback triggered when value changes */
  onChange?:   (value: string) => void;
  /** Size variant. Default is 'md' */
  size?:       Size;
  /** Input placeholder. Default is 'Select option...' */
  placeholder?: string;
  /** Disable combobox interactions. Default is false */
  disabled?:   boolean;
  /** Standard input label text */
  label?:      string;
  /** Standard input error text */
  error?:      string;
}

const sizeClasses: Record<Size, { container: string; input: string; item: string }> = {
  xs: {
    container: 'h-7 rounded-[var(--radius-sm)] text-[var(--font-size-xs)]',
    input: 'px-2 text-[var(--font-size-xs)]',
    item: 'px-2 py-1 text-[var(--font-size-xs)]',
  },
  sm: {
    container: 'h-8 rounded-[var(--radius-md)] text-[var(--font-size-sm)]',
    input: 'px-2.5 text-[var(--font-size-sm)]',
    item: 'px-2.5 py-1 text-[var(--font-size-sm)]',
  },
  md: {
    container: 'h-10 rounded-[var(--radius-md)] text-[var(--font-size-base)]',
    input: 'px-3 text-[var(--font-size-base)]',
    item: 'px-3 py-1.5 text-[var(--font-size-sm)]',
  },
  lg: {
    container: 'h-12 rounded-[var(--radius-lg)] text-[var(--font-size-lg)]',
    input: 'px-4 text-[var(--font-size-lg)]',
    item: 'px-4 py-2 text-[var(--font-size-base)]',
  },
  xl: {
    container: 'h-14 rounded-[var(--radius-xl)] text-[var(--font-size-xl)]',
    input: 'px-4 text-[var(--font-size-xl)]',
    item: 'px-4 py-2.5 text-[var(--font-size-base)]',
  },
};

export function Combobox({
  value,
  options,
  onChange,
  size = 'md',
  placeholder = 'Select option...',
  disabled = false,
  label,
  error,
  className,
  'data-testid': testId,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Sync search state with selectedOption when closed/opened
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch(selectedOption ? selectedOption.label : '');
    }
  }, [open, selectedOption]);

  useClickOutside(containerRef, () => {
    setOpen(false);
  });

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Reset active index when filter search updates
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && filteredOptions[activeIndex]) {
        const option = filteredOptions[activeIndex]!;
        if (!option.disabled) {
          onChange?.(option.value);
          setSearch(option.label);
          setOpen(false);
        }
      } else {
        setOpen(true);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const currentSize = sizeClasses[size];

  const comboboxId = `combobox-${useId()}`;

  return (
    <div ref={containerRef} className={cn('w-full text-left space-y-1.5', className)} data-testid={testId}>
      {label && (
        <label className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${comboboxId}-list`}
          aria-haspopup="listbox"
          disabled={disabled}
          value={search}
          onChange={(e) => {
            if (!open) setOpen(true);
            setSearch(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full bg-[var(--surface-1)] border border-[var(--color-border)] text-[var(--color-text)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:border-transparent',
            'transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]',
            currentSize.container,
            currentSize.input,
            'pr-10'
          )}
        />
        
        {/* Chevron Dropdown Arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none flex items-center">
          <Icon name="ChevronDown" size={16} className={cn('transition-transform duration-200', open && 'rotate-180')} />
        </span>

        {/* Options Dropdown List */}
        {open && filteredOptions.length > 0 && (
          <ul
            id={`${comboboxId}-list`}
            role="listbox"
            className={cn(
              'absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto z-[var(--z-dropdown)] py-1',
              'bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)]'
            )}
          >
            {filteredOptions.map((opt, idx) => {
              const isSelected = value === opt.value;
              const isActive = idx === activeIndex;

              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    if (opt.disabled) return;
                    onChange?.(opt.value);
                    setSearch(opt.label);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between cursor-pointer select-none transition-colors',
                    currentSize.item,
                    isActive && 'bg-[var(--state-hover-overlay)] text-[var(--color-text-primary)]',
                    isSelected && 'font-semibold text-[var(--color-accent)]',
                    opt.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <span className="shrink-0 text-[var(--color-accent)]">
                      <Icon name="Check" size={14} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p className="text-[var(--font-size-xs)] text-[var(--color-border-error)] font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
export default Combobox;
