"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';
import { Factory, Database, Cpu, Activity, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export function IndustrialDataFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const flowSteps = [
    { id: 1, title: 'MACHINE DATA', icon: Factory, desc: 'IoT, PLC, sensors & production logs', color: 'text-amber-800 border-amber-200 bg-amber-50' },
    { id: 2, title: 'DATA PLATFORM', icon: Database, desc: 'Unified industrial telemetry ingestion', color: 'text-blue-800 border-blue-200 bg-blue-50' },
    { id: 3, title: 'AI / ML ENGINE', icon: Cpu, desc: 'Pattern recognition & predictive models', color: 'text-indigo-800 border-indigo-200 bg-indigo-50' },
    { id: 4, title: 'PROCESS INTELLIGENCE', icon: Activity, desc: 'Real-time throughput & anomaly detection', color: 'text-teal-800 border-teal-200 bg-teal-50' },
    { id: 5, title: 'DECISION', icon: Lightbulb, desc: 'Optimal operational parameters', color: 'text-purple-800 border-purple-200 bg-purple-50' },
    { id: 6, title: 'ACTION', icon: CheckCircle2, desc: 'Automated parameter feedback & operator alert', color: 'text-emerald-800 border-emerald-200 bg-emerald-50' }
  ];

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const cards = containerRef.current.querySelectorAll('.flow-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
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
    <div ref={containerRef} className="w-full bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl p-6 md:p-8 shadow-xs text-[#0F172A] select-none">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Factory className="w-4 h-4 text-[#2196F3]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D47A1]">
            QELTRAVA INDUSTRIAL INTELLIGENCE PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-widest hidden sm:inline">
          REAL-TIME FACTORY DATA LOOP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              className={`flow-card border ${step.color} p-4 rounded-xl transition-all duration-300 relative group cursor-pointer hover:-translate-y-1 shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#64748B]">0{step.id}</span>
                <Icon className={`w-4 h-4 ${step.color.split(' ')[0]}`} />
              </div>
              <h5 className="text-xs font-bold text-[#0D47A1] tracking-tight mb-1 font-anek">{step.title}</h5>
              <p className="text-[10px] text-[#475569] leading-normal font-sans">{step.desc}</p>
              
              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#90CAF9]">
                  <ArrowRight className="w-3.5 h-3.5 text-[#2196F3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] gap-2">
        <span>FACTORY DATA EFFICIENCY: <strong className="text-emerald-800">+34% OVERALL EQUIPMENT EFFECTIVENESS (OEE)</strong></span>
        <span className="text-[#64748B]">Continuous closed-loop optimization</span>
      </div>
    </div>
  );
}
