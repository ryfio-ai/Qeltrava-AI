'use client';
/**
 * design-system/motion/index.tsx
 * Qeltrava AI Design System – Motion components
 *
 * Built on framer-motion. Respects prefers-reduced-motion automatically.
 *
 * Exports: Fade | Slide | Collapse | Scale | Presence | AnimatedNumber
 */
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// ─── Shared ───────────────────────────────────────────────────────────────────

const DURATION_FAST   = 0.15;
const DURATION_BASE   = 0.25;
const DURATION_SLOW   = 0.4;
const EASE_STANDARD   = [0.4, 0, 0.2, 1] as [number, number, number, number];
const EASE_ENTRANCE   = [0, 0, 0.2, 1] as [number, number, number, number];
const EASE_EXIT       = [0.4, 0, 1, 1] as [number, number, number, number];

// ─── Fade ─────────────────────────────────────────────────────────────────────

export interface FadeProps {
  in?:         boolean;
  duration?:   number;
  delay?:      number;
  children:    React.ReactNode;
  className?:  string;
}

export function Fade({
  in: visible    = true,
  duration       = DURATION_BASE,
  delay          = 0,
  children,
  className,
}: FadeProps) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduced ? 0 : duration, delay, ease: EASE_STANDARD } }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0 : DURATION_FAST, ease: EASE_EXIT } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Slide ────────────────────────────────────────────────────────────────────

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideProps {
  in?:         boolean;
  direction?:  SlideDirection;
  distance?:   number;
  duration?:   number;
  delay?:      number;
  children:    React.ReactNode;
  className?:  string;
}

const slideOffset: Record<SlideDirection, { x?: number; y?: number }> = {
  up:    { y:  16 },
  down:  { y: -16 },
  left:  { x:  16 },
  right: { x: -16 },
};

export function Slide({
  in: visible = true,
  direction   = 'up',
  distance,
  duration    = DURATION_BASE,
  delay       = 0,
  children,
  className,
}: SlideProps) {
  const reduced = useReducedMotion();
  const offset  = { ...slideOffset[direction] };
  if (distance !== undefined) {
    if ('y' in offset) offset.y = direction === 'up' ? distance : -distance;
    if ('x' in offset) offset.x = direction === 'left' ? distance : -distance;
  }
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, ...offset }}
          animate={{ opacity: 1, x: 0, y: 0, transition: { duration: reduced ? 0 : duration, delay, ease: EASE_ENTRANCE } }}
          exit={{ opacity: 0, ...offset, transition: { duration: reduced ? 0 : DURATION_FAST, ease: EASE_EXIT } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Collapse ─────────────────────────────────────────────────────────────────

export interface CollapseProps {
  in?:         boolean;
  duration?:   number;
  children:    React.ReactNode;
  className?:  string;
}

export function Collapse({
  in: open    = true,
  duration    = DURATION_BASE,
  children,
  className,
}: CollapseProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        height:   open ? 'auto' : 0,
        opacity:  open ? 1 : 0,
        overflow: 'hidden',
        transition: { duration: reduced ? 0 : duration, ease: EASE_STANDARD },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scale ────────────────────────────────────────────────────────────────────

export interface ScaleProps {
  in?:         boolean;
  from?:       number;
  duration?:   number;
  delay?:      number;
  children:    React.ReactNode;
  className?:  string;
}

export function Scale({
  in: visible = true,
  from        = 0.95,
  duration    = DURATION_FAST,
  delay       = 0,
  children,
  className,
}: ScaleProps) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, scale: from }}
          animate={{ opacity: 1, scale: 1, transition: { duration: reduced ? 0 : duration, delay, ease: EASE_ENTRANCE } }}
          exit={{ opacity: 0, scale: from, transition: { duration: reduced ? 0 : DURATION_FAST, ease: EASE_EXIT } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Presence ─────────────────────────────────────────────────────────────────

/**
 * Wraps AnimatePresence with a consistent key-driven unmount strategy.
 * Use when you need to animate between two different children.
 */
export interface PresenceProps {
  children:   React.ReactNode;
  mode?:      'sync' | 'wait' | 'popLayout';
}

export function Presence({ children, mode = 'wait' }: PresenceProps) {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────

export interface AnimatedNumberProps {
  value:       number;
  duration?:   number;
  format?:     (n: number) => string;
  className?:  string;
}

export function AnimatedNumber({
  value,
  duration    = DURATION_SLOW,
  format      = (n) => n.toLocaleString(),
  className,
}: AnimatedNumberProps) {
  const reduced   = useReducedMotion();
  const prevValue = useRef(value);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (reduced) { setDisplayed(value); return; }
    const start     = prevValue.current;
    const end       = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const raf = (time: number) => {
      const progress = Math.min((time - startTime) / durationMs, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(raf);
      else prevValue.current = end;
    };

    requestAnimationFrame(raf);
  }, [value, duration, reduced]);

  return <span className={className}>{format(displayed)}</span>;
}
