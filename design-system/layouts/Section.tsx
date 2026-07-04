'use client';
/**
 * design-system/layouts/Section.tsx
 * Qeltrava AI Design System – Section Layout Primitive
 *
 * Page section with semantic padding and surface background variants.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps, SurfaceLevel } from '../types';

export interface SectionProps extends BaseComponentProps {
  children?:    React.ReactNode;
  /** Background surface level. Default is 0 (base surface) */
  level?:       SurfaceLevel;
  /** Vertical padding sizes. Default is 'md' */
  padding?:     'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** HTML tag name. Default is 'section' */
  as?:          'section' | 'div' | 'header' | 'footer' | 'article' | 'aside';
}

const levelClasses: Record<SurfaceLevel, string> = {
  0: 'bg-[var(--surface-0)]',
  1: 'bg-[var(--surface-1)]',
  2: 'bg-[var(--surface-2)]',
  3: 'bg-[var(--surface-3)]',
  4: 'bg-[var(--surface-4)]',
};

const paddingClasses = {
  none: 'py-0',
  sm:   'py-[var(--space-6)] md:py-[var(--space-8)]',
  md:   'py-[var(--space-10)] md:py-[var(--space-12)]',
  lg:   'py-[var(--space-16)] md:py-[var(--space-20)]',
  xl:   'py-[var(--space-20)] md:py-[var(--space-28)]',
  '2xl': 'py-[var(--space-28)] md:py-[var(--space-36)]',
};

export function Section({
  children,
  level = 0,
  padding = 'md',
  as: Tag = 'section',
  className,
  'data-testid': testId,
}: SectionProps) {
  return (
    <Tag
      className={cn(
        'w-full block relative',
        levelClasses[level],
        paddingClasses[padding],
        className
      )}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
}
