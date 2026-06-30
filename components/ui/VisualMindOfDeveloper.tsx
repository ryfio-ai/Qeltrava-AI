"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type BrainNode = {
  id: string;
  side: 'left' | 'right';
  title: string;
  desc: string;
  color: string;
  glowColor: string;
  icon: 'bulb' | 'gear' | 'sparkle' | 'compass';
  yOffset: number; // for path drawing
};

const nodes: BrainNode[] = [
  // Left Hemisphere (Logical/Technical)
  { id: "curiosity", side: "left", title: "Curiosity", desc: "Always digging into how systems work, exploring new stack performance, and evaluating alternative model parameters.", color: "#EF4444", glowColor: "rgba(239, 68, 68, 0.4)", icon: "bulb", yOffset: 60 },
  { id: "problemsolving", side: "left", title: "Problem-Solving", desc: "Approaching engineering logic with mathematical precision, resolving race conditions, and designing complex vector routing.", color: "#10B981", glowColor: "rgba(16, 185, 129, 0.4)", icon: "gear", yOffset: 120 },
  { id: "automation", side: "left", title: "Automation", desc: "Hating manual repetitive tasks, configuring CI/CD systems, auto-scaling instances, and scripting database backups.", color: "#8B5CF6", glowColor: "rgba(139, 92, 246, 0.4)", icon: "bulb", yOffset: 180 },
  
  // Right Hemisphere (Creative/Architectural)
  { id: "creativity", side: "right", title: "Creativity", desc: "Thinking outside the framework stack, building bespoke micro-animations, and finding elegant interface solutions.", color: "#F97316", glowColor: "rgba(249, 115, 22, 0.4)", icon: "bulb", yOffset: 70 },
  { id: "composition", side: "right", title: "Composition", desc: "Structuring reusable React components, writing modular server layouts, and maintaining clean API protocols.", color: "#3B82F6", glowColor: "rgba(59, 130, 246, 0.4)", icon: "sparkle", yOffset: 130 },
  { id: "mindful", side: "right", title: "Be Mindful", desc: "Prioritizing codebase cleanliness, security best practices, user data privacy, and writing thorough unit test coverages.", color: "#06B6D4", glowColor: "rgba(6, 182, 212, 0.4)", icon: "bulb", yOffset: 190 },
  { id: "improving", side: "right", title: "Improving Continually", desc: "Refactoring legacy bottlenecks, reading technical documentation, and iteratively upgrading existing product pipelines.", color: "#EC4899", glowColor: "rgba(236, 72, 153, 0.4)", icon: "compass", yOffset: 240 }
];

export const VisualMindOfDeveloper = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeNode = nodes.find(n => n.id === hoveredNode);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">The Cognitive Balance of a Qeltrava Engineer</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          Explore how we balance logical rigor with architectural adaptation to design and ship production systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        
        {/* Interactive Brain Diagram SVG */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[340px] h-[340px] select-none flex items-center justify-center bg-gray-50/30 rounded-full border border-gray-100/50 shadow-inner">
            
            {/* SVG Brain Circuits */}
            <svg className="w-full h-full p-4" viewBox="0 0 300 300">
              
              {/* Central Spine line */}
              <line x1="150" y1="30" x2="150" y2="270" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
              
              {nodes.map((node) => {
                const isLeft = node.side === "left";
                const isHovered = hoveredNode === node.id;
                
                // SVG coordinates
                const xStart = 150;
                const yStart = node.yOffset + 10;
                const xEnd = isLeft ? 60 : 240;
                const yEnd = node.yOffset + 10;

                // Bezier curve calculations
                const xControl = isLeft ? 100 : 200;
                const yControl = node.yOffset - 15;

                const pathData = `M ${xStart} ${yStart} Q ${xControl} ${yControl} ${xEnd} ${yEnd}`;

                return (
                  <g key={node.id}>
                    {/* Glowing background path on hover */}
                    {isHovered && (
                      <motion.path 
                        d={pathData}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Main path */}
                    <path 
                      d={pathData}
                      fill="none"
                      stroke={isHovered ? node.color : "#E2E8F0"}
                      strokeWidth={isHovered ? "3.5" : "1.5"}
                      strokeLinecap="round"
                      className="transition-colors duration-300"
                    />

                    {/* Interactive Node Button */}
                    <circle 
                      cx={xEnd} 
                      cy={yEnd} 
                      r="9" 
                      fill="white"
                      stroke={isHovered ? node.color : "#D8E3F0"}
                      strokeWidth="2.5"
                      className="cursor-pointer transition-colors duration-300"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    />

                    {/* Small inner indicator dot */}
                    <circle 
                      cx={xEnd} 
                      cy={yEnd} 
                      r="4" 
                      fill={isHovered ? node.color : "#D8E3F0"}
                      className="pointer-events-none transition-colors duration-300"
                    />

                    {/* Lightbulb indicator */}
                    {node.icon === 'bulb' && (
                      <g className="pointer-events-none" transform={`translate(${xEnd - 5}, ${yEnd - 22}) scale(0.6)`}>
                        <path 
                          d="M9 21h6v-1.3c1.7-1 3-2.6 3.6-4.5.6-1.9.4-4-.5-5.7-.9-1.7-2.6-2.9-4.5-3.2-2-.3-4 .4-5.4 1.8-1.4 1.4-2.1 3.4-1.8 5.4.3 1.9 1.5 3.6 3.2 4.5V21z"
                          fill={isHovered ? node.color : "none"}
                          stroke={isHovered ? node.color : "#D8E3F0"}
                          strokeWidth="2"
                        />
                      </g>
                    )}

                  </g>
                );
              })}
            </svg>

            {/* Labels overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex justify-between text-[10px] font-black tracking-widest text-gray-400 uppercase">
                <span>Rigor (Logic)</span>
                <span>Adaptation (Design)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Informative Side Card Column */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
            {activeNode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: activeNode.color }}>
                    💡
                  </span>
                  <h4 className="text-lg font-bold text-[var(--color-primary-dark)]" style={{ color: activeNode.color }}>
                    {activeNode.title}
                  </h4>
                </div>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">
                  {activeNode.desc}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-4 block">
                  {activeNode.side === "left" ? "Execution Rigor" : "Architectural Adaptation"}
                </span>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm">Hover over any neural node to explore our core engineering balance principles.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
