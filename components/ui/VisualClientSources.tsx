"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SourceItem = {
  label: string;
  value: number;
  color: string;
  desc: string;
};

const leadSources: SourceItem[] = [
  { label: "Referrals", value: 27, color: "#3B82F6", desc: "Word-of-mouth recommendations from satisfied clients, partners, and advisors." },
  { label: "Social Media", value: 17, color: "#10B981", desc: "Organic and paid social content on LinkedIn, Twitter, and other industry networks." },
  { label: "Directories", value: 13, color: "#F59E0B", desc: "Company listings and ratings on platforms like Clutch, G2, and agency directories." },
  { label: "Website", value: 10, color: "#8B5CF6", desc: "Direct search engine optimization traffic and lead capture forms on our domain." },
  { label: "Outbound Sales", value: 9, color: "#EF4444", desc: "Direct email campaigns, strategic cold reach, and product-led prospecting." },
  { label: "Network", value: 5, color: "#06B6D4", desc: "Professional network, alumni associations, and personal connections." },
  { label: "Events & Trade Fairs", value: 4, color: "#EC4899", desc: "Industry conventions, sponsor keynotes, hackathons, and tech conferences." },
  { label: "Partnerships & Resellers", value: 4, color: "#14B8A6", desc: "Co-selling with cloud providers, digital agencies, and reseller commissions." },
  { label: "Content Creation", value: 4, color: "#84CC16", desc: "Detailed engineering blogs, whitepapers, newsletters, and open-source contributions." },
  { label: "Various", value: 7, color: "#6B7280", desc: "Inbound channels, various referrals, local ads, and other untracked channels." }
];

export const VisualClientSources = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const active = hoveredIdx !== null ? leadSources[hoveredIdx] : leadSources[0];

  // Draw SVG Donut segments
  let accumulatedValue = 0;
  const radius = 90;
  const strokeWidth = 32;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Lead Channels for Software Engineering</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          An interactive distribution chart showing how software development companies secure client contracts. Hover over any sector to inspect its detail report.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
        
        {/* Interactive Donut SVG */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-[280px] h-[280px] select-none flex items-center justify-center">
            
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 240 240">
              {leadSources.map((item, idx) => {
                const percentage = item.value;
                const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
                const dashOffset = -((accumulatedValue / 100) * circumference);
                
                accumulatedValue += percentage;
                const isHovered = hoveredIdx === idx;

                return (
                  <circle
                    key={idx}
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="cursor-pointer transition-all duration-300 hover:opacity-95"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                );
              })}
            </svg>

            {/* Central summary label inside the donut */}
            <div className="absolute w-[120px] h-[120px] rounded-full bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
              <span className="text-[26px] font-black text-[var(--color-primary-dark)] font-mono leading-none">
                {active.value}%
              </span>
              <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase truncate max-w-full">
                {active.label}
              </span>
            </div>

          </div>
        </div>

        {/* Legend & Summary Details Panel */}
        <div className="md:col-span-6 w-full flex flex-col gap-6">
          
          {/* Active Sector Summary box */}
          <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl p-5 shadow-sm min-h-[120px] flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: active.color }} />
              <h4 className="font-extrabold text-sm text-[var(--color-primary-dark)]">
                {active.label} ({active.value}%)
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
              {active.desc}
            </p>
          </div>

          {/* Miniature List Legend */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {leadSources.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded border cursor-pointer transition-all ${
                  hoveredIdx === idx 
                    ? "bg-gray-100 border-gray-300 font-bold scale-102" 
                    : "bg-white border-[var(--color-border-soft)] hover:bg-gray-50 text-[var(--color-text-main)]"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.label}</span>
                <span className="ml-auto font-mono text-[10px] font-bold">{item.value}%</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
