"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';
import { DURATION_SLOW, POWER3_OUT, STAGGER_NORMAL } from '@/lib/motion/tokens';

interface StaggerProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
  selector?: string;
}

export function Stagger({
  children,
  stagger = STAGGER_NORMAL,
  duration = DURATION_SLOW,
  className = "",
  selector = "> *"
}: StaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: POWER3_OUT,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`${className}`}>
      {children}
    </div>
  );
}
