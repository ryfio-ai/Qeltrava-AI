import React from 'react';
import { cn } from '../utils';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from './Button';
import { Icon } from './Icon';

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period = '/month',
  description,
  features,
  isPopular,
  ctaText = 'Get Started',
  onCtaClick,
  className
}: PricingCardProps) {
  return (
    <Card 
      variant={isPopular ? 'bordered' : 'default'} 
      padding="none" 
      className={cn('relative flex flex-col h-full', isPopular && 'border-[var(--color-accent)] shadow-[var(--shadow-card-hover)]', className)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <span className="bg-[var(--color-accent)] text-white text-[var(--font-size-xs)] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pt-8 pb-4 border-none">
        <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text-secondary)] mb-2">{title}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-[var(--font-size-4xl)] font-bold text-[var(--color-text)]">{price}</span>
          <span className="text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]">{period}</span>
        </div>
        {description && (
          <p className="mt-4 text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{description}</p>
        )}
      </CardHeader>
      
      <CardBody className="flex-grow pt-4">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--font-size-sm)] text-[var(--color-text-primary)]">
              <span className="text-[var(--color-accent)] shrink-0 mt-0.5">
                <Icon name="Check" size={16} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      
      <CardFooter className="pt-4 pb-8 border-none justify-center">
        <Button 
          variant={isPopular ? 'primary' : 'outline'} 
          fullWidth 
          size="lg" 
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
