"use client";

import React, { useState } from 'react';
import { QeltravaBuildLab } from '../builder-lab/QeltravaBuildLab';
import { AIReadinessAssessment } from '../ai-readiness/AIReadinessAssessment';
import { MVPPlanner } from '../mvp-planner/MVPPlanner';
import { ArchitectureBuilder } from '../architecture-builder/ArchitectureBuilder';
import { FounderToolkit } from '../founders/FounderToolkit';
import { Cpu, Zap, CheckCircle2, Layers, Compass, DollarSign, GitPullRequest } from 'lucide-react';

export function EngineeringToolsHub() {
  const [activeTab, setActiveTab] = useState<
    'build-lab' | 'ai-readiness' | 'mvp-planner' | 'architecture' | 'stack-advisor' | 'cost-estimator' | 'github-issues'
  >('build-lab');

  const categories = [
    {
      group: 'BUILD',
      items: [
        { id: 'build-lab' as const, name: 'Idea to Blueprint', desc: 'Complete System Brief', icon: Cpu },
        { id: 'mvp-planner' as const, name: 'MVP Scope Planner', desc: 'P0 vs P1 Feature Scoping', icon: CheckCircle2 },
        { id: 'architecture' as const, name: 'Architecture Builder', desc: 'Topology & Stack Diagram', icon: Layers },
        { id: 'ai-readiness' as const, name: 'AI Readiness Scorecard', desc: '10-Point Readiness Audit', icon: Zap },
      ],
    },
    {
      group: 'DECIDE',
      items: [
        { id: 'stack-advisor' as const, name: 'Tech Stack Advisor', desc: 'Stack Rationale & Match', icon: Compass },
        { id: 'cost-estimator' as const, name: 'Cloud Cost Estimator', desc: 'Infrastructure Projections', icon: DollarSign },
      ],
    },
    {
      group: 'SHIP',
      items: [
        { id: 'github-issues' as const, name: 'GitHub Issue Exporter', desc: 'PRD → Structured Epics', icon: GitPullRequest },
      ],
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Category Navigation Bar (Build, Decide, Ship) */}
      <div className="p-4 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-5xl mx-auto shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0D47A1] px-1">
                {cat.group}
              </div>
              <div className="space-y-1">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-mono text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#2196F3] text-white shadow-xs'
                          : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#2196F3]'}`} />
                      <div className="truncate">
                        <div className="leading-tight font-anek text-xs">{item.name}</div>
                        <div className="text-[10px] font-sans font-normal opacity-85">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Selected Tool */}
      <div className="w-full">
        {activeTab === 'build-lab' && <QeltravaBuildLab />}
        {activeTab === 'ai-readiness' && <AIReadinessAssessment />}
        {activeTab === 'mvp-planner' && <MVPPlanner />}
        {activeTab === 'architecture' && <ArchitectureBuilder />}
        {(activeTab === 'stack-advisor' || activeTab === 'cost-estimator' || activeTab === 'github-issues') && (
          <FounderToolkit />
        )}
      </div>
    </div>
  );
}
