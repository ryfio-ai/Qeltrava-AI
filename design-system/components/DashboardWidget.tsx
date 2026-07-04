import React from 'react';
import { cn } from '../utils';
import { Card, CardHeader, CardBody } from './Card';
import { Button } from './Button';
import { Icon } from './Icon';

export interface DashboardWidgetProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DashboardWidget({
  title,
  actionText,
  onActionClick,
  children,
  className,
  contentClassName
}: DashboardWidgetProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-[var(--font-size-md)] font-medium text-[var(--color-text)]">
          {title}
        </h3>
        {actionText && (
          <Button variant="ghost" size="sm" onClick={onActionClick}>
            {actionText}
          </Button>
        )}
      </CardHeader>
      <CardBody className={cn('flex-grow pt-0', contentClassName)}>
        {children}
      </CardBody>
    </Card>
  );
}
