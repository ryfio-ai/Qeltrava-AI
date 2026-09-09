"use client";

import React, { useState } from 'react';
import { BuilderShell } from '../builder/BuilderShell';
import { BuilderInput } from '../builder/BuilderInput';
import { BuilderResult } from '../builder/BuilderResult';
import { BuilderScore } from '../builder/BuilderScore';
import { BuilderExport } from '../builder/BuilderExport';
import { BuilderDisclaimer } from '../builder/BuilderDisclaimer';
import { BuilderCTA } from '../builder/BuilderCTA';
import { AIReadinessResult } from '@/lib/builder-lab/scoring/ai-readiness';
import { ArrowRight, Cpu } from 'lucide-react';

export function AIReadinessAssessment() {
  const [companyProduct, setCompanyProduct] = useState('');
  const [processName, setProcessName] = useState('');
  const [dataVolume, setDataVolume] = useState('Medium');
  const [manualEffort, setManualEffort] = useState('High');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIReadinessResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyProduct.trim() || !processName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyProduct, processName, dataVolume, manualEffort })
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
      title="Workflow → AI Opportunity Scorecard"
      subtitle="Assess whether your process warrants custom AI agents or if traditional software achieves 10x ROI with lower risk."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <BuilderInput
              label="Company / Product Name *"
              value={companyProduct}
              onChange={(e) => setCompanyProduct(e.target.value)}
              placeholder="e.g. StaySeat operations software"
            />

            <BuilderInput
              label="Target Workflow / Process to Evaluate *"
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              placeholder="e.g. Invoice matching & exception handling"
            />

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#080B12] mb-2">
                Data Volume
              </label>
              <select
                value={dataVolume}
                onChange={(e) => setDataVolume(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-xl px-4 py-3 text-sm text-[#080B12] focus:outline-none focus:border-[#2E75B6] shadow-sm"
              >
                <option value="Low">Low (&lt; 1,000 records/mo)</option>
                <option value="Medium">Medium (1,000 - 50,000 records/mo)</option>
                <option value="High">High (&gt; 50,000 records/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#080B12] mb-2">
                Current Manual Overhead
              </label>
              <select
                value={manualEffort}
                onChange={(e) => setManualEffort(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-xl px-4 py-3 text-sm text-[#080B12] focus:outline-none focus:border-[#2E75B6] shadow-sm"
              >
                <option value="Low">Low (&lt; 5 hours/week)</option>
                <option value="Medium">Medium (5 - 20 hours/week)</option>
                <option value="High">High (&gt; 20 hours/week)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !companyProduct.trim() || !processName.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E75B6] hover:bg-[#256096] text-white font-mono font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Evaluating Score...' : 'Calculate AI Readiness Score'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          {result ? (
            <BuilderResult title="AI Opportunity Evaluation">
              <div className="space-y-6">
                <BuilderScore
                  score={result.overallScore}
                  label="AI Opportunity Index"
                  description={result.explanation}
                />

                {/* Score Breakdown Bars */}
                <div className="space-y-3 p-4 bg-[#F7F9FC] rounded-xl border border-[#E5E7EB]">
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider">Scoring Breakdown</h5>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[#080B12] mb-1 font-semibold">
                        <span>Intelligent Automation Potential</span>
                        <span className="font-mono font-bold">{result.breakdown.automation}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${result.breakdown.automation}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#080B12] mb-1 font-semibold">
                        <span>Predictive Intelligence Opportunity</span>
                        <span className="font-mono font-bold">{result.breakdown.prediction}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2E75B6] rounded-full" style={{ width: `${result.breakdown.prediction}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#080B12] mb-1 font-semibold">
                        <span>Traditional Software Leverage (ACID Rules)</span>
                        <span className="font-mono font-bold">{result.breakdown.traditionalSoftware}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full bg-amber-600 rounded-full" style={{ width: `${result.breakdown.traditionalSoftware}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value Areas */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono font-bold text-[#2E75B6] uppercase tracking-wider">Engineering Recommendations</h5>
                  <div className="space-y-2">
                    {result.valueAreas.map((area, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5E7EB]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#080B12] text-sm">{area.title}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${area.type === 'AI' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                            {area.recommendation}
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563]">{area.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <BuilderExport data={result} filename="qeltrava-ai-readiness" />
                <BuilderCTA text="Schedule an AI Architecture review with Qeltrava engineering." />
                <BuilderDisclaimer />
              </div>
            </BuilderResult>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-[#D1D5DB] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F7F9FC]">
              <Cpu className="w-12 h-12 text-[#6B7280] mb-3" />
              <h4 className="text-lg font-bold text-[#080B12] mb-1">Your AI Scorecard Will Appear Here</h4>
              <p className="text-xs text-[#6B7280] max-w-md">
                Enter your company and process parameters to compute your AI Opportunity Scorecard and engineering leverage breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderShell>
  );
}
