/**
 * design-system/components/Surface.tsx
 * Qeltrava AI Design System – Surface
 *
 * Renders a semantic background surface at a given elevation level (0–4).
 * Thin wrapper that sets background + optional border + rounded corners.
 */
import React from 'react';
import { cn } from '../utils';

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4;

export interface SurfaceProps {
  level?:     SurfaceLevel;
  bordered?:  boolean;
  rounded?:   boolean;
  padding?:   'none' | 'sm' | 'md' | 'lg';
  as?:        'div' | 'section' | 'article' | 'aside' | 'main' | 'nav';
  children?:  React.ReactNode;
  className?: string;
}

const levelMap: Record<SurfaceLevel, string> = {
  0: 'bg-[var(--surface-0)]',
  1: 'bg-[var(--surface-1)]',
  2: 'bg-[var(--surface-2)]',
  3: 'bg-[var(--surface-3)]',
  4: 'bg-[var(--surface-4)]',
};

const paddingMap = {
  none: '',
  sm:   'p-[var(--space-4)]',
  md:   'p-[var(--space-6)]',
  lg:   'p-[var(--space-8)]',
};

export function Surface({
  level    = 1,
  bordered = false,
  rounded  = true,
  padding  = 'none',
  as: Tag  = 'div',
  children,
  className,
}: SurfaceProps) {
  return (
    <Tag
      className={cn(
        levelMap[level],
        bordered && 'border border-[var(--color-border)]',
        rounded  && 'rounded-[var(--radius-xl)]',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </Tag>
  );
}


/**
 * design-system/components/Divider.tsx
 * Horizontal or vertical rule consuming border tokens.
 */
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  orientation?: DividerOrientation;
  label?:       string;   /* renders text in the centre of the divider */
  className?:   string;
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block w-[var(--border-1)] self-stretch bg-[var(--color-border)]', className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-[var(--space-4)]', className)}
      >
        <div className="flex-1 h-[var(--border-1)] bg-[var(--color-border)]" />
        <span className="text-[var(--font-size-xs)] font-[var(--font-weight-medium)] text-[var(--color-text-tertiary)] uppercase tracking-[var(--tracking-widest)] whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-[var(--border-1)] bg-[var(--color-border)]" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn('border-none h-[var(--border-1)] bg-[var(--color-border)] w-full', className)}
    />
  );
}


/**
 * design-system/components/Container.tsx
 * Max-width page container with responsive padding.
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps {
  size?:      ContainerSize;
  centered?:  boolean;
  as?:        'div' | 'section' | 'article' | 'main';
  children?:  React.ReactNode;
  className?: string;
}

const maxWidthMap: Record<ContainerSize, string> = {
  sm:   'max-w-[var(--container-sm)]',
  md:   'max-w-[var(--container-md)]',
  lg:   'max-w-[var(--container-lg)]',
  xl:   'max-w-[var(--container-xl)]',
  '2xl':'max-w-[var(--container-2xl)]',
  full: 'max-w-full',
};

export function Container({
  size     = 'xl',
  centered = true,
  as: Tag  = 'div',
  children,
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full px-[var(--space-6)] sm:px-[var(--space-8)] lg:px-[var(--space-12)]',
        maxWidthMap[size],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </Tag>
  );
}


/**
 * design-system/components/Stack.tsx
 * Flex layout primitive for vertical/horizontal stacking with token-based gap.
 */
export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign     = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify   = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackGap       = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

const gapTokens: Record<StackGap, string> = {
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

const alignMap: Record<StackAlign, string>   = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' };
const justifyMap: Record<StackJustify, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly' };

export interface StackProps {
  direction?: StackDirection;
  gap?:       StackGap;
  align?:     StackAlign;
  justify?:   StackJustify;
  wrap?:      boolean;
  inline?:    boolean;
  as?:        'div' | 'ul' | 'ol' | 'nav' | 'header' | 'footer' | 'section';
  children?:  React.ReactNode;
  className?: string;
}

export function Stack({
  direction  = 'vertical',
  gap        = 4,
  align      = 'start',
  justify    = 'start',
  wrap       = false,
  inline     = false,
  as: Tag    = 'div',
  children,
  className,
}: StackProps) {
  return (
    <Tag
      className={cn(
        inline ? 'inline-flex' : 'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        gapTokens[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </Tag>
  );
}
