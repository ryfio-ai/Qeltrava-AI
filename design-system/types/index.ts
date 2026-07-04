/**
 * design-system/types/index.ts
 * Shared TypeScript types for the Qeltrava AI Design System.
 * Import from here instead of duplicating across components.
 */

// ─── Generic sizes ────────────────────────────────────────────────────────────

export type Size       = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ExtSize    = Size | '2xl' | '3xl';

// ─── Generic variants ─────────────────────────────────────────────────────────

export type StatusVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4;

export type ThemeVariant = 'light' | 'dark' | 'system' | 'high-contrast';

// ─── Orientation / direction ──────────────────────────────────────────────────

export type Orientation = 'horizontal' | 'vertical';
export type Side        = 'top' | 'right' | 'bottom' | 'left';
export type Align       = 'start' | 'center' | 'end';

// ─── Polymorphic "as" prop helper ─────────────────────────────────────────────

export type AsChild = { asChild?: boolean };

export type PolymorphicProps<
  E extends React.ElementType = React.ElementType,
  P = object,
> = P & Omit<React.ComponentPropsWithRef<E>, keyof P> & { as?: E };

// Re-export React so consumers don't need a separate import
import type React from 'react';

// ─── Slot props ───────────────────────────────────────────────────────────────

export interface SlotProps {
  className?: string;
  children?:  React.ReactNode;
}

// ─── Common component interface ───────────────────────────────────────────────

export interface BaseComponentProps {
  className?:      string;
  'data-testid'?:  string;
}

// ─── Keyboard shortcut descriptor ────────────────────────────────────────────

export interface ShortcutDescriptor {
  key:      string;
  meta?:    boolean;
  ctrl?:    boolean;
  shift?:   boolean;
  alt?:     boolean;
}
