"use client";

import React, { useState } from 'react';
import { BuilderShell } from '../builder/BuilderShell';
import { BuilderInput } from '../builder/BuilderInput';
import { BuilderResult } from '../builder/BuilderResult';
import { BuilderExport } from '../builder/BuilderExport';
import { BuilderDisclaimer } from '../builder/BuilderDisclaimer';
import { BuilderCTA } from '../builder/BuilderCTA';
import { MVPClassifierResult } from '@/lib/builder-lab/mvp/mvp-classifier';
import { ArrowRight, CheckCircle2, XCircle, Clock, Users } from 'lucide-react';

export function MVPPlanner() {
  const [productIdea, setProductIdea] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MVPClassifierResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productIdea.trim() || !featuresText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/mvp-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIdea, featuresText })
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
      title="MVP Scope Classifier"
      subtitle="Classify product features into MVP (P0/P1), V2 expansion, and 'Don't Build Yet' categories to protect launch timeline and capital."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <BuilderInput
              label="Product Overview *"
              value={productIdea}
              onChange={(e) => setProductIdea(e.target.value)}
              placeholder="e.g. B2B SaaS for automated logistics dispatching..."
            />

            <BuilderInput
              label="Feature Wishlist (Comma or line separated) *"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={`User login & workspace\nAutomated route calculation\nReal-time GPS tracking\nNative iOS app\nCustom PDF reporting`}
              multiline
              rows={6}
            />

            <button
              type="submit"
              disabled={loading || !productIdea.trim() || !featuresText.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2E75B6] hover:bg-[#256096] text-white font-mono font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Classifying Features...' : 'Classify MVP Scope'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          {result ? (
            <BuilderResult title="MVP Scope Classification Matrix">
              <div className="space-y-6">
                {/* Meta stats */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#F7F9FC] rounded-xl border border-[#E5E7EB] text-xs">
                  <div className="flex items-center gap-2 text-[#4B5563]">
                    <Clock className="w-4 h-4 text-[#2E75B6]" />
                    <span>Timeline: <strong className="text-[#080B12]">{result.recommendedTimeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4B5563]">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Team: <strong className="text-[#080B12]">{result.estimatedTeamSize}</strong></span>
                  </div>
                </div>

                {/* MVP Core Features */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>MVP Core Scope (Must Build for V1)</span>
                  </h5>
                  <div className="space-y-2">
                    {result.mvpFeatures.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-[#080B12] text-xs block">{item.feature}</span>
                          <span className="text-[11px] text-[#4B5563]">{item.reason}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* V2 Expansion */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#2E75B6]" />
                    <span>V2 Post-Launch Scope</span>
                  </h5>
                  <div className="space-y-2">
                    {result.v2Features.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <span className="font-semibold text-[#080B12] text-xs block">{item.feature}</span>
                        <span className="text-[11px] text-[#4B5563]">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Don't Build Yet */}
                <div>
                  <h5 className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-amber-600" />
                    <span>Don't Build Yet (Defer to Avoid Overhead)</span>
                  </h5>
                  <div className="space-y-2">
                    {result.dontBuildYet.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <span className="font-semibold text-amber-900 text-xs block">{item.feature}</span>
                        <span className="text-[11px] text-[#4B5563]">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <BuilderExport data={result} filename="qeltrava-mvp-plan" />
                <BuilderCTA text="Review MVP scope and architecture with a Qeltrava senior tech lead." />
                <BuilderDisclaimer />
              </div>
            </BuilderResult>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-[#D1D5DB] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F7F9FC]">
              <CheckCircle2 className="w-12 h-12 text-[#6B7280] mb-3" />
              <h4 className="text-lg font-bold text-[#080B12] mb-1">Your Scope Matrix Will Appear Here</h4>
              <p className="text-xs text-[#6B7280] max-w-md">
                List your planned product features on the left to organize them into MVP, V2, and deferred categories automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </BuilderShell>
  );
}
