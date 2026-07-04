'use client';
/**
 * design-system/layouts/SplitLayout.tsx
 * Qeltrava AI Design System – SplitLayout Layout Primitive
 *
 * A responsive two-column layout ideal for auth screens, dashboard settings splits,
 * or feature walkthroughs. Columns stack on mobile and can be adjusted for width proportions.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export type SplitRatio = '1:1' | '1:2' | '2:1' | '1:3' | '3:1' | '2:3' | '3:2';

export interface SplitLayoutProps extends BaseComponentProps {
  /** Left panel content */
  left:             React.ReactNode;
  /** Right panel content */
  right:            React.ReactNode;
  /** Width ratio of left:right. Default is '1:1' */
  ratio?:           SplitRatio;
  /** Gap size between panels. Default is 6 */
  gap?:             0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  /** Alignment of children. Default is 'stretch' */
  align?:           'start' | 'center' | 'end' | 'stretch';
  /** Whether to hide the left column on mobile. Default is false */
  hideLeftOnMobile?: boolean;
  /** Whether to hide the right column on mobile. Default is false */
  hideRightOnMobile?: boolean;
  /** HTML element tag. Default is 'div' */
  as?:              React.ElementType;
}

const ratioClasses: Record<SplitRatio, { left: string; right: string }> = {
  '1:1': { left: 'md:col-span-6', right: 'md:col-span-6' },
  '1:2': { left: 'md:col-span-4', right: 'md:col-span-8' },
  '2:1': { left: 'md:col-span-8', right: 'md:col-span-4' },
  '1:3': { left: 'md:col-span-3', right: 'md:col-span-9' },
  '3:1': { left: 'md:col-span-9', right: 'md:col-span-3' },
  '2:3': { left: 'md:col-span-5', right: 'md:col-span-7' },
  '3:2': { left: 'md:col-span-7', right: 'md:col-span-5' },
};

const gapClasses = {
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

const alignClasses = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
};

export function SplitLayout({
  left,
  right,
  ratio = '1:1',
  gap = 6,
  align = 'stretch',
  hideLeftOnMobile = false,
  hideRightOnMobile = false,
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: SplitLayoutProps) {
  const ratioConfig = ratioClasses[ratio];

  return (
    <Tag
      className={cn(
        'grid grid-cols-1 md:grid-cols-12 w-full',
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      data-testid={testId}
    >
      <div
        className={cn(
          'w-full min-w-0',
          ratioConfig.left,
          hideLeftOnMobile && 'hidden md:block'
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          'w-full min-w-0',
          ratioConfig.right,
          hideRightOnMobile && 'hidden md:block'
        )}
      >
        {right}
      </div>
    </Tag>
  );
}
