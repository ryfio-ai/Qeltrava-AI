"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CSSolution = {
  num: number;
  title: string;
  desc: string;
  metric: string;
  deliverables: string[];
};

const solutions: CSSolution[] = [
  { num: 1, title: "Agent Workspace Integrations", desc: "Consolidate Salesforce, Shopify, Slack, and legacy databases directly inside a single agent panel.", metric: "99.8% System Sync Rate", deliverables: ["Custom iframe embeddings", "Unified Webhook Router", "OAuth/SAML Single Sign-On"] },
  { num: 2, title: "Case & Major Issue Management", desc: "Automate tiering, escalations, priority classifications, and route high-value tickets directly to engineers.", metric: "0-minute Priority Routing", deliverables: ["Automated SLA Escalator", "Priority Matrix API", "Jira Integration Bridge"] },
  { num: 3, title: "Omni-channel Capability", desc: "Syndicate client tickets across Web chat, Email, WhatsApp, SMS, and Voice in a single unified thread.", metric: "100% Cross-channel Sync", deliverables: ["Twilio WhatsApp API connector", "SendGrid Email parser", "Web Socket Live Chat Server"] },
  { num: 4, title: "Customer Data Management", desc: "Sync client profiles, search history, purchase logs, and ticket histories in real-time.", metric: "0.4s Ingestion Latency", deliverables: ["Redis Profiling Cache", "PostgreSQL Relational Sync", "Segment.io ingestion logs"] },
  { num: 5, title: "Visual Workflows & Automation", desc: "A drag-and-drop workflow builder enabling non-technical teams to customize support routing pathways.", metric: "80% Support Process Automation", deliverables: ["React Flow visual interface", "Workflow engine execution runtime", "YAML configuration sync"] },
  { num: 6, title: "Surveys, Reports, & Dashboards", desc: "Automate Net Promoter Score (NPS) surveys, CSAT reports, and live agent output dashboards.", metric: "Real-time CSAT Monitoring", deliverables: ["NPS automated dispatchers", "Metabase metrics dashboard embed", "CSV export automations"] },
  { num: 7, title: "Issue Resolution", desc: "Standardize troubleshooting runbooks, automated knowledge-base lookups, and one-click draft answers.", metric: "-60% Ticket Resolution Time", deliverables: ["RAG database document indexing", "Draft response AI copilot", "One-click resolution protocols"] },
  { num: 8, title: "Agent-Assist Options", desc: "A live copilot script suggesting next steps, compliance checks, and templates dynamically during chat.", metric: "100% Compliance Guardrails", deliverables: ["Co-pilot context window feed", "Restricted compliance validation", "Live template suggestions"] },
  { num: 9, title: "Performance Analytics", desc: "Extract average response latency, ticket volume spikes, and individual agent capacity scorecards.", metric: "0.1s Metric Aggregate speed", deliverables: ["Prometheus scraper integration", "Grafana metrics dashboard routing", "Monthly performance audits"] },
  { num: 10, title: "Customer Project Management", desc: "Coordinate long-running tickets that require cross-department tasks and client approvals.", metric: "100% Transparent Task tracking", deliverables: ["Kanban task-management api", "Client approval email loops", "Task delegation protocols"] }
];

export const VisualCustomerServiceSolutions = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const active = hoveredIdx !== null ? solutions[hoveredIdx] : solutions[0];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Customer Service Solution Flow</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          An interactive double-tier workflow mapping out the core capabilities of best-in-class support software. Hover over any bubble to see technical deliverables.
        </p>
      </div>

      {/* SVG connected Flow - Grid view */}
      <div className="relative w-full hidden lg:block mb-8">
        
        {/* SVG connection line winding through cells */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 240">
          {/* Row 1 line */}
          <path 
            d="M 90 60 L 810 60 C 850 60, 850 180, 810 180 L 90 180" 
            fill="none" 
            stroke="#E2E8F0" 
            strokeWidth="2.5" 
            strokeDasharray="6 6"
          />
        </svg>

        {/* Double Row Grid */}
        <div className="grid grid-cols-5 gap-y-12 gap-x-6 relative z-10">
          {solutions.map((sol, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div 
                key={idx}
                className="flex justify-center"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <motion.div 
                  className={`w-40 h-28 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer border-2 transition-all relative select-none ${
                    isHovered 
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-md scale-103" 
                      : "bg-[#243656]/5 border-[var(--color-border-soft)] hover:border-gray-300"
                  }`}
                >
                  <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-full mb-1 border ${
                    isHovered ? "bg-white/20 text-white border-white/25" : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}>
                    {sol.num}
                  </span>
                  <h4 className={`text-[11px] font-extrabold leading-snug ${isHovered ? "text-white" : "text-[var(--color-primary-dark)]"}`}>
                    {sol.title}
                  </h4>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Mobile-Friendly Grid View (Responsive Fallback) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-4 w-full mb-6">
        {solutions.map((sol, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div 
              key={idx}
              className={`p-4 border rounded-xl cursor-pointer select-none transition-all ${
                isHovered ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "bg-gray-50 border-[var(--color-border-soft)]"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-white/20 border border-current text-[10px] font-bold font-mono flex items-center justify-center">
                  {sol.num}
                </span>
                <h4 className="font-extrabold text-xs leading-tight truncate">{sol.title}</h4>
              </div>
              <p className="text-[10px] leading-relaxed line-clamp-2">{sol.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="w-full bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-3.5 mb-2.5">
              <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-xs font-black font-mono flex items-center justify-center">
                {active.num}
              </span>
              <h4 className="text-base font-extrabold text-[var(--color-primary-dark)]">
                {active.title}
              </h4>
            </div>
            <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">
              {active.desc}
            </p>
            <div className="text-sm font-bold text-[var(--color-accent)] font-mono">
              Process outcome: {active.metric}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-64 bg-white border border-[var(--color-border-soft)] rounded-xl p-4 shadow-sm">
            <h5 className="text-[10px] font-bold text-[var(--color-primary-dark)] uppercase tracking-wider mb-2.5 border-b pb-1">
              Engineering Specs
            </h5>
            <ul className="space-y-1.5 text-xs text-gray-500 font-semibold font-mono">
              {active.deliverables.map((del, dIdx) => (
                <li key={dIdx} className="truncate flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                  {del}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
