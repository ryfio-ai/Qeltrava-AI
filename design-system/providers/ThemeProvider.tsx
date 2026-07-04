'use client';
/**
 * design-system/providers/ThemeProvider.tsx
 * Root theme context. Manages data-theme attribute on <html>.
 * Persists to localStorage. Exposes useTheme() hook.
 */
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import type { ThemeVariant } from '../types';

export type { ThemeVariant };

const STORAGE_KEY = 'qeltrava-theme';

interface ThemeContextValue {
  theme:     ThemeVariant;
  setTheme:  (theme: ThemeVariant) => void;
  toggle:    () => void;
  isDark:    boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): ThemeVariant {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(STORAGE_KEY) as ThemeVariant | null) ?? 'system';
}

function applyTheme(theme: ThemeVariant) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

function resolveIsDark(theme: ThemeVariant): boolean {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export interface ThemeProviderProps {
  children:       React.ReactNode;
  defaultTheme?:  ThemeVariant;
  /** Persist to localStorage (default: true) */
  persist?:       boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  persist      = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeVariant>(() =>
    persist ? getInitialTheme() : defaultTheme
  );

  const setTheme = useCallback((next: ThemeVariant) => {
    if (persist) localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
    applyTheme(next);
  }, [persist]);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Apply on mount and when theme changes
  useEffect(() => { applyTheme(theme); }, [theme]);

  // Listen for system preference changes when mode === 'system'
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  const isDark = resolveIsDark(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
