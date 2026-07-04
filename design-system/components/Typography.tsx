/**
 * design-system/components/Typography.tsx
 * Qeltrava AI Design System – Typography system
 *
 * Components: Heading | Text | Label | Caption | Overline | Code | Lead
 * All consume semantic typography tokens exclusively.
 */
import React from 'react';
import { cn } from '../utils';

// ─── Heading ─────────────────────────────────────────────────────────────────

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const headingSize: Record<HeadingVariant, string> = {
  display: 'text-[var(--font-size-heading-display)] leading-[var(--line-height-heading)] tracking-[var(--tracking-heading)]',
  xl:      'text-[var(--font-size-heading-xl)]      leading-[var(--line-height-heading)] tracking-[var(--tracking-heading)]',
  lg:      'text-[var(--font-size-heading-lg)]      leading-[var(--line-height-heading)] tracking-[var(--tracking-heading)]',
  md:      'text-[var(--font-size-heading-md)]      leading-[var(--line-height-heading)] tracking-[var(--tracking-tight)]',
  sm:      'text-[var(--font-size-heading-sm)]      leading-[var(--line-height-snug)]   tracking-[var(--tracking-tight)]',
  xs:      'text-[var(--font-size-heading-xs)]      leading-[var(--line-height-snug)]   tracking-[var(--tracking-normal)]',
};

export interface HeadingProps {
  as?:        HeadingLevel;
  variant?:   HeadingVariant;
  children:   React.ReactNode;
  className?: string;
  id?:        string;
}

export function Heading({
  as:         level    = 2,
  variant              = 'md',
  children,
  className,
  id,
}: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return (
    <Tag
      id={id}
      className={cn(
        'font-[var(--font-family-display)] font-[var(--font-weight-heading)]',
        'text-[var(--color-text-heading)]',
        headingSize[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ─── Text ─────────────────────────────────────────────────────────────────────

type TextVariant = 'lg' | 'base' | 'sm';
type TextWeight  = 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor   = 'primary' | 'secondary' | 'tertiary' | 'inverted' | 'accent' | 'danger' | 'success';

const textSizeMap: Record<TextVariant, string> = {
  lg:   'text-[var(--font-size-body-lg)]  leading-[var(--line-height-relaxed)]',
  base: 'text-[var(--font-size-body)]     leading-[var(--line-height-body)]',
  sm:   'text-[var(--font-size-body-sm)]  leading-[var(--line-height-normal)]',
};

const textWeightMap: Record<TextWeight, string> = {
  regular:  'font-[var(--font-weight-regular)]',
  medium:   'font-[var(--font-weight-medium)]',
  semibold: 'font-[var(--font-weight-semibold)]',
  bold:     'font-[var(--font-weight-bold)]',
};

const textColorMap: Record<TextColor, string> = {
  primary:   'text-[var(--color-text-primary)]',
  secondary: 'text-[var(--color-text-secondary)]',
  tertiary:  'text-[var(--color-text-tertiary)]',
  inverted:  'text-[var(--color-text-inverted)]',
  accent:    'text-[var(--color-accent)]',
  danger:    'text-[var(--color-danger)]',
  success:   'text-[var(--color-success)]',
};

export interface TextProps {
  as?:        'p' | 'span' | 'div' | 'li';
  variant?:   TextVariant;
  weight?:    TextWeight;
  color?:     TextColor;
  children:   React.ReactNode;
  className?: string;
}

export function Text({
  as: Tag   = 'p',
  variant   = 'base',
  weight    = 'regular',
  color     = 'primary',
  children,
  className,
}: TextProps) {
  return (
    <Tag
      className={cn(
        'font-[var(--font-family-sans)]',
        textSizeMap[variant],
        textWeightMap[weight],
        textColorMap[color],
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-[var(--font-size-subheading)] leading-[var(--line-height-relaxed)]',
        'font-[var(--font-weight-regular)] text-[var(--color-text-secondary)]',
        className
      )}
    >
      {children}
    </p>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

export interface LabelProps {
  htmlFor?:   string;
  required?:  boolean;
  children:   React.ReactNode;
  className?: string;
}

export function Label({ htmlFor, required, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-[var(--font-size-label)] leading-[var(--line-height-snug)]',
        'font-[var(--font-weight-label)] text-[var(--color-text-primary)]',
        'block',
        className
      )}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-[var(--space-1)] text-[var(--color-danger)]">*</span>
      )}
      {required && <span className="sr-only">(required)</span>}
    </label>
  );
}

// ─── Caption ──────────────────────────────────────────────────────────────────

export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'text-[var(--font-size-caption)] leading-[var(--line-height-caption)]',
        'font-[var(--font-weight-caption)] text-[var(--color-text-secondary)]',
        'block',
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Overline ────────────────────────────────────────────────────────────────

export function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'text-[var(--font-size-overline)] leading-[var(--line-height-none)]',
        'font-[var(--font-weight-overline)] tracking-[var(--tracking-overline)]',
        'text-[var(--color-text-secondary)] uppercase block',
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Code ────────────────────────────────────────────────────────────────────

export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        'font-[var(--font-family-mono)] text-[var(--font-size-sm)]',
        'bg-[var(--color-bg-subtle)] text-[var(--color-accent)]',
        'px-[var(--space-1-5)] py-[var(--space-0-5)] rounded-[var(--radius-sm)]',
        'border border-[var(--color-border-subtle)]',
        className
      )}
    >
      {children}
    </code>
  );
}
