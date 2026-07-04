'use client';
/**
 * design-system/components/CommandMenu.tsx
 * Qeltrava AI Design System – CommandMenu
 *
 * Keyboard-driven command palette (modal triggered by Meta+K or Ctrl+K).
 * Performs matching searches, groups navigation categories, and provides full keyboard navigation.
 */
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useKeyPress } from '../hooks/useKeyPress';
import { useClickOutside } from '../hooks/useClickOutside';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { BaseComponentProps } from '../types';

export interface CommandItem {
  id:          string;
  label:       string;
  icon?:       React.ReactNode;
  shortcut?:   string;
  onSelect:    () => void;
}

export interface CommandGroup {
  heading:     string;
  items:       CommandItem[];
}

export interface CommandMenuProps extends BaseComponentProps {
  /** Groups of command actions */
  groups:      CommandGroup[];
  /** Open/close controlled state. Default is false */
  open?:        boolean;
  /** Triggered when the menu opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Keyboard shortcut key. Default is 'k' (combines with Command/Control) */
  triggerKey?: string;
  /** Placeholder text in the search input */
  placeholder?: string;
}

export function CommandMenu({
  groups,
  open: controlledOpen,
  onOpenChange,
  triggerKey = 'k',
  placeholder = 'Type a command or search...',
  className,
  'data-testid': testId,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setIsOpen = (next: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    if (onOpenChange) {
      onOpenChange(next);
    }
  };

  // Keyboard shortcut listener to open command menu (Meta+K or Ctrl+K)
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === triggerKey.toLowerCase() && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, triggerKey]);

  // Trap focus inside modal when open
  useFocusTrap(modalRef as React.RefObject<HTMLDivElement | null>, isOpen);

  // Close on Escape or click outside
  useClickOutside(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch('');
      setActiveIndex(0);
      // Timeout to ensure modal has rendered and focus trap is active
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Flatten items that match search to facilitate keyboard indices
  const filteredGroups = groups
    .map((group) => {
      const items = group.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      return { ...group, items };
    })
    .filter((group) => group.items.length > 0);

  const flattenedItems = filteredGroups.flatMap((g) => g.items);

  // Reset active index when search changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < flattenedItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flattenedItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const activeItem = flattenedItems[activeIndex];
      if (activeItem) {
        activeItem.onSelect();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  let currentFlatIdx = 0;

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-[10vh] p-[var(--space-4)]"
      role="dialog"
      aria-modal="true"
      data-testid={testId}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-[var(--blur-sm)]"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div
        ref={modalRef}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full max-w-[560px] flex flex-col bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-modal)] overflow-hidden',
          className
        )}
      >
        {/* Search Input Area */}
        <div className="flex items-center gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)] border-b border-[var(--color-border)]">
          <span className="text-[var(--color-text-tertiary)]">
            <Icon name="Search" size={18} />
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-0 p-0 text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] outline-none focus:ring-0 text-[var(--font-size-md)]"
          />
          <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[10px] text-[var(--color-text-tertiary)] uppercase font-mono">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto py-[var(--space-2)]">
          {flattenedItems.length === 0 ? (
            <div className="text-center py-8 text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]">
              No results found for &ldquo;{search}&rdquo;
            </div>
          ) : (
            filteredGroups.map((group, groupIdx) => (
              <div key={groupIdx} role="group" aria-labelledby={`cm-group-${groupIdx}`}>
                <div
                  id={`cm-group-${groupIdx}`}
                  className="px-[var(--space-4)] py-[var(--space-1-5)] text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider select-none"
                >
                  {group.heading}
                </div>
                <div>
                  {group.items.map((item) => {
                    const isSelected = currentFlatIdx === activeIndex;
                    const thisIdx = currentFlatIdx;
                    currentFlatIdx++;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          item.onSelect();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setActiveIndex(thisIdx)}
                        className={cn(
                          'w-full flex items-center justify-between px-[var(--space-4)] py-[var(--space-2)] text-[var(--font-size-sm)] text-left transition-colors outline-none',
                          isSelected
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'text-[var(--color-text-primary)] hover:bg-[var(--state-hover-overlay)]'
                        )}
                      >
                        <div className="flex items-center gap-[var(--space-3)] truncate">
                          {item.icon && (
                            <span className={cn('shrink-0', isSelected ? 'text-white' : 'text-[var(--color-text-secondary)]')}>
                              {item.icon}
                            </span>
                          )}
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.shortcut && (
                          <kbd className={cn('font-mono text-[10px] uppercase px-1 py-0.5 rounded', isSelected ? 'bg-white/20 text-white border-white/20' : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]')}>
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default CommandMenu;
