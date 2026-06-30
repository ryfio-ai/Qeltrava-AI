import React from 'react';

export const DotGrid = ({ opacity = 4 }: { opacity?: number }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: 'radial-gradient(circle at center, var(--color-text-main) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: opacity / 100
      }}
      aria-hidden="true"
    />
  );
};
