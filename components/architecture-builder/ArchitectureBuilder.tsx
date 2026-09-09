"use client";

import React, { useState } from 'react';
import { BuilderShell } from '../builder/BuilderShell';
import { BuilderInput } from '../builder/BuilderInput';
import { BuilderResult } from '../builder/BuilderResult';
import { BuilderExport } from '../builder/BuilderExport';
import { BuilderDisclaimer } from '../builder/BuilderDisclaimer';
import { BuilderCTA } from '../builder/BuilderCTA';
import { ArchitectureResult } from '@/lib/builder-lab/architecture/architecture-engine';
import { ArrowRight, Cpu, Layers, ShieldCheck, DollarSign } from 'lucide-react';

export function ArchitectureBuilder() {
  const [productType, setProductType] = useState('');
  const [scale, setScale] = useState('Medium (10k-100k users)');
  const [aiRequirements, setAiRequirements] = useState('RAG & LLM Agents');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArchitectureResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productType.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/architecture-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType, scale, aiRequirements })
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
      title="System Architecture Generator"
      subtitle="Design end-to-end full-stack software and AI cloud architecture with rationale-backed technology selections."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <BuilderInput
              label="System / Application Type *"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              placeholder="e.g. Enterprise RAG Knowledge Hub"
            />

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Target User Scale
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-[#2E75B6]"
              >
                <option value="Early Scale (< 10k users)">Early Scale (&lt; 10k active users)</option>
                <option value="Medium (10k-100k users)">Medium (10k - 100k active users)</option>
                <option value="High (100k+ users)">High (100k+ active users)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                AI / ML Ingestion Requirements
              </label>
              <select
                value={aiRequirements}
                onChange={(e) => setAiRequirements(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-[#2E75B6]"
              >
                <option value="None / Traditional Software Only">None (Pure Software / Deterministic)</option>
                <option value="RAG & LLM Agents">RAG & LLM Reasoning Agents</option>
                <option value="Real-time Computer Vision / IoT">Real-time Stream / IoT Processing</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !productType.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2E75B6] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono font-bold text-sm tracking-wide shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Designing Architecture...' : 'Generate Architecture'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          {result ? (
            <BuilderResult title="System Blueprint & Technology Stack">
              <div className="space-y-6">
                {/* Cost & Scale Header */}
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Est. Cloud Infra: <strong className="text-white font-mono">{result.estimatedInfrastructureCost}</strong></span>
                  </div>
                </div>

                {/* System Diagram */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-2">System Topology</h5>
                  <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto p-2 bg-slate-900/50 rounded">
                    {result.diagram.join('\n')}
                  </pre>
                </div>

                {/* Stack Recommendations */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-3">Technology Selection & Rationale</h5>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-[#2E75B6]">{rec.layer}</span>
                          <span className="font-mono text-white font-semibold">{rec.technology}</span>
                        </div>
                        <p className="text-slate-300 mb-1"><strong>WHY:</strong> {rec.why}</p>
                        <p className="text-slate-400 text-[11px]"><strong>Alternative:</strong> {rec.alternative}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <BuilderExport data={result} filename="qeltrava-system-architecture" />
                <BuilderCTA text="Review this architecture blueprint with a Qeltrava principal engineer." />
                <BuilderDisclaimer />
              </div>
            </BuilderResult>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <Layers className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-lg font-bold text-slate-400 mb-1">Your System Topology Will Appear Here</h4>
              <p className="text-xs text-slate-500 max-w-md">
                Select your application type and scale parameters to generate a complete technology stack and topological cloud diagram.
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderShell>
  );
}
