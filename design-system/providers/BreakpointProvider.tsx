'use client';
/**
 * design-system/providers/BreakpointProvider.tsx
 * SSR-safe breakpoint context. Avoids re-computing breakpoints per-component.
 * Exposes useBreakpointContext() hook.
 */
import React, { createContext, useContext } from 'react';
import { useBreakpoint, type BreakpointState } from '../hooks/useBreakpoint';

const BreakpointContext = createContext<BreakpointState | null>(null);

export function BreakpointProvider({ children }: { children: React.ReactNode }) {
  const state = useBreakpoint();
  return (
    <BreakpointContext.Provider value={state}>
      {children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpointContext(): BreakpointState {
  const ctx = useContext(BreakpointContext);
  if (!ctx) throw new Error('useBreakpointContext must be used inside <BreakpointProvider>');
  return ctx;
}
