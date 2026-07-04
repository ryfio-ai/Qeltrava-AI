'use client';
/**
 * design-system/components/SplitPane.tsx
 * Qeltrava AI Design System – SplitPane
 *
 * Two-panel resizable container split horizontally or vertically.
 * Complete with drag handles, cursor shifts, and ARIA attributes for separators.
 */
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface SplitPaneProps extends BaseComponentProps {
  /** Left or top pane content */
  primary:           React.ReactNode;
  /** Right or bottom pane content */
  secondary:         React.ReactNode;
  /** Initial splitter percentage. Default is 50 */
  defaultSize?:      number;
  /** Minimum pane width/height percentage constraint. Default is 20 */
  minSize?:          number;
  /** Maximum pane width/height percentage constraint. Default is 80 */
  maxSize?:          number;
  /** Split orientation direction. Default is 'horizontal' */
  orientation?:      'horizontal' | 'vertical';
  /** Triggered when resizing */
  onResize?:         (size: number) => void;
}

export function SplitPane({
  primary,
  secondary,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  orientation = 'horizontal',
  onResize,
  className,
  'data-testid': testId,
}: SplitPaneProps) {
  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let nextSize = 50;

      if (orientation === 'horizontal') {
        const offset = clientX - containerRect.left;
        nextSize = (offset / containerRect.width) * 100;
      } else {
        const offset = clientY - containerRect.top;
        nextSize = (offset / containerRect.height) * 100;
      }

      // Constrain size
      nextSize = Math.max(minSize, Math.min(maxSize, nextSize));
      setSize(nextSize);
      if (onResize) onResize(nextSize);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [orientation, minSize, maxSize, onResize]);

  const isHoriz = orientation === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full h-full flex overflow-hidden select-none bg-[var(--surface-0)]',
        isHoriz ? 'flex-row' : 'flex-col',
        className
      )}
      data-testid={testId}
    >
      {/* Primary Pane */}
      <div
        className="shrink-0 overflow-auto min-w-0 min-h-0"
        style={{
          width: isHoriz ? `${size}%` : '100%',
          height: isHoriz ? '100%' : `${size}%`,
        }}
      >
        {primary}
      </div>

      {/* Resize Handle Separator */}
      <div
        role="separator"
        aria-orientation={orientation}
        aria-valuenow={Math.round(size)}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={cn(
          'bg-[var(--color-border)] hover:bg-[var(--color-accent)] active:bg-[var(--color-accent)] shrink-0 transition-colors duration-100 relative flex items-center justify-center focus:outline-none focus:bg-[var(--color-accent)]',
          isHoriz
            ? 'w-1.5 h-full cursor-col-resize hover:w-2 active:w-2'
            : 'h-1.5 w-full cursor-row-resize hover:h-2 active:h-2'
        )}
        data-testid={testId ? `${testId}-handle` : undefined}
      >
        {/* Visual Grab Indicators */}
        <div
          className={cn(
            'bg-[var(--color-text-tertiary)] opacity-60 rounded-full',
            isHoriz ? 'h-6 w-0.5' : 'w-6 h-0.5'
          )}
        />
      </div>

      {/* Secondary Pane */}
      <div
        className="flex-1 overflow-auto min-w-0 min-h-0"
        style={{
          width: isHoriz ? `${100 - size}%` : '100%',
          height: isHoriz ? '100%' : `${100 - size}%`,
        }}
      >
        {secondary}
      </div>
    </div>
  );
}
export default SplitPane;
