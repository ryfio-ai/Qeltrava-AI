/**
 * design-system/components/Overlays.tsx
 * Qeltrava AI Design System – Overlay components
 *
 * Exports: Dialog | Drawer | Popover | Tooltip | Dropdown
 * All overlays: focus trap, Escape key, aria-modal, backdrop
 */
'use client';
import React, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createContext,
  useEffect, useRef, useState, useId
} from 'react';
import { X } from 'lucide-react';
import { cn, focusRing } from '../utils';

// ─── Focus trap utility ───────────────────────────────────────────────────────

function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };

    el.addEventListener('keydown', onKeyDown);
    first?.focus();
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [active, ref]);
}

function useEscape(handler: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handler(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, handler]);
}

// ─────────────────────────────────────────────────────────────────────────────
// DIALOG
// ─────────────────────────────────────────────────────────────────────────────

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps {
  open:       boolean;
  onClose:    () => void;
  title?:     string;
  size?:      DialogSize;
  children?:  React.ReactNode;
  footer?:    React.ReactNode;
  className?: string;
}

const dialogSizeMap: Record<DialogSize, string> = {
  sm:   'max-w-[400px]',
  md:   'max-w-[560px]',
  lg:   'max-w-[720px]',
  xl:   'max-w-[960px]',
  full: 'max-w-full mx-[var(--space-4)]',
};

export function Dialog({ open, onClose, title, size = 'md', children, footer, className }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);
  useEscape(onClose, open);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-[var(--space-4)]"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'dialog-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--modal-backdrop)] backdrop-blur-[var(--blur-sm)]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative w-full flex flex-col',
          'bg-[var(--color-bg-elevated)] rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)]',
          'border border-[var(--color-border)]',
          dialogSizeMap[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-[var(--space-6)] py-[var(--space-4)] border-b border-[var(--color-border)]">
            <h2 id="dialog-title" className="text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-heading)]">
              {title}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close" className={cn('p-[var(--space-1-5)] rounded-[var(--radius-md)] hover:bg-[var(--state-hover-overlay)] transition-colors cursor-pointer', focusRing)}>
              <X size={18} aria-hidden />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[var(--space-6)] py-[var(--space-5)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-[var(--space-6)] py-[var(--space-4)] border-t border-[var(--color-border)] flex items-center justify-end gap-[var(--space-3)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAWER
// ─────────────────────────────────────────────────────────────────────────────

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open:       boolean;
  onClose:    () => void;
  side?:      DrawerSide;
  title?:     string;
  width?:     string;
  children?:  React.ReactNode;
  footer?:    React.ReactNode;
  className?: string;
}

const sideClasses: Record<DrawerSide, { panel: string; translate: string; origin: string }> = {
  right:  { panel: 'right-0 top-0 h-full',   translate: 'translate-x-full',   origin: 'right' },
  left:   { panel: 'left-0  top-0 h-full',   translate: '-translate-x-full',  origin: 'left'  },
  top:    { panel: 'top-0 left-0 right-0 w-full', translate: '-translate-y-full', origin: 'top' },
  bottom: { panel: 'bottom-0 left-0 right-0 w-full', translate: 'translate-y-full', origin: 'bottom' },
};

export function Drawer({ open, onClose, side = 'right', title, width = 'var(--sidebar-width)', children, footer, className }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);
  useEscape(onClose, open);

  const { panel: panelPos, translate } = sideClasses[side];

  return (
    <div className={cn('fixed inset-0 z-[var(--z-modal)]', !open && 'pointer-events-none')}>
      {/* Backdrop */}
      <div
        className={cn('absolute inset-0 bg-[var(--drawer-overlay)] transition-opacity duration-[var(--duration-250)]', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'absolute flex flex-col',
          'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-modal)]',
          'border-[var(--color-border)]',
          panelPos,
          'transition-transform duration-[var(--duration-350)] ease-[var(--easing-standard)]',
          open ? 'translate-x-0 translate-y-0' : translate,
          (side === 'left' || side === 'right') && `border-${side === 'right' ? 'l' : 'r'}`,
          (side === 'top' || side === 'bottom') && `border-${side === 'bottom' ? 't' : 'b'}`,
          className
        )}
        style={{ width: side === 'left' || side === 'right' ? width : undefined }}
      >
        {title && (
          <div className="flex items-center justify-between px-[var(--space-6)] py-[var(--space-4)] border-b border-[var(--color-border)] shrink-0">
            <h2 id="drawer-title" className="text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-heading)]">
              {title}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close" className={cn('p-[var(--space-1-5)] rounded-[var(--radius-md)] hover:bg-[var(--state-hover-overlay)] cursor-pointer', focusRing)}>
              <X size={18} aria-hidden />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-[var(--space-6)] py-[var(--space-5)]">{children}</div>
        {footer && (
          <div className="px-[var(--space-6)] py-[var(--space-4)] border-t border-[var(--color-border)] shrink-0 flex items-center justify-end gap-[var(--space-3)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLTIP
// ─────────────────────────────────────────────────────────────────────────────

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content:    React.ReactNode;
  side?:      TooltipSide;
  children:   React.ReactElement;
  delay?:     number;
  className?: string;
}

export function Tooltip({ content, side = 'top', children, delay = 300, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { timerRef.current = setTimeout(() => setVisible(true),  delay); };
  const hide = () => { clearTimeout(timerRef.current); setVisible(false); };

  const sidePositions: Record<TooltipSide, string> = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-[var(--space-1-5)]',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-[var(--space-1-5)]',
    left:   'right-full top-1/2 -translate-y-1/2 mr-[var(--space-1-5)]',
    right:  'left-full top-1/2 -translate-y-1/2 ml-[var(--space-1-5)]',
  };

  const id = `tooltip-${useId()}`;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, { 'aria-describedby': visible ? id : undefined } as object)}
      {visible && content && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'absolute z-[var(--z-tooltip)] pointer-events-none whitespace-nowrap',
            'bg-[var(--tooltip-bg)] text-[var(--tooltip-color)]',
            'text-[var(--font-size-xs)] font-[var(--font-weight-medium)]',
            'px-[var(--space-2-5)] py-[var(--space-1-5)] rounded-[var(--radius-tooltip)]',
            'shadow-[var(--shadow-md)]',
            sidePositions[side],
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DROPDOWN MENU
// ─────────────────────────────────────────────────────────────────────────────

export interface DropdownItem {
  label:      string;
  icon?:      React.ReactNode;
  onClick?:   () => void;
  href?:      string;
  disabled?:  boolean;
  danger?:    boolean;
  divider?:   never;
}
export interface DropdownDivider { divider: true; }
export type DropdownMenuItem = DropdownItem | DropdownDivider;

export interface DropdownProps {
  trigger:    React.ReactElement;
  items:      DropdownMenuItem[];
  align?:     'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [open, setOpen]      = useState(false);
  const containerRef         = useRef<HTMLDivElement>(null);

  useEscape(() => setOpen(false), open);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      {React.cloneElement(trigger, {
        onClick: () => setOpen((v) => !v),
        'aria-haspopup': 'menu',
        'aria-expanded': open,
      } as object)}

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute top-full mt-[var(--space-1-5)] z-[var(--z-dropdown)]',
            'min-w-[160px] py-[var(--space-1)]',
            'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]',
            'rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)]',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, i) => {
            if ('divider' in item) {
              return <div key={i} className="my-[var(--space-1)] h-[var(--border-1)] bg-[var(--color-border)]" role="separator" />;
            }
            const { label, icon, onClick, href, disabled, danger } = item;
            const itemClass = cn(
              'flex items-center gap-[var(--space-2)] w-full px-[var(--space-3)] py-[var(--space-2)]',
              'text-[var(--font-size-sm)] text-left',
              'transition-colors cursor-pointer',
              danger
                ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--state-hover-overlay)]',
              disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed pointer-events-none'
            );
            if (href && !disabled) {
              return <a key={i} href={href} role="menuitem" className={itemClass}>{icon}<span>{label}</span></a>;
            }
            return (
              <button key={i} type="button" role="menuitem" disabled={disabled} onClick={() => { onClick?.(); setOpen(false); }} className={itemClass}>
                {icon}<span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POPOVER
// ─────────────────────────────────────────────────────────────────────────────

export interface PopoverProps {
  trigger:    React.ReactElement;
  content:    React.ReactNode;
  align?:     'left' | 'right' | 'center';
  side?:      'top' | 'bottom';
  className?: string;
}

export function Popover({ trigger, content, align = 'left', side = 'bottom', className }: PopoverProps) {
  const [open, setOpen]  = useState(false);
  const containerRef     = useRef<HTMLDivElement>(null);
  const panelRef         = useRef<HTMLDivElement>(null);

  useEscape(() => setOpen(false), open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const alignClass = { left: 'left-0', right: 'right-0', center: 'left-1/2 -translate-x-1/2' }[align];
  const sideClass  = side === 'top' ? 'bottom-full mb-[var(--space-1-5)]' : 'top-full mt-[var(--space-1-5)]';

  return (
    <div ref={containerRef} className="relative inline-flex">
      {React.cloneElement(trigger, {
        onClick:       () => setOpen((v) => !v),
        'aria-expanded': open,
        'aria-haspopup': 'dialog',
      } as object)}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          className={cn(
            'absolute z-[var(--z-dropdown)]',
            'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]',
            'rounded-[var(--radius-xl)] shadow-[var(--shadow-modal)] p-[var(--space-4)]',
            'min-w-[240px]',
            alignClass,
            sideClass,
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
