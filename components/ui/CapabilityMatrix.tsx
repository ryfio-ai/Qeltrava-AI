"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities, categoryColors, expertiseConfig, type TechCategory } from '@/lib/capabilities-data';

const ALL_CATEGORIES: TechCategory[] = ['AI & LLM', 'Frontend', 'Backend', 'Cloud', 'Data', 'Security', 'DevOps', 'Mobile'];

export function CapabilityMatrix() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'All'>('All');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? capabilities
      : capabilities.filter(c => c.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            activeCategory === 'All'
              ? 'bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)] shadow-lg'
              : 'bg-white text-[var(--color-text-main)] border-[var(--color-border-soft)] hover:border-gray-300'
          }`}
        >
          All ({capabilities.length})
        </button>
        {ALL_CATEGORIES.map(cat => {
          const count = capabilities.filter(c => c.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                isActive ? 'text-white shadow-lg' : 'bg-white text-[var(--color-text-main)] border-[var(--color-border-soft)] hover:border-gray-300'
              }`}
              style={isActive ? { backgroundColor: categoryColors[cat], borderColor: categoryColors[cat] } : {}}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Matrix Table */}
      <div className="border border-[var(--color-border-soft)] rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_180px_1fr] gap-4 px-6 py-3 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-main)]">Technology</div>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-main)]">Expertise</div>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-main)]">Proficiency</div>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-main)] hidden md:block">Used In</div>
        </div>

        {/* Rows */}
        <AnimatePresence mode="popLayout">
          {filtered.map((tech, i) => {
            const isHovered = hoveredRow === tech.name;
            const expertStyle = expertiseConfig[tech.expertise];
            return (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.025, duration: 0.2 }}
                onMouseEnter={() => setHoveredRow(tech.name)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`grid grid-cols-[1fr_120px_180px_1fr] gap-4 px-6 py-4 border-b border-[var(--color-border-soft)] last:border-b-0 transition-colors cursor-default ${
                  isHovered ? 'bg-[var(--color-bg-light)]' : 'bg-white'
                }`}
              >
                {/* Name + Category */}
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: categoryColors[tech.category] }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--color-primary-dark)] truncate">{tech.name}</div>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-[var(--color-text-main)] mt-0.5 leading-relaxed"
                      >
                        {tech.description}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Expertise Badge */}
                <div className="flex items-center">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold border"
                    style={{
                      color: expertStyle.color,
                      backgroundColor: expertStyle.bgColor,
                      borderColor: expertStyle.barColor + '40',
                    }}
                  >
                    {tech.expertise}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.expertiseScore}%` }}
                      transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: expertStyle.barColor }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-400 w-8 text-right">{tech.expertiseScore}%</span>
                </div>

                {/* Services */}
                <div className="hidden md:flex items-center flex-wrap gap-1.5">
                  {tech.services.map(s => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] text-[10px] font-semibold text-[var(--color-text-main)] rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">Since {tech.since}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Summary Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-main)]">
        {[
          { label: 'Expert', count: capabilities.filter(c => c.expertise === 'Expert').length, color: '#10b981' },
          { label: 'Advanced', count: capabilities.filter(c => c.expertise === 'Advanced').length, color: '#3b82f6' },
          { label: 'Proficient', count: capabilities.filter(c => c.expertise === 'Proficient').length, color: '#f59e0b' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-semibold">{item.count}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <span className="text-gray-400">·</span>
        <span className="text-gray-500">{capabilities.length} technologies across {ALL_CATEGORIES.length} domains</span>
      </div>
    </div>
  );
}
