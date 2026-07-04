'use client';
/**
 * design-system/hooks/useId.ts
 * SSR-safe unique ID generation.
 * Falls back to React.useId() when available (React 18+).
 */
import { useId as useReactId } from 'react';

export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id.replace(/:/g, '')}` : id.replace(/:/g, '');
}
