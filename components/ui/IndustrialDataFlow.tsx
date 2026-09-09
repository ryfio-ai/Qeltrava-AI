"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Database, Cpu, Activity, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export function IndustrialDataFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const flowSteps = [
    { id: 1, title: 'MACHINE DATA', icon: Factory, desc: 'IoT, PLC, sensors & production logs', color: 'text-amber-400 border-amber-500/30' },
    { id: 2, title: 'DATA PLATFORM', icon: Database, desc: 'Unified industrial telemetry ingestion', color: 'text-blue-400 border-blue-500/30' },
    { id: 3, title: 'AI / ML ENGINE', icon: Cpu, desc: 'Pattern recognition & predictive models', color: 'text-indigo-400 border-indigo-500/30' },
    { id: 4, title: 'PROCESS INTELLIGENCE', icon: Activity, desc: 'Real-time throughput & anomaly detection', color: 'text-teal-400 border-teal-500/30' },
    { id: 5, title: 'DECISION', icon: Lightbulb, desc: 'Optimal operational parameters', color: 'text-purple-400 border-purple-500/30' },
    { id: 6, title: 'ACTION', icon: CheckCircle2, desc: 'Automated parameter feedback & operator alert', color: 'text-emerald-400 border-emerald-500/30' }
  ];

  return (
    <div className="w-full bg-[#0A0F1A] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-200 select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Factory className="w-4 h-4 text-[#2E75B6]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            QELTRAVA INDUSTRIAL INTELLIGENCE PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
          REAL-TIME FACTORY DATA LOOP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              className={`bg-slate-900/90 border ${step.color} p-4 rounded-xl transition-all duration-300 relative group cursor-pointer hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">0{step.id}</span>
                <Icon className={`w-4 h-4 ${step.color.split(' ')[0]}`} />
              </div>
              <h5 className="text-xs font-extrabold text-white tracking-tight mb-1">{step.title}</h5>
              <p className="text-[10px] text-slate-400 leading-normal font-sans">{step.desc}</p>
              
              {index < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <span>FACTORY DATA EFFICIENCY: <strong className="text-emerald-400">+34% OVERALL EQUIPMENT EFFECTIVENESS (OEE)</strong></span>
        <span className="text-slate-500">Continuous closed-loop optimization</span>
      </div>
    </div>
  );
}
