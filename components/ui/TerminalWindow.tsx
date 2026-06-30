import React from 'react';

type TerminalWindowProps = {
  children: React.ReactNode;
  className?: string;
};

export const TerminalWindow = ({ children, className = '' }: TerminalWindowProps) => {
  return (
    <div className={`rounded-xl overflow-hidden border border-[var(--color-primary-dark)]/20 shadow-2xl bg-[#0d1117] ${className}`}>
      {/* Header bar */}
      <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="ml-4 flex-1 text-center text-xs font-mono text-gray-400">
          qeltrava-agent ~ zsh
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 font-mono text-sm leading-relaxed text-gray-300 overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
