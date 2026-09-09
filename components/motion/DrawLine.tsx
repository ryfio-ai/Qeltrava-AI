"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';

interface DrawLineProps {
  svgPath: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function DrawLine({
  svgPath,
  strokeColor = "#2196F3",
  strokeWidth = 2,
  duration = 1.2,
  delay = 0,
  className = ""
}: DrawLineProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path || prefersReducedMotion()) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration,
      delay,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: pathRef });

  return (
    <svg className={`overflow-visible ${className}`} fill="none">
      <path
        ref={pathRef}
        d={svgPath}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
