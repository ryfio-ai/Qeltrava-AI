/**
 * design-system/components/Breadcrumb.tsx
 * Qeltrava AI Design System – Breadcrumb
 *
 * ARIA: nav[aria-label="Breadcrumb"] > ol > li[aria-current="page"]
 */
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../utils';

export interface BreadcrumbItem {
  label:    string;
  href?:    string;
  icon?:    React.ReactNode;
}

export interface BreadcrumbProps {
  items:      BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?:  boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = <ChevronRight size={14} aria-hidden />,
  showHome  = false,
  className,
}: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/', icon: <Home size={14} aria-hidden /> }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-[var(--space-1-5)] flex-wrap">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={i} className="flex items-center gap-[var(--space-1-5)]">
              {isLast ? (
                <span
                  aria-current="page"
                  className="flex items-center gap-[var(--space-1)] text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-[var(--space-1)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-xs)]"
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="text-[var(--color-text-tertiary)]" aria-hidden>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * design-system/components/Pagination.tsx
 * Qeltrava AI Design System – Pagination
 *
 * ARIA: nav[aria-label="Pagination"], aria-current="page"
 */
export interface PaginationProps {
  total:       number;
  page:        number;
  pageSize?:   number;
  siblings?:   number;
  onChange:    (page: number) => void;
  showFirst?:  boolean;
  showLast?:   boolean;
  className?:  string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function paginate(total: number, page: number, pageSize: number, siblings: number) {
  const totalPages = Math.ceil(total / pageSize);
  const delta      = siblings;
  const left       = Math.max(2, page - delta);
  const right      = Math.min(totalPages - 1, page + delta);
  const pages: (number | '...')[] = [1];

  if (left > 2)           pages.push('...');
  pages.push(...range(left, right));
  if (right < totalPages - 1) pages.push('...');
  if (totalPages > 1)     pages.push(totalPages);

  return { pages, totalPages };
}

export function Pagination({
  total,
  page,
  pageSize   = 10,
  siblings   = 1,
  onChange,
  showFirst  = false,
  showLast   = false,
  className,
}: PaginationProps) {
  const { pages, totalPages } = paginate(total, page, pageSize, siblings);
  const isFirst = page === 1;
  const isLast  = page === totalPages;

  const buttonBase = cn(
    'inline-flex items-center justify-center min-w-[36px] h-[36px] px-[var(--space-2)]',
    'rounded-[var(--radius-md)] text-[var(--font-size-sm)] font-[var(--font-weight-medium)]',
    'transition-colors cursor-pointer border border-transparent'
  );

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-[var(--space-1)]', className)}>
      {/* First */}
      {showFirst && (
        <button type="button" onClick={() => onChange(1)} disabled={isFirst} aria-label="First page" className={cn(buttonBase, isFirst ? 'opacity-[var(--opacity-disabled)] cursor-not-allowed' : 'hover:bg-[var(--state-hover-overlay)]')}>
          «
        </button>
      )}

      {/* Previous */}
      <button type="button" onClick={() => onChange(page - 1)} disabled={isFirst} aria-label="Previous page" className={cn(buttonBase, isFirst ? 'opacity-[var(--opacity-disabled)] cursor-not-allowed' : 'hover:bg-[var(--state-hover-overlay)]')}>
        ‹
      </button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className={cn(buttonBase, 'cursor-default text-[var(--color-text-tertiary)]')}>…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              buttonBase,
              p === page
                ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--state-hover-overlay)] border-[var(--color-border)]'
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button type="button" onClick={() => onChange(page + 1)} disabled={isLast} aria-label="Next page" className={cn(buttonBase, isLast ? 'opacity-[var(--opacity-disabled)] cursor-not-allowed' : 'hover:bg-[var(--state-hover-overlay)]')}>
        ›
      </button>

      {/* Last */}
      {showLast && (
        <button type="button" onClick={() => onChange(totalPages)} disabled={isLast} aria-label="Last page" className={cn(buttonBase, isLast ? 'opacity-[var(--opacity-disabled)] cursor-not-allowed' : 'hover:bg-[var(--state-hover-overlay)]')}>
          »
        </button>
      )}
    </nav>
  );
}
