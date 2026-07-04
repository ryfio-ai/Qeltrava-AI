'use client';
/**
 * design-system/components/Masonry.tsx
 * Qeltrava AI Design System – Masonry
 *
 * CSS multi-column-based responsive masonry layout container.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface MasonryProps extends BaseComponentProps {
  /** Items to layout inside the masonry */
  children:          React.ReactNode;
  /** Number of columns across responsive break points. Default is { initial: 1, sm: 2, md: 3, lg: 4 } */
  columns?:          number | { initial?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between columns. Default is 6 */
  gap?:              0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  /** HTML tag name. Default is 'div' */
  as?:               React.ElementType;
}

const gapTokens = {
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

export function Masonry({
  children,
  columns = { initial: 1, sm: 2, md: 3, lg: 4 },
  gap = 6,
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: MasonryProps) {
  // Translate columns config into inline/Tailwind columns count styles
  const colStyle = typeof columns === 'number'
    ? { columnCount: columns }
    : {
        '--masonry-cols-initial': columns.initial || 1,
        '--masonry-cols-sm': columns.sm || columns.initial || 2,
        '--masonry-cols-md': columns.md || columns.sm || columns.initial || 3,
        '--masonry-cols-lg': columns.lg || columns.md || columns.sm || columns.initial || 4,
        '--masonry-cols-xl': columns.xl || columns.lg || columns.md || columns.sm || columns.initial || 4,
      } as React.CSSProperties & Record<string, number>;

  return (
    <Tag
      className={cn(
        'w-full masonry-container',
        gapTokens[gap],
        className
      )}
      style={colStyle}
      data-testid={testId}
    >
      {React.Children.map(children, (child, idx) => (
        <div key={idx} className="break-inside-avoid mb-[var(--space-4)]">
          {child}
        </div>
      ))}

      {/* Scoped CSS media queries to dynamically update columnCounts */}
      {typeof columns !== 'number' && (
        <style jsx>{`
          .masonry-container {
            column-count: var(--masonry-cols-initial);
          }
          @media (min-width: 640px) {
            .masonry-container {
              column-count: var(--masonry-cols-sm);
            }
          }
          @media (min-width: 768px) {
            .masonry-container {
              column-count: var(--masonry-cols-md);
            }
          }
          @media (min-width: 1024px) {
            .masonry-container {
              column-count: var(--masonry-cols-lg);
            }
          }
          @media (min-width: 1280px) {
            .masonry-container {
              column-count: var(--masonry-cols-xl);
            }
          }
        `}</style>
      )}
    </Tag>
  );
}
export default Masonry;
