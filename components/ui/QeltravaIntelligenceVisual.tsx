"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Zap, Activity, ArrowRight, CheckCircle2, Layers, Server, Workflow } from 'lucide-react';

export function QeltravaIntelligenceVisual() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0A0F1A] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-slate-200 select-none">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Header telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
            QELTRAVA INTELLIGENCE SYSTEM v4.2
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>LIVE ENGINE RUNNING</span>
        </div>
      </div>

      {/* Main Technical System Flow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column: Business Data Input */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2E75B6]" />
            <span>OPERATIONAL DATA IN</span>
          </div>
          
          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 0 ? 'bg-slate-900 border-[#2E75B6] shadow-lg shadow-[#2E75B6]/10' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>ERP & Production Logs</span>
              <span className="text-[10px] font-mono text-slate-400">12.4k req/s</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-[#2E75B6] h-full"
                animate={{ width: activePulse === 0 ? "85%" : "30%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 1 ? 'bg-slate-900 border-[#2E75B6] shadow-lg shadow-[#2E75B6]/10' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>Machine & IoT Sensors</span>
              <span className="text-[10px] font-mono text-slate-400">Telemetry</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-indigo-500 h-full"
                animate={{ width: activePulse === 1 ? "92%" : "40%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 2 ? 'bg-slate-900 border-[#2E75B6] shadow-lg shadow-[#2E75B6]/10' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>Customer & App Data</span>
              <span className="text-[10px] font-mono text-slate-400">Real-time</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-teal-400 h-full"
                animate={{ width: activePulse === 2 ? "88%" : "50%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Center Column: Qeltrava Intelligence Engine */}
        <div className="lg:col-span-6 bg-slate-950/80 border border-[#2E75B6]/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#2E75B6]/20 border-l border-b border-[#2E75B6]/30 text-[9px] font-mono text-blue-300 font-bold uppercase tracking-wider rounded-bl-lg">
            REASONING LAYER
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-[#2E75B6]" />
            <h4 className="text-sm font-bold text-white tracking-wide">QELTRAVA INTELLIGENCE ENGINE</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
              <Workflow className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-white">AI Data Pipelines</div>
              <div className="text-[9px] font-mono text-slate-400 mt-1">Structured Ingestion</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
              <Layers className="w-4 h-4 text-teal-400 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-white">ML Systems & RAG</div>
              <div className="text-[9px] font-mono text-slate-400 mt-1">Domain Reasoning</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
              <Activity className="w-4 h-4 text-indigo-400 mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-white">Autonomous Agents</div>
              <div className="text-[9px] font-mono text-slate-400 mt-1">Task Execution</div>
            </div>
          </div>

          {/* Dynamic reasoning telemetry pulse */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Optimization Confidence:</span>
            </div>
            <span className="font-bold text-emerald-400">99.4% Verified</span>
          </div>
        </div>

        {/* Right Column: Measurable Outcomes */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>MEASURABLE OUTCOMES</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Automated Decisions</div>
              <div className="text-[10px] font-mono text-slate-400">Zero latency execution</div>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Operational Actions</div>
              <div className="text-[10px] font-mono text-slate-400">Triggered workflows</div>
            </div>
            <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
              Synced
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Business Impact</div>
              <div className="text-[10px] font-mono text-slate-400">Cost & Speed ROI</div>
            </div>
            <span className="text-xs font-bold font-mono text-teal-400 bg-teal-500/10 px-2 py-1 rounded border border-teal-500/20">
              Measured
            </span>
          </div>
        </div>

      </div>

      {/* Footer System Status Bar */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-3 relative z-10">
        <div className="flex items-center gap-4">
          <span>LATENCY: <strong className="text-white">14ms</strong></span>
          <span>HUMAN OVERSIGHT: <strong className="text-emerald-400">ENABLED</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#2E75B6]">
          <span>ENGINEERED FOR REAL-WORLD OPERATIONS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
