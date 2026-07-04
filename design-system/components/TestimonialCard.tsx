import React from 'react';
import { cn } from '../utils';
import { Card, CardBody } from './Card';
import { Avatar } from './Avatar';
import { Rating } from './Rating';

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  authorAvatar,
  rating,
  className
}: TestimonialCardProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardBody className="flex-grow flex flex-col gap-4">
        {rating && <Rating value={rating} readOnly size={16} />}
        <blockquote className="text-[var(--font-size-md)] italic text-[var(--color-text-primary)] flex-grow">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
          <Avatar 
            src={authorAvatar} 
            initials={authorName.substring(0, 2).toUpperCase()} 
            size="md" 
          />
          <div>
            <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text)]">
              {authorName}
            </p>
            {authorTitle && (
              <p className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">
                {authorTitle}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
