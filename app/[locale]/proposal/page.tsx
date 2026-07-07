"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { solutionComponents, calculateSolutionMetrics, formatCost, type ComponentId } from '@/lib/architecture-data';

const industries = ['Fintech & Banking', 'Healthcare & Healthtech', 'Retail & E-commerce', 'Manufacturing', 'SaaS & Technology', 'Logistics & Supply Chain', 'Education', 'Government'];
const budgets = [{ label: '< $20K', val: 20000 }, { label: '$20K – $50K', val: 50000 }, { label: '$50K – $150K', val: 150000 }, { label: '$150K – $500K', val: 500000 }, { label: '$500K+', val: 1000000 }];
const timelines = ['1 – 4 weeks', '1 – 3 months', '3 – 6 months', '6 – 12 months', '12+ months'];

type Step = 'industry' | 'components' | 'budget' | 'timeline' | 'contact' | 'proposal';

interface FormState {
  industry: string; company: string; components: ComponentId[];
  budget: string; timeline: string; name: string; email: string; goal: string;
}

const empty: FormState = { industry: '', company: '', components: [], budget: '', timeline: '', name: '', email: '', goal: '' };

const STEPS: Step[] = ['industry', 'components', 'budget', 'timeline', 'contact'];

function StepLabel({ step, current }: { step: number; current: number }) {
  const labels = ['Industry', 'Components', 'Budget', 'Timeline', 'Contact'];
  const done = step < current;
  const active = step === current;
  return (
    <div className={`flex items-center gap-2 text-xs font-semibold transition-colors ${active ? 'text-[var(--color-accent)]' : done ? 'text-emerald-600' : 'text-gray-400'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${active ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : done ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-300 text-gray-400'}`}>
        {done ? '✓' : step + 1}
      </div>
      <span className="hidden sm:block">{labels[step]}</span>
    </div>
  );
}

export default function ProposalPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [step, setStep] = useState(0);
  const [generated, setGenerated] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('fromRoi') === 'true') {
        const process = params.get('process');
        const team = params.get('team');
        const rate = params.get('rate');
        const hours = params.get('hours');
        
        let prefilledComponents: ComponentId[] = [];
        if (process === 'document-processing') { prefilledComponents = ['file-storage', 'ai-assistant']; }
        else if (process === 'customer-support') { prefilledComponents = ['ai-assistant', 'crm']; }
        else if (process === 'data-entry') { prefilledComponents = ['admin-panel', 'analytics']; }
        else if (process === 'approval-workflows') { prefilledComponents = ['notifications', 'webhooks']; }
        
        setForm(prev => ({
          ...prev,
          components: prefilledComponents.length > 0 ? prefilledComponents : prev.components,
          goal: `ROI Estimate Basis: ${team} people at $${rate}/hr spending ${hours} hours/week on ${process}.`
        }));
      }
    }
  }, []);
  const metrics = calculateSolutionMetrics(form.components);
  const currentStep = STEPS[step];

  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1); else setGenerated(true); };
  const back = () => setStep(s => Math.max(0, s - 1));
  const reset = () => { setForm(empty); setStep(0); setGenerated(false); };

  const canNext = () => {
    if (currentStep === 'industry') return form.industry !== '' && form.company !== '';
    if (currentStep === 'components') return form.components.length > 0;
    if (currentStep === 'budget') return form.budget !== '';
    if (currentStep === 'timeline') return form.timeline !== '';
    if (currentStep === 'contact') return form.name !== '' && form.email.includes('@');
    return true;
  };

  const toggleComponent = (id: ComponentId) => {
    setForm(p => ({
      ...p, components: p.components.includes(id) ? p.components.filter(c => c !== id) : [...p.components, id]
    }));
  };

  if (generated) {
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return (
      <main className="min-h-screen bg-[var(--color-bg-light)] py-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[var(--color-border-soft)] rounded-2xl shadow-2xl overflow-hidden">
            {/* Proposal Header */}
            <div className="bg-[var(--color-primary-dark)] px-10 py-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">CONFIDENTIAL PROPOSAL</div>
                  <h1 className="text-2xl font-bold text-white">AI Engagement Proposal</h1>
                  <p className="text-white/60 text-sm mt-1">Prepared for {form.company}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 font-mono">Qeltrava AI</div>
                  <div className="text-xs text-white/40">{date}</div>
                  <div className="text-xs text-white/40 font-mono mt-1">REF: QAI-{Math.random().toString(36).slice(2, 8).toUpperCase()}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Investment', value: metrics.costMin > 0 ? `${formatCost(metrics.costMin)} – ${formatCost(metrics.costMax)}` : 'TBD' },
                  { label: 'Timeline', value: metrics.timelineMin > 0 ? `${metrics.timelineMin}–${metrics.timelineMax} weeks` : form.timeline },
                  { label: 'Complexity', value: metrics.complexity || 'Custom' },
                ].map(item => (
                  <div key={item.label} className="text-center bg-white/5 rounded-xl p-3">
                    <div className="text-xs text-white/40 mb-1">{item.label}</div>
                    <div className="text-base font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposal Body */}
            <div className="px-10 py-8 space-y-8">
              {/* Executive Summary */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 font-mono">Executive Summary</h2>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">
                  This proposal outlines Qeltrava AI's recommended approach for delivering a custom {form.industry} solution for {form.company}. Based on your selection of {form.components.length} core components, we recommend a {metrics.complexity?.toLowerCase()} engagement beginning with an Architecture Workshop and proceeding through {metrics.timelineMin}–{metrics.timelineMax} weeks of sprint-based delivery.
                </p>
              </div>

              {/* Selected Components */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 font-mono">Scope — Selected Components</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {form.components.map(id => {
                    const comp = solutionComponents.find(c => c.id === id);
                    if (!comp) return null;
                    return (
                      <div key={id} className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-lg text-sm">
                        <span>{comp.emoji}</span>
                        <span className="font-medium text-[var(--color-primary-dark)]">{comp.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack */}
              {metrics.techStack.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 font-mono">Recommended Technology Stack</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {metrics.techStack.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] text-xs font-mono text-[var(--color-primary-dark)] rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engagement Model */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 font-mono">Engagement Model</h2>
                <div className="space-y-2.5">
                  {[
                    { phase: 'Architecture Workshop', duration: '1–2 weeks', desc: 'Validate requirements, define system design, produce detailed spec' },
                    { phase: 'Sprint Development', duration: `${Math.max(4, metrics.timelineMin || 4)}–${metrics.timelineMax || 12} weeks`, desc: '2-week sprints, working demo each sprint, CI/CD from day one' },
                    { phase: 'Hypercare', duration: '30 days', desc: 'SLA-backed post-launch support with the original build team' },
                  ].map(p => (
                    <div key={p.phase} className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b border-[var(--color-border-soft)] last:border-b-0">
                      <div>
                        <div className="text-xs font-bold text-[var(--color-primary-dark)]">{p.phase}</div>
                        <div className="text-xs text-gray-400 font-mono">{p.duration}</div>
                      </div>
                      <div className="text-xs text-[var(--color-text-main)] leading-relaxed">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment */}
              {metrics.costMin > 0 && (
                <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-4 font-mono">Investment Summary</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Estimated Range</p>
                      <p className="text-xl font-black text-[var(--color-primary-dark)]">{formatCost(metrics.costMin)} – {formatCost(metrics.costMax)}</p>
                      <p className="text-xs text-gray-400 mt-1">Includes 15% bundle integration discount</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Your Budget</p>
                      <p className="text-lg font-bold text-[var(--color-primary-dark)]">{form.budget}</p>
                      <p className="text-xs text-gray-400 mt-1">Milestone-based payment schedule available</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3 font-mono">Next Steps</h2>
                <ol className="space-y-2">
                  {['Book a 30-minute Architecture Discovery Call', 'Receive a fixed-scope proposal within 48 hours', 'Sign engagement agreement and kick off Architecture Workshop', 'Sprint 1 begins — first working demo in 2 weeks'].map((s, i) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-[var(--color-text-main)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Actions */}
            <div className="px-10 pb-8 flex flex-col sm:flex-row gap-3">
              <a href="/book-consultation"
                className="flex-1 inline-flex items-center justify-center py-3.5 bg-[var(--color-accent)] text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                Book Discovery Call →
              </a>
              <button onClick={() => window.print()}
                className="flex-1 py-3.5 border border-[var(--color-border-soft)] text-sm font-semibold text-[var(--color-primary-dark)] rounded-full hover:border-gray-300 transition-colors">
                🖨 Print / Save as PDF
              </button>
              <button onClick={reset}
                className="py-3.5 px-6 border border-[var(--color-border-soft)] text-sm font-semibold text-gray-400 rounded-full hover:text-gray-600 transition-colors">
                Start Over
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)]">
      {/* Hero */}
      <section className="pt-20 pb-14 bg-[var(--color-primary-dark)]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full text-[var(--color-accent)] text-xs font-bold font-mono uppercase tracking-wider mb-6">
            📄 AI Proposal Generator
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Get Your Custom Proposal</h1>
          <p className="text-lg text-white/60">Answer 5 questions. Get a scoped proposal with architecture, timeline, and investment estimate in 90 seconds.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 gap-2">
            {STEPS.map((_, i) => (
              <React.Fragment key={i}>
                <StepLabel step={i} current={step} />
                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>

                {currentStep === 'industry' && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">Tell us about your company</h2>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Company Name</label>
                      <input type="text" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                        placeholder="e.g. Acme Corp" className="w-full px-4 py-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Industry</label>
                      <div className="grid grid-cols-2 gap-2">
                        {industries.map(ind => (
                          <button key={ind} onClick={() => setForm(p => ({ ...p, industry: ind }))}
                            className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${form.industry === ind ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-primary-dark)]' : 'border-[var(--color-border-soft)] text-gray-600 hover:border-gray-300'}`}>
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'components' && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">What does your solution need?</h2>
                    <p className="text-sm text-gray-500">Select all that apply</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {solutionComponents.map(comp => {
                        const sel = form.components.includes(comp.id);
                        return (
                          <button key={comp.id} onClick={() => toggleComponent(comp.id)}
                            className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border-2 text-left transition-all ${sel ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--color-border-soft)] hover:border-gray-300'}`}>
                            <span className="text-lg">{comp.emoji}</span>
                            <span className="text-xs font-bold text-[var(--color-primary-dark)]">{comp.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    {form.components.length > 0 && (
                      <p className="text-xs text-[var(--color-accent)] font-semibold">{form.components.length} component{form.components.length > 1 ? 's' : ''} selected</p>
                    )}
                  </div>
                )}

                {currentStep === 'budget' && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">What is your budget range?</h2>
                    <div className="space-y-2.5">
                      {budgets.map(b => (
                        <button key={b.label} onClick={() => setForm(p => ({ ...p, budget: b.label }))}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all ${form.budget === b.label ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-primary-dark)]' : 'border-[var(--color-border-soft)] text-gray-600 hover:border-gray-300'}`}>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'timeline' && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">What is your target timeline?</h2>
                    <div className="space-y-2.5">
                      {timelines.map(t => (
                        <button key={t} onClick={() => setForm(p => ({ ...p, timeline: t }))}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all ${form.timeline === t ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-primary-dark)]' : 'border-[var(--color-border-soft)] text-gray-600 hover:border-gray-300'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 'contact' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">Where should we send the proposal?</h2>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Your Name</label>
                      <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Alex Chen" className="w-full px-4 py-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Work Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="e.g. alex@company.com" className="w-full px-4 py-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Primary Goal (optional)</label>
                      <textarea value={form.goal} onChange={e => setForm(p => ({ ...p, goal: e.target.value }))}
                        placeholder="What is the main outcome you want to achieve?" rows={3}
                        className="w-full px-4 py-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all resize-none" />
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={back} className="py-3 px-6 rounded-full border border-[var(--color-border-soft)] text-sm font-semibold text-gray-500 hover:border-gray-300 transition-colors">
                  ← Back
                </button>
              )}
              <button onClick={next} disabled={!canNext()}
                className="flex-1 py-3.5 bg-[var(--color-accent)] text-white font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? '✨ Generate My Proposal →' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
