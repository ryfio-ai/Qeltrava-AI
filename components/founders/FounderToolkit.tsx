"use client";

import React, { useState } from 'react';
import { Layers, DollarSign, GitPullRequest, Copy, Check, Sparkles, ArrowRight, Info } from 'lucide-react';

export function FounderToolkit() {
  const [activeTab, setActiveTab] = useState<'stack' | 'cost' | 'issues'>('stack');
  const [copiedIssues, setCopiedIssues] = useState(false);

  // Stack Advisor State
  const [productType, setProductType] = useState<'saas' | 'manufacturing' | 'ai-tool'>('manufacturing');
  const [userScale, setUserScale] = useState<'early' | 'growth' | 'enterprise'>('early');
  const [requiresAI, setRequiresAI] = useState(true);

  // Cost Estimator State
  const [dailyUsers, setDailyUsers] = useState(1000);
  const [aiRequestsPerDay, setAiRequestsPerDay] = useState(5000);
  const [storageGB, setStorageGB] = useState(50);

  // GitHub Issue Exporter State
  const [featureName, setFeatureName] = useState('Manufacturing Quality AI Inspection');
  const [featureGoal, setFeatureGoal] = useState('Predict defects using camera telemetry and export automated alert logs.');

  // Stack Recommendations Math
  const getStackRecommendation = () => {
    if (productType === 'manufacturing') {
      return {
        frontend: 'Next.js 16 (App Router + Turbopack)',
        backend: 'FastAPI (Python async telemetry processing)',
        database: 'PostgreSQL + TimescaleDB extension',
        aiLayer: 'OpenAI Vision + Local Ultralytics YOLOv8',
        hosting: 'Vercel (Frontend) + Render / AWS ECS (Backend)',
        rationale: 'FastAPI handles high-frequency sensor streams asynchronously, while Next.js delivers real-time plant analytics to operators without UI lag.',
      };
    }
    if (productType === 'saas') {
      return {
        frontend: 'Next.js 16 + Tailwind CSS v4',
        backend: 'Next.js Server Actions + Node.js Microservices',
        database: 'Supabase PostgreSQL + Prisma ORM',
        aiLayer: 'OpenRouter (Multi-provider fallback)',
        hosting: 'Vercel + Supabase Managed Cloud',
        rationale: 'Maximizes developer velocity with unified TypeScript stack and managed serverless database infrastructure.',
      };
    }
    return {
      frontend: 'Next.js 16 (React 19)',
      backend: 'FastAPI + Python LangChain / LangGraph',
      database: 'PostgreSQL + pgvector',
      aiLayer: 'Gemini 1.5 Pro + Groq Llama 3',
      hosting: 'Vercel + Modal / Cloud Run',
      rationale: 'Python ecosystem grants native access to state-of-the-art vector tools, embeddings, and agentic orchestration libraries.',
    };
  };

  const currentStack = getStackRecommendation();

  // Cost Calculation Estimates
  const estimatedHostingCost = Math.round(20 + (dailyUsers / 1000) * 15);
  const estimatedAICost = Math.round((aiRequestsPerDay / 1000) * 2.5 * 30);
  const estimatedDBCost = Math.round(15 + (storageGB / 10) * 2);
  const totalMonthlyCost = estimatedHostingCost + estimatedAICost + estimatedDBCost;

  // GitHub Issue Template
  const generatedGitHubIssues = `### Epic: ${featureName}
**Goal:** ${featureGoal}
**Architecture Stack:** ${currentStack.frontend} + ${currentStack.backend}

---

#### User Story 1: Telemetry Data Ingestion API
- [ ] **Task:** Implement async POST endpoint to receive sensor JSON telemetry.
- [ ] **Task:** Add Zod/Pydantic schema validation for incoming sensor payload.
- [ ] **Test:** Unit test endpoint with valid and malformed payloads.

#### User Story 2: AI Defect Prediction & Alert Dispatch
- [ ] **Task:** Run defect classification model on ingested telemetry frame.
- [ ] **Task:** Trigger real-time SSE / WebSocket alert to operator dashboard on anomaly detection.
- [ ] **Test:** Integration test simulating anomaly threshold breach.
`;

  const handleCopyIssues = () => {
    navigator.clipboard.writeText(generatedGitHubIssues);
    setCopiedIssues(true);
    setTimeout(() => setCopiedIssues(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Sub Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-3xl mx-auto shadow-xs">
        <button
          onClick={() => setActiveTab('stack')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'stack'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tech Stack Advisor</span>
        </button>
        <button
          onClick={() => setActiveTab('cost')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'cost'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Cost Estimator</span>
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'issues'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>GitHub Issue Generator</span>
        </button>
      </div>

      {/* Controlled Handoff Context Banner */}
      <div className="p-3.5 bg-[#E3F2FD] border border-[#90CAF9] rounded-xl text-xs font-mono text-[#0D47A1] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2196F3] shrink-0" />
          <span>Workflow Context: Using your active product scope ({featureName}) across tools.</span>
        </div>
      </div>

      {/* Tab 1: Tech Stack Advisor */}
      {activeTab === 'stack' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl space-y-5">
              <h3 className="text-lg font-bold text-[#0D47A1] font-anek">Product Specifications</h3>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-semibold text-[#334155] mb-1.5">What are you building?</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs bg-white font-medium text-[#0F172A]"
                  >
                    <option value="manufacturing">Industrial / Manufacturing AI Platform</option>
                    <option value="saas">B2B SaaS / Web Platform</option>
                    <option value="ai-tool">AI Agent / LLM Utility</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#334155] mb-1.5">Expected Target Scale</label>
                  <select
                    value={userScale}
                    onChange={(e) => setUserScale(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs bg-white font-medium text-[#0F172A]"
                  >
                    <option value="early">MVP Pilot (&lt; 1,000 active users)</option>
                    <option value="growth">Growth Stage (1,000 – 25,000 users)</option>
                    <option value="enterprise">Enterprise (25,000+ users / high availability)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="requiresAI"
                    checked={requiresAI}
                    onChange={(e) => setRequiresAI(e.target.checked)}
                    className="w-4 h-4 text-[#2196F3] accent-[#2196F3]"
                  />
                  <label htmlFor="requiresAI" className="font-semibold text-[#334155] cursor-pointer">
                    Requires Real-Time AI / Computer Vision Model Execution
                  </label>
                </div>
              </div>
            </div>

            {/* Recommended Stack Box */}
            <div className="p-6 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#0D47A1] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>Recommended Architecture Stack</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">Frontend Layer</div>
                    <div className="font-bold text-[#0F172A]">{currentStack.frontend}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">Backend Microservice</div>
                    <div className="font-bold text-[#0F172A]">{currentStack.backend}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">Database & Storage</div>
                    <div className="font-bold text-[#0F172A]">{currentStack.database}</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">AI & Model Layer</div>
                    <div className="font-bold text-[#0F172A]">{currentStack.aiLayer}</div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#E3F2FD] border border-[#90CAF9] rounded-xl text-xs text-[#334155] leading-relaxed">
                <strong className="text-[#0D47A1]">Architectural Rationale:</strong> {currentStack.rationale}
              </div>
            </div>
          </div>

          {/* Controlled Workflow Transition Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveTab('issues')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2196F3] text-white text-xs font-bold font-mono rounded-xl hover:bg-[#1976D2] transition-all cursor-pointer shadow-xs"
            >
              <span>Continue to GitHub Issue Exporter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Cost Estimator */}
      {activeTab === 'cost' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl space-y-5">
            <h3 className="text-lg font-bold text-[#0D47A1] font-anek">Scale Parameters</h3>
            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Active Users / Day: {dailyUsers.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={100}
                  max={25000}
                  step={500}
                  value={dailyUsers}
                  onChange={(e) => setDailyUsers(Number(e.target.value))}
                  className="w-full accent-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  AI Requests / Day: {aiRequestsPerDay.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={500}
                  max={100000}
                  step={2500}
                  value={aiRequestsPerDay}
                  onChange={(e) => setAiRequestsPerDay(Number(e.target.value))}
                  className="w-full accent-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Database & Asset Storage (GB): {storageGB} GB
                </label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={storageGB}
                  onChange={(e) => setStorageGB(Number(e.target.value))}
                  className="w-full accent-[#2196F3]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-[#0D47A1] mb-2">
                Estimated Monthly Cloud Infrastructure
              </div>
              <div className="text-5xl font-extrabold text-[#0D47A1] font-anek mb-6">
                ${totalMonthlyCost} <span className="text-sm font-normal text-[#64748B]">/ month (est)</span>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#475569]">Compute & App Hosting:</span>
                  <span className="font-bold text-[#0F172A]">${estimatedHostingCost}/mo</span>
                </div>
                <div className="flex justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#475569]">AI API Model Invocations:</span>
                  <span className="font-bold text-[#0F172A]">${estimatedAICost}/mo</span>
                </div>
                <div className="flex justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#475569]">Managed DB & Storage:</span>
                  <span className="font-bold text-[#0F172A]">${estimatedDBCost}/mo</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] italic">
              * Note: Infrastructure pricing is an estimate based on tier projections. Validate actual usage charges with cloud vendors.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: GitHub Issue Generator */}
      {activeTab === 'issues' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Feature / Module Name</label>
              <input
                type="text"
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Feature Goal / Description</label>
              <input
                type="text"
                value={featureGoal}
                onChange={(e) => setFeatureGoal(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs font-sans"
              />
            </div>
          </div>

          <div className="p-6 bg-[#0F172A] border border-[#1E293B] rounded-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                Generated GitHub Epics & Tasks (Markdown)
              </span>
              <button
                onClick={handleCopyIssues}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-xs text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                {copiedIssues ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIssues ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#020617] border border-[#1E293B] rounded-xl font-mono text-xs text-[#94A3B8] whitespace-pre-wrap overflow-x-auto">
              {generatedGitHubIssues}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
