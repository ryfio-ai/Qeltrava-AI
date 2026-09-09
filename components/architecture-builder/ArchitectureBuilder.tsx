"use client";

import React, { useState } from 'react';
import { BuilderShell } from '../builder/BuilderShell';
import { BuilderInput } from '../builder/BuilderInput';
import { BuilderResult } from '../builder/BuilderResult';
import { BuilderExport } from '../builder/BuilderExport';
import { BuilderDisclaimer } from '../builder/BuilderDisclaimer';
import { BuilderCTA } from '../builder/BuilderCTA';
import { ArchitectureResult } from '@/lib/builder-lab/architecture/architecture-engine';
import { ArrowRight, Layers, DollarSign } from 'lucide-react';

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
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#080B12] mb-2">
                Target User Scale
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-xl px-4 py-3 text-sm text-[#080B12] focus:outline-none focus:border-[#2E75B6] shadow-sm"
              >
                <option value="Early Scale (< 10k users)">Early Scale (&lt; 10k active users)</option>
                <option value="Medium (10k-100k users)">Medium (10k - 100k active users)</option>
                <option value="High (100k+ users)">High (100k+ active users)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#080B12] mb-2">
                AI / ML Ingestion Requirements
              </label>
              <select
                value={aiRequirements}
                onChange={(e) => setAiRequirements(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-xl px-4 py-3 text-sm text-[#080B12] focus:outline-none focus:border-[#2E75B6] shadow-sm"
              >
                <option value="None / Traditional Software Only">None (Pure Software / Deterministic)</option>
                <option value="RAG & LLM Agents">RAG & LLM Reasoning Agents</option>
                <option value="Real-time Computer Vision / IoT">Real-time Stream / IoT Processing</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !productType.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E75B6] hover:bg-[#256096] text-white font-mono font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
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
                <div className="flex items-center justify-between p-3 bg-[#F7F9FC] rounded-xl border border-[#E5E7EB] text-xs">
                  <div className="flex items-center gap-2 text-[#4B5563]">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Est. Cloud Infra: <strong className="text-[#080B12] font-mono">{result.estimatedInfrastructureCost}</strong></span>
                  </div>
                </div>

                {/* System Diagram (Light Canvas) */}
                <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E5E7EB]">
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-2">System Topology</h5>
                  <pre className="text-[11px] font-mono text-[#080B12] overflow-x-auto p-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded">
                    {result.diagram.join('\n')}
                  </pre>
                </div>

                {/* Stack Recommendations */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider mb-3">Technology Selection & Rationale</h5>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5E7EB] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-[#2E75B6]">{rec.layer}</span>
                          <span className="font-mono text-[#080B12] font-bold">{rec.technology}</span>
                        </div>
                        <p className="text-[#080B12] mb-1"><strong>WHY:</strong> {rec.why}</p>
                        <p className="text-[#6B7280] text-[11px]"><strong>Alternative:</strong> {rec.alternative}</p>
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
            <div className="h-full min-h-[300px] border border-dashed border-[#D1D5DB] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F7F9FC]">
              <Layers className="w-12 h-12 text-[#6B7280] mb-3" />
              <h4 className="text-lg font-bold text-[#080B12] mb-1">Your System Topology Will Appear Here</h4>
              <p className="text-xs text-[#6B7280] max-w-md">
                Select your application type and scale parameters to generate a complete technology stack and topological cloud diagram.
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderShell>
  );
}
