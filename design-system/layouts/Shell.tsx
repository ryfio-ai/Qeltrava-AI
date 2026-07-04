'use client';
/**
 * design-system/layouts/Shell.tsx
 * Qeltrava AI Design System – App Shell Layout Primitive
 *
 * Full application shell containing slots for header, sidebar, footer, and main content.
 * Handles responsive layout shifts (collapsible or mobile sidebar offsets).
 */
import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface ShellProps extends BaseComponentProps {
  children?:         React.ReactNode;
  header?:           React.ReactNode;
  sidebar?:          React.ReactNode;
  footer?:           React.ReactNode;
  /** Whether the header is fixed/sticky at the top. Default is true */
  fixedHeader?:      boolean;
  /** Whether the sidebar is fixed on the side. Default is true */
  fixedSidebar?:     boolean;
  /** Width class for the sidebar on md+ screens. Default is 'w-64' */
  sidebarWidth?:     string;
  /** Whether the shell occupies the full viewport height. Default is true */
  fullHeight?:       boolean;
}

export function Shell({
  children,
  header,
  sidebar,
  footer,
  fixedHeader = true,
  fixedSidebar = true,
  sidebarWidth = 'w-64',
  fullHeight = true,
  className,
  'data-testid': testId,
}: ShellProps) {
  return (
    <div
      className={cn(
        'flex flex-col w-full text-[var(--color-text)] bg-[var(--surface-0)]',
        fullHeight ? 'min-h-screen' : 'h-auto',
        className
      )}
      data-testid={testId}
    >
      {/* Header Landmark */}
      {header && (
        <header
          role="banner"
          className={cn(
            'w-full z-40 border-b border-[var(--color-border)] bg-[var(--surface-1)]',
            fixedHeader && 'sticky top-0'
          )}
        >
          {header}
        </header>
      )}

      {/* Main Layout Area */}
      <div className="flex flex-1 w-full relative">
        {/* Sidebar Navigation */}
        {sidebar && (
          <aside
            role="complementary"
            className={cn(
              'hidden md:block border-r border-[var(--color-border)] bg-[var(--surface-1)] shrink-0',
              sidebarWidth,
              fixedSidebar && 'sticky top-[var(--shell-header-height,3.5rem)] h-[calc(100vh-var(--shell-header-height,3.5rem))] overflow-y-auto'
            )}
          >
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          <main
            role="main"
            id="main-content"
            className="flex-1 w-full px-[var(--space-6)] py-[var(--space-6)] md:px-[var(--space-8)] md:py-[var(--space-8)] outline-none"
            tabIndex={-1}
          >
            {children}
          </main>

          {/* Footer Landmark */}
          {footer && (
            <footer
              role="contentinfo"
              className="w-full border-t border-[var(--color-border)] bg-[var(--surface-1)] px-[var(--space-6)] py-[var(--space-6)] md:px-[var(--space-8)]"
            >
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
