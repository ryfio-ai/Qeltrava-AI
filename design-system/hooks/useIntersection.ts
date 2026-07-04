'use client';
/**
 * design-system/hooks/useIntersection.ts
 * Observe when an element enters/exits the viewport using IntersectionObserver.
 */
import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionOptions extends IntersectionObserverInit {
  /** Fire only once when element first enters the viewport */
  once?: boolean;
}

export function useIntersection<T extends HTMLElement>(
  options: UseIntersectionOptions = {}
): { ref: React.RefObject<T | null>; inView: boolean; entry: IntersectionObserverEntry | null } {
  const { once = false, ...observerOptions } = options;
  const ref     = useRef<T>(null);
  const [inView, setInView]   = useState(false);
  const [entry,  setEntry]    = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    observerRef.current = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      setEntry(e);
      if (e.isIntersecting && once) observerRef.current?.disconnect();
    }, observerOptions);

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, observerOptions.threshold, observerOptions.root, observerOptions.rootMargin]);

  return { ref, inView, entry };
}

// Re-export React for type inference
import type React from 'react';
