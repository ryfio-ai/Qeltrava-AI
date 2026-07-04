'use client';
/**
 * design-system/components/Carousel.tsx
 * Qeltrava AI Design System – Carousel
 *
 * Performant, accessible CSS scroll-snap based carousel. Zero extra dependencies.
 * Conforms to WAI-ARIA Carousel Design Pattern.
 */
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import { Icon } from './Icon';
import type { BaseComponentProps } from '../types';

export interface CarouselProps extends BaseComponentProps {
  /** Slides or elements to display inside the carousel */
  children:          React.ReactNode;
  /** Enable auto play rotation. Default is false */
  autoPlay?:         boolean;
  /** Auto play rotation interval in milliseconds. Default is 5000 */
  autoPlayInterval?: number;
  /** Infinite loop wrapping scroll behavior. Default is false */
  loop?:             boolean;
  /** Visual indicator dots display. Default is true */
  showDots?:         boolean;
  /** Visual arrows display. Default is true */
  showArrows?:       boolean;
  /** Labeled description */
  ariaLabel?:        string;
}

export function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = false,
  showDots = true,
  showArrows = true,
  ariaLabel = 'Carousel banner',
  className,
  'data-testid': testId,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesArray = React.Children.toArray(children);
  const totalSlides = slidesArray.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slides = container.children;
    if (index >= 0 && index < totalSlides && slides[index]) {
      const slide = slides[index] as HTMLElement;
      container.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalSlides - 1) {
      scrollTo(activeIndex + 1);
    } else if (loop) {
      scrollTo(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    } else if (loop) {
      scrollTo(totalSlides - 1);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Listen to manual scrolling to update active index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const width = container.clientWidth;
      if (width > 0) {
        const index = Math.round(scrollPosition / width);
        if (index >= 0 && index < totalSlides && index !== activeIndex) {
          setActiveIndex(index);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, totalSlides]);

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, activeIndex, autoPlayInterval]);

  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true);
  };

  return (
    <div
      className={cn('relative w-full overflow-hidden group outline-none', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      data-testid={testId}
    >
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className={cn(
          'w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar',
          '[-ms-overflow-style:none] [scrollbar-width:none]'
        )}
      >
        {slidesArray.map((slide, idx) => (
          <div
            key={idx}
            className="w-full shrink-0 snap-start snap-always"
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${totalSlides}`}
            aria-hidden={idx !== activeIndex}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            disabled={!loop && activeIndex === 0}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
              'bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-[var(--color-text)] shadow-md transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] disabled:opacity-30 disabled:cursor-not-allowed',
              'opacity-0 group-hover:opacity-100'
            )}
            aria-label="Previous slide"
            data-testid={testId ? `${testId}-prev` : undefined}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!loop && activeIndex === totalSlides - 1}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full',
              'bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-[var(--color-text)] shadow-md transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] disabled:opacity-30 disabled:cursor-not-allowed',
              'opacity-0 group-hover:opacity-100'
            )}
            aria-label="Next slide"
            data-testid={testId ? `${testId}-next` : undefined}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && totalSlides > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
          role="tablist"
          aria-label="Slides"
        >
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className={cn(
                'h-2 rounded-full transition-all duration-200 focus:outline-none',
                idx === activeIndex
                  ? 'w-6 bg-[var(--color-accent)]'
                  : 'w-2 bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60'
              )}
              data-testid={testId ? `${testId}-dot-${idx}` : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Carousel;
