'use client';
/**
 * design-system/hooks/useDarkMode.ts
 * Reads and sets the current theme, synced with [data-theme] on <html>.
 * Persists to localStorage.
 */
import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'high-contrast';

const STORAGE_KEY = 'qeltrava-theme';

function applyTheme(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', mode);
}

export function useDarkMode() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? 'system';
  });

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, next);
    setModeState(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const isDark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return { mode, setMode, toggle, isDark };
}
