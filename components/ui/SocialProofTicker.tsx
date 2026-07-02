"use client";

import React from 'react';

// Subtle strip that cycles outcome stats above the footer
const ITEMS = [
  '150+ systems deployed',
  '99.99% uptime SLA',
  '45+ global clients',
  'AI-native from architecture to deployment',
  'PSG College of Technology, Class of 2026',
  '320% average ROI improvement',
  'Zero downtime migrations',
  'HIPAA · PCI-DSS · SOC 2 ready',
];

export const SocialProofTicker = () => {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)] overflow-hidden h-10 flex items-center"
      aria-hidden="true"
    >
      <div className="flex items-center animate-ticker w-max gap-12 px-10 hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[12px] font-semibold text-[var(--color-primary-dark)]/50 whitespace-nowrap"
          >
            {item}
            {i !== doubled.length - 1 && (
              <span className="mx-4 text-[var(--color-border-soft)]">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
