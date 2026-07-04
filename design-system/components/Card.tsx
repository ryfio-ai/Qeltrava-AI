/**
 * design-system/components/Card.tsx
 * Qeltrava AI Design System – Card
 *
 * Variants:   default | bordered | elevated | ghost | interactive
 * Padding:    none | sm | md | lg
 * Sub-comps:  Card | CardHeader | CardBody | CardFooter | CardImage
 */
import React from 'react';
import { cn } from '../utils';

export type CardVariant = 'default' | 'bordered' | 'elevated' | 'ghost' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?:   CardVariant;
  padding?:   CardPadding;
  as?:        'div' | 'article' | 'section' | 'li';
  href?:      string;
  onClick?:   React.MouseEventHandler;
  children?:  React.ReactNode;
  className?: string;
}

const variantMap: Record<CardVariant, string> = {
  default:
    'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]',
  bordered:
    'bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-strong)]',
  elevated:
    'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]',
  ghost:
    'bg-transparent',
  interactive:
    'bg-[var(--color-bg-elevated)] border border-[var(--color-border)] ' +
    'cursor-pointer transition-[var(--transition-hover)] ' +
    'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-dropdown)] ' +
    'hover:-translate-y-[2px] active:translate-y-0',
};

const paddingMap: Record<CardPadding, string> = {
  none: 'p-0',
  sm:   'p-[var(--space-4)]',
  md:   'p-[var(--space-6)]',
  lg:   'p-[var(--space-8)]',
};

export function Card({
  variant   = 'default',
  padding   = 'md',
  as: Tag   = 'div',
  href,
  onClick,
  children,
  className,
}: CardProps) {
  const classes = cn(
    'rounded-[var(--radius-card)] overflow-hidden',
    variantMap[variant],
    paddingMap[padding],
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, 'block transition-[var(--transition-hover)] hover:shadow-[var(--shadow-dropdown)] hover:-translate-y-[2px] active:translate-y-0')}>
        {children}
      </a>
    );
  }

  return (
    <Tag className={classes} onClick={onClick as React.MouseEventHandler<HTMLElement>}>
      {children}
    </Tag>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-[var(--space-6)] py-[var(--space-4)] border-b border-[var(--color-border)]', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, padding = 'md' }: { children: React.ReactNode; className?: string; padding?: CardPadding }) {
  return (
    <div className={cn(paddingMap[padding], className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-[var(--space-6)] py-[var(--space-4)] border-t border-[var(--color-border)] flex items-center justify-between', className)}>
      {children}
    </div>
  );
}

export function CardImage({
  src,
  alt,
  aspectRatio = '16/9',
  className,
}: {
  src:          string;
  alt:          string;
  aspectRatio?: string;
  className?:   string;
}) {
  return (
    <div className={cn('overflow-hidden -mx-[var(--space-6)] -mt-[var(--space-6)] mb-[var(--space-4)] first:-mx-0 first:-mt-0', className)}
      style={{ aspectRatio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}
