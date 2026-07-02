"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ConsultingBenefit = {
  num: number;
  title: string;
  desc: string;
  metric: string;
  xOffset: number;
  yOffset: number;
};

const benefits: ConsultingBenefit[] = [
  { num: 1, title: "Save Unnecessary Costs", desc: "Validate feature feasibility before coding to completely avoid building features that won't get used.", metric: "-40% Waste Costs Reduction", xOffset: -240, yOffset: -120 },
  { num: 2, title: "Hands-On Experience", desc: "Gain direct support access to senior engineers to test and tweak architectural designs.", metric: "Direct Slack with Partners", xOffset: -260, yOffset: -20 },
  { num: 3, title: "Follow Technological Trends", desc: "Incorporate modern vector datastores, LLMs, and multi-tenant architectures.", metric: "Future-Proof Architecture", xOffset: -240, yOffset: 80 },
  { num: 4, title: "Focus on Necessities", desc: "Identify critical bottlenecks first, building an MVP focused on true business goals.", metric: "100% Scope Efficiency", xOffset: -160, yOffset: 160 },
  { num: 5, title: "Get a Scalable Approach", desc: "Infrastructure mapped out to automatically scale as traffic levels spike.", metric: "Auto-Scale Kubernetes ready", xOffset: 0, yOffset: 200 },
  { num: 6, title: "Better Productivity", desc: "Streamline workflows and pipeline steps, freeing up internal developers.", metric: "+50% Team Output Speedup", xOffset: 160, yOffset: 160 },
  { num: 7, title: "Scope of Improvement", desc: "Continuous feedback and iterative sprint audits identify code optimizations.", metric: "Bi-weekly Auditing Report", xOffset: 240, yOffset: 80 },
  { num: 8, title: "Get Measurable Results", desc: "Define precise performance logs and data dashboard tracking.", metric: "Real-time Metrics Tracking", xOffset: 260, yOffset: -20 },
  { num: 9, title: "Access Varied Skills", desc: "Leverage senior consultants with security, frontend, compliance, and LLM skills.", metric: "Full Pod Access", xOffset: 240, yOffset: -120 },
  { num: 10, title: "Focus Core Operations", desc: "Let Qeltrava manage deployments and cloud instances while you build business deals.", metric: "Peace of Mind Management", xOffset: 0, yOffset: -190 }
];

export const VisualBenefitsOfConsulting = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const active = hoveredIdx !== null ? benefits[hoveredIdx] : benefits[0];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-6 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Benefits of Software Consulting</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          Explore the 10 strategic business outcomes unlocked by Qeltrava's senior consulting engagements. Hover over any node to view ROI metrics.
        </p>
      </div>

      {/* SVG Interactive Hub Canvas */}
      <div className="relative w-full h-[480px] hidden md:flex items-center justify-center mb-6">
        
        {/* SVG connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "480px" }}>
          {benefits.map((bf, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={i}>
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2={`${50 + bf.xOffset * 0.17}%`} 
                  y2={`${50 + bf.yOffset * 0.17}%`} 
                  stroke={isHovered ? "var(--color-accent)" : "#E2E8F0"} 
                  strokeWidth={isHovered ? "3" : "1"} 
                  className="transition-all duration-300"
                />
                {isHovered && (
                  <motion.circle 
                    r="3.5" 
                    fill="var(--color-accent)" 
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={{ 
                      cx: ["50%", `${50 + bf.xOffset * 0.17}%`], 
                      cy: ["50%", `${50 + bf.yOffset * 0.17}%`] 
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Card */}
        <div className="absolute z-20 w-44 h-44 bg-white border border-[var(--color-border-soft)] rounded-full flex flex-col items-center justify-center text-center shadow-xl p-4 cursor-default">
          <div className="text-2xl mb-1">🤝</div>
          <h4 className="text-xs font-black text-[var(--color-primary-dark)] uppercase leading-tight">Qeltrava <br /> Consulting</h4>
          <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Strategic Hub</span>
        </div>

        {/* Surrounding Nodes */}
        {benefits.map((bf, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <div 
              key={i}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `calc(50% + ${bf.xOffset * 1.3}px)`,
                top: `calc(50% + ${bf.yOffset * 1.0}px)`
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="relative flex items-center justify-center">
                
                {/* Node circle */}
                <motion.div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${
                    isHovered 
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white" 
                      : "bg-white border-[#D8E3F0] text-gray-400 group-hover:text-gray-600 group-hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.15 }}
                >
                  <span className="text-xs font-bold font-mono">{bf.num}</span>
                </motion.div>

                {/* Floating tool label */}
                <div 
                  className={`absolute top-10 whitespace-nowrap text-[10px] font-bold tracking-tight bg-white border px-2 py-0.5 rounded shadow-sm transition-all duration-300 ${
                    isHovered ? "text-gray-900 border-gray-300 translate-y-[-2px] scale-102" : "text-gray-400 border-[var(--color-border-soft)] opacity-80"
                  }`}
                >
                  {bf.title}
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Mobile-Friendly list (Responsive fallback) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:hidden mb-6">
        {benefits.map((bf, i) => (
          <div key={i} className="bg-gray-50 border border-[var(--color-border-soft)] rounded-xl p-4 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              {bf.num}
            </span>
            <div>
              <h4 className="font-bold text-sm text-[var(--color-primary-dark)]">{bf.title}</h4>
              <p className="text-xs text-[var(--color-text-main)] mt-1">{bf.desc}</p>
              <div className="text-xs font-bold text-[var(--color-accent)] font-mono mt-2">{bf.metric}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Node Detail Card */}
      <div className="w-full bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-3xl opacity-20 bg-[var(--color-accent)] pointer-events-none" />
        
        <div className="flex items-center gap-3.5 mb-2.5">
          <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-xs font-black font-mono flex items-center justify-center">
            {active.num}
          </span>
          <h4 className="text-base font-extrabold text-[var(--color-primary-dark)]">
            {active.title}
          </h4>
        </div>
        <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">
          {active.desc}
        </p>
        <div className="text-sm font-bold text-[var(--color-accent)] font-mono">
          Strategic Outcome: {active.metric}
        </div>
      </div>

      <p className="mt-4 text-[10px] text-gray-400 italic text-center">
        * Industry benchmarks — for illustration only. Statistics represent average projections based on typical engagement outcomes.
      </p>
    </div>
  );
};
