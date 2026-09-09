"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function QeltravaIntelligenceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const plane1Ref = useRef<HTMLDivElement>(null);
  const plane2Ref = useRef<HTMLDivElement>(null);
  const plane3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    // 1. Slow, ambient geometric motion (8–18s loops)
    if (plane1Ref.current) {
      gsap.to(plane1Ref.current, {
        rotate: 4,
        x: 12,
        y: -10,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    if (plane2Ref.current) {
      gsap.to(plane2Ref.current, {
        rotate: -6,
        x: -16,
        y: 14,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    if (plane3Ref.current) {
      gsap.to(plane3Ref.current, {
        rotate: 8,
        x: 10,
        y: -12,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // 2. Mouse cursor response (quickTo interpolation, max 15px offset)
    if (!window.matchMedia("(pointer: coarse)").matches && window.innerWidth >= 768) {
      const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.8, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 14;
        const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 14;
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
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #90CAF9 1px, transparent 1px), linear-gradient(to bottom, #90CAF9 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header System Identifier Bar */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#2196F3] inline-block" />
          <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
            QELTRAVA / INTELLIGENCE FIELD 01
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-full font-bold">
          <span>SYS-01 // ACTIVE</span>
        </div>
      </div>

      {/* Center Geometric Visual Field */}
      <div className="relative my-8 h-[260px] w-full flex items-center justify-center z-10">
        
        {/* Geometric Plane 1 (Background Surface) */}
        <div 
          ref={plane1Ref}
          className="absolute w-[80%] h-[180px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl transform -rotate-3 shadow-xs flex items-start justify-between p-4"
        >
          <span className="text-[9px] font-mono font-bold text-[#64748B] uppercase tracking-widest">
            01 / DATA INGESTION FIELD
          </span>
          <span className="text-[9px] font-mono text-[#2196F3] font-bold">12.4k rps</span>
        </div>

        {/* Geometric Plane 2 (Middle Reasoning Layer) */}
        <div 
          ref={plane2Ref}
          className="absolute w-[68%] h-[160px] bg-[#E3F2FD]/80 backdrop-blur-xs border border-[#90CAF9] rounded-xl transform rotate-2 shadow-xs flex flex-col justify-between p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase tracking-wider">
              02 / REASONING & MODEL PIPELINE
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0D47A1] pt-4 border-t border-[#90CAF9]/40">
            <span>RAG + AGENTS</span>
            <span className="text-[#2196F3]">99.4% VERIFIED</span>
          </div>
        </div>

        {/* Geometric Plane 3 (Foreground Execution Layer) */}
        <div 
          ref={plane3Ref}
          className="absolute w-[56%] h-[130px] bg-[#FFFFFF] border-2 border-[#2196F3] rounded-xl shadow-md flex flex-col justify-between p-5 transform -rotate-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
              03 / AUTOMATED OUTCOME
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 bg-[#E3F2FD] text-[#0D47A1] font-bold rounded">
              EXECUTED
            </span>
          </div>
          <div className="text-xs font-sans font-bold text-[#0F172A] leading-snug">
            Intelligent Workflow Execution & Telemetry
          </div>
        </div>

        {/* Floating System Signal Nodes */}
        <div className="absolute top-2 left-6 text-[9px] font-mono text-[#0D47A1] bg-[#FFFFFF] border border-[#CBD5E1] px-2.5 py-1 rounded shadow-xs font-bold">
          DATA → MODEL
        </div>
        <div className="absolute bottom-2 right-6 text-[9px] font-mono text-[#0D47A1] bg-[#FFFFFF] border border-[#CBD5E1] px-2.5 py-1 rounded shadow-xs font-bold">
          AUTOMATION → OUTCOME
        </div>

      </div>

      {/* Bottom Technical Status Bar */}
      <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] relative z-10 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[#0D47A1] font-bold">QELTRAVA ENGINE</span>
          <span>·</span>
          <span>HUMAN-ACCOUNTABLE</span>
        </div>
        <div className="text-[#2196F3] font-bold tracking-wider uppercase text-[10px]">
          LATENCY: 14MS
        </div>
      </div>
    </div>
  );
}
