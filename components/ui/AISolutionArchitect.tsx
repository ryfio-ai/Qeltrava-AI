"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  solutionComponents,
  calculateSolutionMetrics,
  formatCost,
  type ComponentId,
} from '@/lib/architecture-data';
import { Button } from '@/components/Button';

/* ─── Architecture Diagram ──────────────────────────────────────── */

interface ArchNode {
  label: string;
  color: string;
  sublabel?: string;
}

function buildArchLayers(selected: ComponentId[]): ArchNode[][] {
  const has = (id: ComponentId) => selected.includes(id);

  const clientRow: ArchNode[] = [{ label: 'Browser / Web', color: '#0f172a', sublabel: 'Client' }];
  if (has('mobile-app')) clientRow.push({ label: 'iOS / Android', color: '#8b5cf6', sublabel: 'Mobile' });

  const frontendRow: ArchNode[] = [{ label: 'Next.js 15', color: '#1d4ed8', sublabel: 'Frontend' }];

  const apiRow: ArchNode[] = [{ label: 'FastAPI Gateway', color: '#0369a1', sublabel: 'API' }];
  if (has('auth')) apiRow.push({ label: 'Auth / JWT / SSO', color: '#dc2626', sublabel: 'Security' });
  if (has('webhooks')) apiRow.push({ label: 'REST / GraphQL', color: '#14b8a6', sublabel: 'API Layer' });

  const serviceRow: ArchNode[] = [];
  if (has('ai-assistant')) serviceRow.push({ label: 'LangChain Agent', color: '#6366f1', sublabel: 'AI Engine' });
  if (has('payments')) serviceRow.push({ label: 'Stripe Billing', color: '#10b981', sublabel: 'Payments' });
  if (has('crm')) serviceRow.push({ label: 'CRM Sync', color: '#ef4444', sublabel: 'CRM' });
  if (has('notifications')) serviceRow.push({ label: 'Notify Service', color: '#f97316', sublabel: 'Notify' });
  if (has('email-automation')) serviceRow.push({ label: 'Email / Queue', color: '#8b5cf6', sublabel: 'Email' });
  if (has('analytics')) serviceRow.push({ label: 'Analytics Engine', color: '#f59e0b', sublabel: 'Analytics' });
  if (has('admin-panel')) serviceRow.push({ label: 'Admin Panel', color: '#64748b', sublabel: 'Admin' });
  if (has('dashboard')) serviceRow.push({ label: 'Dashboard UI', color: '#3b82f6', sublabel: 'Dashboard' });

  const dataRow: ArchNode[] = [{ label: 'PostgreSQL', color: '#1e3a8a', sublabel: 'Primary DB' }];
  if (has('ai-assistant')) dataRow.push({ label: 'pgvector', color: '#7c3aed', sublabel: 'Vector DB' });
  dataRow.push({ label: 'Redis Cache', color: '#dc2626', sublabel: 'Cache / Queue' });
  if (has('file-storage')) dataRow.push({ label: 'AWS S3 / CDN', color: '#0ea5e9', sublabel: 'Storage' });

  const layers: ArchNode[][] = [clientRow, frontendRow, apiRow];
  if (serviceRow.length > 0) layers.push(serviceRow);
  layers.push(dataRow);

  return layers;
}

function ArchitectureDiagram({ selected }: { selected: ComponentId[] }) {
  const layers = buildArchLayers(selected);

  if (selected.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center px-4">
        <div className="text-4xl mb-3">🏗️</div>
        <p className="text-sm text-gray-400 font-mono">Select components to generate your architecture</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {layers.map((layer, li) => (
        <div key={li} className="flex flex-col items-center gap-2">
          {/* Nodes row */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {layer.map((node, ni) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: li * 0.05 + ni * 0.03 }}
                className="flex flex-col items-center"
              >
                <div
                  className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold font-mono whitespace-nowrap border border-white/10 shadow-sm"
                  style={{ backgroundColor: node.color }}
                >
                  {node.label}
                </div>
                {node.sublabel && (
                  <span className="text-[9px] text-gray-400 mt-0.5 font-mono uppercase tracking-wider">{node.sublabel}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Arrow down to next layer */}
          {li < layers.length - 1 && (
            <div className="flex flex-col items-center">
              <div className="w-px h-3 bg-gradient-to-b from-[#6366f1] to-[#6366f1]/30" />
              <svg width="12" height="6" viewBox="0 0 12 6" className="text-[#6366f1]">
                <path d="M6 6L0 0h12L6 6z" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export function AISolutionArchitect() {
  const [selected, setSelected] = useState<Set<ComponentId>>(new Set());
  const [activeTab, setActiveTab] = useState<'architecture' | 'stack' | 'estimate'>('architecture');

  const toggleComponent = (id: ComponentId) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedArr = useMemo(() => [...selected] as ComponentId[], [selected]);
  const metrics = useMemo(() => calculateSolutionMetrics(selectedArr), [selectedArr]);

  const complexityColors = {
    Simple: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    Moderate: 'text-blue-600 bg-blue-50 border-blue-200',
    Complex: 'text-amber-600 bg-amber-50 border-amber-200',
    Enterprise: 'text-purple-600 bg-purple-50 border-purple-200',
  };

  const bookingUrl = `/book-consultation?components=${selectedArr.join(',')}&cost=${metrics.costMin}-${metrics.costMax}&timeline=${metrics.timelineMin}-${metrics.timelineMax}`;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--color-border-soft)] rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* ── LEFT: Component Selector ─────────────────────── */}
        <div className="bg-[var(--color-bg-light)] border-r border-[var(--color-border-soft)] p-8 flex flex-col">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2 font-mono">
              Step 1 — Select Your Components
            </div>
            <p className="text-sm text-[var(--color-text-main)]">
              Your architecture, stack, team, and cost estimate generate live as you choose.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 flex-1">
            {solutionComponents.map(comp => {
              const isSelected = selected.has(comp.id);
              return (
                <button
                  key={comp.id}
                  onClick={() => toggleComponent(comp.id)}
                  className={`group relative flex flex-col items-start gap-1.5 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md'
                      : 'bg-white/60 border-[var(--color-border-soft)] hover:border-gray-300 hover:bg-white hover:shadow-sm'
                  }`}
                  style={isSelected ? { borderColor: comp.color, boxShadow: `0 0 0 3px ${comp.color}18` } : {}}
                  title={comp.description}
                >
                  {/* Check indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: comp.color }}
                    >
                      ✓
                    </motion.div>
                  )}
                  <span className="text-xl leading-none">{comp.emoji}</span>
                  <span className={`text-xs font-bold leading-tight transition-colors ${isSelected ? 'text-[var(--color-primary-dark)]' : 'text-gray-600'}`}>
                    {comp.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selection count */}
          <div className="mt-6 flex items-center justify-between text-sm text-[var(--color-text-main)]">
            <span>
              {selected.size === 0 ? 'Nothing selected yet' : `${selected.size} component${selected.size === 1 ? '' : 's'} selected`}
            </span>
            {selected.size > 0 && (
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: Live Output Panel ──────────────────────── */}
        <div className="bg-[var(--color-primary-dark)] flex flex-col">

          {/* Header */}
          <div className="px-8 pt-8 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] font-mono">
                Live Output
              </div>
              {selected.size > 0 && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${complexityColors[metrics.complexity]}`}>
                  {metrics.complexity}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">
              {selected.size === 0 ? 'Your Architecture' : 'Generated Architecture'}
            </h3>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {(['architecture', 'stack', 'estimate'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-[var(--color-accent)] bg-white/5'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab === 'architecture' ? '🏗 Architecture' : tab === 'stack' ? '⚙️ Tech Stack' : '📊 Estimate'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-8 overflow-y-auto min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeTab === 'architecture' && (
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <ArchitectureDiagram selected={selectedArr} />
                </motion.div>
              )}

              {activeTab === 'stack' && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {metrics.techStack.length === 0 ? (
                    <div className="text-center py-12 text-white/30 font-mono text-sm">
                      Select components to see the tech stack
                    </div>
                  ) : (
                    <div>
                      <p className="text-white/50 text-xs font-mono mb-4 uppercase tracking-wider">
                        {metrics.techStack.length} technologies — curated for your selection
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {metrics.techStack.map(tech => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-3 py-1.5 bg-white/10 border border-white/15 text-white text-xs font-mono rounded-lg"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'estimate' && (
                <motion.div
                  key="estimate"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  {metrics.costMin === 0 ? (
                    <div className="text-center py-12 text-white/30 font-mono text-sm">
                      Select components to generate estimates
                    </div>
                  ) : (
                    <>
                      {/* Cost */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1">Estimated Investment</div>
                        <div className="text-3xl font-bold text-white">
                          {formatCost(metrics.costMin)} – {formatCost(metrics.costMax)}
                        </div>
                        <div className="text-xs text-white/40 mt-1">Bundle pricing includes 15% integration discount</div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-1">Timeline</div>
                        <div className="text-2xl font-bold text-white">
                          {metrics.timelineMin}–{metrics.timelineMax} weeks
                        </div>
                        <div className="text-xs text-white/40 mt-1">2-week Agile sprints with working demos each sprint</div>
                      </div>

                      {/* Team */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">Engineering Pod</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(metrics.teamRoles).map(([role, count]) => (
                            <span key={role} className="px-3 py-1 bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-semibold rounded-lg">
                              {count}× {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-white/30 leading-relaxed">
                        * Estimates are indicative. Exact pricing depends on functional requirements, integrations, and compliance needs.
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="px-8 pb-8 pt-4 border-t border-white/10">
            <Button
              href={selected.size > 0 ? bookingUrl : '/book-consultation'}
              className="w-full bg-[var(--color-accent)] text-white border-transparent hover:opacity-90 justify-center font-semibold"
            >
              {selected.size > 0 ? `Get Accurate Proposal for ${selected.size} Component${selected.size > 1 ? 's' : ''} →` : 'Book an Architecture Workshop →'}
            </Button>
            {selected.size > 0 && (
              <p className="text-center text-xs text-white/30 mt-2">
                Your selections are pre-filled in the consultation form
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
