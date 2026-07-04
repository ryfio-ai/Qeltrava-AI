/**
 * design-system/components/Skeleton.tsx
 * Qeltrava AI Design System – Skeleton loaders
 *
 * Primitives: Skeleton (block) | SkeletonText | SkeletonAvatar | SkeletonCard
 * Animation: shimmer via CSS animation, disabled by prefers-reduced-motion
 */
import React from 'react';
import { cn } from '../utils';

// ─── Base Skeleton ────────────────────────────────────────────────────────────

export interface SkeletonProps {
  width?:     string | number;
  height?:    string | number;
  radius?:    string;
  className?: string;
  animate?:   boolean;
}

export function Skeleton({
  width,
  height,
  radius     = 'var(--skeleton-radius)',
  className,
  animate    = true,
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block bg-[var(--skeleton-base)]',
        animate && 'animate-pulse',
        className
      )}
      style={{
        width:        width  ? (typeof width  === 'number' ? `${width}px`  : width)  : undefined,
        height:       height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        borderRadius: radius,
      }}
    />
  );
}

// ─── SkeletonText ─────────────────────────────────────────────────────────────

export interface SkeletonTextProps {
  lines?:     number;
  lastWidth?: string;   /* width of last line, e.g. '60%' */
  className?: string;
}

export function SkeletonText({ lines = 3, lastWidth = '60%', className }: SkeletonTextProps) {
  return (
    <div aria-hidden="true" className={cn('flex flex-col gap-[var(--space-2)]', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? lastWidth : '100%'}
        />
      ))}
    </div>
  );
}

// ─── SkeletonAvatar ───────────────────────────────────────────────────────────

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const avatarSizeMap: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 48, xl: 64 };

export function SkeletonAvatar({ size = 'md' }: { size?: AvatarSize }) {
  const px = avatarSizeMap[size];
  return (
    <Skeleton
      width={px}
      height={px}
      radius="var(--radius-full)"
      aria-hidden
    />
  );
}

// ─── SkeletonCard ─────────────────────────────────────────────────────────────

export interface SkeletonCardProps {
  hasImage?:  boolean;
  lines?:     number;
  className?: string;
}

export function SkeletonCard({ hasImage = true, lines = 3, className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      aria-label="Loading…"
      className={cn(
        'rounded-[var(--radius-card)] border border-[var(--color-border)]',
        'bg-[var(--color-bg-elevated)] overflow-hidden',
        className
      )}
    >
      {hasImage && <Skeleton height={180} radius="0" />}
      <div className="p-[var(--space-4)] flex flex-col gap-[var(--space-3)]">
        <div className="flex items-center gap-[var(--space-3)]">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 flex flex-col gap-[var(--space-1-5)]">
            <Skeleton height={12} width="50%" />
            <Skeleton height={10} width="30%" />
          </div>
        </div>
        <SkeletonText lines={lines} />
      </div>
    </div>
  );
}
