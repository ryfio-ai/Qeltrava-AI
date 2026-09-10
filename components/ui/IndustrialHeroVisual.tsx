"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function IndustrialHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Parallax mouse follow on desktop only if prefers-reduced-motion is false
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !visualRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(visualRef.current, {
        x: x * 8,
        y: y * 8,
        rotateX: -y * 3,
        rotateY: x * 3,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    const container = containerRef.current;
    if (container && window.innerWidth >= 1024) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center p-4 select-none"
    >
      {/* Soft Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#E3F2FD]/60 via-[#F8FAFC]/40 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* SVG Industrial Precision Component Visual */}
      <svg
        ref={visualRef}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-sm transition-transform duration-300"
        aria-hidden="true"
      >
        {/* Subtle Background Coordinate Grid */}
        <g opacity="0.15" stroke="#90CAF9" strokeWidth="0.75" strokeDasharray="4 4">
          <line x1="40" y1="200" x2="360" y2="200" />
          <line x1="200" y1="40" x2="200" y2="360" />
          <circle cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="110" />
        </g>

        {/* Outer Precision Housing Ring */}
        <circle 
          cx="200" 
          cy="200" 
          r="140" 
          stroke="#CBD5E1" 
          strokeWidth="1.5" 
        />

        {/* Rotated Technical Notch Ring */}
        <circle 
          cx="200" 
          cy="200" 
          r="132" 
          stroke="#90CAF9" 
          strokeWidth="1" 
          strokeDasharray="8 6 2 6"
          opacity="0.8"
        />

        {/* Outer Radial Guides */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * 140;
          const y1 = 200 + Math.sin(rad) * 140;
          const x2 = 200 + Math.cos(rad) * 152;
          const y2 = 200 + Math.sin(rad) * 152;
          return (
            <line 
              key={idx} 
              x1={x1} 
              y1={y1} 
              x2={x2} 
              y2={y2} 
              stroke={angle % 90 === 0 ? "#2196F3" : "#CBD5E1"} 
              strokeWidth={angle % 90 === 0 ? "2" : "1"} 
            />
          );
        })}

        {/* Main Precision Component Gear / Rotor Geometry */}
        <path
          d="M 200 80 
             L 220 100 L 250 90 L 260 120 L 290 125 L 285 155 L 310 170 L 295 195 L 315 215 L 290 235 L 300 265 L 270 275 L 270 305 L 240 305 L 230 330 L 200 320 L 170 330 L 160 305 L 130 305 L 130 275 L 100 265 L 110 235 L 85 215 L 105 195 L 90 170 L 115 155 L 110 125 L 140 120 L 150 90 L 180 100 Z"
          fill="#FFFFFF"
          stroke="#90CAF9"
          strokeWidth="1.5"
        />

        {/* Primary Inner Bezel & Primary Blue Accent Ring */}
        <circle 
          cx="200" 
          cy="200" 
          r="86" 
          fill="#F8FAFC" 
          stroke="#0D47A1" 
          strokeWidth="2"
        />

        {/* Concentric Precision Blue Path */}
        <circle 
          cx="200" 
          cy="200" 
          r="68" 
          stroke="#2196F3" 
          strokeWidth="2.5" 
          strokeDasharray="40 12 20 12"
        />

        {/* Inner Hub / Bearing Center */}
        <circle 
          cx="200" 
          cy="200" 
          r="42" 
          fill="#FFFFFF" 
          stroke="#90CAF9" 
          strokeWidth="1.5"
        />

        <circle 
          cx="200" 
          cy="200" 
          r="22" 
          fill="#E3F2FD" 
          stroke="#2196F3" 
          strokeWidth="2"
        />

        {/* Center Shaft Core Dot */}
        <circle 
          cx="200" 
          cy="200" 
          r="8" 
          fill="#0D47A1"
        />

        {/* Single Subtle Accent Geometry Crosshair */}
        <path 
          d="M 170 200 L 230 200 M 200 170 L 200 230" 
          stroke="#2196F3" 
          strokeWidth="1.2" 
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
