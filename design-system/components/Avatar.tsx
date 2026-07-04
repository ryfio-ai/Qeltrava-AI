'use client';
/**
 * design-system/components/Avatar.tsx
 * Qeltrava AI Design System – Avatar
 *
 * Renders user profile picture, initials, or generic icon fallback.
 * Includes status indicator dots.
 */
import React, { useState } from 'react';
import { cn } from '../utils';
import type { BaseComponentProps, Size } from '../types';
import { Icon } from './Icon';

export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps extends BaseComponentProps {
  /** Image source URL */
  src?:              string;
  /** Image alt text / fallback initials source text */
  name?:             string;
  /** Avatar size. Default is 'md' */
  size?:             Size;
  /** Status indicator dot */
  status?:           AvatarStatus;
  /** Custom initials override */
  initials?:         string;
  /** Border color around status indicator to match container background */
  statusBorderColor?: string;
}

const sizeMap: Record<Size, { container: string; text: string; icon: number; dot: string; dotOffset: string }> = {
  xs: {
    container: 'h-6 w-6',
    text: 'text-[10px]',
    icon: 12,
    dot: 'h-1.5 w-1.5',
    dotOffset: 'bottom-0 right-0',
  },
  sm: {
    container: 'h-8 w-8',
    text: 'text-xs',
    icon: 14,
    dot: 'h-2 w-2',
    dotOffset: 'bottom-0 right-0',
  },
  md: {
    container: 'h-10 w-10',
    text: 'text-sm font-semibold',
    icon: 16,
    dot: 'h-2.5 w-2.5',
    dotOffset: 'bottom-0 right-0',
  },
  lg: {
    container: 'h-12 w-12',
    text: 'text-base font-semibold',
    icon: 20,
    dot: 'h-3 w-3',
    dotOffset: 'bottom-0.5 right-0.5',
  },
  xl: {
    container: 'h-16 w-16',
    text: 'text-lg font-bold',
    icon: 28,
    dot: 'h-4 w-4',
    dotOffset: 'bottom-1 right-1',
  },
};

const statusColors: Record<AvatarStatus, string> = {
  online:  'bg-[var(--color-status-success)]',
  away:    'bg-[var(--color-status-warning)]',
  busy:    'bg-[var(--color-status-danger)]',
  offline: 'bg-[var(--color-text-tertiary)]',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  status,
  initials: initialsProp,
  statusBorderColor = 'border-[var(--surface-1)]',
  className,
  'data-testid': testId,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizeConfig = sizeMap[size];

  const resolvedInitials = initialsProp || (name ? getInitials(name) : '');
  const showImage = src && !imageError;
  const showInitials = !showImage && resolvedInitials;

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center rounded-full',
        'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
        sizeConfig.container,
        className
      )}
      data-testid={testId}
    >
      {/* 1. Image */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name || 'Avatar'}
          onError={() => setImageError(true)}
          className="h-full w-full rounded-full object-cover"
        />
      )}

      {/* 2. Initials (Fallback) */}
      {!showImage && showInitials && (
        <span className={cn('uppercase font-medium tracking-wider', sizeConfig.text)}>
          {resolvedInitials}
        </span>
      )}

      {/* 3. Icon (Fallback if no initials) */}
      {!showImage && !showInitials && (
        <Icon name="User" size={sizeConfig.icon} className="text-[var(--color-text-tertiary)]" />
      )}

      {/* Status Dot */}
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-2',
            statusColors[status],
            statusBorderColor,
            sizeConfig.dot,
            sizeConfig.dotOffset
          )}
          aria-label={`Status: ${status}`}
          role="status"
        />
      )}
    </div>
  );
}
