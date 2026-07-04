import React from 'react';
import { cn } from '../utils';
import type { BaseComponentProps } from '../types';

export interface ChartData {
  label: string;
  value: number;
}

export interface BarChartProps extends BaseComponentProps {
  data: ChartData[];
  height?: number;
}

export function BarChart({ data, height = 200, className, 'data-testid': testId }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className={cn('w-full flex items-end gap-2', className)} style={{ height }} data-testid={testId}>
      {data.map((item, i) => {
        const percentage = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center flex-1 h-full justify-end gap-2 group">
            <div className="w-full relative bg-[var(--color-bg-subtle)] rounded-t-[var(--radius-sm)] flex items-end justify-center">
              <div
                className="w-full bg-[var(--color-primary)] rounded-t-[var(--radius-sm)] transition-all duration-500 ease-out group-hover:bg-[var(--color-primary-hover)]"
                style={{ height: `${percentage}%` }}
              />
              <span className="absolute -top-6 text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </span>
            </div>
            <span className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)] truncate w-full text-center">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
