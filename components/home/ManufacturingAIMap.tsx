"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Sliders, Factory, Wrench, Network } from 'lucide-react';

interface ManufacturingNode {
  id: string;
  title: string;
  subtitle: string;
  verbs: string;
  icon: React.ElementType;
  position: { x: number; y: number }; // Percentage position in SVG/Layout
  align: 'top' | 'left' | 'right' | 'bottom-left' | 'bottom-right';
}

export function ManufacturingAIMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSignalRef = useRef<SVGCircleElement>(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const nodes: ManufacturingNode[] = [
    {
      id: 'quality',
      title: 'Quality Intelligence',
      subtitle: 'Inspection & Cp/Cpk',
      verbs: 'Detect · Analyze · Improve',
      icon: ShieldCheck,
      position: { x: 50, y: 14 },
      align: 'top'
    },
    {
      id: 'process',
      title: 'Process Optimization',
      subtitle: 'Setpoint Tuning',
      verbs: 'Analyze · Optimize · Validate',
      icon: Sliders,
      position: { x: 14, y: 46 },
      align: 'left'
    },
    {
      id: 'production',
      title: 'Production Analytics',
      subtitle: 'Throughput & Bottlenecks',
      verbs: 'Monitor · Predict · Act',
      icon: Factory,
      position: { x: 86, y: 46 },
      align: 'right'
    },
    {
      id: 'maintenance',
      title: 'Predictive Maintenance',
      subtitle: 'Vibration & Wear',
      verbs: 'Detect · Predict · Prevent',
      icon: Wrench,
      position: { x: 26, y: 84 },
      align: 'bottom-left'
    },
    {
      id: 'operations',
      title: 'Intelligent Operations',
      subtitle: 'Workflow Automation',
      verbs: 'Connect · Automate · Decide',
      icon: Network,
      position: { x: 74, y: 84 },
      align: 'bottom-right'
    }
  ];

  useEffect(() => {
    // Media query check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Sequence timer: every 3 seconds, pulse signal from AI core to next node
    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % nodes.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [nodes.length]);

  useEffect(() => {
    if (!activeSignalRef.current) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const targetNode = nodes[activeNodeIndex];
    // Animate signal dot along connection line from center (50, 50) to target node position
    gsap.fromTo(
      activeSignalRef.current,
      {
        cx: 200,
        cy: 200,
        r: 4,
        opacity: 1
      },
      {
        cx: (targetNode.position.x / 100) * 400,
        cy: (targetNode.position.y / 100) * 400,
        r: 6,
        opacity: 0.9,
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(activeSignalRef.current, { opacity: 0, duration: 0.4 });
        }
      }
    );
  }, [activeNodeIndex, nodes]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center p-2 sm:p-4 select-none"
    >
      {/* Background Radial Tint */}
      <div className="absolute inset-0 bg-radial from-[#E3F2FD]/50 via-[#F8FAFC]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Connection SVG Canvas */}
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full absolute inset-0 z-10 pointer-events-none"
      >
        {/* Connector Lines from Center (200, 200) to 5 Nodes */}
        {nodes.map((node, idx) => {
          const targetX = (node.position.x / 100) * 400;
          const targetY = (node.position.y / 100) * 400;
          const isActive = idx === activeNodeIndex;

          return (
            <g key={node.id}>
              {/* Base Line */}
              <line
                x1="200"
                y1="200"
                x2={targetX}
                y2={targetY}
                stroke={isActive ? '#2196F3' : '#CBD5E1'}
                strokeWidth={isActive ? '2' : '1.2'}
                strokeDasharray={isActive ? 'none' : '4 4'}
                className="transition-colors duration-500"
              />
            </g>
          );
        })}

        {/* Traveling Signal Pulse Dot */}
        <circle 
          ref={activeSignalRef} 
          cx="200" 
          cy="200" 
          r="4" 
          fill="#2196F3" 
          className="drop-shadow-xs"
        />
      </svg>

      {/* HTML Interactive Map Layer */}
      <div className="relative w-full h-full z-20">
        
        {/* CENTER NODE — QELTRAVA AI CORE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFFFFF] border-2 border-[#2196F3] shadow-md flex flex-col items-center justify-center p-2 relative group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#E3F2FD] border border-[#90CAF9] flex flex-col items-center justify-center">
              <span className="text-sm sm:text-base font-serif italic font-bold text-[#2196F3]">AI</span>
              <span className="text-[9px] font-mono font-bold text-[#0D47A1] tracking-wider uppercase mt-0.5">QELTRAVA</span>
            </div>
            <span className="text-[8px] font-mono font-bold text-[#64748B] uppercase tracking-widest mt-1">INTELLIGENCE</span>
          </div>
        </div>

        {/* 5 SURROUNDING MANUFACTURING APPLICATION NODES */}
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isActive = idx === activeNodeIndex;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
              onClick={() => setActiveNodeIndex(idx)}
            >
              {/* Node Icon Circle */}
              <div 
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#2196F3] text-white ring-4 ring-[#E3F2FD] shadow-md scale-110' 
                    : 'bg-[#FFFFFF] text-[#0D47A1] border border-[#90CAF9] hover:border-[#2196F3] hover:bg-[#F8FAFC]'
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>

              {/* Node Labels */}
              <div className="mt-1.5 text-center min-w-[130px]">
                <h4 className={`text-xs font-bold font-anek transition-colors ${isActive ? 'text-[#0D47A1]' : 'text-[#0F172A]'}`}>
                  {node.title}
                </h4>
                <p className="text-[10px] font-mono text-[#475569] font-medium leading-tight">
                  {node.verbs}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
