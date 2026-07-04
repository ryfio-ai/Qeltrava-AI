import React from 'react';
import { cn } from '../utils';
import { Card, CardBody } from './Card';
import { Icon } from './Icon';

export interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  iconColor?: string;
  iconBgColor?: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  iconName,
  iconColor = 'var(--color-accent)',
  iconBgColor = 'var(--color-primary-hover)',
  href,
  className
}: FeatureCardProps) {
  return (
    <Card 
      variant={href ? 'interactive' : 'default'}
      href={href}
      className={cn('h-full', className)}
    >
      <CardBody className="flex flex-col gap-4">
        <div 
          className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0"
          style={{ backgroundColor: `color-mix(in srgb, ${iconBgColor} 15%, transparent)` }}
        >
          <Icon name={iconName} size={24} color={iconColor} />
        </div>
        <div>
          <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text)] mb-2">
            {title}
          </h3>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
