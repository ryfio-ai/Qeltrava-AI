'use client';
/**
 * design-system/hooks/usePrevious.ts
 * Returns the previous value of a variable across renders.
 */
import { useState } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const [tuple, setTuple] = useState<[T | undefined, T]>([undefined, value]);
  if (tuple[1] !== value) {
    setTuple([tuple[1], value]);
  }
  return tuple[1] !== value ? tuple[1] : tuple[0];
}
