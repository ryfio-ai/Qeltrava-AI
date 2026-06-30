import React from 'react';

type CodeBlockProps = {
  code: React.ReactNode;
  language?: string;
  className?: string;
};

export const CodeBlock = ({ code, language = 'typescript', className = '' }: CodeBlockProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden bg-[var(--color-primary-dark)] border border-white/10 ${className}`}>
      {language && (
        <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono text-white/40 uppercase tracking-wider bg-white/5 border-b border-l border-white/10 rounded-bl-lg">
          {language}
        </div>
      )}
      <pre className="p-6 overflow-x-auto text-sm font-mono text-white/90 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
