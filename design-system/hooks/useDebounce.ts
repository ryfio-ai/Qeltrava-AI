'use client';
/**
 * design-system/hooks/useDebounce.ts
 * Returns a debounced version of the value, updating only after `delay` ms of no changes.
 */
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/**
 * useDebounceCallback — returns a debounced version of a callback function.
 */
import { useCallback, useRef } from 'react';

export function useDebounceCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );
}
