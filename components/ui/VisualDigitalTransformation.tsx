"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type QuadrantData = {
  id: string;
  name: string;
  color: string;
  bgLight: string;
  textDark: string;
  desc: string;
  enablers: { name: string; desc: string }[];
  propositions: { name: string; metric: string }[];
};

const quadrants: QuadrantData[] = [
  {
    id: "data",
    name: "DIGITAL DATA",
    color: "#0284c7",
    bgLight: "#f0f9ff",
    textDark: "#0369a1",
    desc: "Aggregating and processing complex enterprise datasets to drive intelligent agent workflows and models.",
    enablers: [
      { name: "Wearables", desc: "Edge devices capturing physical metrics in real-time." },
      { name: "Big data", desc: "Petabyte-scale distributed databases and warehouses." },
      { name: "Internet of things", desc: "Sensors streams ingested securely into clouds." }
    ],
    propositions: [
      { name: "Data-based routing", metric: "99.8% Accuracy" },
      { name: "Demand forecasts", metric: "35% Error Reduction" },
      { name: "Predictive maintenance", metric: "30% Downtime Saved" }
    ]
  },
  {
    id: "automation",
    name: "AUTOMATION",
    color: "#7c3aed",
    bgLight: "#f5f3ff",
    textDark: "#6d28d9",
    desc: "Replacing repetitive manual task workflows with autonomous script executions and agent orchestration.",
    enablers: [
      { name: "Robotics", desc: "Software robots performing UI interactions autonomously." },
      { name: "Additive manufacturing", desc: "CAD pipelines automated for precision output." }
    ],
    propositions: [
      { name: "Drones", metric: "99.9% Autonomous Safety" },
      { name: "Autonomous vehicles", metric: "Real-time Edge Ingestion" },
      { name: "Fourth-party logistics", metric: "80% Dispatch Speedup" }
    ]
  },
  {
    id: "connectivity",
    name: "CONNECTIVITY",
    color: "#1e3a8a",
    bgLight: "#eff6ff",
    textDark: "#1d4ed8",
    desc: "Engineering the underlying network, pipeline, and host layers for lightning fast systems communication.",
    enablers: [
      { name: "Cloud computing", desc: "Auto-scaling kubernetes and secure VPC networks." },
      { name: "Broadband", desc: "High throughput pipelines with minimal overhead." }
    ],
    propositions: [
      { name: "Smart factory", metric: "24/7 Remote Monitoring" },
      { name: "Pure digital products", metric: "Zero Asset Overhead" },
      { name: "Remote maintenance", metric: "92% Fast Patch Resolution" }
    ]
  },
  {
    id: "customer",
    name: "DIGITAL CUSTOMER ACCESS",
    color: "#0d9488",
    bgLight: "#f0fdfa",
    textDark: "#0f766e",
    desc: "Creating next-generation touchpoints for customers to interact with models, order systems, and support agent platforms.",
    enablers: [
      { name: "Social networks", desc: "Automated API syndication and social graphs." },
      { name: "Mobile internet/apps", desc: "Fast, responsive localized React Native platforms." }
    ],
    propositions: [
      { name: "Infotainment", metric: "100% User Engagement" },
      { name: "E-commerce", metric: "Instant Stripe Checkouts" }
    ]
  }
];

export const VisualDigitalTransformation = () => {
  const [activeTab, setActiveTab] = useState<string>("data");
  const current = quadrants.find(q => q.id === activeTab)!;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Digital Transformation Architecture</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          Explore the concentric layers of Digital Transformation: choose a quadrant to inspect its Enablers (middle layer) and propositions (outer outputs).
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Selector Wheel Column */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[340px] h-[340px] rounded-full border border-gray-100 shadow-lg flex items-center justify-center p-6 bg-gray-50/50">
            
            {/* Center title */}
            <div className="absolute w-[120px] h-[120px] rounded-full bg-white shadow-xl flex flex-col items-center justify-center text-center p-2 z-20 border border-[var(--color-border-soft)] pointer-events-none">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Center Hub</span>
              <span className="text-xs font-black text-[var(--color-primary-dark)] leading-tight uppercase">DIGITAL <br /> TRANSFORMATION</span>
            </div>

            {/* Quadrant buttons */}
            <div className="w-full h-full relative rotate-45 rounded-full overflow-hidden border border-gray-200">
              
              {/* Quadrant 1: Data (Top Left in layout) */}
              <button 
                onClick={() => setActiveTab("data")}
                className={`absolute top-0 left-0 w-1/2 h-1/2 border-r border-b border-gray-200 transition-all ${
                  activeTab === "data" ? "bg-sky-500/15" : "bg-white hover:bg-sky-50"
                }`}
                title="Digital Data"
              />

              {/* Quadrant 2: Automation (Top Right in layout) */}
              <button 
                onClick={() => setActiveTab("automation")}
                className={`absolute top-0 right-0 w-1/2 h-1/2 border-l border-b border-gray-200 transition-all ${
                  activeTab === "automation" ? "bg-violet-500/15" : "bg-white hover:bg-violet-50"
                }`}
                title="Automation"
              />

              {/* Quadrant 3: Connectivity (Bottom Left in layout) */}
              <button 
                onClick={() => setActiveTab("connectivity")}
                className={`absolute bottom-0 left-0 w-1/2 h-1/2 border-r border-t border-gray-200 transition-all ${
                  activeTab === "connectivity" ? "bg-blue-900/15" : "bg-white hover:bg-blue-50"
                }`}
                title="Connectivity"
              />

              {/* Quadrant 4: Customer Access (Bottom Right in layout) */}
              <button 
                onClick={() => setActiveTab("customer")}
                className={`absolute bottom-0 right-0 w-1/2 h-1/2 border-l border-t border-gray-200 transition-all ${
                  activeTab === "customer" ? "bg-teal-500/15" : "bg-white hover:bg-teal-50"
                }`}
                title="Digital Customer Access"
              />
            </div>

            {/* Floating Labels over buttons */}
            {quadrants.map((q, idx) => {
              const labelCoordinates = [
                { top: "22%", left: "22%" }, // Data
                { top: "22%", right: "22%" }, // Automation
                { bottom: "22%", left: "22%" }, // Connectivity
                { bottom: "22%", right: "22%" } // Customer
              ];
              const isSelected = activeTab === q.id;

              return (
                <div 
                  key={q.id}
                  className="absolute z-10 text-center pointer-events-none select-none"
                  style={labelCoordinates[idx]}
                >
                  <span 
                    className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-sm transition-all"
                    style={{ 
                      backgroundColor: isSelected ? q.color : "white",
                      color: isSelected ? "white" : q.color,
                      border: `1px solid ${q.color}`
                    }}
                  >
                    {q.id === "customer" ? "Access" : q.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informational Panel Column */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-2xl p-6 border border-transparent"
              style={{ backgroundColor: current.bgLight }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: current.color }} />
                <h4 className="font-extrabold tracking-wider text-sm" style={{ color: current.textDark }}>
                  {current.name}
                </h4>
              </div>
              
              <p className="text-xs text-gray-700 leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Sub-layers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Enablers (Middle Ring) */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[var(--color-border-soft)] shadow-sm">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 border-b pb-1">
                    Enablers (Infrastructure)
                  </h5>
                  <ul className="space-y-2 text-[11px]">
                    {current.enablers.map((en, idx) => (
                      <li key={idx}>
                        <span className="font-bold text-[var(--color-primary-dark)] block">{en.name}</span>
                        <span className="text-gray-500 leading-tight text-[10px]">{en.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Propositions (Outer Ring) */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-[var(--color-border-soft)] shadow-sm">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 border-b pb-1">
                    Propositions (Outcomes)
                  </h5>
                  <ul className="space-y-2.5 text-[11px]">
                    {current.propositions.map((prop, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{prop.name}</span>
                        <span className="font-bold text-xs font-mono" style={{ color: current.color }}>
                          {prop.metric}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="mt-4 text-[10px] uppercase tracking-wider text-[var(--color-text-main)] opacity-70 bg-[var(--color-bg-light)] px-3 py-1 rounded border border-[var(--color-border-soft)]">
        Illustrative Data: Metric indicators represent generic industry outcomes for modeling purposes.
      </div>

    </div>
  );
};
