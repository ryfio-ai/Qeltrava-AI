/**
 * design-system/components/DataDisplay.tsx
 * Qeltrava AI Design System – Data display components
 *
 * Exports: Table | Timeline | Accordion | Tabs
 */
'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, focusRing } from '../utils';

// ─────────────────────────────────────────────────────────────────────────────
// TABLE
// ─────────────────────────────────────────────────────────────────────────────

export interface TableColumn<T = Record<string, unknown>> {
  key:        string;
  header:     string;
  render?:    (value: unknown, row: T) => React.ReactNode;
  align?:     'left' | 'center' | 'right';
  width?:     string;
  sortable?:  boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  columns:        TableColumn<T>[];
  data:           T[];
  keyExtractor?:  (row: T, i: number) => string;
  striped?:       boolean;
  hoverable?:     boolean;
  compact?:       boolean;
  caption?:       string;
  emptyMessage?:  string;
  className?:     string;
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  striped      = false,
  hoverable    = true,
  compact      = false,
  caption,
  emptyMessage = 'No data',
  className,
}: TableProps<T>) {
  const [sortKey,  setSortKey]  = useState<string | null>(null);
  const [sortDir,  setSortDir]  = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const cellPadding = compact
    ? 'px-[var(--space-3)] py-[var(--space-2)]'
    : 'px-[var(--space-4)] py-[var(--space-3)]';

  const alignMap = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <div className={cn('w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]', className)}>
      <table className="w-full border-collapse text-[var(--font-size-sm)]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-[var(--color-bg-subtle)]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(cellPadding, 'font-[var(--font-weight-semibold)] text-[var(--color-text-primary)] border-b border-[var(--color-border)]', alignMap[col.align ?? 'left'], col.sortable && 'cursor-pointer hover:bg-[var(--state-hover-overlay)] select-none')}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                aria-sort={col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className="inline-flex items-center gap-[var(--space-1)]">
                  {col.header}
                  {col.sortable && (
                    <ChevronDown
                      size={12}
                      aria-hidden
                      className={cn('transition-transform', sortKey === col.key && sortDir === 'asc' && 'rotate-180')}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={cn(cellPadding, 'text-center text-[var(--color-text-secondary)]')}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const key = keyExtractor ? keyExtractor(row, i) : String(i);
              return (
                <tr
                  key={key}
                  className={cn(
                    striped && i % 2 === 0 ? 'bg-[var(--color-bg-subtle)]' : 'bg-[var(--color-bg-elevated)]',
                    hoverable && 'hover:bg-[var(--state-hover-overlay)] transition-colors'
                  )}
                >
                  {columns.map((col) => {
                    const rawValue = (row as Record<string, unknown>)[col.key];
                    return (
                      <td key={col.key} className={cn(cellPadding, 'text-[var(--color-text-primary)] border-b border-[var(--color-border)]', alignMap[col.align ?? 'left'])}>
                        {col.render ? col.render(rawValue, row) : String(rawValue ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  label:       string;
  description?: string;
  date?:        string;
  icon?:        React.ReactNode;
  variant?:     'default' | 'success' | 'warning' | 'danger';
}

export interface TimelineProps {
  events:     TimelineEvent[];
  className?: string;
}

const timelineDotVariant: Record<string, string> = {
  default: 'bg-[var(--color-accent)] border-[var(--color-accent)]',
  success: 'bg-[var(--color-success)] border-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)] border-[var(--color-warning)]',
  danger:  'bg-[var(--color-danger)] border-[var(--color-danger)]',
};

export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={cn('relative', className)} aria-label="Timeline">
      <div className="absolute left-[11px] top-0 bottom-0 w-[var(--border-1)] bg-[var(--color-border)]" aria-hidden />
      {events.map((ev, i) => (
        <li key={i} className="relative flex gap-[var(--space-4)] pb-[var(--space-6)] last:pb-0">
          <span className={cn(
            'w-[22px] h-[22px] rounded-full border-2 shrink-0 flex items-center justify-center z-10 mt-[1px]',
            'bg-[var(--color-bg-elevated)]',
            timelineDotVariant[ev.variant ?? 'default']
          )} aria-hidden>
            {ev.icon ? <span className="text-white" style={{ fontSize: 10 }}>{ev.icon}</span>
              : <span className="w-[6px] h-[6px] rounded-full bg-white" />}
          </span>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-[var(--space-2)]">
              <p className="text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">{ev.label}</p>
              {ev.date && <time className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] shrink-0">{ev.date}</time>}
            </div>
            {ev.description && (
              <p className="mt-[var(--space-1)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">{ev.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCORDION
// ─────────────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id:          string;
  trigger:     string;
  children:    React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items:       AccordionItem[];
  allowMultiple?: boolean;
  className?:  string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.id))
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden', className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              id={`accordion-trigger-${item.id}`}
              aria-controls={`accordion-panel-${item.id}`}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className={cn(
                'w-full flex items-center justify-between',
                'px-[var(--space-5)] py-[var(--space-4)]',
                'text-left text-[var(--font-size-base)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]',
                'hover:bg-[var(--state-hover-overlay)] transition-colors cursor-pointer',
                focusRing
              )}
            >
              <span>{item.trigger}</span>
              <ChevronDown
                size={18}
                aria-hidden
                className={cn('shrink-0 text-[var(--color-text-secondary)] transition-transform duration-[var(--duration-200)]', isOpen && 'rotate-180')}
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="px-[var(--space-5)] pb-[var(--space-5)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]"
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────

export interface TabItem {
  id:       string;
  label:    string;
  icon?:    React.ReactNode;
  badge?:   string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface TabsProps {
  items:      TabItem[];
  defaultTab?: string;
  variant?:   'line' | 'pill';
  className?: string;
  onChange?:  (id: string) => void;
}

export function Tabs({ items, defaultTab, variant = 'line', className, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const tabClass = (tab: TabItem) => cn(
    'inline-flex items-center gap-[var(--space-1-5)] px-[var(--space-4)] py-[var(--space-2-5)]',
    'text-[var(--font-size-sm)] font-[var(--font-weight-medium)] whitespace-nowrap',
    'transition-[var(--transition-hover)] cursor-pointer',
    focusRing,
    tab.disabled && 'opacity-[var(--opacity-disabled)] pointer-events-none',
    variant === 'line'
      ? cn(
          'border-b-2',
          active === tab.id
            ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
            : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
        )
      : cn(
          'rounded-full',
          active === tab.id
            ? 'bg-[var(--color-accent)] text-white'
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--state-hover-overlay)] hover:text-[var(--color-text-primary)]'
        )
  );

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        className={cn(
          'flex',
          variant === 'line'
            ? 'border-b border-[var(--color-border)] overflow-x-auto'
            : 'gap-[var(--space-1)] bg-[var(--color-bg-subtle)] p-[var(--space-1)] rounded-full w-fit'
        )}
      >
        {items.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-controls={`tabpanel-${tab.id}`}
            aria-selected={active === tab.id}
            aria-disabled={tab.disabled}
            onClick={() => !tab.disabled && handleChange(tab.id)}
            tabIndex={active === tab.id ? 0 : -1}
            className={tabClass(tab)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[var(--font-size-xs)] px-[var(--space-1-5)] rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panels */}
      {items.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          className="py-[var(--space-5)]"
        >
          {tab.children}
        </div>
      ))}
    </div>
  );
}
