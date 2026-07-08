"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
  bad?: boolean;
}

interface TransformationStory {
  id: string;
  industry: string;
  client: string;
  before: {
    headline: string;
    metrics: Metric[];
    pain: string;
  };
  after: {
    headline: string;
    metrics: Metric[];
    win: string;
  };
  techUsed: string[];
  color: string;
}

const stories: TransformationStory[] = [
  {
    id: 'retail-mvp',
    industry: 'Retail Tech',
    client: 'Retail Tech MVP',
    before: {
      headline: 'Concept & Validation Phase',
      metrics: [
        { label: 'Product Stage', value: 'Idea', bad: true },
        { label: 'Development', value: 'Not Started', bad: true },
        { label: 'User Testing', value: 'Blocked', bad: true },
        { label: 'Speed to Market', value: 'Unknown', bad: true },
      ],
      pain: 'The client needed to move quickly from a raw concept to a functional prototype to begin gathering real user feedback and validation.',
    },
    after: {
      headline: 'Working Mobile Application',
      metrics: [
        { label: 'Product Stage', value: 'MVP Launched', bad: false },
        { label: 'Development', value: 'Completed', bad: false },
        { label: 'User Testing', value: 'Active', bad: false },
        { label: 'Speed to Market', value: '6 Weeks', bad: false },
      ],
      win: 'Delivered a complete mobile application prototype from scratch, moving the client from concept to a working product for early user testing.',
    },
    techUsed: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
    color: '#6366f1',
  },
  {
    id: 'ai-automation',
    industry: 'Enterprise Operations',
    client: 'AI Workflow Automation',
    before: {
      headline: 'Manual Data Operations',
      metrics: [
        { label: 'Process', value: 'Manual', bad: true },
        { label: 'Execution Speed', value: 'Slow', bad: true },
        { label: 'Scalability', value: 'Bottlenecked', bad: true },
        { label: 'Error Potential', value: 'High', bad: true },
      ],
      pain: 'Internal operations were bogged down by repetitive manual processes, slowing down the team and creating bottlenecks as data volume grew.',
    },
    after: {
      headline: 'Automated AI Pipeline',
      metrics: [
        { label: 'Process', value: 'AI Automated', bad: false },
        { label: 'Execution Speed', value: 'Real-time', bad: false },
        { label: 'Scalability', value: 'Unlimited', bad: false },
        { label: 'Error Potential', value: 'Minimal', bad: false },
      ],
      win: 'Replaced manual processes with an automated AI pipeline, significantly accelerating the client\'s internal operations and freeing up the team.',
    },
    techUsed: ['Python', 'FastAPI', 'OpenAI API', 'LangChain'],
    color: '#10b981',
  },
  {
    id: 'custom-web',
    industry: 'Custom Software',
    client: 'Custom Web Platform',
    before: {
      headline: 'Rigid Off-the-shelf Tools',
      metrics: [
        { label: 'Flexibility', value: 'Rigid', bad: true },
        { label: 'Business Logic', value: 'Compromised', bad: true },
        { label: 'Integrations', value: 'Poor', bad: true },
        { label: 'User Experience', value: 'Generic', bad: true },
      ],
      pain: 'Existing off-the-shelf SaaS solutions could not handle the client\'s unique business logic, forcing them into inefficient workarounds.',
    },
    after: {
      headline: 'Tailored Web Interface',
      metrics: [
        { label: 'Flexibility', value: 'Custom', bad: false },
        { label: 'Business Logic', value: '100% Mapped', bad: false },
        { label: 'Integrations', value: 'Seamless', bad: false },
        { label: 'User Experience', value: 'Tailored', bad: false },
      ],
      win: 'Engineered a scalable web interface tailored entirely to the client\'s unique business logic and requirements, enabling true operational efficiency.',
    },
    techUsed: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
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
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-full whitespace-nowrap">
                        Illustrative Scenario
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full">
                        Before
                      </span>
                    </div>
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
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-medium px-2 py-1 bg-white/50 text-gray-500 rounded-full border border-gray-200 whitespace-nowrap">
                        Illustrative Scenario
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-1 border rounded-full"
                        style={{ color: story.color, backgroundColor: story.color + '15', borderColor: story.color + '40' }}
                      >
                        After
                      </span>
                    </div>
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
