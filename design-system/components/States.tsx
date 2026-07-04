/**
 * design-system/components/States.tsx
 * Qeltrava AI Design System – State screens
 *
 * Exports: EmptyState | ErrorState | SuccessState | LoadingState
 * Used for full-page or in-panel feedback states.
 */
import React from 'react';
import { AlertTriangle, CheckCircle, Inbox, Loader2 } from 'lucide-react';
import { cn } from '../utils';

// ─── Shared layout ────────────────────────────────────────────────────────────

function StateLayout({
  icon,
  title,
  description,
  actions,
  className,
}: {
  icon:         React.ReactNode;
  title:        string;
  description?: string;
  actions?:     React.ReactNode;
  className?:   string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'px-[var(--space-8)] py-[var(--space-16)]',
        'gap-[var(--space-4)]',
        className
      )}
    >
      <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full mb-[var(--space-2)]">
        {icon}
      </div>
      <h3 className="text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--color-text-heading)]">
        {title}
      </h3>
      {description && (
        <p className="max-w-[360px] text-[var(--font-size-base)] text-[var(--color-text-secondary)] leading-[var(--line-height-relaxed)]">
          {description}
        </p>
      )}
      {actions && (
        <div className="flex flex-wrap items-center justify-center gap-[var(--space-3)] mt-[var(--space-2)]">
          {actions}
        </div>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  title?:       string;
  description?: string;
  icon?:        React.ReactNode;
  actions?:     React.ReactNode;
  className?:   string;
}

export function EmptyState({
  title       = 'Nothing here yet',
  description = 'Get started by creating your first item.',
  icon,
  actions,
  className,
}: EmptyStateProps) {
  return (
    <StateLayout
      icon={
        <div className="w-full h-full rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center justify-center">
          {icon ?? <Inbox size={28} className="text-[var(--color-text-tertiary)]" aria-hidden />}
        </div>
      }
      title={title}
      description={description}
      actions={actions}
      className={className}
    />
  );
}

// ─── ErrorState ───────────────────────────────────────────────────────────────

export interface ErrorStateProps {
  title?:       string;
  description?: string;
  error?:       Error | string;
  actions?:     React.ReactNode;
  className?:   string;
}

export function ErrorState({
  title       = 'Something went wrong',
  description,
  error,
  actions,
  className,
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;
  return (
    <StateLayout
      icon={
        <div className="w-full h-full rounded-full bg-[var(--color-danger-bg)] flex items-center justify-center">
          <AlertTriangle size={28} className="text-[var(--color-danger)]" aria-hidden />
        </div>
      }
      title={title}
      description={description ?? errorMessage ?? 'An unexpected error occurred. Please try again.'}
      actions={actions}
      className={className}
    />
  );
}

// ─── SuccessState ─────────────────────────────────────────────────────────────

export interface SuccessStateProps {
  title?:       string;
  description?: string;
  actions?:     React.ReactNode;
  className?:   string;
}

export function SuccessState({
  title       = 'Success!',
  description = 'Your action was completed successfully.',
  actions,
  className,
}: SuccessStateProps) {
  return (
    <StateLayout
      icon={
        <div className="w-full h-full rounded-full bg-[var(--color-success-bg)] flex items-center justify-center">
          <CheckCircle size={28} className="text-[var(--color-success)]" aria-hidden />
        </div>
      }
      title={title}
      description={description}
      actions={actions}
      className={className}
    />
  );
}

// ─── LoadingState ─────────────────────────────────────────────────────────────

export interface LoadingStateProps {
  title?:       string;
  description?: string;
  className?:   string;
}

export function LoadingState({
  title       = 'Loading…',
  description = 'Please wait while we fetch your data.',
  className,
}: LoadingStateProps) {
  return (
    <StateLayout
      icon={
        <div className="w-full h-full rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center justify-center">
          <Loader2 size={28} className="text-[var(--color-accent)] animate-spin" aria-hidden />
        </div>
      }
      title={title}
      description={description}
      className={cn('', className)}
    />
  );
}
