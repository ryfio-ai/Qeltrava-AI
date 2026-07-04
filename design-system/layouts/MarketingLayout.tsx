'use client';
/**
 * design-system/layouts/MarketingLayout.tsx
 * Qeltrava AI Design System – MarketingLayout Layout Primitive
 *
 * Facilitates the standard alternating full-bleed section layout common to marketing pages.
 * Iterates through children and wraps each in a Section (alternating surface levels) and a Container.
 */
import React from 'react';
import { Section } from './Section';
import { Container, type ContainerSize } from '../components/Containers';
import type { BaseComponentProps, SurfaceLevel } from '../types';

export interface MarketingLayoutProps extends BaseComponentProps {
  children?:          React.ReactNode;
  /**
   * Surface levels to alternate through.
   * Default is [0, 1] (alternates between surface-0 and surface-1).
   */
  alternateLevels?:   SurfaceLevel[];
  /** Size of the inner container. Default is 'xl' */
  containerSize?:     ContainerSize;
  /** Vertical padding for sections. Default is 'lg' */
  padding?:           'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** HTML element tag. Default is 'div' */
  as?:                React.ElementType;
}

export function MarketingLayout({
  children,
  alternateLevels = [0, 1],
  containerSize = 'xl',
  padding = 'lg',
  as: Tag = 'div',
  className,
  'data-testid': testId,
}: MarketingLayoutProps) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return (
    <Tag className={className} data-testid={testId}>
      {childrenArray.map((child, index) => {
        const level = alternateLevels[index % alternateLevels.length];

        return (
          <Section
            key={index}
            level={level}
            padding={padding}
            data-testid={testId ? `${testId}-section-${index}` : undefined}
          >
            <Container size={containerSize}>
              {child}
            </Container>
          </Section>
        );
      })}
    </Tag>
  );
}
