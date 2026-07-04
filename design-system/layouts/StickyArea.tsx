'use client';
/**
 * design-system/layouts/StickyArea.tsx
 * Qeltrava AI Design System – StickyArea Layout Primitive
 *
 * CSS position:sticky wrapper mapped to design system z-index tokens.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export type StickyZIndex =
  | 'raised'
  | 'dropdown'
  | 'sticky'
  | 'overlay'
  | 'modal'
  | 'toast'
  | 'tooltip'
  | 'skipLink'
  | 'max'
  | 'base';

export interface StickyAreaProps extends BaseComponentProps {
  children?:    React.ReactNode;
  /** Sticky position direction. Default is 'top' */
  direction?:   'top' | 'bottom' | 'left' | 'right';
  /**
   * Offset value from the edge.
   * Can be a number (mapped to space tokens, 0-16) or custom string. Default is 0.
   */
  offset?:      number | string;
  /** Z-index level name. Default is 'sticky' */
  zIndex?:      StickyZIndex;
  /** HTML element tag. Default is 'div' */
  as?:          React.ElementType;
}

const zIndexClasses: Record<StickyZIndex, string> = {
  base:     'z-0',
  raised:   'z-10',
  dropdown: 'z-[100]',
  sticky:   'z-[200]',
  overlay:  'z-[300]',
  modal:    'z-[400]',
  toast:    'z-[500]',
  tooltip:  'z-[600]',
  skipLink: 'z-[900]',
  max:      'z-[9999]',
};

const spaceOffsetMap: Record<number, string> = {
  0:  '0',
  1:  'var(--space-1)',
  2:  'var(--space-2)',
  3:  'var(--space-3)',
  4:  'var(--space-4)',
  5:  'var(--space-5)',
  6:  'var(--space-6)',
  8:  'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
};

export function StickyArea({
  children,
  direction = 'top',
  offset = 0,
  zIndex = 'sticky',
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: StickyAreaProps) {
  // Resolve CSS position offset style value
  const offsetValue = typeof offset === 'number'
    ? (spaceOffsetMap[offset] ? spaceOffsetMap[offset] : `${offset}px`)
    : offset;

  const style: React.CSSProperties = {
    [direction]: offsetValue,
  };

  return (
    <Tag
      className={cn('sticky', zIndexClasses[zIndex], className)}
      style={style}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
}
