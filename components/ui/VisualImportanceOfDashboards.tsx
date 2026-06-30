"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DashboardPoint = {
  title: string;
  desc: string;
  metric: string;
  chartData: number[];
  color: string;
};

const points: DashboardPoint[] = [
  {
    title: "Data representation",
    desc: "Visualizing complex multidimensional data into intuitive, interactive components.",
    metric: "94% Better Comprehension",
    chartData: [20, 35, 45, 60, 75, 94],
    color: "#8B5CF6"
  },
  {
    title: "Analysis and reporting",
    desc: "Automated aggregation and insights extraction with one-click custom exports.",
    metric: "12 Hours Saved Weekly",
    chartData: [80, 70, 50, 45, 30, 15],
    color: "#3B82F6"
  },
  {
    title: "Time and effort",
    desc: "Drastically reducing operational overhead through live updates and automation.",
    metric: "65% Process Speedup",
    chartData: [30, 45, 55, 60, 70, 85],
    color: "#EC4899"
  },
  {
    title: "Holistic view",
    desc: "A unified single pane of glass showing metrics across your entire organization.",
    metric: "100% Cross-system Visibility",
    chartData: [40, 55, 65, 80, 90, 100],
    color: "#10B981"
  },
  {
    title: "Tracking the progress",
    desc: "Real-time key performance indicators tracking projects against target deadlines.",
    metric: "0.2s Update Latency",
    chartData: [90, 85, 95, 92, 98, 99],
    color: "#F59E0B"
  }
];

export const VisualImportanceOfDashboards = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const active = points[selectedIndex];

  // Coordinates of the 5 nodes along an ellipse of rx=240, ry=100 centered at (cx=270, cy=150)
  // Coordinates are pre-computed based on standard ellipse equations:
  // Node 0: Top center (270, 50)
  // Node 1: Top right (478, 116)
  // Node 2: Bottom right (398, 230)
  // Node 3: Bottom left (142, 230)
  // Node 4: Middle left (62, 116)
  const nodeCoordinates = [
    { x: 270, y: 50 },   // Top center (0)
    { x: 478, y: 116 },  // Top right (1)
    { x: 398, y: 230 },  // Bottom right (2)
    { x: 142, y: 230 },  // Bottom left (3)
    { x: 62, y: 116 }    // Middle left (4)
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      <div className="relative w-full overflow-x-auto overflow-y-hidden py-4 flex justify-center">
        <div className="relative w-[540px] h-[300px] shrink-0">
          {/* Background Ellipse Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 300">
            {/* Pulsing glow ellipse */}
            <ellipse 
              cx="270" 
              cy="150" 
              rx="208" 
              ry="90" 
              fill="none" 
              stroke="#E9DDFE" 
              strokeWidth="2" 
            />
            {/* Animated dash ellipse */}
            <motion.ellipse 
              cx="270" 
              cy="150" 
              rx="208" 
              ry="90" 
              fill="none" 
              stroke="url(#ellipseGlow)" 
              strokeWidth="3"
              strokeDasharray="20 40 60"
              animate={{ strokeDashoffset: [0, -200] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="ellipseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central text node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none z-10 w-44">
            <motion.h4 
              className="text-lg md:text-xl font-bold tracking-tight leading-snug"
              style={{ color: active.color }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Importance of <br /> Dashboards
            </motion.h4>
          </div>

          {/* Glowing node buttons around the ellipse */}
          {points.map((pt, i) => {
            const coord = nodeCoordinates[i];
            const isSelected = selectedIndex === i;
            
            return (
              <div 
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                style={{ left: coord.x, top: coord.y }}
                onClick={() => setSelectedIndex(i)}
              >
                {/* Node structure */}
                <div className="relative flex flex-col items-center">
                  {/* Glowing core */}
                  <motion.div 
                    className="w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-md transition-all duration-300"
                    style={{ backgroundColor: isSelected ? pt.color : "#E9DDFE" }}
                    whileHover={{ scale: 1.3 }}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </motion.div>

                  {/* Ripple ring */}
                  {isSelected && (
                    <motion.div 
                      className="absolute w-8 h-8 rounded-full border border-purple-400 pointer-events-none"
                      style={{ borderColor: pt.color }}
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* Node Title */}
                  <div 
                    className={`absolute top-6 w-32 text-center text-xs font-semibold select-none leading-tight transition-all duration-300 ${
                      isSelected ? "text-gray-900 scale-105" : "text-gray-500 group-hover:text-gray-800"
                    }`}
                  >
                    {pt.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Point Details (Dashboard Card View) */}
      <div className="w-full mt-6 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 relative overflow-hidden">
        {/* Decorative dynamic background gradient */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: active.color }} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-white/60 mb-3 inline-block" style={{ color: active.color, borderColor: active.color }}>
              Dashboard Feature
            </span>
            <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">
              {active.title}
            </h3>
            <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">
              {active.desc}
            </p>
            <div className="text-lg font-bold" style={{ color: active.color }}>
              {active.metric}
            </div>
          </div>

          {/* Interactive Micro Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-[var(--color-border-soft)] h-[130px] flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Live Metric Simulation</span>
            
            <div className="flex items-end gap-1.5 h-16 w-full pt-2">
              {active.chartData.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end h-full group/bar relative">
                  <motion.div 
                    className="w-full rounded-t-sm transition-all"
                    style={{ backgroundColor: active.color }}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-30 font-mono">
                    {val}%
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[8px] font-mono text-gray-400">
              <span>Sprint 1</span>
              <span>Sprint 3</span>
              <span>Launch</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
