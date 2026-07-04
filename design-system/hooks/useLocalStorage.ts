'use client';
/**
 * design-system/hooks/useLocalStorage.ts
 * Synced localStorage state hook with SSR safety and cross-tab synchronization.
 */
import { useCallback, useEffect, useState } from 'react';

type Setter<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: Setter<T>) => void, () => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: Setter<T>) => {
      try {
        const next = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        setStoredValue(next);
        window.dispatchEvent(new Event('local-storage'));
      } catch {
        // ignore write errors
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // ignore
    }
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    const handler = () => setStoredValue(readValue());
    window.addEventListener('storage', handler);
    window.addEventListener('local-storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('local-storage', handler);
    };
  }, [readValue]);

  return [storedValue, setValue, removeValue];
}
