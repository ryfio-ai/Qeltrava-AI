'use client';
/**
 * design-system/providers/TooltipProvider.tsx
 * Global configuration for all Tooltip instances.
 * Sets shared delay and skipping delay (hovering from one tooltip to another).
 */
import React, { createContext, useContext } from 'react';

interface TooltipConfig {
  /** Delay before tooltip appears (ms) */
  delay:        number;
  /** Delay when moving between tooltips (ms) */
  skipDelay:    number;
}

const TooltipConfigContext = createContext<TooltipConfig>({
  delay:     300,
  skipDelay: 100,
});

export function TooltipProvider({
  children,
  delay     = 300,
  skipDelay = 100,
}: {
  children:   React.ReactNode;
  delay?:     number;
  skipDelay?: number;
}) {
  return (
    <TooltipConfigContext.Provider value={{ delay, skipDelay }}>
      {children}
    </TooltipConfigContext.Provider>
  );
}

export function useTooltipConfig(): TooltipConfig {
  return useContext(TooltipConfigContext);
}
