import React from 'react';

export const HeroBackground = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-[var(--color-primary)] ${className}`}>
      {/* Radial gradient from top-left */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" 
           style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)' }} />
      
      {/* Subtle geometric grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(to right, var(--color-primary-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary-soft) 1px, transparent 1px)',
             backgroundSize: '64px 64px'
           }} />
           
      {/* Faint perspective plane receding toward upper right */}
      <div className="absolute top-0 right-0 w-3/4 h-full pointer-events-none bg-gradient-to-bl from-[var(--color-primary-soft)] to-transparent opacity-20 transform skew-x-12 origin-top-right" />
      
      {/* Three small signal blue node points connected by hairline paths in lower right quadrant */}
      <svg className="absolute bottom-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-80" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <path d="M150,300 L250,200 L350,250" stroke="var(--color-accent)" strokeWidth="1" fill="none" className="opacity-40" />
        <circle cx="150" cy="300" r="3" fill="var(--color-accent)" />
        <circle cx="250" cy="200" r="4" fill="var(--color-accent)" />
        <circle cx="350" cy="250" r="3" fill="var(--color-accent)" />
      </svg>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
