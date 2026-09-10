"use client";

import React, { useState } from 'react';
import { ENGINEERING_GUIDES, EngineeringGuide } from '@/lib/ecosystem-data';
import { BookOpen, Clock, Code2, ChevronRight, CheckCircle2 } from 'lucide-react';

export function LearnHub() {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(ENGINEERING_GUIDES[0].id);

  const selectedGuide = ENGINEERING_GUIDES.find((g) => g.id === selectedGuideId) || ENGINEERING_GUIDES[0];

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guide Selection Sidebar */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D47A1] px-1">
            Tactical Engineering Guides
          </h3>
          <div className="space-y-3">
            {ENGINEERING_GUIDES.map((guide) => {
              const isSelected = guide.id === selectedGuideId;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#2196F3] shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#90CAF9]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#E3F2FD] text-[#0D47A1] text-[10px] font-mono font-bold uppercase">
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0D47A1] font-anek mb-1">{guide.title}</h4>
                  <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">{guide.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Guide Main View */}
        <div className="lg:col-span-2 p-8 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-[#E3F2FD] text-[#0D47A1] text-xs font-mono font-bold uppercase">
                {selectedGuide.category} Guide
              </span>
              <span className="text-xs text-[#64748B] font-mono">• {selectedGuide.readTime} read</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0D47A1] font-anek mb-3">{selectedGuide.title}</h2>
            <p className="text-sm text-[#475569] leading-relaxed">{selectedGuide.summary}</p>
          </div>

          {/* Guide Steps */}
          <div className="space-y-6 pt-4 border-t border-[#F1F5F9]">
            {selectedGuide.steps.map((step, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base font-bold text-[#0F172A] font-anek flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2196F3]" />
                  <span>{step.title}</span>
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">{step.description}</p>
                {step.codeSnippet && (
                  <pre className="p-4 bg-[#0F172A] border border-[#1E293B] rounded-xl font-mono text-xs text-[#38BDF8] overflow-x-auto whitespace-pre-wrap">
                    {step.codeSnippet}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
