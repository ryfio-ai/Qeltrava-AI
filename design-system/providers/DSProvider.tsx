'use client';
/**
 * design-system/providers/DSProvider.tsx
 * Root Design System provider — composes all DS providers into one.
 *
 * Usage:
 *   import { DSProvider } from '@/design-system/providers/DSProvider';
 *   <DSProvider>{children}</DSProvider>
 */
import React from 'react';
import { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';
import { ToastProvider, type ToastProviderProps } from '../components/Toast';
import { DialogProvider } from './DialogProvider';
import { TooltipProvider } from './TooltipProvider';
import { BreakpointProvider } from './BreakpointProvider';
import { LiveRegionProvider } from '../accessibility';

export interface DSProviderProps {
  children:        React.ReactNode;
  /** ThemeProvider config */
  theme?:          Pick<ThemeProviderProps, 'defaultTheme' | 'persist'>;
  /** ToastProvider config */
  toast?:          Pick<ToastProviderProps, 'position' | 'maxToasts'>;
  /** Tooltip global delay (ms) */
  tooltipDelay?:   number;
}

export function DSProvider({
  children,
  theme   = {},
  toast   = {},
  tooltipDelay,
}: DSProviderProps) {
  return (
    <ThemeProvider {...theme}>
      <BreakpointProvider>
        <LiveRegionProvider>
          <TooltipProvider delay={tooltipDelay}>
            <DialogProvider>
              <ToastProvider {...toast}>
                {children}
              </ToastProvider>
            </DialogProvider>
          </TooltipProvider>
        </LiveRegionProvider>
      </BreakpointProvider>
    </ThemeProvider>
  );
}
