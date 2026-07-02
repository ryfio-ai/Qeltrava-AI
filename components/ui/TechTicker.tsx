"use client";

import React, { useEffect, useRef } from 'react';

const TECHS = [
  'LangChain & LangGraph', 'Next.js 14', 'PostgreSQL', 'Kubernetes',
  'Terraform', 'Pinecone', 'FastAPI', 'React Native', 'Snowflake',
  'ArgoCD', 'AWS', 'Azure', 'Claude API', 'OpenAI', 'Docker', 'dbt',
];

export const TechTicker = () => {
  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Duplicate the array for seamless loop
  const doubled = [...TECHS, ...TECHS];

  return (
    <div
      className="w-full bg-[var(--color-bg-light)] border-t border-b border-[var(--color-border-soft)] overflow-hidden h-10 flex items-center"
      aria-hidden="true"
    >
      {reducedMotion ? (
        // Static: show first 6 items
        <div className="flex items-center gap-8 px-6">
          {TECHS.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="text-[13px] font-mono text-[var(--color-text-main)]/60 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center animate-ticker w-max gap-10 px-10 hover:[animation-play-state:paused]">
          {doubled.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-[13px] font-mono text-[var(--color-text-main)]/60 whitespace-nowrap"
            >
              {tech}
              {i !== doubled.length - 1 && (
                <span className="mx-4 text-[var(--color-border-soft)]">·</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
