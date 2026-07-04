'use client';
/**
 * design-system/components/ContextMenu.tsx
 * Qeltrava AI Design System – ContextMenu
 *
 * Right-click triggered context menu positioning itself based on mouse coordinates.
 * Shares the item model of the Dropdown component.
 */
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';
import type { DropdownMenuItem } from './Overlays';

export interface ContextMenuProps extends BaseComponentProps {
  /** Menu items list using DropdownMenuItem interface */
  items:        DropdownMenuItem[];
  /** React element area to trigger context menu right-click */
  children:     React.ReactNode;
}

export function ContextMenu({
  items,
  children,
  className,
  'data-testid': testId,
}: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // Adjust position if menu overflows screen limits
  useEffect(() => {
    if (open && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const nextPos = { ...position };

      if (position.x + rect.width > window.innerWidth) {
        nextPos.x = window.innerWidth - rect.width - 8;
      }
      if (position.y + rect.height > window.innerHeight) {
        nextPos.y = window.innerHeight - rect.height - 8;
      }

      if (nextPos.x !== position.x || nextPos.y !== position.y) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPosition(nextPos);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className={className}
        data-testid={testId}
      >
        {children}
      </div>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'fixed z-[var(--z-dropdown)] py-[var(--space-1)] min-w-[180px]',
            'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]',
            'rounded-[var(--radius-lg)] shadow-[var(--shadow-dropdown)] outline-none'
          )}
          style={{
            top: position.y,
            left: position.x,
          }}
          data-testid={testId ? `${testId}-menu` : undefined}
        >
          {items.map((item, i) => {
            if ('divider' in item) {
              return (
                <div
                  key={i}
                  className="my-[var(--space-1)] h-[var(--border-1)] bg-[var(--color-border)]"
                  role="separator"
                />
              );
            }

            const { label, icon, onClick, href, disabled, danger } = item;
            const itemClass = cn(
              'flex items-center gap-[var(--space-2)] w-full px-[var(--space-3)] py-[var(--space-2)]',
              'text-[var(--font-size-sm)] text-left transition-colors cursor-pointer select-none',
              danger
                ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--state-hover-overlay)]',
              disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed pointer-events-none'
            );

            if (href && !disabled) {
              return (
                <a
                  key={i}
                  href={href}
                  role="menuitem"
                  className={itemClass}
                  onClick={handleClose}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              );
            }

            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={disabled}
                onClick={() => {
                  onClick?.();
                  handleClose();
                }}
                className={itemClass}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
export default ContextMenu;
