"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Sliders, Factory, Wrench, Network } from 'lucide-react';

interface ManufacturingNodeData {
  id: string;
  category: string;
  title: string;
  verbs: string;
  icon: React.ElementType;
  position: { x: number; y: number }; // Percentage coordinate (% in 440x440 SVG space)
  curveControl: { cx: number; cy: number }; // SVG Bezier control point
}

export function ManufacturingAIMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRingRef = useRef<SVGGElement>(null);
  const activeSignalRef = useRef<SVGCircleElement>(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  // Perfect Pentagon Clock Geometry (440x440 ViewBox, Base Center: 220, 220):
  // 5 Unified Nodes placed at R = 118px radius (0°, 72°, 144°, 216°, 288°)
  // Outer Filled Circle: r = 214px (Leaves 45px+ clear buffer all around)
  const nodes: ManufacturingNodeData[] = [
    {
      id: 'quality',
      category: 'QUALITY',
      title: 'Quality Intelligence',
      verbs: 'Detect · Analyze · Improve',
      icon: ShieldCheck,
      position: { x: 50.0, y: 23.2 }, // 12:00 (0°) -> (220, 102)
      curveControl: { cx: 220, cy: 161 }
    },
    {
      id: 'production',
      category: 'PRODUCTION',
      title: 'Production Analytics',
      verbs: 'Monitor · Predict · Act',
      icon: Factory,
      position: { x: 75.5, y: 41.7 }, // ~2:24 (72°) -> (332.2, 183.5)
      curveControl: { cx: 276, cy: 202 }
    },
    {
      id: 'operations',
      category: 'OPERATIONS',
      title: 'Intelligent Automation',
      verbs: 'Connect · Automate · Decide',
      icon: Network,
      position: { x: 65.8, y: 71.7 }, // ~4:48 (144°) -> (289.3, 315.5)
      curveControl: { cx: 255, cy: 268 }
    },
    {
      id: 'maintenance',
      category: 'MAINTENANCE',
      title: 'Predictive Maintenance',
      verbs: 'Detect · Predict · Prevent',
      icon: Wrench,
      position: { x: 34.2, y: 71.7 }, // ~7:12 (216°) -> (150.7, 315.5)
      curveControl: { cx: 185, cy: 268 }
    },
    {
      id: 'process',
      category: 'PROCESS',
      title: 'Process Optimization',
      verbs: 'Analyze · Optimize · Validate',
      icon: Sliders,
      position: { x: 24.5, y: 41.7 }, // ~9:36 (288°) -> (107.8, 183.5)
      curveControl: { cx: 164, cy: 202 }
    }
  ];

  // 1. ROTATE ONLY THE BACKSIDE GRAY CIRCLE CONTINUOUSLY CLOCKWISE
  useEffect(() => {
    if (!bgRingRef.current) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const rotationTween = gsap.to(bgRingRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: '220px 220px'
    });

    return () => {
      rotationTween.kill();
    };
  }, []);

  // 2. NEAT & CLEAN SIGNAL TIMER SEQUENCE
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % nodes.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [nodes.length]);

  // 3. SMOOTH SIGNAL PULSE ANIMATION DIRECTLY TO ACTIVE CLOCK NODE CENTER
  useEffect(() => {
    if (!activeSignalRef.current) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const targetNode = nodes[activeNodeIndex];
    const endX = (targetNode.position.x / 100) * 440;
    const endY = (targetNode.position.y / 100) * 440;

    gsap.fromTo(
      activeSignalRef.current,
      {
        cx: 220,
        cy: 220,
        r: 3.5,
        opacity: 0.95
      },
      {
        cx: endX,
        cy: endY,
        r: 5.5,
        opacity: 0.9,
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(activeSignalRef.current, { opacity: 0, duration: 0.3 });
        }
      }
    );
  }, [activeNodeIndex, nodes]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[600px] sm:max-w-[640px] min-h-[460px] sm:min-h-[520px] mx-auto flex items-center justify-center p-0 select-none"
    >
      {/* SVG Background Layer & Connection Lines (Expanded 440x440 ViewBox) */}
      <svg 
        viewBox="0 0 440 440" 
        className="w-full h-full absolute inset-0 z-10 pointer-events-none hidden sm:block"
      >
        {/* ─── CONTINUOUS CLOCKWISE ROTATING BACKSIDE EXPANDED CIRCLE ─── */}
        <g ref={bgRingRef}>
          {/* Pure Light Gray Filled Background Circle (r=214px) */}
          <circle 
            cx="220" 
            cy="220" 
            r="214" 
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            style={{ fill: '#FFFFFF', stroke: '#CBD5E1' }} 
          />
          
          {/* Clock Ticked Outer Engineering Rim (r=209px) */}
          <circle 
            cx="220" 
            cy="220" 
            r="209" 
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="9 7 4 7"
            opacity="0.85" 
          />
          
          {/* Clock Dial Hour Ticks (12 Ticks at 30° Increments) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 220 + Math.cos(rad) * 202;
            const y1 = 220 + Math.sin(rad) * 202;
            const x2 = 220 + Math.cos(rad) * 212;
            const y2 = 220 + Math.sin(rad) * 212;
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={angle % 90 === 0 ? '#2196F3' : '#90CAF9'}
                strokeWidth={angle % 90 === 0 ? '2.5' : '1.2'}
              />
            );
          })}

          {/* Inner Orbit Guide Circle for Clock Nodes (r=118px) */}
          <circle 
            cx="220" 
            cy="220" 
            r="118" 
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </g>

        {/* Curved Connection Paths from AI Core (220, 220) directly to Clock Node Centers */}
        {nodes.map((node, idx) => {
          const targetX = (node.position.x / 100) * 440;
          const targetY = (node.position.y / 100) * 440;
          const isActive = idx === activeNodeIndex;
          const pathD = `M 220 220 Q ${node.curveControl.cx} ${node.curveControl.cy} ${targetX} ${targetY}`;

          return (
            <path
              key={node.id}
              d={pathD}
              fill="none"
              stroke={isActive ? '#2196F3' : '#90CAF9'}
              strokeWidth={isActive ? '2.2' : '1.2'}
              strokeDasharray={isActive ? 'none' : '4 4'}
              className="transition-all duration-500"
            />
          );
        })}

        {/* Traveling Signal Pulse Dot */}
        <circle 
          ref={activeSignalRef} 
          cx="220" 
          cy="220" 
          r="4.5" 
          fill="#2196F3" 
        />
      </svg>

      {/* DESKTOP / TABLET CLOCK RADIAL MAP (>= 640px) — PERFECTLY CONTAINED CLOCK NODES */}
      <div className="relative w-full h-full z-20 hidden sm:block">
        
        {/* BASE CENTER AI CORE NODE (128px Diameter) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30">
          <div 
            className="w-[120px] h-[120px] sm:w-[128px] sm:h-[128px] rounded-full border-2 shadow-sm flex flex-col items-center justify-center p-2 transition-all duration-300"
            style={{ backgroundColor: '#E3F2FD', borderColor: '#90CAF9' }}
          >
            {/* Inner Ring Accent */}
            <div 
              className="w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] rounded-full border flex flex-col items-center justify-center space-y-0.5 shadow-inner"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#2196F3' }}
            >
              <span className="text-2xl sm:text-3xl font-serif italic font-normal text-[#2196F3] leading-none">AI</span>
              <span className="text-[9px] font-mono font-bold text-[#0D47A1] tracking-widest uppercase mt-0.5">QELTRAVA</span>
              <span className="text-[7px] font-mono font-bold text-[#475569] tracking-widest uppercase">INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* 5 UNIFIED CLOCK NODES (Pill + Icon + Title + Verbs grouped together at R=118px) */}
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
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 max-w-[120px] z-20 ${
                isActive ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setActiveNodeIndex(idx)}
            >
              {/* Category Pill with solid white fill */}
              <span 
                className="text-[8px] font-mono font-bold text-[#0D47A1] uppercase tracking-wider mb-0.5 px-1.5 py-0.5 rounded border shadow-2xs whitespace-nowrap bg-[#FFFFFF] border-[#CBD5E1]"
              >
                0{idx + 1} {node.category}
              </span>

              {/* Node Icon Circle with solid white background */}
              <div 
                className={`w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                  isActive 
                    ? 'bg-[#2196F3] text-white ring-4 ring-[#E3F2FD] shadow-md scale-110' 
                    : 'bg-[#FFFFFF] text-[#2196F3] border border-[#90CAF9] hover:border-[#2196F3] hover:bg-[#F8FAFC]'
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>

              {/* Node Title & Verbs */}
              <div className="mt-0.5 text-center w-full">
                <h4 className={`text-[10px] sm:text-[10.5px] font-bold font-anek leading-tight transition-colors ${isActive ? 'text-[#0D47A1]' : 'text-[#0F172A]'}`}>
                  {node.title}
                </h4>
                <p className="text-[7.5px] font-mono text-[#475569] font-medium leading-tight mt-0.5">
                  {node.verbs}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* MOBILE COMPOSITION (< 640px) */}
      <div className="w-full flex flex-col items-center gap-4 sm:hidden z-20 py-2">
        {/* Mobile Base Center AI Node */}
        <div 
          className="w-32 h-32 rounded-full border-2 shadow-sm flex flex-col items-center justify-center p-2 text-center"
          style={{ backgroundColor: '#E3F2FD', borderColor: '#90CAF9' }}
        >
          <div 
            className="w-24 h-24 rounded-full border flex flex-col items-center justify-center"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#2196F3' }}
          >
            <span className="text-2xl font-serif italic font-normal text-[#2196F3]">AI</span>
            <span className="text-[9px] font-mono font-bold text-[#0D47A1] uppercase">QELTRAVA</span>
            <span className="text-[7px] font-mono font-bold text-[#475569] uppercase">INTELLIGENCE</span>
          </div>
        </div>

        {/* Mobile 5-Node List */}
        <div className="w-full grid grid-cols-1 gap-2">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isActive = idx === activeNodeIndex;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeIndex(idx)}
                className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-[#E3F2FD]/90 border-[#2196F3]'
                    : 'bg-[#FFFFFF] border-[#E2E8F0]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#90CAF9] flex items-center justify-center text-[#2196F3] flex-shrink-0">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-[#2196F3]">0{idx + 1}</span>
                    <h4 className="text-xs font-bold text-[#0F172A] font-anek">{node.title}</h4>
                  </div>
                  <p className="text-[9px] font-mono text-[#475569]">{node.verbs}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
