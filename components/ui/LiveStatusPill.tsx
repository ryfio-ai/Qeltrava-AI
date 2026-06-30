import React from 'react';

type LiveStatusPillProps = {
  status?: 'operational' | 'degraded' | 'offline';
  label?: string;
  className?: string;
};

export const LiveStatusPill = ({ status = 'operational', label = 'Operational', className = '' }: LiveStatusPillProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'operational': return 'bg-[var(--color-success)]';
      case 'degraded': return 'bg-amber-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] ${className}`}>
      <div className="relative flex h-2.5 w-2.5">
        {status === 'operational' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor()}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${getStatusColor()}`}></span>
      </div>
      <span className="text-xs font-medium text-[var(--color-text-main)] uppercase tracking-wider">{label}</span>
    </div>
  );
};
