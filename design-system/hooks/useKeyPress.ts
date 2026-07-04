'use client';
/**
 * design-system/hooks/useKeyPress.ts
 * Fires a callback when a given key (or combination) is pressed.
 * Respects meta/ctrl/shift/alt modifiers.
 */
import { useEffect, useCallback } from 'react';
import type { ShortcutDescriptor } from '../types';

export function useKeyPress(
  descriptor: ShortcutDescriptor | ShortcutDescriptor[],
  handler: (e: KeyboardEvent) => void,
  options?: { enabled?: boolean; target?: Window | Document | HTMLElement | null }
): void {
  const descStr = JSON.stringify(descriptor);
  const descriptors = Array.isArray(descriptor) ? descriptor : [descriptor];
  const { enabled = true, target } = options ?? {};

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const d of descriptors) {
        if (
          e.key === d.key &&
          !!e.metaKey  === !!d.meta  &&
          !!e.ctrlKey  === !!d.ctrl  &&
          !!e.shiftKey === !!d.shift &&
          !!e.altKey   === !!d.alt
        ) {
          handler(e);
          return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handler, descStr]
  );

  useEffect(() => {
    if (!enabled) return;
    const el = target ?? window;
    if (!el) return;
    (el as Window).addEventListener('keydown', onKeyDown as EventListener);
    return () => (el as Window).removeEventListener('keydown', onKeyDown as EventListener);
  }, [enabled, onKeyDown, target]);
}
