'use client';
/**
 * design-system/hooks/useThrottle.ts
 * Returns a throttled version of a value or callback.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, limit = 200): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastUpdated = useRef<number>(0);

  useEffect(() => {
    if (lastUpdated.current === 0) lastUpdated.current = Date.now();
    const now = Date.now();
    const remaining = limit - (now - lastUpdated.current);

    if (remaining <= 0) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottled(value);
      }, remaining);
      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttled;
}

export function useThrottleCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit = 200
): (...args: Parameters<T>) => void {
  const lastCalledRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const remaining = limit - (now - lastCalledRef.current);
      clearTimeout(timerRef.current);
      if (remaining <= 0) {
        lastCalledRef.current = now;
        fn(...args);
      } else {
        timerRef.current = setTimeout(() => {
          lastCalledRef.current = Date.now();
          fn(...args);
        }, remaining);
      }
    },
    [fn, limit]
  );
}
