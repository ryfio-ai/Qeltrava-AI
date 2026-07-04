'use client';
/**
 * design-system/components/TagInput.tsx
 * Qeltrava AI Design System – TagInput
 *
 * An interactive tag/chip input field. Adds chips via Enter, commas, or spaces.
 * Supports removal with Backspace or remove action buttons.
 */
import React, { useRef, useState } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import { Badge, type BadgeSize } from './Badge';
import type { BaseComponentProps, Size } from '../types';

export interface TagInputProps extends BaseComponentProps {
  /** Array of active tags */
  tags?:        string[];
  /** Callback triggered when tags are updated */
  onChange?:    (tags: string[]) => void;
  /** Size variant. Default is 'md' */
  size?:        Size;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Disable tag entry/modification. Default is false */
  disabled?:    boolean;
  /** Read-only mode. Default is false */
  readOnly?:    boolean;
  /** Delimiter keys to commit tag. Default is ['Enter', ','] */
  delimiters?:  string[];
  /** Validate function. Returns boolean if tag is allowed */
  validate?:    (tag: string) => boolean;
  /** Maximum number of tags allowed */
  maxTags?:     number;
}

const sizeClasses: Record<Size, { container: string; input: string; badge: BadgeSize }> = {
  xs: {
    container: 'px-[var(--space-2)] py-[var(--space-1)] min-h-[30px] rounded-[var(--radius-sm)] text-[var(--font-size-xs)]',
    input: 'text-[var(--font-size-xs)] h-5',
    badge: 'sm',
  },
  sm: {
    container: 'px-[var(--space-2)] py-[var(--space-1)] min-h-[34px] rounded-[var(--radius-md)] text-[var(--font-size-sm)]',
    input: 'text-[var(--font-size-sm)] h-6',
    badge: 'sm',
  },
  md: {
    container: 'px-[var(--space-3)] py-[var(--space-1-5)] min-h-[42px] rounded-[var(--radius-md)] text-[var(--font-size-base)]',
    input: 'text-[var(--font-size-base)] h-6',
    badge: 'md',
  },
  lg: {
    container: 'px-[var(--space-4)] py-[var(--space-2)] min-h-[50px] rounded-[var(--radius-lg)] text-[var(--font-size-lg)]',
    input: 'text-[var(--font-size-lg)] h-7',
    badge: 'md',
  },
  xl: {
    container: 'px-[var(--space-4)] py-[var(--space-2-5)] min-h-[58px] rounded-[var(--radius-xl)] text-[var(--font-size-xl)]',
    input: 'text-[var(--font-size-xl)] h-8',
    badge: 'lg',
  },
};

export function TagInput({
  tags = [],
  onChange,
  size = 'md',
  placeholder = 'Add tag...',
  disabled = false,
  readOnly = false,
  delimiters = ['Enter', ','],
  validate,
  maxTags,
  className,
  'data-testid': testId,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;

    if (maxTags && tags.length >= maxTags) return;
    if (tags.includes(trimmed)) {
      setInputValue('');
      return;
    }

    if (validate && !validate(trimmed)) return;

    const nextTags = [...tags, trimmed];
    if (onChange) onChange(nextTags);
    setInputValue('');
  };

  const handleRemoveTag = (index: number) => {
    if (disabled || readOnly) return;
    const nextTags = tags.filter((_, idx) => idx !== index);
    if (onChange) onChange(nextTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    if (delimiters.includes(e.key)) {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag
      handleRemoveTag(tags.length - 1);
    }
  };

  const handleContainerClick = () => {
    if (disabled || readOnly) return;
    inputRef.current?.focus();
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        'flex flex-wrap gap-1.5 w-full bg-[var(--surface-1)] border border-[var(--color-border)] transition-all cursor-text',
        isFocused && 'ring-2 ring-[var(--focus-ring-color)] border-transparent',
        disabled && 'opacity-50 cursor-not-allowed',
        readOnly && 'cursor-default',
        currentSize.container,
        className
      )}
      data-testid={testId}
    >
      {/* Visual Badges */}
      {tags.map((tag, idx) => (
        <Badge
          key={idx}
          variant="default"
          size={currentSize.badge}
          className="inline-flex items-center gap-1 shrink-0"
        >
          <span>{tag}</span>
          {!disabled && !readOnly && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(idx);
              }}
              className="p-0.5 rounded-full hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              <Icon name="X" size={10} />
            </button>
          )}
        </Badge>
      ))}

      {/* Actual Input */}
      {!disabled && !readOnly && (!maxTags || tags.length < maxTags) && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={tags.length === 0 ? placeholder : ''}
          className={cn(
            'flex-1 min-w-[80px] bg-transparent border-0 p-0 text-[var(--color-text)] outline-none focus:ring-0',
            currentSize.input
          )}
        />
      )}
    </div>
  );
}
export default TagInput;
