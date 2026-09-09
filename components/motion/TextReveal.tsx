"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';
import { DURATION_HERO, POWER3_OUT } from '@/lib/motion/tokens';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export function TextReveal({
  children,
  delay = 0,
  duration = DURATION_HERO,
  className = '',
  as: Component = 'div'
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!textRef.current || prefersReducedMotion()) return;

    // Graceful line reveal fallback using GSAP opacity & Y translation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: POWER3_OUT,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: textRef });

  return (
    <Component ref={textRef} className={`${className}`}>
      {children}
    </Component>
  );
}
