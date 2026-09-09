"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Zap, Activity, ArrowRight, CheckCircle2, Layers, Workflow } from 'lucide-react';

export function QeltravaIntelligenceVisual() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden text-[#080B12] select-none">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Header telemetry bar */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB] inline-block" />
          </div>
          <span className="text-xs font-mono text-[#6B7280] tracking-wider uppercase">
            QELTRAVA INTELLIGENCE SYSTEM v4.2
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>LIVE ENGINE RUNNING</span>
        </div>
      </div>

      {/* Main Technical System Flow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column: Business Data Input */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2E75B6]" />
            <span>OPERATIONAL DATA IN</span>
          </div>
          
          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 0 ? 'bg-[#FFFFFF] border-[#2E75B6] shadow-sm' : 'bg-[#F7F9FC] border-[#E5E7EB]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#080B12]">
              <span>ERP & Production Logs</span>
              <span className="text-[10px] font-mono text-[#6B7280]">12.4k req/s</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-[#2E75B6] h-full"
                animate={{ width: activePulse === 0 ? "85%" : "30%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 1 ? 'bg-[#FFFFFF] border-[#2E75B6] shadow-sm' : 'bg-[#F7F9FC] border-[#E5E7EB]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#080B12]">
              <span>Machine & IoT Sensors</span>
              <span className="text-[10px] font-mono text-[#6B7280]">Telemetry</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-[#2E75B6] h-full"
                animate={{ width: activePulse === 1 ? "92%" : "40%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all duration-500 ${activePulse === 2 ? 'bg-[#FFFFFF] border-[#2E75B6] shadow-sm' : 'bg-[#F7F9FC] border-[#E5E7EB]'}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#080B12]">
              <span>Customer & App Data</span>
              <span className="text-[10px] font-mono text-[#6B7280]">Real-time</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="bg-[#2E75B6] h-full"
                animate={{ width: activePulse === 2 ? "88%" : "50%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Center Column: Qeltrava Intelligence Engine */}
        <div className="lg:col-span-6 bg-[#F7F9FC] border border-[#D1D5DB] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#F3F6FA] border-l border-b border-[#D1D5DB] text-[9px] font-mono text-[#2E75B6] font-bold uppercase tracking-wider rounded-bl-lg">
            REASONING LAYER
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-[#2E75B6]" />
            <h4 className="text-sm font-bold text-[#080B12] tracking-wide">QELTRAVA INTELLIGENCE ENGINE</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-xl text-center shadow-xs">
              <Workflow className="w-4 h-4 text-[#2E75B6] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#080B12]">AI Data Pipelines</div>
              <div className="text-[9px] font-mono text-[#6B7280] mt-1">Structured Ingestion</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-xl text-center shadow-xs">
              <Layers className="w-4 h-4 text-[#2E75B6] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#080B12]">ML Systems & RAG</div>
              <div className="text-[9px] font-mono text-[#6B7280] mt-1">Domain Reasoning</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-xl text-center shadow-xs">
              <Activity className="w-4 h-4 text-[#2E75B6] mx-auto mb-1.5" />
              <div className="text-[11px] font-bold text-[#080B12]">Autonomous Agents</div>
              <div className="text-[9px] font-mono text-[#6B7280] mt-1">Task Execution</div>
            </div>
          </div>

          {/* Dynamic reasoning telemetry pulse */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#4B5563]">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Optimization Confidence:</span>
            </div>
            <span className="font-bold text-emerald-700">99.4% Verified</span>
          </div>
        </div>

        {/* Right Column: Measurable Outcomes */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>MEASURABLE OUTCOMES</span>
          </div>

          <div className="bg-[#F7F9FC] border border-[#E5E7EB] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#080B12]">Automated Decisions</div>
              <div className="text-[10px] font-mono text-[#6B7280]">Zero latency execution</div>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              Active
            </span>
          </div>

          <div className="bg-[#F7F9FC] border border-[#E5E7EB] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#080B12]">Operational Actions</div>
              <div className="text-[10px] font-mono text-[#6B7280]">Triggered workflows</div>
            </div>
            <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
              Synced
            </span>
          </div>

          <div className="bg-[#F7F9FC] border border-[#E5E7EB] p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#080B12]">Business Impact</div>
              <div className="text-[10px] font-mono text-[#6B7280]">Cost & Speed ROI</div>
            </div>
            <span className="text-xs font-bold font-mono text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-200">
              Measured
            </span>
          </div>
        </div>

      </div>

      {/* Footer System Status Bar */}
      <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6B7280] gap-3 relative z-10">
        <div className="flex items-center gap-4">
          <span>LATENCY: <strong className="text-[#080B12]">14ms</strong></span>
          <span>HUMAN OVERSIGHT: <strong className="text-emerald-700">ENABLED</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#2E75B6] font-bold">
          <span>ENGINEERED FOR REAL-WORLD OPERATIONS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
