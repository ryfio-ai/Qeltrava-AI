"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type WorkBlock = {
  id: number;
  title: string;
  side: 'left' | 'right';
  color: string;
  textColor: string;
  bgClass: string;
  desc: string;
  metric: string;
};

const blocks: WorkBlock[] = [
  {
    id: 1,
    title: "Identification of the need",
    side: "right",
    color: "#6b7280",
    textColor: "text-gray-700",
    bgClass: "bg-gray-100 border-gray-200",
    desc: "Diagnosing operational inefficiencies, analyzing legacy architectures, and defining clear business goals.",
    metric: "Audit Complete in 5 Days"
  },
  {
    id: 2,
    title: "Create digital solutions",
    side: "right",
    color: "#f97316",
    textColor: "text-amber-700",
    bgClass: "bg-orange-50 border-orange-200",
    desc: "Drafting scalable cloud blueprints, defining agent workflow pipelines, and security compliance parameters.",
    metric: "24-Hour Discovery Blueprint"
  },
  {
    id: 3,
    title: "Develop a software",
    side: "left",
    color: "#0ea5e9",
    textColor: "text-sky-700",
    bgClass: "bg-sky-50 border-sky-200",
    desc: "Writing modular, clean, and testable codebases in rapid sprints under dedicated pods.",
    metric: "4-Week Rapid Prototype MVP"
  },
  {
    id: 4,
    title: "Quality assurance",
    side: "right",
    color: "#6b7280",
    textColor: "text-gray-700",
    bgClass: "bg-gray-100 border-gray-200",
    desc: "Automated end-to-end integration tests, unit regression audits, security penetration testing, and load checks.",
    metric: "100% Automated Test Coverage"
  },
  {
    id: 5,
    title: "Maintenance",
    side: "left",
    color: "#0284c7",
    textColor: "text-sky-800",
    bgClass: "bg-sky-100 border-sky-200",
    desc: "24/7 server log inspections, API latency audits, system upgrades, and model safety checkups.",
    metric: "99.99% Production Uptime"
  },
  {
    id: 6,
    title: "Design websites & portals",
    side: "right",
    color: "#0d9488",
    textColor: "text-teal-700",
    bgClass: "bg-teal-50 border-teal-200",
    desc: "Crafting beautiful, responsive, and intuitive UX/UI designs designed to convert visitors.",
    metric: "Responsive Web/App Delivery"
  },
  {
    id: 7,
    title: "Business point of view",
    side: "left",
    color: "#f97316",
    textColor: "text-amber-700",
    bgClass: "bg-orange-50 border-orange-200",
    desc: "Measuring final platform execution outcomes against business ROI, efficiency targets, and budget caps.",
    metric: "Fixed-Price Value Bundles"
  }
];

export const VisualHowSoftwareCompaniesWork = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-12 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">How Qeltrava AI Thinks & Executes</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          Hover over each execution node along our spine to see our core values and phase metrics.
        </p>
      </div>

      {/* Spine Layout Container */}
      <div className="relative w-full flex flex-col items-center">
        
        {/* Vertical center stem line */}
        <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-accent)] via-purple-400 to-[var(--color-success)] rounded-full left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Blocks checklist */}
        <div className="w-full flex flex-col gap-8 relative">
          {blocks.map((block, idx) => {
            const isHovered = hoveredIdx === idx;
            const isLeft = block.side === "left";

            return (
              <div 
                key={block.id}
                className={`flex w-full items-center ${
                  isLeft ? "justify-start md:flex-row-reverse" : "justify-end md:flex-row"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                
                {/* Visual Block Card */}
                <div className={`w-full md:w-[42%] px-4 z-10`}>
                  <motion.div 
                    className={`p-5 rounded-2xl border-2 shadow-sm transition-all duration-300 ${block.bgClass} ${
                      isHovered ? "shadow-md scale-102" : ""
                    }`}
                    style={{ borderColor: isHovered ? block.color : undefined }}
                  >
                    <h4 className="font-extrabold text-sm text-[var(--color-primary-dark)] mb-1 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center" style={{ backgroundColor: block.color }}>
                        {block.id}
                      </span>
                      {block.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-main)] leading-relaxed mb-3">
                      {block.desc}
                    </p>
                    <span className={`text-xs font-bold font-mono`} style={{ color: block.color }}>
                      {block.metric}
                    </span>
                  </motion.div>
                </div>

                {/* Animated Connection Node on the center spine line */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md z-20 transition-all duration-300 pointer-events-none"
                     style={{ 
                       backgroundColor: isHovered ? block.color : "#d8e3f0",
                       transform: `translate(-50%, 0) scale(${isHovered ? 1.3 : 1})`
                     }}
                />

                {/* Empty side for layout balancing on desktop */}
                <div className="hidden md:block w-[42%]" />

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
