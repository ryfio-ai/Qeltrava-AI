"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';
import { Factory, Database, Cpu, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export function QeltravaManufacturingSignal() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const stages = [
    { id: '01', title: 'MACHINE', subtitle: 'Sensors & PLC Telemetry', icon: Factory },
    { id: '02', title: 'DATA', subtitle: 'Ingestion & Validation', icon: Database },
    { id: '03', title: 'INTELLIGENCE', subtitle: 'ML & SPC Capability Math', icon: Cpu },
    { id: '04', title: 'DECISION', subtitle: 'Safe Boundary Verification', icon: Zap },
    { id: '05', title: 'ACTION', subtitle: '7-Batch SOP & Setpoints', icon: ArrowRight },
    { id: '06', title: 'OUTCOME', subtitle: 'Quality Passports & PPAP', icon: CheckCircle2 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [stages.length]);

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden text-[#0F172A] select-none">
      
      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #90CAF9 1px, transparent 1px), linear-gradient(to bottom, #90CAF9 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header telemetry */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2196F3] inline-block" />
          <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
            QELTRAVA / MANUFACTURING SIGNAL PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
          SIGNAL LOOP: RUNNING
        </span>
      </div>

      {/* Pipeline 6-Stage Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10 mb-8">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all duration-500 relative flex flex-col justify-between min-h-[120px] ${
                isActive
                  ? 'bg-[#E3F2FD] border-[#2196F3] shadow-md'
                  : isPassed
                  ? 'bg-[#F8FAFC] border-[#90CAF9]/60'
                  : 'bg-[#FFFFFF] border-[#E2E8F0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#0D47A1]' : 'text-[#64748B]'}`}>
                    {stage.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2196F3]' : 'text-[#94A3B8]'}`} />
                </div>
                <div className={`text-xs font-bold font-anek mb-1 ${isActive ? 'text-[#0D47A1]' : 'text-[#0F172A]'}`}>
                  {stage.title}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#475569] leading-tight pt-2 border-t border-[#E2E8F0]/60">
                {stage.subtitle}
              </div>

              {isActive && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#2196F3] animate-ping" />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B] relative z-10">
        <span>CURRENT SIGNAL NODE: <strong className="text-[#0D47A1] font-bold">{stages[activeStep].title}</strong></span>
        <span className="text-[#2196F3] font-bold">AUTOMATED INDUSTRIAL RUN</span>
      </div>
    </div>
  );
}
