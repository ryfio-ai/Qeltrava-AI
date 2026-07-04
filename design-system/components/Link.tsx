/**
 * design-system/components/Link.tsx
 * Qeltrava AI Design System – Link
 *
 * Variants: default | subtle | inverted | nav | standalone
 * Wraps Next.js routing Link with token-based styles.
 */
'use client';
import React from 'react';
import NextLink from 'next/link';
import { cn, focusRing } from '../utils';

export type LinkVariant = 'default' | 'subtle' | 'inverted' | 'nav' | 'standalone';

export interface LinkProps {
  href:         string;
  variant?:     LinkVariant;
  external?:    boolean;
  underline?:   'always' | 'hover' | 'none';
  children:     React.ReactNode;
  className?:   string;
  locale?:      string;
  prefetch?:    boolean;
  onClick?:     React.MouseEventHandler<HTMLAnchorElement>;
}

const variantMap: Record<LinkVariant, string> = {
  default:
    'text-[var(--color-text-link)] hover:text-[var(--color-text-link-hover)]',
  subtle:
    'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  inverted:
    'text-[var(--color-text-inverted)] hover:opacity-80',
  nav:
    'text-[var(--color-text-primary)] hover:text-[var(--color-accent)] ' +
    'font-[var(--font-weight-medium)]',
  standalone:
    'text-[var(--color-accent)] font-[var(--font-weight-medium)] ' +
    'hover:text-[var(--color-accent-hover)] inline-flex items-center gap-[var(--space-1)]',
};

const underlineMap: Record<'always' | 'hover' | 'none', string> = {
  always: 'underline underline-offset-2',
  hover:  'no-underline hover:underline hover:underline-offset-2',
  none:   'no-underline',
};

export function Link({
  href,
  variant    = 'default',
  external   = false,
  underline  = 'hover',
  children,
  className,
  locale,
  prefetch,
  onClick,
}: LinkProps) {
  const classes = cn(
    'transition-[var(--transition-hover)] rounded-[var(--radius-xs)]',
    focusRing,
    variantMap[variant],
    underlineMap[underline],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      locale={locale}
      prefetch={prefetch}
      className={classes}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}
