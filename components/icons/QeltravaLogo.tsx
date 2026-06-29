import React from 'react';

export const QeltravaLogo = ({ className = '' }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer orbit / Q shape */}
      <circle cx="45" cy="45" r="35" stroke="currentColor" strokeWidth="8" />
      {/* Q Tail */}
      <line x1="70" y1="70" x2="90" y2="90" stroke="currentColor" strokeWidth="8" strokeLinecap="square" />
      {/* Inner Node */}
      <circle cx="45" cy="45" r="12" fill="var(--color-accent)" />
      {/* Connecting Node */}
      <circle cx="70" cy="70" r="6" fill="var(--color-accent)" />
    </svg>
  );
};
