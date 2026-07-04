"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    n: '01', title: 'Discovery & Scoping', duration: '1–2 weeks', color: '#6366f1',
    desc: 'We map business objectives, technical constraints, and success metrics before writing a single line of code.',
    deliverables: ['Business requirements document', 'Technical feasibility report', 'Architecture blueprint draft', 'Risk register'],
    tools: ['Miro', 'Notion', 'Figma', 'Linear'],
  },
  {
    n: '02', title: 'System Architecture', duration: '1 week', color: '#3b82f6',
    desc: 'AI-native architecture designed for your scale. Database schemas, API contracts, and infrastructure plans defined upfront.',
    deliverables: ['OpenAPI 3.1 spec', 'Database ERD', 'Infrastructure diagram', 'Cost model'],
    tools: ['OpenAPI', 'Terraform', 'Miro', 'draw.io'],
  },
  {
    n: '03', title: 'Design System', duration: '1–2 weeks', color: '#8b5cf6',
    desc: 'Pixel-perfect UI/UX with a reusable component library. Every component documented before development starts.',
    deliverables: ['Figma design system', 'Component storybook', 'Accessibility audit', 'Responsive specs'],
    tools: ['Figma', 'Storybook', 'Axe', 'Zeplin'],
  },
  {
    n: '04', title: 'Sprint Development', duration: '4–12 weeks', color: '#10b981',
    desc: '2-week Agile sprints. Every sprint ends with a deployed, testable demo — not a status update.',
    deliverables: ['Working software per sprint', 'Test coverage reports', 'Sprint retrospectives', 'Updated backlog'],
    tools: ['Next.js 15', 'FastAPI', 'GitHub Actions', 'Linear'],
  },
  {
    n: '05', title: 'Quality Assurance', duration: 'Continuous', color: '#f59e0b',
    desc: 'Automated testing on every commit. Performance, accessibility, and security are first-class citizens from day one.',
    deliverables: ['E2E test suite', 'Performance benchmarks', 'Security scan report', 'Accessibility report'],
    tools: ['Playwright', 'Lighthouse', 'Snyk', 'k6'],
  },
  {
    n: '06', title: 'CI/CD Pipeline', duration: 'Live from week 1', color: '#ef4444',
    desc: 'Automated deployments configured from day one. Zero-downtime releases with automatic rollback capability.',
    deliverables: ['CI/CD pipeline config', 'Environment parity docs', 'Rollback runbook', 'Release process'],
    tools: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    n: '07', title: 'Production Launch', duration: '1–2 weeks', color: '#0ea5e9',
    desc: 'Blue-green deployment, DNS cutover, monitoring dashboards live, and hypercare team on standby.',
    deliverables: ['Production deployment', 'Grafana dashboards', 'Alert runbooks', 'Launch checklist'],
    tools: ['AWS / GCP', 'Grafana', 'PagerDuty', 'Sentry'],
  },
  {
    n: '08', title: 'Hypercare (30 days)', duration: '30 days post-launch', color: '#14b8a6',
    desc: 'The build team stays available post-launch. SLA-backed incident response and performance baselining.',
    deliverables: ['SLA agreement', 'On-call schedule', 'Incident log', 'Performance baseline'],
    tools: ['Grafana', 'PagerDuty', 'Sentry', 'Linear'],
  },
  {
    n: '09', title: 'Continuous Improvement', duration: 'Ongoing', color: '#f97316',
    desc: 'Monthly engineering retros, tech debt reduction sprints, and feature velocity reviews. Your system improves every month.',
    deliverables: ['Monthly retro report', 'Tech debt backlog', 'Roadmap updates', 'Performance reports'],
    tools: ['Linear', 'Notion', 'Grafana', 'GitHub'],
  },
];

export function EngineeringWorkflow() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2.5">
      {steps.map((step, i) => {
        const isOpen = expanded === i;
        return (
          <button
            key={step.n}
            onClick={() => setExpanded(isOpen ? null : i)}
            className="w-full text-left"
          >
            <div
              className="bg-white border rounded-2xl px-6 py-5 transition-all"
              style={isOpen ? { borderColor: step.color, boxShadow: `0 0 0 3px ${step.color}18` } : { borderColor: 'var(--color-border-soft)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  style={{ backgroundColor: isOpen ? step.color : '#f1f5f9', color: isOpen ? 'white' : '#64748b' }}
                >
                  {step.n}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-[var(--color-primary-dark)]">{step.title}</h3>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-gray-400 hidden sm:block">⏱ {step.duration}</span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[var(--color-text-main)] leading-relaxed mt-4 mb-5 pl-13">
                      {step.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pl-13">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2.5">Deliverables</p>
                        <ul className="space-y-1.5">
                          {step.deliverables.map(d => (
                            <li key={d} className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: step.color }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2.5">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.tools.map(t => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-xs font-mono font-semibold rounded-md border"
                              style={{ color: step.color, backgroundColor: step.color + '12', borderColor: step.color + '35' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        );
      })}
    </div>
  );
}
