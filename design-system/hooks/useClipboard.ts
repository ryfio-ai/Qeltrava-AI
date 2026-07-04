'use client';
/**
 * design-system/hooks/useClipboard.ts
 * Copy text to clipboard with success/error state and auto-reset.
 */
import { useCallback, useRef, useState } from 'react';

export interface UseClipboardReturn {
  copy:       (text: string) => Promise<void>;
  copied:     boolean;
  error:      Error | null;
  reset:      () => void;
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error,  setError]  = useState<Error | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  const copy = useCallback(async (text: string) => {
    clearTimeout(timerRef.current);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity  = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setError(null);
      timerRef.current = setTimeout(reset, resetDelay);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Copy failed'));
      setCopied(false);
    }
  }, [reset, resetDelay]);

  return { copy, copied, error, reset };
}
