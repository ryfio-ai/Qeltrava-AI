"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

const questions = [
  {
    q: 'How would you describe your data situation?',
    opts: ['No structured data yet', 'Some data but scattered across tools', 'Structured data with limited access', 'Clean, accessible, well-governed data'],
  },
  {
    q: 'Do you have a clearly defined process to automate or enhance?',
    opts: ['No clear process defined', 'Rough idea, not documented', 'Documented but complex with exceptions', 'Clear, repeatable, documented process'],
  },
  {
    q: 'What is the level of executive support for AI?',
    opts: ['No executive interest', 'Exploratory interest only', 'Executive champion identified', 'Full sponsorship with approved budget'],
  },
  {
    q: 'How mature is your current technology stack?',
    opts: ['Legacy systems, minimal cloud', 'Mix of legacy and modern systems', 'Mostly modern, some cloud adoption', 'Cloud-native, containerised, modern stack'],
  },
  {
    q: 'Do you have dedicated engineering resources for AI?',
    opts: ['No engineering team', 'Small team, no AI experience', 'Engineering team with some AI exposure', 'Dedicated AI engineering capacity'],
  },
  {
    q: 'What is your monthly data volume?',
    opts: ['< 1,000 records/events', '1K – 100K records/events', '100K – 10M records/events', '10M+ records/events per month'],
  },
  {
    q: 'Do you have data governance and privacy policies?',
    opts: ['No formal policies', 'Basic data handling guidelines', 'Formal governance with some gaps', 'Full framework — GDPR/CCPA compliant'],
  },
  {
    q: 'What is your cloud / infrastructure status?',
    opts: ['On-premise only', 'Beginning cloud migration', 'Hybrid cloud environment', 'Fully cloud-native with IaC (Terraform)'],
  },
  {
    q: 'Have you previously attempted AI/ML projects?',
    opts: ['Never considered AI', 'Explored but no production deployment', 'Some AI in production, limited scope', 'Active AI use cases in production'],
  },
  {
    q: 'What is your AI investment readiness?',
    opts: ['No budget allocated', 'Small exploratory budget (< $20K)', 'Committed budget ($20K – $100K)', 'Significant budget (> $100K) approved'],
  },
];

const bands = [
  { min: 0, max: 25, label: 'Foundation First', color: '#ef4444', bg: '#fef2f2', border: '#fecaca', risk: 'High', recs: ['Establish a data governance strategy', 'Audit and consolidate your data sources', 'Secure executive sponsorship first', 'Start with a proof-of-concept in a low-risk area'] },
  { min: 26, max: 50, label: 'AI Starter', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', risk: 'Medium', recs: ['Define 1–2 high-value AI use cases', 'Build a small data pipeline', 'Run a 4-week AI pilot project', 'Upskill your engineering team on LLMs'] },
  { min: 51, max: 75, label: 'AI Ready', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', risk: 'Low', recs: ['Build your first production AI feature', 'Implement RAG over your business data', 'Automate your highest-volume manual process', 'Establish AI ops and monitoring practices'] },
  { min: 76, max: 100, label: 'AI Advanced', color: '#10b981', bg: '#f0fdf4', border: '#a7f3d0', risk: 'Very Low', recs: ['Scale existing AI to all product lines', 'Build proprietary fine-tuned models', 'Implement AI governance and audit framework', 'Explore autonomous AI agent deployments'] },
];

export default function AIReadinessPage() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [step, setStep] = useState(0); // 0..9 = questions, 10 = results
  const [started, setStarted] = useState(false);

  const current = questions[step];
  const answered = answers[step] >= 0;
  const progress = step / questions.length;

  const score = Math.round(
    (answers.reduce((s, a) => s + Math.max(0, a), 0) / (questions.length * 3)) * 100
  );
  const band = bands.find(b => score >= b.min && score <= b.max) ?? bands[0];

  const select = (opt: number) => setAnswers(prev => { const n = [...prev]; n[step] = opt; return n; });

  const next = () => {
    if (step < questions.length - 1) setStep(s => s + 1);
    else setStep(questions.length);
  };

  const reset = () => { setAnswers(Array(questions.length).fill(-1)); setStep(0); setStarted(false); };

  if (!started) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-light)]">
        <section className="pt-20 pb-16 bg-[var(--color-primary-dark)] relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.12) 0%, transparent 50%)' }} />
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full text-[var(--color-accent)] text-xs font-bold font-mono uppercase tracking-wider mb-6">
                📊 Free Assessment
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">AI Readiness Assessment</h1>
              <p className="text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
                10 questions. 3 minutes. Get your AI readiness score, risk level, and a custom action plan.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-white/50">
                {['10 questions', '~3 minutes', 'Instant results', 'No email required'].map(t => (
                  <span key={t} className="flex items-center gap-1.5"><span className="text-[var(--color-accent)]">✓</span>{t}</span>
                ))}
              </div>
              <button onClick={() => setStarted(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white font-bold rounded-full hover:opacity-90 transition-opacity text-base">
                Start Assessment →
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
    );
  }

  if (step === questions.length) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-light)] py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-2">Your AI Readiness Score</h2>
            <p className="text-[var(--color-text-main)]">Based on your 10 answers</p>
          </motion.div>

          {/* Score Ring */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
            className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                <circle cx="70" cy="70" r="60" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                <motion.circle cx="70" cy="70" r="60" fill="none"
                  stroke={band.color} strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - score / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black" style={{ color: band.color }}>{score}</span>
                <span className="text-xs text-gray-400 font-mono">/100</span>
              </div>
            </div>
          </motion.div>

          {/* Band card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border-2 p-7 mb-6"
            style={{ borderColor: band.color, backgroundColor: band.bg }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: band.color }}>Readiness Level</p>
                <h3 className="text-2xl font-bold" style={{ color: band.color }}>{band.label}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Implementation Risk</p>
                <p className="text-sm font-bold" style={{ color: band.color }}>{band.risk}</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Recommended Next Steps</p>
              {band.recs.map(r => (
                <div key={r} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: band.color }} />
                  <span className="text-sm text-gray-700">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3">
            <Button href="/book-consultation" className="flex-1 justify-center bg-[var(--color-accent)] text-white border-transparent">
              Book an AI Strategy Session →
            </Button>
            <button onClick={reset} className="flex-1 py-3 px-6 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors">
              Retake Assessment
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <motion.div className="h-full bg-[var(--color-accent)]" animate={{ width: `${progress * 100}%` }} transition={{ ease: 'easeOut' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 md:px-12">
        <div className="w-full max-w-xl">
          {/* Counter */}
          <div className="flex items-center justify-between mb-8 text-sm text-gray-400">
            <span className="font-mono">Question {step + 1} of {questions.length}</span>
            <button onClick={reset} className="text-xs hover:text-gray-600 transition-colors">← Start over</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-8 leading-snug">
                {current.q}
              </h2>

              <div className="space-y-3 mb-10">
                {current.opts.map((opt, i) => {
                  const selected = answers[step] === i;
                  return (
                    <button key={opt} onClick={() => select(i)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium ${selected
                        ? 'bg-[var(--color-accent)]/5 border-[var(--color-accent)] text-[var(--color-primary-dark)]'
                        : 'bg-white border-[var(--color-border-soft)] text-[var(--color-text-main)] hover:border-gray-300'
                        }`}>
                      <span className="mr-3 opacity-50 font-mono text-xs">{String.fromCharCode(65 + i)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={next}
                disabled={!answered}
                className="w-full py-4 rounded-full bg-[var(--color-accent)] text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {step === questions.length - 1 ? 'See My Score →' : 'Next Question →'}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
