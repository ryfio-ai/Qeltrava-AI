/**
 * design-system/accessibility/index.tsx
 * Qeltrava AI Design System – Accessibility utilities
 *
 * Exports:
 *   VisuallyHidden | SkipLink | Portal | LiveRegion |
 *   FocusScope | KeyboardShortcut | Announce
 */
'use client';
import React, {
  createContext, useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';

// ─── VisuallyHidden ───────────────────────────────────────────────────────────

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Use instead of `display:none` or `visibility:hidden` for SR-only content.
 */
export function VisuallyHidden({
  children,
  as: Tag = 'span',
}: {
  children:   React.ReactNode;
  as?:        React.ElementType;
}) {
  return (
    <Tag
      style={{
        position:   'absolute',
        width:       '1px',
        height:      '1px',
        padding:     '0',
        margin:      '-1px',
        overflow:    'hidden',
        clip:        'rect(0,0,0,0)',
        whiteSpace:  'nowrap',
        border:      '0',
      }}
    >
      {children}
    </Tag>
  );
}

// ─── SkipLink ─────────────────────────────────────────────────────────────────

/**
 * Renders a visually hidden "Skip to main content" link that becomes
 * visible on focus, positioned at the top of the page.
 */
export function SkipLink({
  href       = '#main-content',
  label      = 'Skip to main content',
}: {
  href?:  string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className={[
        'absolute left-[var(--space-4)] top-[var(--space-4)]',
        'z-[var(--z-skiplink,9999)]',
        'px-[var(--space-4)] py-[var(--space-2)]',
        'bg-[var(--color-accent)] text-white rounded-[var(--radius-md)]',
        'text-[var(--font-size-sm)] font-[var(--font-weight-semibold)]',
        'transition-transform -translate-y-[200%] focus:translate-y-0',
        'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]',
      ].join(' ')}
    >
      {label}
    </a>
  );
}

// ─── Portal ───────────────────────────────────────────────────────────────────

/**
 * Renders children into a DOM node outside the current React tree.
 * Falls back gracefully during SSR (renders nothing until mounted).
 */
export function Portal({
  children,
  target,
}: {
  children: React.ReactNode;
  target?:  Element | null;
}) {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(children, target ?? document.body);
}

// ─── LiveRegion ───────────────────────────────────────────────────────────────

/**
 * An ARIA live region that announces messages to screen readers.
 * Mount once in your app root.  Use the `useLiveRegion` hook to push messages.
 */
interface LiveRegionContextValue {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const LiveRegionContext = createContext<LiveRegionContextValue | null>(null);

export function LiveRegionProvider({ children }: { children: React.ReactNode }) {
  const [politeMsg,    setPoliteMsg]    = useState('');
  const [assertiveMsg, setAssertiveMsg] = useState('');

  const announce = useCallback(
    (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      // Briefly clear then set to ensure re-announcement of identical messages
      if (politeness === 'assertive') {
        setAssertiveMsg('');
        setTimeout(() => setAssertiveMsg(message), 50);
      } else {
        setPoliteMsg('');
        setTimeout(() => setPoliteMsg(message), 50);
      }
    },
    []
  );

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        {politeMsg}
      </div>
      <div
        aria-live="assertive"
        aria-atomic="true"
        role="alert"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        {assertiveMsg}
      </div>
    </LiveRegionContext.Provider>
  );
}

export function useLiveRegion(): LiveRegionContextValue {
  const ctx = useContext(LiveRegionContext);
  if (!ctx) throw new Error('useLiveRegion must be used inside <LiveRegionProvider>');
  return ctx;
}

/** Inline announce shortcut component */
export function Announce({ message, politeness = 'polite' }: { message: string; politeness?: 'polite' | 'assertive' }) {
  return (
    <span
      aria-live={politeness}
      aria-atomic="true"
      style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
    >
      {message}
    </span>
  );
}

// ─── FocusScope ───────────────────────────────────────────────────────────────

/**
 * Traps focus within its children when `trapped` is true.
 * Restores focus to the triggering element on deactivation.
 */
export function FocusScope({
  children,
  trapped = true,
  className,
}: {
  children:   React.ReactNode;
  trapped?:   boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, trapped);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── KeyboardShortcut ─────────────────────────────────────────────────────────

/**
 * Renders a keyboard shortcut badge (e.g. ⌘K, Ctrl+K).
 * Purely visual — use with useKeyPress for actual functionality.
 */
export function KeyboardShortcut({
  shortcut,
  className,
}: {
  shortcut:   string;
  className?: string;
}) {
  return (
    <kbd
      className={[
        'inline-flex items-center gap-[var(--space-0-5)]',
        'px-[var(--space-1-5)] py-[var(--space-0-5)]',
        'bg-[var(--color-bg-subtle)] border border-[var(--color-border)]',
        'rounded-[var(--radius-sm)] text-[var(--font-size-xs)]',
        'font-[var(--font-family-mono)] text-[var(--color-text-secondary)]',
        'shadow-[0_1px_0_var(--color-border)]',
        className ?? '',
      ].join(' ')}
    >
      {shortcut}
    </kbd>
  );
}
