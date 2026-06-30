"use client";

import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type NetworkBackgroundProps = {
  density?: 'sparse' | 'dense';
  className?: string;
};

// Generates a deterministic but organic looking graph
const generateGraph = (density: 'sparse' | 'dense') => {
  const nodeCount = density === 'dense' ? 35 : 15;
  const nodes = [];
  
  // Use a pseudo-random generator with a fixed seed so it's consistent between SSR and Client
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // We want to avoid the exact center where text usually sits, creating a "ring" or scattered edges
  for (let i = 0; i < nodeCount; i++) {
    // Generate positions mostly towards the edges (0-30% and 70-100% of width/height)
    let x = random() * 100;
    let y = random() * 100;
    
    // If it falls in the center text zone (30-70%), push it out
    if (x > 30 && x < 70 && y > 30 && y < 70) {
      x = random() > 0.5 ? random() * 30 : 70 + random() * 30;
      y = random() > 0.5 ? random() * 30 : 70 + random() * 30;
    }

    nodes.push({
      id: i,
      x,
      y,
      size: 2 + random() * 4,
      pulseDelay: random() * 5,
      pulseDuration: 6 + random() * 4
    });
  }

  // Generate edges between nearby nodes
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < (density === 'dense' ? 25 : 35)) {
        edges.push({ id: `${i}-${j}`, source: nodes[i], target: nodes[j], opacity: 1 - dist / 35 });
      }
    }
  }

  return { nodes, edges };
};

export const NetworkBackground = ({ density = 'sparse', className = '' }: NetworkBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 15]);

  const { nodes, edges } = useMemo(() => generateGraph(density), [density]);

  return (
    <motion.div 
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ y }}
    >
      <svg className="w-full h-full opacity-60" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
        {/* Draw Edges */}
        {edges.map(edge => (
          <line
            key={edge.id}
            x1={`${edge.source.x}%`}
            y1={`${edge.source.y}%`}
            x2={`${edge.target.x}%`}
            y2={`${edge.target.y}%`}
            stroke="var(--color-accent)"
            strokeWidth="0.1"
            opacity={Math.max(0.08, Math.min(0.14, edge.opacity * 0.14))}
          />
        ))}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size / 10}
            fill="var(--color-accent)"
            initial={false}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: node.pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.pulseDelay
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};
