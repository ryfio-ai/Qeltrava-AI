/* eslint-disable */
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type WebPoint = {
  num: number;
  title: string;
  desc: string;
  metric: string;
  xOffset: number; // For layout positioning
  yOffset: number;
};

const points: WebPoint[] = [
  { num: 1, title: "Global Reach", desc: "Break geographical barriers and expand your business footprint anywhere in the world.", metric: "240+ Countries Accessible", xOffset: -280, yOffset: -120 },
  { num: 2, title: "Round-the-clock Availability", desc: "Your software is open 24/7, serving clients, taking orders, and answering queries automatedly.", metric: "99.99% Guaranteed Uptime", xOffset: -300, yOffset: 10 },
  { num: 3, title: "Credibility & Professionalism", desc: "Establish absolute brand authority and build trust with modern, secure, compliant architecture.", metric: "+98% Brand Authority Index", xOffset: -280, yOffset: 140 },
  { num: 4, title: "Marketing & Branding", desc: "Deploy tailored SEO campaigns, capture high-quality leads, and shape how the market views your product.", metric: "4.5x High-Quality Lead Gen", xOffset: 280, yOffset: -120 },
  { num: 5, title: "Customer Feedback & Analytics", desc: "Track exact user behavior, heatmaps, and funnel drop-offs to continuously optimize conversions.", metric: "100% Data Ownership", xOffset: 300, yOffset: 10 },
  { num: 6, title: "Enhanced Sales", desc: "Shorten sales cycles by integrating seamless automated checkouts, billing schedules, and CRM synchronization.", metric: "+320% Average ROI Realized", xOffset: 280, yOffset: 140 }
];

export const VisualWhyWebsite = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Why Your Business Needs a Website & Platform</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          An interactive look at the core business capabilities enabled by Qeltrava's software engineering services.
        </p>
      </div>

      {/* SVG Canvas for Network Connections */}
      <div className="relative w-full h-[520px] hidden md:flex items-center justify-center">
        
        {/* SVG lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "520px" }}>
          <defs>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Central Logo references */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            // Center is (width/2, height/2) which dynamically translates.
            // SVG coordinate lines from center (50%) to the outer nodes.
            // We use simple line endpoints.
            const cx = 500; // Mock canvas center width
            const cy = 260; // Mock canvas center height
            
            // Outer node coordinates (matching layout positioning offsets)
            const targetX = cx + pt.xOffset * 1.35;
            const targetY = cy + pt.yOffset * 1.25;

            return (
              <g key={i}>
                {/* Static line */}
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2={`${50 + pt.xOffset * 0.14}%`} 
                  y2={`${50 + pt.yOffset * 0.16}%`} 
                  stroke={isHovered ? "url(#glowGrad)" : "#E2E8F0"} 
                  strokeWidth={isHovered ? "3.5" : "1.5"} 
                  strokeDasharray={isHovered ? "0" : "5 5"}
                  className="transition-all duration-300"
                />

                {/* Pulsing signal dot along the line */}
                {isHovered && (
                  <motion.circle 
                    r="4" 
                    fill="#3B82F6" 
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={{ 
                      cx: [`50%`, `${50 + pt.xOffset * 0.14}%`], 
                      cy: [`50%`, `${50 + pt.yOffset * 0.16}%`] 
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Logo Node */}
        <div className="absolute z-30">
          <motion.div 
            className="w-28 h-28 bg-white border border-[var(--color-border-soft)] rounded-full flex flex-col items-center justify-center shadow-2xl p-4 cursor-pointer"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="bg-black p-3 rounded-2xl">
              <Image src="/logo-bg.png" alt="Qeltrava Logo" width={32} height={32} className="w-8 h-8 object-contain brightness-0 invert" />
            </div>
          </motion.div>
        </div>

        {/* Outer Cards positioned absolutely */}
        {points.map((pt, i) => {
          const isHovered = hoveredIndex === i;
          
          return (
            <div 
              key={i} 
              className="absolute z-20 transition-all duration-300"
              style={{
                transform: `translate(calc(-50% + ${pt.xOffset * 1.3}px), calc(-50% + ${pt.yOffset * 1.15}px))`
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                className={`w-64 bg-white border rounded-xl p-4 shadow-sm cursor-default select-none relative group transition-all duration-300 ${
                  isHovered ? "border-[var(--color-accent)] shadow-md translate-y-[-4px]" : "border-[var(--color-border-soft)]"
                }`}
              >
                {/* Number Badge */}
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono absolute -top-3.5 -left-3.5 border transition-colors ${
                    isHovered ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "bg-white text-gray-400 border-[var(--color-border-soft)]"
                  }`}
                >
                  {pt.num}
                </div>

                <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-1">{pt.title}</h4>
                <p className="text-xs text-[var(--color-text-main)] mb-2 leading-relaxed">{pt.desc}</p>
                <div className={`text-xs font-semibold font-mono transition-colors ${isHovered ? "text-[var(--color-accent)]" : "text-gray-400"}`}>
                  {pt.metric}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile-Friendly Grid View (Responsive Fallback) */}
      <div className="grid grid-cols-1 gap-6 w-full md:hidden">
        {points.map((pt, i) => (
          <div key={i} className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl p-5 relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold font-mono flex items-center justify-center">
                {pt.num}
              </span>
              <h4 className="font-bold text-[var(--color-primary-dark)]">{pt.title}</h4>
            </div>
            <p className="text-sm text-[var(--color-text-main)] mb-3">{pt.desc}</p>
            <div className="text-sm font-bold text-[var(--color-accent)] font-mono">{pt.metric}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

