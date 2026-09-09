"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap';
import { Database, Cpu, Zap, Activity, ArrowRight, CheckCircle2, Layers, Workflow } from 'lucide-react';

export function QeltravaIntelligenceVisual() {
  const [activePulse, setActivePulse] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!canvasRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      canvasRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: canvasRef });

  return (
    <div ref={canvasRef} className="w-full bg-[#FFFFFF] border border-[#90CAF9]/60 rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden text-[#0F172A] select-none">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #90CAF9 1px, transparent 1px), linear-gradient(to bottom, #90CAF9 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Header telemetry bar */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#90CAF9] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2196F3] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D47A1] inline-block" />
          </div>
          <span className="text-xs font-mono text-[#0D47A1] tracking-wider uppercase font-bold">
            QELTRAVA INTELLIGENCE SYSTEM v4.2
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
          <span>LIVE ENGINE RUNNING</span>
        </div>
      </div>

      {/* Main Technical System Flow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column: Business Data Input */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2196F3]" />
            <span>OPERATIONAL DATA IN</span>
          </div>
          
          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 0 ? 'bg-[#FFFFFF] border-[#2196F3] shadow-xs' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>ERP & Production Logs</span>
              <span className="text-[10px] font-mono text-[#64748B]">12.4k req/s</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#2196F3] h-full transition-all duration-700"
                style={{ width: activePulse === 0 ? "85%" : "30%" }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 1 ? 'bg-[#FFFFFF] border-[#2196F3] shadow-xs' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Machine & IoT Sensors</span>
              <span className="text-[10px] font-mono text-[#64748B]">Telemetry</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#2196F3] h-full transition-all duration-700"
                style={{ width: activePulse === 1 ? "92%" : "40%" }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 2 ? 'bg-[#FFFFFF] border-[#2196F3] shadow-xs' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Customer & App Data</span>
              <span className="text-[10px] font-mono text-[#64748B]">Real-time</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#2196F3] h-full transition-all duration-700"
                style={{ width: activePulse === 2 ? "88%" : "50%" }}
              />
            </div>
          </div>
        </div>

        {/* Center Column: Qeltrava Intelligence Engine */}
        <div className="lg:col-span-6 bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#FFFFFF] border-l border-b border-[#90CAF9] text-[9px] font-mono text-[#0D47A1] font-bold uppercase tracking-wider rounded-bl-lg">
            REASONING LAYER
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-[#2196F3]" />
            <h4 className="text-sm font-bold text-[#0D47A1] tracking-wide font-anek">QELTRAVA INTELLIGENCE ENGINE</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-[#FFFFFF] border border-[#90CAF9]/60 p-3 rounded-xl text-center shadow-xs">
              <Workflow className="w-4 h-4 text-[#2196F3] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#0D47A1]">AI Data Pipelines</div>
              <div className="text-[9px] font-mono text-[#475569] mt-1">Structured Ingestion</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#90CAF9]/60 p-3 rounded-xl text-center shadow-xs">
              <Layers className="w-4 h-4 text-[#2196F3] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#0D47A1]">ML Systems & RAG</div>
              <div className="text-[9px] font-mono text-[#475569] mt-1">Domain Reasoning</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#90CAF9]/60 p-3 rounded-xl text-center shadow-xs">
              <Activity className="w-4 h-4 text-[#2196F3] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#0D47A1]">Autonomous Agents</div>
              <div className="text-[9px] font-mono text-[#475569] mt-1">Task Execution</div>
            </div>
          </div>

          {/* Dynamic reasoning telemetry pulse */}
          <div className="bg-[#FFFFFF] border border-[#90CAF9] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#475569]">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Optimization Confidence:</span>
            </div>
            <span className="font-bold text-emerald-800">99.4% Verified</span>
          </div>
        </div>

        {/* Right Column: Measurable Outcomes */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>MEASURABLE OUTCOMES</span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Automated Decisions</div>
              <div className="text-[10px] font-mono text-[#64748B]">Zero latency execution</div>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              Active
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Operational Actions</div>
              <div className="text-[10px] font-mono text-[#64748B]">Triggered workflows</div>
            </div>
            <span className="text-xs font-bold font-mono text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-200">
              Synced
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">Business Impact</div>
              <div className="text-[10px] font-mono text-[#64748B]">Cost & Speed ROI</div>
            </div>
            <span className="text-xs font-bold font-mono text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200">
              Measured
            </span>
          </div>
        </div>

      </div>

      {/* Footer System Status Bar */}
      <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] gap-3 relative z-10">
        <div className="flex items-center gap-4">
          <span>LATENCY: <strong className="text-[#0F172A]">14ms</strong></span>
          <span>HUMAN OVERSIGHT: <strong className="text-emerald-800">ENABLED</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#0D47A1] font-bold">
          <span>ENGINEERED FOR REAL-WORLD OPERATIONS</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2196F3]" />
        </div>
      </div>
    </div>
  );
}
