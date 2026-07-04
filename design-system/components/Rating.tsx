'use client';
/**
 * design-system/components/Rating.tsx
 * Qeltrava AI Design System – Rating
 *
 * Fully accessible rating component supporting interactive selections, half stars,
 * custom scales, focus states, and keyboard controls.
 */
import React, { useState, useRef } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface RatingProps extends BaseComponentProps {
  /** Current rating value. Default is 0 */
  value?:       number;
  /** Maximum rating range scale. Default is 5 */
  max?:         number;
  /** Callback triggered when value changes */
  onChange?:    (val: number) => void;
  /** Read-only mode. Default is false */
  readOnly?:    boolean;
  /** Custom size of stars. Default is 20 */
  size?:        number;
  /** Labeled description */
  ariaLabel?:   string;
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 20,
  ariaLabel = 'Rating',
  className,
  'data-testid': testId,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Allow half-star selection
    const isHalf = x < rect.width / 2;
    setHoverValue(idx + (isHalf ? 0.5 : 1));
  };

  const handleMouseMove = (idx: number, e: React.MouseEvent) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    setHoverValue(idx + (isHalf ? 0.5 : 1));
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const handleClick = (val: number) => {
    if (readOnly || !onChange) return;
    onChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;

    let nextValue = value;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      nextValue = Math.min(max, value + 0.5);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      nextValue = Math.max(0, value - 0.5);
      e.preventDefault();
    } else if (e.key === 'Home') {
      nextValue = 0;
      e.preventDefault();
    } else if (e.key === 'End') {
      nextValue = max;
      e.preventDefault();
    }

    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  const renderStar = (idx: number) => {
    const starVal = idx + 1;
    const diff = displayValue - idx;
    
    let isHalf = false;

    if (diff >= 1) {
      // Filled handled via color
    } else if (diff >= 0.5) {
      isHalf = true;
    }

    return (
      <span
        key={idx}
        className={cn(
          'relative inline-flex items-center justify-center shrink-0 transition-transform duration-100',
          !readOnly && 'cursor-pointer hover:scale-110 active:scale-95',
          (isHalf || diff >= 1) ? 'text-[var(--color-status-warning)]' : 'text-[var(--color-text-disabled)]'
        )}
        onMouseEnter={(e) => handleMouseEnter(idx, e)}
        onMouseMove={(e) => handleMouseMove(idx, e)}
        onClick={() => handleClick(hoverValue !== null ? hoverValue : starVal)}
        role="button"
        aria-label={`${starVal} star${starVal > 1 ? 's' : ''}`}
      >
        {isHalf ? (
          <span className="relative inline-block overflow-hidden" style={{ width: size, height: size }}>
            <span className="absolute left-0 top-0 overflow-hidden" style={{ width: '50%', color: 'var(--color-status-warning)' }}>
              <Icon name="Star" size={size} className="fill-current" />
            </span>
            <span className="absolute left-0 top-0" style={{ color: 'var(--color-text-disabled)' }}>
              <Icon name="Star" size={size} />
            </span>
          </span>
        ) : (
          <Icon
            name="Star"
            size={size}
            className={cn((diff >= 1) && 'fill-current')}
          />
        )}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn('inline-flex items-center gap-0.5 outline-none', className)}
      role="group"
      aria-label={`${ariaLabel}: ${value} out of ${max}`}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {Array.from({ length: max }).map((_, idx) => renderStar(idx))}
    </div>
  );
}
export default Rating;
