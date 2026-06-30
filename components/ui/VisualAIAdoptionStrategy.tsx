"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StrategyStep = {
  num: number;
  title: string;
  desc: string;
  deliverables: string[];
  timeline: string;
};

const steps: StrategyStep[] = [
  { num: 1, title: "Understand the AI Potential", desc: "Discover how generative AI, machine learning, and agents can solve specific operational challenges inside your business.", deliverables: ["Opportunity Map", "Technology Feasibility Report", "ROI Hypotheses Matrix"], timeline: "Week 1" },
  { num: 2, title: "Identify Your End Goal", desc: "Define precise success metrics, target costs reductions, efficiency targets, and regulatory bounds.", deliverables: ["Product Requirement Spec", "Success KPIs Definition", "Compliance Bounds Assessment"], timeline: "Week 2" },
  { num: 3, title: "Evaluate Internal Capabilities", desc: "Audit existing data pipelines, cloud infrastructure readiness, compliance gaps, and engineering skillsets.", deliverables: ["Infrastructure Diagnostic", "Data Cleanliness Scorecard", "Security Baseline Mapping"], timeline: "Weeks 2-3" },
  { num: 4, title: "Build or Integrate AI Solution", desc: "Launch development sprints. Prototype LLM RAG pipelines, fine-tune models, or orchestrate autonomous agent logic.", deliverables: ["Deployed Core Prototype", "API Endpoints Documentation", "Vector DB Connection Schema"], timeline: "Weeks 3-6" },
  { num: 5, title: "Test the AI System", desc: "Rigorous diagnostic testing. Run evaluations for hallucination rates, safety thresholds, edge case logic, and load capacities.", deliverables: ["Evaluation Framework Logs", "Load & Latency Benchmarks", "Security Audit Report"], timeline: "Week 7" },
  { num: 6, title: "Measure and Evaluate Performance", desc: "Conduct human-in-the-loop validation, run production dry-runs, and monitor output quality against initial KPIs.", deliverables: ["Human feedback Scorecards", "Operational Dashboard logs", "ROI Validation report"], timeline: "Week 8" },
  { num: 7, title: "Stay Updated with AI Trends", desc: "Iterate continuously under support retainers. Seamlessly upgrade models as newer, faster, and cheaper APIs emerge.", deliverables: ["Continuous Integration Pipelines", "Model Upgrades Roadmap", "Bi-weekly Diagnostic Review"], timeline: "Continuous (Retainer)" }
];

export const VisualAIAdoptionStrategy = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = steps[activeStep];

  // Sine-wave node coordinates along a canvas width=840 height=300
  const coordinates = [
    { x: 70, y: 150 },   // Step 1: middle-low
    { x: 190, y: 220 },  // Step 2: bottom
    { x: 310, y: 80 },   // Step 3: top
    { x: 430, y: 220 },  // Step 4: bottom
    { x: 550, y: 80 },   // Step 5: top
    { x: 670, y: 220 },  // Step 6: bottom
    { x: 770, y: 150 }   // Step 7: middle-high
  ];

  // SVG Bezier curved path passing smoothly through all coordinates
  const svgPath = "M 70 150 C 130 200, 150 220, 190 220 C 250 220, 270 80, 310 80 C 350 80, 390 220, 430 220 C 470 220, 510 80, 550 80 C 590 80, 630 220, 670 220 C 710 220, 730 150, 770 150";

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">AI Adoption Strategy for Business</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          Click on any step of the wave to see detailed engineering outputs, deliverables, and timelines.
        </p>
      </div>

      {/* SVG Timeline Canvas */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden py-6 flex justify-center mb-6">
        <div className="relative w-[840px] h-[280px] shrink-0 select-none">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 840 280">
            {/* Background sine-wave path */}
            <path 
              d={svgPath} 
              fill="none" 
              stroke="#D8E3F0" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            
            {/* Active/Completed path color overlay */}
            <motion.path 
              d={svgPath} 
              fill="none" 
              stroke="var(--color-accent)" 
              strokeWidth="4" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
              animate={{ strokeDashoffset: `${1000 - (activeStep / 6) * 780}` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>

          {/* Render Step Node Buttons along the wave */}
          {steps.map((step, idx) => {
            const coord = coordinates[idx];
            const isActive = idx === activeStep;
            const isCompleted = idx <= activeStep;

            return (
              <div 
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                style={{ left: coord.x, top: coord.y }}
                onClick={() => setActiveStep(idx)}
              >
                <div className="relative flex flex-col items-center">
                  
                  {/* Step Label (Top or Bottom based on position) */}
                  <div 
                    className={`absolute w-36 text-center text-[10px] font-bold tracking-tight uppercase leading-tight transition-all duration-300 ${
                      coord.y < 120 ? "top-11" : "-top-11"
                    } ${isActive ? "text-gray-900 scale-105" : "text-gray-400 group-hover:text-gray-600"}`}
                  >
                    {step.title}
                  </div>

                  {/* Outer circle */}
                  <motion.div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors shadow-sm ${
                      isActive 
                        ? "bg-white border-[var(--color-accent)]" 
                        : isCompleted 
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                        : "bg-white border-[#D8E3F0]"
                    }`}
                    whileHover={{ scale: 1.15 }}
                  >
                    <span 
                      className={`text-xs font-bold font-mono transition-colors ${
                        isActive 
                          ? "text-[var(--color-accent)]" 
                          : isCompleted 
                          ? "text-white" 
                          : "text-gray-400"
                      }`}
                    >
                      {step.num}
                    </span>
                  </motion.div>

                  {/* Active glowing ring */}
                  {isActive && (
                    <motion.div 
                      className="absolute w-14 h-14 rounded-full border border-blue-400 pointer-events-none"
                      initial={{ scale: 0.7, opacity: 0.8 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Deliverables Info Card */}
      <div className="w-full bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[var(--color-accent)] text-white font-mono">
                Phase {current.num}
              </span>
              <span className="text-xs font-bold text-gray-500 font-mono">
                Timeline: {current.timeline}
              </span>
            </div>
            <h4 className="text-lg font-bold text-[var(--color-primary-dark)] mb-2">{current.title}</h4>
            <p className="text-sm text-[var(--color-text-main)] leading-relaxed">{current.desc}</p>
          </div>

          <div className="flex-1 w-full bg-white border border-[var(--color-border-soft)] rounded-xl p-5 shadow-sm">
            <h5 className="text-xs font-bold text-[var(--color-primary-dark)] uppercase tracking-wider mb-3">Key Deliverables</h5>
            <ul className="space-y-2.5">
              {current.deliverables.map((del, dIdx) => (
                <li key={dIdx} className="flex items-center gap-2.5 text-xs text-[var(--color-text-main)] font-semibold">
                  <span className="w-4 h-4 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center text-[10px]">✓</span>
                  {del}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
