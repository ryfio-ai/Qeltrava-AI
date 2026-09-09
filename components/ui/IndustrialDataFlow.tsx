"use client";

import React, { useState } from 'react';
import { Factory, Database, Cpu, Activity, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export function IndustrialDataFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const flowSteps = [
    { id: 1, title: 'MACHINE DATA', icon: Factory, desc: 'IoT, PLC, sensors & production logs', color: 'text-amber-700 border-amber-200 bg-amber-50' },
    { id: 2, title: 'DATA PLATFORM', icon: Database, desc: 'Unified industrial telemetry ingestion', color: 'text-blue-700 border-blue-200 bg-blue-50' },
    { id: 3, title: 'AI / ML ENGINE', icon: Cpu, desc: 'Pattern recognition & predictive models', color: 'text-indigo-700 border-indigo-200 bg-indigo-50' },
    { id: 4, title: 'PROCESS INTELLIGENCE', icon: Activity, desc: 'Real-time throughput & anomaly detection', color: 'text-teal-700 border-teal-200 bg-teal-50' },
    { id: 5, title: 'DECISION', icon: Lightbulb, desc: 'Optimal operational parameters', color: 'text-purple-700 border-purple-200 bg-purple-50' },
    { id: 6, title: 'ACTION', icon: CheckCircle2, desc: 'Automated parameter feedback & operator alert', color: 'text-emerald-700 border-emerald-200 bg-emerald-50' }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm text-[#080B12] select-none">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Factory className="w-4 h-4 text-[#2E75B6]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#080B12]">
            QELTRAVA INDUSTRIAL INTELLIGENCE PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-widest hidden sm:inline">
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
              className={`border ${step.color} p-4 rounded-xl transition-all duration-300 relative group cursor-pointer hover:-translate-y-1 shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#6B7280]">0{step.id}</span>
                <Icon className={`w-4 h-4 ${step.color.split(' ')[0]}`} />
              </div>
              <h5 className="text-xs font-extrabold text-[#080B12] tracking-tight mb-1">{step.title}</h5>
              <p className="text-[10px] text-[#4B5563] leading-normal font-sans">{step.desc}</p>
              
              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#9CA3AF]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6B7280] gap-2">
        <span>FACTORY DATA EFFICIENCY: <strong className="text-emerald-700">+34% OVERALL EQUIPMENT EFFECTIVENESS (OEE)</strong></span>
        <span className="text-[#6B7280]">Continuous closed-loop optimization</span>
      </div>
    </div>
  );
}
