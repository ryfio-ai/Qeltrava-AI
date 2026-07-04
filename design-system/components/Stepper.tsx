'use client';
/**
 * design-system/components/Stepper.tsx
 * Qeltrava AI Design System – Stepper
 *
 * Full multi-step wizard stepper supporting horizontal/vertical modes,
 * step description lists, selection progress validation, and navigation control panels.
 */
import React from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface StepItem {
  title:        string;
  description?: string;
  disabled?:    boolean;
  /** Async or sync validation guard before leaving this step. Returns true if valid */
  validate?:    () => boolean | Promise<boolean>;
}

export interface StepperProps extends BaseComponentProps {
  /** List of steps config */
  steps:        StepItem[];
  /** Active zero-indexed step */
  activeStep:   number;
  /** Orientation of stepper layout. Default is 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Triggered when the step changes */
  onStepChange?: (step: number) => void;
  /** Content block matching activeStep */
  children?:    React.ReactNode;
}

export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  onStepChange,
  children,
  className,
  'data-testid': testId,
}: StepperProps) {
  const handleStepClick = async (index: number) => {
    if (!onStepChange || index === activeStep) return;

    // Only allow clicking backward or clicking exactly one step forward (with validation check)
    if (index < activeStep) {
      onStepChange(index);
    } else if (index === activeStep + 1) {
      const activeStepConfig = steps[activeStep];
      if (activeStepConfig?.validate) {
        const isValid = await activeStepConfig.validate();
        if (!isValid) return;
      }
      onStepChange(index);
    }
  };

  const isVertical = orientation === 'vertical';

  return (
    <div
      className={cn(
        'w-full flex gap-[var(--space-6)]',
        isVertical ? 'flex-col md:flex-row' : 'flex-col',
        className
      )}
      data-testid={testId}
    >
      {/* Stepper Header Track */}
      <ol
        className={cn(
          'flex flex-wrap w-full select-none shrink-0 list-none p-0 margin-0',
          isVertical ? 'flex-col md:w-64 divide-y divide-[var(--color-border)]/50' : 'items-center gap-4'
        )}
      >
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const isPending = idx > activeStep;

          return (
            <li
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={cn(
                'flex-1 flex items-center gap-[var(--space-3)] py-[var(--space-2)] transition-all outline-none',
                !step.disabled && idx <= activeStep + 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Step Icon Indicator */}
              <span
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-[var(--font-size-sm)] font-bold shrink-0 border-2 transition-all',
                  isActive && 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white',
                  isCompleted && 'border-[var(--color-status-success)] bg-[var(--color-status-success)] text-white',
                  isPending && 'border-[var(--color-border)] bg-[var(--surface-1)] text-[var(--color-text-tertiary)]'
                )}
              >
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  idx + 1
                )}
              </span>

              {/* Title & Subtitle */}
              <div className="text-left leading-normal min-w-0">
                <p
                  className={cn(
                    'text-[var(--font-size-sm)] font-semibold truncate',
                    isActive && 'text-[var(--color-text)]',
                    isCompleted && 'text-[var(--color-text-secondary)]',
                    isPending && 'text-[var(--color-text-tertiary)]'
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p
                    className={cn(
                      'text-[var(--font-size-xs)] truncate max-w-[200px]',
                      isActive ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-tertiary)]'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* Horizontal Connecting Divider Line */}
              {!isVertical && idx < steps.length - 1 && (
                <div className="hidden sm:block flex-1 h-0.5 min-w-[24px] bg-[var(--color-border)]" />
              )}
            </li>
          );
        })}
      </ol>

      {/* Stepper Content Window */}
      {children && (
        <div className="flex-1 w-full bg-[var(--surface-1)] border border-[var(--color-border)] p-[var(--space-6)] rounded-[var(--radius-xl)]">
          {children}
        </div>
      )}
    </div>
  );
}
export default Stepper;
