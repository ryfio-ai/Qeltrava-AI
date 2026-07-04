'use client';
/**
 * design-system/components/AvatarGroup.tsx
 * Qeltrava AI Design System – AvatarGroup
 *
 * Displays a list of overlapping user avatars with an overflow indicator badge.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps, Size } from '../types';
import { Avatar, type AvatarProps } from './Avatar';
import { Tooltip } from './Overlays';

export interface AvatarGroupProps extends BaseComponentProps {
  /** Array of Avatar component properties */
  items:             Omit<AvatarProps, 'size'>[];
  /** Avatar size. Default is 'md' */
  size?:             Size;
  /** Maximum number of avatars to render before truncating */
  max?:              number;
  /** Custom background border color to cleanly separate overlapping avatars */
  borderColor?:      string;
}

const overlapClasses: Record<Size, string> = {
  xs: '-space-x-1.5',
  sm: '-space-x-2',
  md: '-space-x-2.5',
  lg: '-space-x-3',
  xl: '-space-x-4',
};

const badgeSizeClasses: Record<Size, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm font-semibold',
  lg: 'h-12 w-12 text-base font-semibold',
  xl: 'h-16 w-16 text-lg font-bold',
};

export function AvatarGroup({
  items,
  size = 'md',
  max = 4,
  borderColor = 'border-[var(--surface-1)]',
  className,
  'data-testid': testId,
}: AvatarGroupProps) {
  const visibleItems = items.slice(0, max);
  const overflowCount = Math.max(0, items.length - max);

  return (
    <div
      className={cn('inline-flex items-center', overlapClasses[size], className)}
      role="group"
      aria-label="Group of users"
      data-testid={testId}
    >
      {visibleItems.map((item, index) => {
        const avatarEl = (
          <Avatar
            {...item}
            size={size}
            statusBorderColor={borderColor}
            className={cn('ring-2 ring-[var(--surface-1)]', item.className)}
          />
        );

        if (item.name) {
          return (
            <Tooltip key={index} content={item.name} side="top">
              <div className="relative focus-within:z-10 hover:z-10 focus:outline-none">
                {avatarEl}
              </div>
            </Tooltip>
          );
        }

        return (
          <div key={index} className="relative focus-within:z-10 hover:z-10">
            {avatarEl}
          </div>
        );
      })}

      {overflowCount > 0 && (
        <div
          className={cn(
            'relative inline-flex shrink-0 select-none items-center justify-center rounded-full',
            'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
            'ring-2 ring-[var(--surface-1)] z-10 font-medium',
            badgeSizeClasses[size]
          )}
          aria-label={`${overflowCount} more users`}
          data-testid={testId ? `${testId}-overflow` : undefined}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  );
}
