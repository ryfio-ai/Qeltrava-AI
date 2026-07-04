/**
 * design-system/components/Icon.tsx
 * Qeltrava AI Design System – Icon wrapper
 *
 * Wraps lucide-react icons (or any SVG) with consistent sizing,
 * colour inheritance, and ARIA semantics.
 *
 * Sizes: xs(12) | sm(14) | md(16) | lg(20) | xl(24) | 2xl(32)
 */
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../utils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export interface IconProps {
  /** The lucide-react icon component or any SVG component */
  icon?: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  /** The name of the lucide-react icon to render (string fallback) */
  name?: string;
  size?:      IconSize;
  label?:     string;   /* accessible label – renders aria-label, hides from visual layout */
  className?: string;
  color?:     string;   /* CSS var reference e.g. 'var(--color-accent)' */
}

const sizeMap: Record<string, number> = {
  xs:  12,
  sm:  14,
  md:  16,
  lg:  20,
  xl:  24,
  '2xl': 32,
};

export function Icon({ icon: IconComponent, name, size = 'md', label, className, color }: IconProps) {
  // Resolve component
  let ResolvedIcon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }> | undefined = IconComponent;
  
  if (!ResolvedIcon && name) {
    ResolvedIcon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  }

  if (!ResolvedIcon) {
    // Fallback icon when nothing resolves
    ResolvedIcon = LucideIcons.HelpCircle;
  }

  // Resolve pixel size
  const px = typeof size === 'number' ? size : (sizeMap[size] || 16);

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
      className={cn('inline-flex items-center justify-center shrink-0', className)}
      style={color ? { color } : undefined}
    >
      <ResolvedIcon size={px} aria-hidden />
    </span>
  );
}
