'use client';
/**
 * design-system/components/AnnouncementBar.tsx
 * Qeltrava AI Design System – AnnouncementBar
 *
 * A thin top bar for promoting high-value system news or countdowns.
 */
import React, { useState, useEffect } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface AnnouncementBarProps extends BaseComponentProps {
  /** Announcement text message */
  message:      string;
  /** CTA button text or node */
  cta?:         React.ReactNode;
  /** Countdown target date (ISO format or Date object) */
  countdownTarget?: string | Date;
  /** Dismiss callback */
  onDismiss?:   () => void;
  /** Custom background theme variant. Default is 'brand' */
  theme?:       'brand' | 'dark' | 'accent';
}

const themeClasses = {
  brand:  'bg-[var(--color-primary)] text-white',
  dark:   'bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]',
  accent: 'bg-[var(--color-accent)] text-white',
};

export function AnnouncementBar({
  message,
  cta,
  countdownTarget,
  onDismiss,
  theme = 'brand',
  className,
  'data-testid': testId,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!countdownTarget) return;

    const targetTime = new Date(countdownTarget).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft('');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0 || days > 0) parts.push(`${hours}h`);
      parts.push(`${mins}m`);
      parts.push(`${secs}s`);

      setTimeLeft(parts.join(' '));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [countdownTarget]);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between px-[var(--space-6)] py-[var(--space-2)] text-[var(--font-size-xs)] font-medium leading-none min-h-[36px]',
        themeClasses[theme],
        className
      )}
      role="banner"
      data-testid={testId}
    >
      <div className="flex-1 flex items-center justify-center gap-[var(--space-4)] flex-wrap text-center">
        <span className="truncate">{message}</span>

        {timeLeft && (
          <span className="inline-flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase">
            <Icon name="Clock" size={10} />
            {timeLeft}
          </span>
        )}

        {cta && (
          <span className="underline hover:no-underline cursor-pointer transition-all">
            {cta}
          </span>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-[var(--space-2)] p-0.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-white"
          aria-label="Dismiss message"
          data-testid={testId ? `${testId}-dismiss` : undefined}
        >
          <Icon name="X" size={12} />
        </button>
      )}
    </div>
  );
}
