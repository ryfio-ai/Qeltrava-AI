"use client";

import React, { useState } from 'react';
import { BuilderShell } from '../builder/BuilderShell';
import { BuilderInput } from '../builder/BuilderInput';
import { BuilderProgress } from '../builder/BuilderProgress';
import { BuilderResult } from '../builder/BuilderResult';
import { BuilderExport } from '../builder/BuilderExport';
import { BuilderDisclaimer } from '../builder/BuilderDisclaimer';
import { BuilderCTA } from '../builder/BuilderCTA';
import { BuildBlueprintResult } from '@/lib/builder-lab/blueprint/build-blueprint';
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Zap } from 'lucide-react';

export function QeltravaBuildLab() {
  const [idea, setIdea] = useState('');
  const [users, setUsers] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BuildBlueprintResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/build-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, users, industry })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BuilderShell
      title="Idea → Product Blueprint Generator"
      subtitle="Transform your software or AI product concept into a 10-point technical brief, architectural layout, and execution roadmap instantly."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <BuilderInput
              label="Product Idea or Problem Statement *"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. An automated inventory forecasting system for mid-size automotive manufacturers..."
              multiline
              rows={4}
            />

            <BuilderInput
              label="Target Users / Customers"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              placeholder="e.g. Factory floor managers, supply chain leads"
            />

            <BuilderInput
              label="Industry / Domain"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Manufacturing, Fintech, Logistics"
            />

            <button
              type="submit"
              disabled={loading || idea.trim().length < 5}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2E75B6] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono font-bold text-sm tracking-wide shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Generating Blueprint...' : 'Generate Blueprint'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {loading && <BuilderProgress steps={['Analyzing Input', 'Architecting System', 'Building Roadmap', 'Formulating Blueprint']} currentStep={2} />}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          {result ? (
            <BuilderResult title="Technical Product Brief">
              <div className="space-y-6 text-sm text-slate-300">
                {/* Problem & Users */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-1">01. Problem & Target Users</h5>
                  <p className="text-white font-medium mb-1">{result.problemDefinition}</p>
                  <p className="text-xs text-slate-400">Target Users: {result.targetUsers}</p>
                </div>

                {/* Core Workflow */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-2">02. Core Operational Workflow</h5>
                  <div className="space-y-2">
                    {result.coreWorkflow.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#2E75B6]/20 text-[#2E75B6] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-white block">{item.step}</span>
                          <span className="text-xs text-slate-400">{item.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture & AI Layer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-2 text-white font-bold mb-2">
                      <Cpu className="w-4 h-4 text-[#2E75B6]" />
                      <span>System Architecture</span>
                    </div>
                    <p className="text-xs text-slate-300">{result.systemArchitecture}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-2 text-white font-bold mb-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>AI Model Strategy</span>
                    </div>
                    <p className="text-xs text-slate-300">{result.aiLayer.modelCategory}</p>
                  </div>
                </div>

                {/* Engineering Risk & Roadmap */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-2">03. Execution Roadmap</h5>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-white">Phase 1</span>
                      <span className="text-slate-400">{result.roadmap.phase1}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-white">Phase 2</span>
                      <span className="text-slate-400">{result.roadmap.phase2}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="font-semibold text-white">Phase 3</span>
                      <span className="text-slate-400">{result.roadmap.phase3}</span>
                    </div>
                  </div>
                </div>

                <BuilderExport data={result} filename="qeltrava-build-blueprint" />
                <BuilderCTA text="Turn this blueprint into a production system with Qeltrava engineering." />
                <BuilderDisclaimer />
              </div>
            </BuilderResult>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <Cpu className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-lg font-bold text-slate-400 mb-1">Your Blueprint Will Appear Here</h4>
              <p className="text-xs text-slate-500 max-w-md">
                Enter your product idea on the left to generate an operational workflow, technical stack, AI model recommendation, and execution plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderShell>
  );
}
