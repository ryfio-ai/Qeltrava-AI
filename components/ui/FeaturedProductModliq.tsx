"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { 
  Upload, 
  Wand2, 
  Cpu, 
  Brain, 
  LineChart, 
  Play, 
  Database,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';

const workflowSteps = [
  { label: 'Upload Dataset', icon: Database, desc: 'CSV, JSON, or SQL' },
  { label: 'Clean Data', icon: Wand2, desc: 'Auto-handle nulls' },
  { label: 'Select Model', icon: Cpu, desc: 'XGBoost, Random Forest...' },
  { label: 'Train Model', icon: Brain, desc: 'Optimized training runs' },
  { label: 'Evaluate Results', icon: LineChart, desc: 'ROC/AUC & accuracy stats' },
  { label: 'Generate Predictions', icon: Play, desc: 'API endpoint or batch CSV' }
];

const features = [
  {
    icon: Upload,
    title: 'Dataset Upload',
    desc: 'Seamless ingestion of CSV and JSON datasets directly from local files or cloud databases.'
  },
  {
    icon: Wand2,
    title: 'Visual Data Cleaning',
    desc: 'Interactive handling of missing values, outliers, and automated categorical encoding.'
  },
  {
    icon: Cpu,
    title: 'Classification & Regression',
    desc: 'Support for top supervised learning models including random forests, XGBoost, and neural networks.'
  },
  {
    icon: Sparkles,
    title: 'AI Model recommendations',
    desc: 'Automatic analysis of dataset patterns to suggest the optimal algorithms and hyperparameters.'
  },
  {
    icon: Play,
    title: 'Interactive Predictions',
    desc: 'Test your model instantly in a visual playground before deploying live API endpoints.'
  },
  {
    icon: ArrowRight,
    title: 'One-Click Export',
    desc: 'Download model binaries (ONNX, PMML) or deploy immediately to a production-ready edge container.'
  }
];

export function FeaturedProductModliq() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16">
      {/* Hero Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full">
              ✨ Coming Soon
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-gray-300 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full">
              Flagship Product
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] tracking-tight leading-tight">
            Introducing Modliq
          </h2>

          <p className="text-lg md:text-xl font-bold text-gray-700 leading-relaxed">
            A No-Code Machine Learning Platform that enables anyone to build, train, evaluate, and deploy machine learning models without writing code.
          </p>

          <p className="text-sm text-[var(--color-text-main)] leading-relaxed">
            Modliq simplifies machine learning through an intuitive visual workflow, making AI development accessible for businesses, researchers, educators, and product teams.
          </p>

          {/* Status Panel */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-white border border-[var(--color-border-soft)] rounded-2xl shadow-sm">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Development</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active Development
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Estimated Launch</div>
              <div className="text-xs font-bold text-[var(--color-primary-dark)]">Coming Soon</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Availability</div>
              <div className="text-xs font-bold text-[var(--color-primary-dark)]">Early Access</div>
            </div>
          </div>

          {/* CTAs */}
          <div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button href="/contact?subject=Modliq+Waitlist" className="justify-center bg-indigo-600 text-white border-transparent hover:bg-indigo-700">
                Request Invite →
              </Button>
              <button 
                disabled 
                className="group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-[var(--color-border-soft)] bg-gray-50 text-gray-400 text-sm font-semibold cursor-not-allowed select-none transition-colors"
              >
                <span>Learn More (Coming Soon)</span>
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-[var(--color-text-main)] opacity-70 mt-2 font-medium ml-2">
              1,200+ models trained
            </p>
          </div>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="relative">
          {/* Card Wrapper styling mimicking a high-fidelity editor */}
          <div className="relative bg-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_50%)]" />
            
            {/* Top Toolbar mimic */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">Modliq Editor v0.8</span>
              </div>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-mono rounded">No-Code Workspace</span>
            </div>

            {/* Simulated Workflow list */}
            <div className="space-y-4 relative">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                const isHovered = activeStep === idx;
                
                return (
                  <div key={step.label} className="relative group">
                    <motion.div 
                      onMouseEnter={() => setActiveStep(idx)}
                      onMouseLeave={() => setActiveStep(null)}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 relative z-10 ${
                        isHovered 
                          ? 'bg-slate-900 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.08)]' 
                          : 'bg-slate-950/60 border-white/[0.04]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isHovered ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/60'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-bold text-white tracking-wide">{step.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5 truncate">{step.desc}</div>
                      </div>

                      <ChevronRight className={`w-4 h-4 text-white/20 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1 text-indigo-400' : ''
                      }`} />
                    </motion.div>

                    {/* Dotted Flow Connector line connecting down to the next node */}
                    {idx < workflowSteps.length - 1 && (
                      <div className="absolute left-[33px] top-[50px] bottom-[-20px] w-px border-l border-dashed border-white/20 z-0 pointer-events-none group-hover:border-indigo-500/40 transition-colors" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* External ambient glow decoration */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none -z-10" />
        </div>
      </div>

      {/* Feature highlights grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-[var(--color-border-soft)] hover:border-indigo-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2 group-hover:text-indigo-600 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
