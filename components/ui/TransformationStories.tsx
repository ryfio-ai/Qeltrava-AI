"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransformationStory {
  id: string;
  industry: string;
  client: string;
  before: {
    headline: string;
    metrics: Array<{ label: string; value: string; bad: boolean }>;
    pain: string;
  };
  after: {
    headline: string;
    metrics: Array<{ label: string; value: string }>;
    win: string;
  };
  techUsed: string[];
  color: string;
}

const stories: TransformationStory[] = [
  {
    id: 'document-processing',
    industry: 'Enterprise Operations',
    client: 'Global Insurance Group',
    before: {
      headline: 'Manual Document Processing',
      metrics: [
        { label: 'Processing Time', value: '3 days', bad: true },
        { label: 'Manual Staff', value: '11 people', bad: true },
        { label: 'Error Rate', value: '8.4%', bad: true },
        { label: 'Monthly Cost', value: '$48,000', bad: true },
      ],
      pain: 'Claims documents required manual extraction, validation, and routing across 3 departments. Bottleneck caused SLA breaches and client churn.',
    },
    after: {
      headline: 'AI Document Intelligence Pipeline',
      metrics: [
        { label: 'Processing Time', value: '8 minutes', bad: false },
        { label: 'Manual Staff', value: '1 oversight', bad: false },
        { label: 'Error Rate', value: '0.3%', bad: false },
        { label: 'Monthly Cost', value: '$9,200', bad: false },
      ],
      win: 'LangChain agents extract, validate, and route 100% of documents automatically with human-in-the-loop for edge cases only.',
    },
    techUsed: ['LangChain', 'OpenAI GPT-4o', 'FastAPI', 'PostgreSQL', 'pgvector'],
    color: '#6366f1',
  },
  {
    id: 'fleet-operations',
    industry: 'Smart Mobility',
    client: 'EV Fleet Platform',
    before: {
      headline: 'Phone-Based Fleet Dispatch',
      metrics: [
        { label: 'Response Time', value: '22 minutes', bad: true },
        { label: 'Route Efficiency', value: '51%', bad: true },
        { label: 'Maintenance Alerts', value: 'Reactive', bad: true },
        { label: 'Driver Utilization', value: '63%', bad: true },
      ],
      pain: 'Manual phone dispatch and static route planning led to missed SLAs, high fuel costs, and surprise vehicle breakdowns.',
    },
    after: {
      headline: 'AI-Powered Fleet Intelligence',
      metrics: [
        { label: 'Response Time', value: '90 seconds', bad: false },
        { label: 'Route Efficiency', value: '94%', bad: false },
        { label: 'Maintenance Alerts', value: 'Predictive', bad: false },
        { label: 'Driver Utilization', value: '91%', bad: false },
      ],
      win: 'Real-time demand prediction, AI route optimization, and IoT sensor integration eliminated manual dispatch entirely.',
    },
    techUsed: ['Next.js', 'FastAPI', 'Apache Kafka', 'TimescaleDB', 'React Native'],
    color: '#10b981',
  },
  {
    id: 'customer-support',
    industry: 'Enterprise SaaS',
    client: 'B2B Software Company',
    before: {
      headline: 'Human-Only Support Team',
      metrics: [
        { label: 'First Response', value: '11 hours', bad: true },
        { label: 'Resolution Rate', value: '61%', bad: true },
        { label: 'Agents Required', value: '14 FTEs', bad: true },
        { label: 'Monthly Cost', value: '$72,000', bad: true },
      ],
      pain: 'High ticket volume, repetitive questions, and slow escalation caused CSAT scores to drop below 3.2/5 and increased churn.',
    },
    after: {
      headline: 'AI Customer Intelligence Hub',
      metrics: [
        { label: 'First Response', value: '45 seconds', bad: false },
        { label: 'Resolution Rate', value: '94%', bad: false },
        { label: 'Agents Required', value: '2 oversight', bad: false },
        { label: 'Monthly Cost', value: '$11,000', bad: false },
      ],
      win: 'RAG-powered AI resolves 94% of tickets automatically. Human agents handle only escalations. CSAT went from 3.2 to 4.8/5.',
    },
    techUsed: ['LangChain', 'OpenAI', 'pgvector', 'Supabase', 'Next.js'],
    color: '#3b82f6',
  },
];

export function TransformationStories() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
      {stories.map((story) => {
        const isAfter = flipped[story.id];

        return (
          <div key={story.id} className="relative group" style={{ perspective: '1000px' }}>
            <div
              className="relative w-full transition-all duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isAfter ? 'rotateY(180deg)' : 'rotateY(0deg)',
                minHeight: '520px',
              }}
            >
              {/* BEFORE face */}
              <div
                className="absolute inset-0 rounded-2xl border border-[var(--color-border-soft)] bg-white overflow-hidden flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="p-6 border-b border-[var(--color-border-soft)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {story.industry}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full">
                      Before
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-1">{story.client}</h3>
                  <p className="text-sm font-semibold text-red-600">{story.before.headline}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {story.before.metrics.map(m => (
                      <div key={m.label} className="bg-red-50 border border-red-100 rounded-xl p-3">
                        <div className="text-xs text-red-400 font-medium mb-0.5">{m.label}</div>
                        <div className="text-sm font-bold text-red-700">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-[var(--color-text-main)] leading-relaxed flex-1">
                    {story.before.pain}
                  </p>

                  <button
                    onClick={() => toggle(story.id)}
                    className="mt-5 w-full py-3 rounded-xl border-2 text-sm font-bold transition-all hover:shadow-lg active:scale-[0.99]"
                    style={{ borderColor: story.color, color: story.color, backgroundColor: story.color + '10' }}
                  >
                    See After → How We Fixed This
                  </button>
                </div>
              </div>

              {/* AFTER face */}
              <div
                className="absolute inset-0 rounded-2xl border-2 overflow-hidden flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderColor: story.color,
                  background: `linear-gradient(135deg, ${story.color}08 0%, white 60%)`,
                }}
              >
                <div className="p-6 border-b" style={{ borderColor: story.color + '30' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: story.color }}>
                      {story.industry}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-1 border rounded-full"
                      style={{ color: story.color, backgroundColor: story.color + '15', borderColor: story.color + '40' }}
                    >
                      After
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-1">{story.client}</h3>
                  <p className="text-sm font-semibold" style={{ color: story.color }}>{story.after.headline}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {story.after.metrics.map(m => (
                      <div
                        key={m.label}
                        className="rounded-xl p-3 border"
                        style={{ backgroundColor: story.color + '10', borderColor: story.color + '30' }}
                      >
                        <div className="text-xs font-medium mb-0.5" style={{ color: story.color + 'aa' }}>{m.label}</div>
                        <div className="text-sm font-bold" style={{ color: story.color }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-[var(--color-text-main)] leading-relaxed flex-1">
                    {story.after.win}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {story.techUsed.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border"
                        style={{ color: story.color, backgroundColor: story.color + '10', borderColor: story.color + '30' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggle(story.id)}
                    className="w-full py-3 rounded-xl border text-sm font-semibold text-gray-500 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    ← View Before State
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
