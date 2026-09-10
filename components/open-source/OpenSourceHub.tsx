"use client";

import React, { useState } from 'react';
import { OPEN_SOURCE_RESOURCES, OpenSourceResource } from '@/lib/open-source-data';
import { Terminal, Copy, Check, ExternalLink, Code2, Cpu, Wrench, Factory } from 'lucide-react';

export function OpenSourceHub() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'developer' | 'ai' | 'founder' | 'manufacturing'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = activeCategory === 'all'
    ? OPEN_SOURCE_RESOURCES
    : OPEN_SOURCE_RESOURCES.filter((r) => r.category === activeCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all' as const, name: 'All Starters', icon: Code2 },
    { id: 'developer' as const, name: 'Developer & Web', icon: Terminal },
    { id: 'ai' as const, name: 'AI & LLM Tools', icon: Cpu },
    { id: 'manufacturing' as const, name: 'Manufacturing AI', icon: Factory },
    { id: 'founder' as const, name: 'Founder Tools', icon: Wrench },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Category Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-4xl mx-auto shadow-xs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2196F3] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="flex flex-col justify-between p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xs hover:border-[#2196F3] transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-[10px] font-mono font-bold uppercase tracking-wider">
                  {res.category}
                </span>
                <a
                  href={res.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#0D47A1] hover:text-[#2196F3] flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-[#0D47A1] mb-2 font-anek">
                {res.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4 font-sans">
                {res.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {res.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] text-[#475569] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal Command Copy Box */}
            {res.useCommand && (
              <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
                <div className="flex items-center justify-between p-2.5 bg-[#0F172A] rounded-xl text-[#F8FAFC] font-mono text-[11px] overflow-hidden">
                  <span className="truncate pr-2 text-[#38BDF8]">{res.useCommand}</span>
                  <button
                    onClick={() => handleCopy(res.useCommand!, res.id)}
                    className="p-1.5 hover:bg-[#1E293B] rounded-lg transition-colors text-[#94A3B8] hover:text-white cursor-pointer shrink-0"
                    title="Copy command"
                  >
                    {copiedId === res.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
