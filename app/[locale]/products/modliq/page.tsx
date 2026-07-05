"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
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
  ChevronDown,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle,
  HelpCircle,
  Clock,
  Terminal,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';

const workflowSteps = [
  { n: 1, title: 'Upload Dataset', desc: 'Ingest CSV, JSON, or databases.' },
  { n: 2, title: 'Prepare Data', desc: 'Automated categorical encoding and null handling.' },
  { n: 3, title: 'Select Model', icon: Cpu, desc: 'AutoML suggestion or manual algorithm selection.' },
  { n: 4, title: 'Train', icon: Brain, desc: 'Interactive training progress tracking.' },
  { n: 5, title: 'Evaluate', icon: LineChart, desc: 'Review precision, recall, and ROC indicators.' },
  { n: 6, title: 'Deploy', icon: Play, desc: 'Generate web endpoints or download model binaries.' }
];

const keyFeatures = [
  { icon: Upload, title: 'Dataset Upload', desc: 'Secure drag-and-drop file inputs supporting CSV, JSON, and Microsoft Excel.' },
  { icon: Wand2, title: 'Data Cleaning', desc: 'Automated categorical mapping, missing values median filling, and standard scalers.' },
  { icon: Cpu, title: 'Model Selection', desc: 'Support for XGBoost, Random Forest, Logistic Regressions, and Neural Networks.' },
  { icon: Activity, title: 'Visual Training', desc: 'Review real-time accuracy progress and training log consoles on demand.' },
  { icon: LineChart, title: 'Model Evaluation', desc: 'Detailed precision-recall metrics, confusion matrices, and SHAP features.' },
  { icon: Play, title: 'Prediction Interface', desc: 'Adjust features inside a custom form to generate predictions interactively.' },
  { icon: Sparkles, title: 'AI Recommendations', desc: 'Automatic feature profiling that warns you of data class imbalances.' },
  { icon: ArrowRight, title: 'Model Export', desc: 'One-click download of ONNX, PyTorch, and TensorFlow runtime structures.' }
];

const targetUsers = [
  { title: 'Startups', desc: 'Rapidly build and validate predictive features without expanding team overhead.' },
  { title: 'Enterprises', desc: 'Consolidate machine learning operations into a unified compliance-hardened workspace.' },
  { title: 'Students', desc: 'Study practical machine learning concepts visually without syntax complexity.' },
  { title: 'Researchers', desc: 'Train baseline models immediately using clean, visual comparison matrix options.' },
  { title: 'Product Teams', desc: 'Expose predictive API runtimes directly to test interactive product ideas.' },
  { title: 'Business Analysts', desc: 'Map database spreadsheets straight into custom classification endpoints.' }
];

const timelineStages = [
  { title: 'Development', desc: 'Currently in active development.', active: true },
  { title: 'Internal Testing', desc: 'Validation across private Qeltrava datasets.', active: false },
  { title: 'Beta Access', desc: 'Staged releases for waitlist invitees.', active: false },
  { title: 'Public Launch', desc: 'General availability release.', active: false }
];

import { submitNewsletter } from '@/platform/shared/actions';

export default function ModliqPage() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      try {
        await submitNewsletter(waitlistEmail);
        setWaitlistSubmitted(true);
        setWaitlistEmail('');
      } catch (err) {
        alert('Failed to register subscription.');
      }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] font-sans antialiased text-[var(--color-primary-dark)]">
      {/* 1. Hero Section */}
      <section className="pt-32 pb-24 border-b border-[var(--color-border-soft)] relative overflow-hidden">
        {/* Subtle top decoration grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="space-y-6">
              <FadeIn>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-mono font-bold uppercase tracking-wider">
                  ⚡ Coming Soon
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[var(--color-primary-dark)] mt-4">
                  Introducing Modliq
                </h1>
                <p className="text-base md:text-lg text-[var(--color-text-main)] leading-relaxed mt-4">
                  A No-Code Machine Learning Platform that enables anyone to build, train, evaluate, and deploy machine learning models through an intuitive visual workflow.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <a href="#waitlist" className="cta-button justify-center py-3 bg-indigo-600 text-white border-transparent hover:bg-indigo-700">
                    Join Waitlist
                  </a>
                  <a href="/contact?subject=Modliq+Early+Access" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-[var(--color-border-soft)] bg-white hover:bg-gray-50 text-[var(--color-primary-dark)] font-semibold text-sm transition-all shadow-sm">
                    Request Early Access
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Static Preview Mockup Column */}
            <div className="relative">
              <FadeIn delay={0.15}>
                <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02),transparent_50%)]" />
                  
                  {/* Top toolbar */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      <span className="text-[10px] font-mono text-gray-400 ml-2">Workspace Preview</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase">Modliq v0.9</span>
                  </div>

                  {/* Minimal preview metrics cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Dataset Uploaded', val: '98%', status: 'Complete', color: 'text-emerald-600' },
                      { label: 'Training Progress', val: '84%', status: 'Processing', color: 'text-indigo-600' },
                      { label: 'Model Accuracy', val: '94%', status: 'Optimal', color: 'text-emerald-600' },
                      { label: 'Prediction Ready', val: 'Yes', status: 'Healthy', color: 'text-emerald-600' }
                    ].map(card => (
                      <div key={card.label} className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-4 rounded-xl relative overflow-hidden">
                        <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">{card.label}</div>
                        <div className="text-2xl font-black font-mono tracking-tight mt-1 text-[var(--color-primary-dark)]">{card.val}</div>
                        <div className={`text-[9px] font-bold mt-2 uppercase tracking-wide ${card.color}`}>
                          ● {card.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-16">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 font-mono">
              Why Modliq?
            </h3>
            <p className="text-lg md:text-xl text-[var(--color-text-main)] leading-relaxed font-medium">
              Modliq simplifies machine learning by removing the need for coding while maintaining a structured workflow for data preparation, model training, evaluation, and deployment.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Workflow Section */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block font-mono">
              Core Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              From Raw Data to Production APIs
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-12 h-12 rounded-full border border-[var(--color-border-soft)] bg-white shadow-sm flex items-center justify-center font-mono text-sm font-bold text-gray-500 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-all duration-300">
                  {step.n}
                </div>
                <div className="space-y-1 px-2">
                  <h4 className="text-xs font-bold text-[var(--color-primary-dark)] group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Key Features Grid */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block font-mono">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Engineered Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {keyFeatures.map(feat => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-6 rounded-2xl transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border-soft)] text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Target Users Grid */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block font-mono">
              Audience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Built For Modern Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetUsers.map(user => (
              <div key={user.title} className="bg-white border border-[var(--color-border-soft)] p-6 rounded-2xl hover:shadow-sm transition-all duration-300">
                <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2">{user.title}</h4>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Development Status Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3 block font-mono">
              Status
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Development Roadmap
            </h2>
          </div>

          <div className="max-w-xl mx-auto space-y-4">
            {timelineStages.map((stage, idx) => (
              <div key={stage.title} className={`p-5 rounded-2xl border transition-all ${
                stage.active 
                  ? 'border-indigo-200 bg-indigo-50/30' 
                  : 'border-[var(--color-border-soft)] bg-transparent opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">{stage.title}</h4>
                  {stage.active && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      🟢 Current Stage
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-main)] leading-normal">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Call To Action (Waitlist Input) */}
      <section id="waitlist" className="py-28 bg-[var(--color-primary-dark)] text-white relative overflow-hidden">
        {/* Subtle ambient blur */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent_60%)]" />
        
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Be the first to experience Modliq.
            </h2>
            <p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Join our early access list and receive updates before public launch.
            </p>

            <div className="max-w-md mx-auto pt-4">
              {waitlistSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Invited! You are now on the waitlist.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    required 
                    value={waitlistEmail} 
                    onChange={e => setWaitlistEmail(e.target.value)} 
                    placeholder="Enter your work email" 
                    className="flex-grow px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-indigo-400 transition-all font-mono"
                  />
                  <button type="submit" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex-shrink-0">
                    Join Waitlist
                  </button>
                </form>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <a href="/contact?subject=Modliq+Inquiry" className="text-xs font-semibold text-white/60 hover:text-white transition-colors underline">
                Contact Team
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
