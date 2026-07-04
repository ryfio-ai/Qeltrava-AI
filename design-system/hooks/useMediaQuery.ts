'use client';
/**
 * design-system/hooks/useMediaQuery.ts
 * SSR-safe media query hook.
 * Returns true when the query matches, false otherwise.
 * Defaults to false on the server (avoids hydration mismatch).
 */
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
