'use client';
/**
 * design-system/hooks/useFocusTrap.ts
 * Trap keyboard focus within a container element.
 * Exported as a hook for composing into any component.
 */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  options?: {
    /** Element to return focus to when trap deactivates */
    returnFocusRef?: RefObject<HTMLElement | null>;
    /** Auto-focus first element when trap activates */
    autoFocus?: boolean;
  }
): void {
  const { returnFocusRef, autoFocus = true } = options ?? {};

  useEffect(() => {
    const returnNode = returnFocusRef?.current;
    if (!active || !ref.current) return;

    const container = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.closest('[aria-hidden="true"]')
      );

    if (autoFocus) {
      const focusable = getFocusable();
      (focusable[0] ?? container).focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) { e.preventDefault(); return; }
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      const node = returnNode ?? previouslyFocused;
      if (node && typeof node.focus === 'function') {
        node.focus();
      }
    };
  }, [active, autoFocus, ref, returnFocusRef]);
}
