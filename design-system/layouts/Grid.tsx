'use client';
/**
 * design-system/layouts/Grid.tsx
 * Qeltrava AI Design System – Grid Layout Primitive
 *
 * 12-column token-based grid layout with responsive span capabilities.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export type GridColsValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ResponsiveProp<T> = T | {
  initial?: T;
  sm?:      T;
  md?:      T;
  lg?:      T;
  xl?:      T;
  '2xl'?:   T;
};

export interface GridProps extends BaseComponentProps {
  children?:   React.ReactNode;
  /** Grid columns count. Default is 12 */
  cols?:       ResponsiveProp<GridColsValue>;
  /** Grid gap size. Standard spaces are 0 to 16. Default is 6 (var(--space-6)) */
  gap?:        ResponsiveProp<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16>;
  /** HTML element tag. Default is 'div' */
  as?:         React.ElementType;
}

const gapClasses: Record<number, string> = {
  0:  'gap-0',
  1:  'gap-[var(--space-1)]',
  2:  'gap-[var(--space-2)]',
  3:  'gap-[var(--space-3)]',
  4:  'gap-[var(--space-4)]',
  5:  'gap-[var(--space-5)]',
  6:  'gap-[var(--space-6)]',
  8:  'gap-[var(--space-8)]',
  10: 'gap-[var(--space-10)]',
  12: 'gap-[var(--space-12)]',
  16: 'gap-[var(--space-16)]',
};

const colClasses: Record<GridColsValue, string> = {
  1:  'grid-cols-1',
  2:  'grid-cols-2',
  3:  'grid-cols-3',
  4:  'grid-cols-4',
  5:  'grid-cols-5',
  6:  'grid-cols-6',
  7:  'grid-cols-7',
  8:  'grid-cols-8',
  9:  'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

function getResponsiveClasses<T extends string | number>(
  prop: ResponsiveProp<T> | undefined,
  classMap: Record<T, string>
): string {
  if (!prop) return '';
  if (typeof prop !== 'object') {
    return classMap[prop] || '';
  }
  const classes: string[] = [];
  if (prop.initial !== undefined) classes.push(classMap[prop.initial]);
  if (prop.sm !== undefined) classes.push(`sm:${classMap[prop.sm]}`);
  if (prop.md !== undefined) classes.push(`md:${classMap[prop.md]}`);
  if (prop.lg !== undefined) classes.push(`lg:${classMap[prop.lg]}`);
  if (prop.xl !== undefined) classes.push(`xl:${classMap[prop.xl]}`);
  if (prop['2xl'] !== undefined) classes.push(`2xl:${classMap[prop['2xl']]}`);
  return classes.filter(Boolean).join(' ');
}

export function Grid({
  children,
  cols = 12,
  gap = 6,
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: GridProps) {
  const colClassStr = getResponsiveClasses(cols, colClasses);
  const gapClassStr = getResponsiveClasses(gap, gapClasses);

  return (
    <Tag
      className={cn('grid', colClassStr, gapClassStr, className)}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
}

// ─── GridItem ──────────────────────────────────────────────────────────────────

export type GridSpanValue = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridItemProps extends BaseComponentProps {
  children?:   React.ReactNode;
  /** Columns span. Default is auto */
  span?:       ResponsiveProp<GridSpanValue>;
  /** Grid col start line index */
  colStart?:   ResponsiveProp<GridColsValue | 'auto'>;
  /** Grid col end line index */
  colEnd?:     ResponsiveProp<GridColsValue | 'auto' | 13>;
  /** HTML element tag. Default is 'div' */
  as?:         React.ElementType;
}

const spanClasses: Record<GridSpanValue, string> = {
  auto: 'col-auto',
  full: 'col-span-full',
  1:    'col-span-1',
  2:    'col-span-2',
  3:    'col-span-3',
  4:    'col-span-4',
  5:    'col-span-5',
  6:    'col-span-6',
  7:    'col-span-7',
  8:    'col-span-8',
  9:    'col-span-9',
  10:   'col-span-10',
  11:   'col-span-11',
  12:   'col-span-12',
};

const startClasses: Record<string | number, string> = {
  auto: 'col-start-auto',
  1:    'col-start-1',
  2:    'col-start-2',
  3:    'col-start-3',
  4:    'col-start-4',
  5:    'col-start-5',
  6:    'col-start-6',
  7:    'col-start-7',
  8:    'col-start-8',
  9:    'col-start-9',
  10:   'col-start-10',
  11:   'col-start-11',
  12:   'col-start-12',
};

const endClasses: Record<string | number, string> = {
  auto: 'col-end-auto',
  1:    'col-end-1',
  2:    'col-end-2',
  3:    'col-end-3',
  4:    'col-end-4',
  5:    'col-end-5',
  6:    'col-end-6',
  7:    'col-end-7',
  8:    'col-end-8',
  9:    'col-end-9',
  10:   'col-end-10',
  11:   'col-end-11',
  12:   'col-end-12',
  13:   'col-end-13',
};

export function GridItem({
  children,
  span = 'auto',
  colStart,
  colEnd,
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: GridItemProps) {
  const spanClassStr = getResponsiveClasses(span, spanClasses);
  const startClassStr = colStart ? getResponsiveClasses(colStart, startClasses) : '';
  const endClassStr = colEnd ? getResponsiveClasses(colEnd, endClasses) : '';

  return (
    <Tag
      className={cn(spanClassStr, startClassStr, endClassStr, className)}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
}
