"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/src/routing';
import Image from 'next/image';

type ServiceSector = {
  num: number;
  title: string;
  desc: string;
  color: string;
  link: string;
};

const sectors: ServiceSector[] = [
  { num: 1, title: "Creating Dedicated Software", desc: "Custom bespoke software solutions designed to fit your unique operational workflows, with zero bloat.", color: "#f59e0b", link: "/services/product-engineering" },
  { num: 2, title: "Development & Modernization", desc: "Upgrading outdated legacy applications, refactoring codebases, and migrating to modern language stacks.", color: "#10b981", link: "/services/product-engineering" },
  { num: 3, title: "Automation Processes Business", desc: "Orchestrating script agents and software bots to execute repetitive administration tasks automatedly.", color: "#10b981", link: "/services/ai-automation" },
  { num: 4, title: "System Integration", desc: "Connecting fragmented CRM, ERP, finance, and support platforms via robust, secure API layers.", color: "#06b6d4", link: "/services/cloud-devops" },
  { num: 5, title: "Development of Mobile Apps", desc: "Native iOS/Android apps built on React Native or Flutter, optimized for speed and user engagement.", color: "#3b82f6", link: "/services/saas-development" },
  { num: 6, title: "IT Audits and Security", desc: "Full penetration testing, vulnerability diagnostic assessments, compliance reviews, and firewall lockups.", color: "#6366f1", link: "/services/cybersecurity" },
  { num: 7, title: "DevOps and CI/CD", desc: "Setting up robust auto-deploy pipelines, multi-region failovers, and cloud infrastructure automation.", color: "#8b5cf6", link: "/services/cloud-devops" },
  { num: 8, title: "IT Consulting", desc: "Strategic advice on system architecture, resource budgets, scalability roadmap mapping, and AI audits.", color: "#d946ef", link: "/book-consultation" },
  { num: 9, title: "AI Implementations", desc: "Integrating vector databases, training LLM pipelines, fine-tuning, and deploying agent executors.", color: "#ec4899", link: "/services/ai-automation" },
  { num: 10, title: "Hiring Programmers", desc: "Assembling dedicated engineering pods that integrate seamlessly into your team under retainers.", color: "#f43f5e", link: "/operating-model" },
  { num: 11, title: "Support and Maintenance Systems", desc: "Continuous code updates, security patching, cloud resource cost-reduction audits, and server health checkups.", color: "#f97316", link: "/services/cloud-devops" }
];

export const VisualWhatSoftwareCompanyDoes = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  
  const current = sectors[selectedIdx];

  // Dynamically compute SVG pie sector path
  const getSectorPath = (cx: number, cy: number, rIn: number, rOut: number, startAngle: number, endAngle: number) => {
    const toRad = (angle: number) => ((angle - 90) * Math.PI) / 180;
    
    const xIn1 = (cx + rIn * Math.cos(toRad(startAngle))).toFixed(3);
    const yIn1 = (cy + rIn * Math.sin(toRad(startAngle))).toFixed(3);
    const xIn2 = (cx + rIn * Math.cos(toRad(endAngle))).toFixed(3);
    const yIn2 = (cy + rIn * Math.sin(toRad(endAngle))).toFixed(3);
    
    const xOut1 = (cx + rOut * Math.cos(toRad(startAngle))).toFixed(3);
    const yOut1 = (cy + rOut * Math.sin(toRad(startAngle))).toFixed(3);
    const xOut2 = (cx + rOut * Math.cos(toRad(endAngle))).toFixed(3);
    const yOut2 = (cy + rOut * Math.sin(toRad(endAngle))).toFixed(3);
    
    return `
      M ${xIn1} ${yIn1}
      L ${xOut1} ${yOut1}
      A ${rOut} ${rOut} 0 0 1 ${xOut2} ${yOut2}
      L ${xIn2} ${yIn2}
      A ${rIn} ${rIn} 0 0 0 ${xIn1} ${yIn1}
      Z
    `;
  };

  const anglePerSector = 360 / 11;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-xl flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8 max-w-xl">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">What Does a Software Engineering Partner Do?</h3>
        <p className="text-sm text-[var(--color-text-main)]">
          An interactive catalog of Qeltrava AI's software services. Click any color sector to explore its details and access the service link.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        
        {/* SVG Circle Wheel Selector */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[340px] h-[340px] select-none flex items-center justify-center">
            
            {/* SVG Element */}
            <svg className="w-full h-full" viewBox="0 0 340 340">
              <g className="cursor-pointer">
                {sectors.map((sec, idx) => {
                  const startAngle = idx * anglePerSector;
                  const endAngle = (idx + 1) * anglePerSector;
                  const isHovered = hoveredIdx === idx;
                  const isSelected = selectedIdx === idx;
                  
                  // Explode offset on hover/select
                  const explodeOffset = isHovered || isSelected ? 8 : 0;
                  const midAngleRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
                  const dx = Number((explodeOffset * Math.cos(midAngleRad)).toFixed(3));
                  const dy = Number((explodeOffset * Math.sin(midAngleRad)).toFixed(3));
                  
                  return (
                    <motion.path 
                       key={idx}
                       d={getSectorPath(170, 170, 75, 155, startAngle, endAngle)}
                       fill={sec.color}
                       stroke="#ffffff"
                       strokeWidth="2"
                       animate={{ x: dx, y: dy }}
                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       onMouseEnter={() => setHoveredIdx(idx)}
                       onMouseLeave={() => setHoveredIdx(null)}
                       onClick={() => setSelectedIdx(idx)}
                       opacity={hoveredIdx !== null && hoveredIdx !== idx ? 0.7 : 1}
                     />
                   );
                 })}
               </g>
 
               {/* Draw sector numbers directly inside SVG */}
               {sectors.map((sec, idx) => {
                 const startAngle = idx * anglePerSector;
                 const endAngle = (idx + 1) * anglePerSector;
                 const midAngleRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
                 
                 // Position numbers at middle radius
                 const textR = 115; 
                 const tx = Number((170 + textR * Math.cos(midAngleRad)).toFixed(3));
                 const ty = Number((170 + textR * Math.sin(midAngleRad) + 4).toFixed(3)); // Vertical adjustment
 
                 return (
                   <text 
                     key={idx}
                     x={tx}
                     y={ty}
                     fill="#ffffff"
                     fontSize="10"
                     fontWeight="black"
                     textAnchor="middle"
                     className="pointer-events-none"
                   >
                     {sec.num}
                   </text>
                 );
               })}
             </svg>

            {/* Central Circle Logo */}
            <div className="absolute w-[130px] h-[130px] rounded-full bg-white shadow-xl flex items-center justify-center p-3 border border-gray-100 pointer-events-none">
              <div className="bg-black p-2.5 rounded-2xl flex items-center justify-center">
                <Image src="/logo-bg.png" alt="Qeltrava Logo" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert" />
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Explanation Panel */}
        <div className="lg:col-span-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow" style={{ backgroundColor: current.color }}>
                  {current.num}
                </span>
                <h4 className="text-lg font-extrabold text-[var(--color-primary-dark)]">
                  {current.title}
                </h4>
              </div>
              
              <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-6">
                {current.desc}
              </p>

              <div className="flex justify-start">
                <Link href={current.link as any}>
                  <motion.button 
                    className="px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm flex items-center gap-2"
                    style={{ backgroundColor: current.color }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Engineering Service →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
