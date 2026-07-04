'use client';
/**
 * design-system/components/ScrollArea.tsx
 * Qeltrava AI Design System – ScrollArea
 *
 * Custom styled scroll container using CSS standard scrollbar properties and Webkit vendor prefixes.
 * Exposes options for horizontal/vertical scroll directions.
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface ScrollAreaProps extends BaseComponentProps {
  children?:          React.ReactNode;
  /** Allow vertical scrolling. Default is true */
  vertical?:          boolean;
  /** Allow horizontal scrolling. Default is false */
  horizontal?:        boolean;
  /** Size/thickness of scrollbar. Default is 'md' */
  scrollbarSize?:     'sm' | 'md' | 'lg';
  /** Track background color theme. Default is 'transparent' */
  trackColor?:        string;
  /** Thumb background color theme. Default is 'var(--color-border-strong)' */
  thumbColor?:        string;
  /** Thumb background color on hover. Default is 'var(--color-text-tertiary)' */
  thumbHoverColor?:   string;
}

const sizeValues = {
  sm: '6px',
  md: '8px',
  lg: '12px',
};

export function ScrollArea({
  children,
  vertical = true,
  horizontal = false,
  scrollbarSize = 'md',
  trackColor = 'transparent',
  thumbColor = 'var(--color-border-strong)',
  thumbHoverColor = 'var(--color-text-tertiary)',
  className,
  'data-testid': testId,
}: ScrollAreaProps) {
  // We can define CSS variables scoped to this component instance
  const style: React.CSSProperties & Record<string, string> = {
    '--sb-size': sizeValues[scrollbarSize],
    '--sb-track': trackColor,
    '--sb-thumb': thumbColor,
    '--sb-thumb-hover': thumbHoverColor,
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full h-full',
        className
      )}
      style={style}
      data-testid={testId}
    >
      <div
        className={cn(
          'w-full h-full scroll-container',
          vertical ? 'overflow-y-auto' : 'overflow-y-hidden',
          horizontal ? 'overflow-x-auto' : 'overflow-x-hidden',
          // Custom class for styling via webkit scrollbars
          '[scrollbar-width:thin] [scrollbar-color:var(--sb-thumb)_var(--sb-track)]'
        )}
      >
        {children}
        
        {/* Scoped CSS styling for Webkit scrollbars */}
        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            width: var(--sb-size);
            height: var(--sb-size);
          }
          .scroll-container::-webkit-scrollbar-track {
            background: var(--sb-track);
            border-radius: var(--radius-full, 9999px);
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: var(--sb-thumb);
            border-radius: var(--radius-full, 9999px);
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: var(--sb-thumb-hover);
          }
        `}</style>
      </div>
    </div>
  );
}
export default ScrollArea;
