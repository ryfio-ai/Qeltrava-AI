import React from 'react';

type TechStackBadgeRowProps = {
  technologies: string[];
  className?: string;
};

export const TechStackBadgeRow = ({ technologies, className = '' }: TechStackBadgeRowProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech) => (
        <span 
          key={tech} 
          className="px-2.5 py-1 text-xs font-mono font-medium bg-[var(--color-bg-light)] text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] rounded-md"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};
