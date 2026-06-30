import React from 'react';

type MiniSparklineProps = {
  data?: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const MiniSparkline = ({ 
  data = [10, 25, 20, 45, 40, 60, 55, 80], 
  color = 'var(--color-success)', 
  width = 60, 
  height = 24,
  className = '' 
}: MiniSparklineProps) => {
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className={`overflow-visible ${className}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};
