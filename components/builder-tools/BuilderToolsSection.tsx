"use client";

import React, { useState } from 'react';
import { QeltravaBuildLab } from '../builder-lab/QeltravaBuildLab';
import { AIReadinessAssessment } from '../ai-readiness/AIReadinessAssessment';
import { MVPPlanner } from '../mvp-planner/MVPPlanner';
import { ArchitectureBuilder } from '../architecture-builder/ArchitectureBuilder';
import { Cpu, Zap, CheckCircle2, Layers } from 'lucide-react';

export function BuilderToolsSection() {
  const [activeTab, setActiveTab] = useState<'build-lab' | 'ai-readiness' | 'mvp-planner' | 'architecture'>('build-lab');

  const tabs = [
    { id: 'build-lab' as const, name: 'Build Lab', desc: 'Idea → Blueprint', icon: Cpu },
    { id: 'ai-readiness' as const, name: 'AI Readiness', desc: 'Workflow → AI Scorecard', icon: Zap },
    { id: 'mvp-planner' as const, name: 'MVP Planner', desc: 'P0 / P1 Scope Matrix', icon: CheckCircle2 },
    { id: 'architecture' as const, name: 'Architecture Builder', desc: 'Stack & System Topology', icon: Layers },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Navigation Tabs (Qeltrava Palette) */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-4xl mx-auto shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2196F3] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2196F3]'}`} />
              <div className="text-left">
                <div className="leading-none mb-0.5 font-anek">{tab.name}</div>
                <div className="text-[10px] font-sans font-normal opacity-90">{tab.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'build-lab' && <QeltravaBuildLab />}
        {activeTab === 'ai-readiness' && <AIReadinessAssessment />}
        {activeTab === 'mvp-planner' && <MVPPlanner />}
        {activeTab === 'architecture' && <ArchitectureBuilder />}
      </div>
    </div>
  );
}
