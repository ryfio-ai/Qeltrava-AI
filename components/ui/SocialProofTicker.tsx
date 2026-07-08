"use client";

import React from 'react';

// Subtle strip that cycles outcome stats above the footer
const ITEMS = [
  'Rapid MVPs in Weeks, Not Months',
  'Custom AI Integrations',
  'Full-Stack Web & Mobile Apps',
  'AI-native from architecture to deployment',
  'Transparent, Milestone-Based Delivery',
  'Designed for Scale',
  'Modern Security Best Practices',
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
            className="text-[12px] font-semibold text-[var(--color-primary-dark)]/70 whitespace-nowrap"
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
