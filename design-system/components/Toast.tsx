/**
 * design-system/components/Toast.tsx
 * Qeltrava AI Design System – Toast + ToastProvider
 *
 * Context-based toast system.  Imperative API via useToast() hook.
 * Position:  top-right | top-center | bottom-right | bottom-center
 * Variants:  info | success | warning | danger | neutral
 * Auto-dismiss with configurable duration.
 */
'use client';
import React, { createContext, useCallback, useContext, useState, useRef } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '../utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant   = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type ToastPosition  = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export interface ToastItem {
  id:         string;
  variant?:   ToastVariant;
  title?:     string;
  message:    string;
  duration?:  number;   /* ms; 0 = persist */
  action?:    { label: string; onClick: () => void };
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ToastContextValue {
  add:    (toast: Omit<ToastItem, 'id'>) => string;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children:   React.ReactNode;
  position?:  ToastPosition;
  maxToasts?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right':    'top-[var(--space-6)] right-[var(--space-6)] items-end',
  'top-center':   'top-[var(--space-6)] left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-[var(--space-6)] right-[var(--space-6)] items-end',
  'bottom-center':'bottom-[var(--space-6)] left-1/2 -translate-x-1/2 items-center',
};

export function ToastProvider({ children, position = 'top-right', maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${++counterRef.current}`;
    setToasts((prev) => {
      const next = [{ ...toast, id }, ...prev];
      return next.slice(0, maxToasts);
    });
    const duration = toast.duration ?? 4000;
    if (duration > 0) setTimeout(() => remove(id), duration);
    return id;
  }, [maxToasts, remove]);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className={cn(
          'fixed z-[var(--z-toast)] flex flex-col gap-[var(--space-3)] pointer-events-none',
          'max-w-[360px] w-full',
          positionClasses[position]
        )}
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

// ─── ToastCard ───────────────────────────────────────────────────────────────

const iconMap: Record<ToastVariant, React.ComponentType<{ size?: number }>> = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger:  XCircle,
  neutral: Info,
};

const variantMap: Record<ToastVariant, { border: string; icon: string }> = {
  info:    { border: 'border-[var(--color-info)]/30',    icon: 'text-[var(--color-info)]' },
  success: { border: 'border-[var(--color-success)]/30', icon: 'text-[var(--color-success)]' },
  warning: { border: 'border-[var(--color-warning)]/40', icon: 'text-[var(--color-warning)]' },
  danger:  { border: 'border-[var(--color-danger)]/30',  icon: 'text-[var(--color-danger)]' },
  neutral: { border: 'border-[var(--color-border)]',     icon: 'text-[var(--color-text-secondary)]' },
};

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const variant = toast.variant ?? 'neutral';
  const IconComponent = iconMap[variant];
  const { border, icon: iconClass } = variantMap[variant];

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto w-full flex items-start gap-[var(--space-3)]',
        'p-[var(--space-4)] rounded-[var(--radius-lg)]',
        'bg-[var(--color-bg-elevated)] border shadow-[var(--shadow-toast)]',
        border
      )}
    >
      <span className={cn('mt-[1px] shrink-0', iconClass)} aria-hidden>
        <IconComponent size={16} />
      </span>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] mb-[var(--space-0-5)]">
            {toast.title}
          </p>
        )}
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">
          {toast.message}
        </p>
        {toast.action && (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="mt-[var(--space-2)] text-[var(--font-size-xs)] font-[var(--font-weight-semibold)] text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 p-[var(--space-1)] rounded-[var(--radius-sm)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <X size={12} aria-hidden />
      </button>
    </div>
  );
}
