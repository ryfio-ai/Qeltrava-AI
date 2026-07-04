"use client";

import React from 'react';

// Text-badge certificates (no downloaded logos — text badges only until official permissions granted)
const badges = [
  { label: 'AWS Partner Network', note: 'Application in progress', muted: true },
  { label: 'Vercel Partner', note: 'Platform partner', muted: false },
  { label: 'Anthropic API', note: 'Claude API integration', muted: false },
  { label: 'SOC 2', note: 'In Progress', muted: true },
  { label: 'ISO 27001', note: 'In Progress', muted: true },
];

export const PartnerStrip = () => (
  <section className="py-12 bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)] select-none">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-main)]/75 text-center mb-8 font-mono">
        Technology Partnerships & Certifications
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {badges.map((b) => (
          <div
            key={b.label}
            className={`flex flex-col items-center text-center px-5 py-3 rounded-xl border text-sm font-bold leading-snug min-w-[120px] ${
              b.muted
                ? 'border-[var(--color-border-soft)] text-[var(--color-text-main)]/70 italic'
                : 'border-[var(--color-accent)]/30 text-[var(--color-accent)]'
            }`}
          >
            <span>{b.label}</span>
            <span className={`text-[10px] font-normal mt-0.5 ${b.muted ? 'text-[var(--color-text-main)]/72' : 'text-[var(--color-text-main)]/80'}`}>
              {b.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
