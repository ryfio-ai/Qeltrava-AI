"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function QeltravaIntelligenceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const signalDotRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const processNodes = [
    { label: 'MACHINE / INPUT', sub: 'Sensors & PLC Data' },
    { label: 'PROCESS', sub: 'Parameters & Speed' },
    { label: 'QUALITY', sub: 'Capability Math & Inspection' },
    { label: 'DECISION', sub: 'Optimal SOP & Action' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % processNodes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [processNodes.length]);

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    // Subtle 5-10px mouse response on desktop
    if (!window.matchMedia("(pointer: coarse)").matches && window.innerWidth >= 768) {
      const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.8, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 8;
        const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 8;
        xTo(moveX);
        yTo(moveY);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      const target = containerRef.current;
      target.addEventListener('mousemove', handleMouseMove);
      target.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        target.removeEventListener('mousemove', handleMouseMove);
        target.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs select-none min-h-[420px] flex flex-col justify-between"
    >
      {/* Background Subtle Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #90CAF9 1px, transparent 1px), linear-gradient(to bottom, #90CAF9 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Header System Identifier */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2196F3] inline-block" />
          <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
            QELTRAVA AI / MANUFACTURING INTELLIGENCE
          </span>
        </div>
        <div className="text-[10px] font-mono text-[#0D47A1] font-bold tracking-wider uppercase bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-full">
          DATA → AI → DECISION
        </div>
      </div>

      {/* Center Manufacturing Technical Drawing Field */}
      <div className="relative my-6 py-6 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl relative z-10 space-y-8">
        
        {/* Upper AI Intelligence Overlay Layer */}
        <div className="flex items-center justify-between bg-[#E3F2FD] border border-[#90CAF9] p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2196F3] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-wider">
              AI INTELLIGENCE LAYER
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#475569]">
            <span className="px-2 py-0.5 bg-[#FFFFFF] rounded border border-[#90CAF9]/60 text-[#0D47A1]">ANALYZE</span>
            <span>→</span>
            <span className="px-2 py-0.5 bg-[#FFFFFF] rounded border border-[#90CAF9]/60 text-[#0D47A1]">PREDICT</span>
            <span>→</span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-300 font-bold">OPTIMIZE</span>
          </div>
        </div>

        {/* Lower Production Line Flow Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {processNodes.map((node, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={node.label}
                className={`p-3.5 rounded-xl border transition-all duration-500 relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FFFFFF] border-[#2196F3] shadow-xs'
                    : 'bg-[#FFFFFF]/70 border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#0D47A1]' : 'text-[#64748B]'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#2196F3] animate-ping' : 'bg-[#CBD5E1]'}`} />
                </div>
                <div className="text-xs font-bold font-anek text-[#0F172A] mb-1">
                  {node.label}
                </div>
                <div className="text-[10px] font-mono text-[#475569]">
                  {node.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Status Bar */}
      <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] relative z-10 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[#0D47A1] font-bold">MANUFACTURING AI ENGINE</span>
          <span>·</span>
          <span>HUMAN-IN-THE-LOOP</span>
        </div>
        <div className="text-[#2196F3] font-bold uppercase tracking-wider text-[10px]">
          REAL-WORLD OPERATIONAL VALUE
        </div>
      </div>
    </div>
  );
}
