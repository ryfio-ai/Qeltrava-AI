"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldAlert
} from 'lucide-react';

// Workflow steps configuration
const steps = [
  {
    n: 1,
    title: 'Upload Dataset',
    desc: 'Ingest data from CSV, JSON, Excel, or SQL databases with automatic format validation.',
    mockContent: {
      type: 'table',
      headers: ['id', 'amount', 'country', 'fraud_label'],
      rows: [
        ['trx_8492', '$120.00', 'USA', '0'],
        ['trx_1094', '$850.00', 'DEU', '1'],
        ['trx_3948', '$15.50', 'FRA', '0']
      ],
      footnote: 'Dataset preview · 42,912 rows loaded'
    }
  },
  {
    n: 2,
    title: 'Clean Data',
    desc: 'Automated categorical encoding, handling of null values, duplicate detection, and scaling.',
    mockContent: {
      type: 'list',
      items: [
        '✓ Missing values in "age" filled with median (28)',
        '✓ "country" encoded using One-Hot Encoder (8 categories)',
        '✓ Standardized numeric features to mean=0, std=1',
        '✓ Dropped 12 duplicate transaction entries'
      ]
    }
  },
  {
    n: 3,
    title: 'Choose Model',
    desc: 'Select from classic algorithms or let AutoML recommend the best structure.',
    mockContent: {
      type: 'comparison',
      models: [
        { name: 'XGBoost Classifier', accuracy: '94.2%', recommended: true },
        { name: 'Random Forest', accuracy: '91.8%', recommended: false },
        { name: 'Logistic Regression', accuracy: '86.5%', recommended: false }
      ]
    }
  },
  {
    n: 4,
    title: 'Train Model',
    desc: 'Visual progress tracker with live loss graphs, epoch indicators, and training logs.',
    mockContent: {
      type: 'logs',
      epoch: 45,
      loss: 0.124,
      logs: [
        '[Info] Starting epoch 43/50... loss: 0.131',
        '[Info] Starting epoch 44/50... loss: 0.127',
        '[Info] Starting epoch 45/50... loss: 0.124',
        '[Success] Epoch 45 completed in 0.42s'
      ]
    }
  },
  {
    n: 5,
    title: 'Evaluate Results',
    desc: 'Review precision, recall, F1 scores, ROC curves, and SHAP feature importance charts.',
    mockContent: {
      type: 'metrics',
      accuracy: '94.2%',
      f1: '93.8%',
      precision: '94.0%',
      recall: '93.6%'
    }
  },
  {
    n: 6,
    title: 'Generate Predictions',
    desc: 'Input test parameters interactively or run batch inference on new datasets.',
    mockContent: {
      type: 'form',
      fields: [
        { label: 'amount', value: '$850.00' },
        { label: 'country', value: 'DEU' }
      ],
      prediction: 'Class 1 (Fraudulent)',
      confidence: '98.4%'
    }
  },
  {
    n: 7,
    title: 'Deploy Model',
    desc: 'Instantly download the model binary (ONNX, PMML) or expose a live REST API endpoint.',
    mockContent: {
      type: 'code',
      code: `curl -X POST https://api.modliq.com/v1/predict \\
  -H "Authorization: Bearer mliq_live_..." \\
  -d '{"amount": 850.00, "country": "DEU"}'`
    }
  }
];

// Features configuration
const features = [
  { icon: Database, title: 'Dataset Upload', desc: 'Drag-and-drop CSV, JSON, and Excel. Fully secure local file caching and validation checks.' },
  { icon: Wand2, title: 'Data Preparation', desc: 'Automatic duplicate detection, outlier capping, missing values median/mean filling.' },
  { icon: Cpu, title: 'Model Builder', desc: 'Classification, regression, clustering, and timeseries AutoML algorithms.' },
  { icon: Activity, title: 'Visual Training Metrics', desc: 'Live loss charts, epoch logging, training resource utilization indicators.' },
  { icon: LineChart, title: 'Rich Evaluation Specs', desc: 'Precision/Recall charts, confusion matrices, F1 score indicators, and feature weights.' },
  { icon: Play, title: 'Interactive Predictions', desc: 'Interactively adjust parameters inside a test playground to review predictions live.' },
  { icon: ArrowRight, title: 'One-Click Deployment', desc: 'Download ONNX, TensorFlow, PyTorch runtimes, or deploy directly to a production API.' },
  { icon: Sparkles, title: 'AI Assistant Insights', desc: 'Automated data profile validation, model recommendations, and hyperparameter warnings.' }
];

// Use cases
const useCases = [
  { title: 'Fraud Detection', desc: 'Analyze card transactions for fraudulent behavior in real-time.' },
  { title: 'Customer Churn', desc: 'Predict customer churn risks based on telemetry history.' },
  { title: 'Sales Forecasting', desc: 'Project future monthly revenues based on historical datasets.' },
  { title: 'Demand Prediction', desc: 'Estimate inventory stocking levels using timeseries models.' },
  { title: 'Medical Diagnosis', desc: 'Evaluate clinical metrics to recommend treatment pathways.' },
  { title: 'Quality Assurance', desc: 'Predict manufacturing equipment faults using telemetry reports.' }
];

// FAQ list
const faqs = [
  { q: 'Who is Modliq for?', a: 'Modliq is built for data analysts, researchers, product managers, developers, and business operations teams looking to build predictive models quickly without learning Python or setting up PyTorch environments.' },
  { q: 'Do I need coding knowledge?', a: 'No. Modliq features a 100% visual interface. From data cleaning to API deployment, you can configure everything with a few clicks.' },
  { q: 'Can I export trained models?', a: 'Yes. Models trained in Modliq are fully owned by you. You can export them in standard formats (ONNX, TensorFlow, PyTorch) or build deployment containers instantly.' },
  { q: 'Which algorithms are supported?', a: 'We support top classification and regression models including XGBoost, LightGBM, Random Forest, Decision Trees, Logistic Regression, Linear Regression, and Neural Networks.' },
  { q: 'Can I upload large datasets?', a: 'Our early access limits datasets to 10GB per run. Enterprise tiers support streaming larger datasets directly from AWS S3, Snowflake, or BigQuery.' }
];

// Roadmap phases
const roadmap = [
  { phase: 'Phase 1', title: 'Core AutoML Workspace', desc: 'Drag-and-drop ingestion, standard classification models, visual metrics, ONNX download.', status: 'Launching Soon' },
  { phase: 'Phase 2', title: 'Feature Store & Collab', desc: 'Shared team workspaces, custom SQL queries, explainability metrics (SHAP), model marketplace.', status: 'Upcoming' },
  { phase: 'Phase 3', title: 'Scale & API Gateway', desc: 'Edge container deployments, model version control, API quota monitoring, hybrid-cloud setups.', status: 'Planned' }
];

export default function ModliqPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [demoRequested, setDemoRequested] = useState(false);

  // Simulated metrics state for mockup training run
  const [trainingLoss, setTrainingLoss] = useState(0.85);
  const [trainingEpoch, setTrainingEpoch] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingEpoch(e => {
        if (e >= 100) return 1;
        return e + 1;
      });
      setTrainingLoss(l => {
        if (trainingEpoch === 1) return 0.85;
        const nextLoss = l - 0.008 * Math.random();
        return Math.max(0.045, nextLoss);
      });
    }, 300);
    return () => clearInterval(interval);
  }, [trainingEpoch]);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
      setWaitlistEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)]">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 bg-[var(--color-primary-dark)] text-white overflow-hidden">
        {/* Ambient background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              ✨ Flagship AI Platform · Early Access
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto">
              No-Code Machine Learning Platform for Modern Teams
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              Build, train, evaluate, and deploy production-ready machine learning models through a visual interface. No coding required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6 max-w-md mx-auto">
              <a href="#waitlist" className="cta-button justify-center py-3.5 bg-indigo-600 text-white border-transparent hover:bg-indigo-700">
                Join Early Access
              </a>
              <button onClick={() => setDemoRequested(true)} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                Book a Demo
              </button>
            </div>
            
            {/* Modal for Demo request */}
            {demoRequested && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white text-[var(--color-primary-dark)] rounded-2xl p-8 max-w-md w-full border border-gray-200 shadow-2xl relative text-left">
                  <h3 className="text-xl font-bold mb-2">Book a Modliq Demo</h3>
                  <p className="text-sm text-[var(--color-text-main)] mb-6">Let us schedule a 15-minute live preview with your dataset.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setDemoRequested(false); }} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Work Email</label>
                      <input type="email" required placeholder="name@company.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors">Submit</button>
                      <button type="button" onClick={() => setDemoRequested(false)} className="flex-1 py-3 border border-gray-200 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* 2. Live Training Mockup Panel */}
      <section className="py-12 bg-[#090D16] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-slate-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Window bar */}
            <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-white/50 ml-3">modliq-workspace-production</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                AutoML Training Run
              </div>
            </div>

            {/* Panel Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Col 1: Dataset Insights */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Dataset Profile</h4>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Source File</span>
                      <span className="text-xs font-mono text-white font-bold">claims_data_v2.csv</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Total Rows</span>
                      <span className="text-xs font-mono text-white font-bold">148,210</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Features Found</span>
                      <span className="text-xs font-mono text-white font-bold">18 columns</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Data Distribution</h4>
                  <div className="space-y-2">
                    {['Valid claims (74%)', 'Rejected claims (18%)', 'Flagged reviews (8%)'].map((dist, idx) => {
                      const percentages = [74, 18, 8];
                      const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
                      return (
                        <div key={dist} className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-medium text-white/70">
                            <span>{dist}</span>
                            <span>{percentages[idx]}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${colors[idx]}`} style={{ width: `${percentages[idx]}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Col 2: Live Progress & Graphs */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Training Status</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/70 font-medium">AutoML Epoch iteration</span>
                    <span className="text-xs text-white font-mono font-bold">{trainingEpoch}/100</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${trainingEpoch}%` }} />
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Running Loss</span>
                    <span className="text-xs font-mono text-indigo-400 font-bold">{trainingLoss.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Current Accuracy</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{(94.2 + Math.random() * 0.1).toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Hardware Allocation</span>
                    <span className="text-xs font-mono text-white/80">NVIDIA L4 Tensor Core GPU</span>
                  </div>
                </div>
              </div>

              {/* Col 3: Code & Live Logs terminal */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">AutoML Training Console</h4>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1.5 h-44 overflow-y-auto leading-relaxed">
                    <div>[SYS] Model search initialized...</div>
                    <div>[SYS] Feature engineering iteration: 0.18s</div>
                    <div>[TRAIN] Testing Random Forest baseline: 91.2% acc</div>
                    <div>[TRAIN] Testing LightGBM structure: 93.6% acc</div>
                    <div className="text-indigo-400">[TRAIN] Epoch {trainingEpoch}/100: current loss = {trainingLoss.toFixed(4)}</div>
                    <div className="text-white/40">[LOG] Validating data matrices...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Stepper Workflow Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Visual ML Pipeline
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Interactive Modliq Workflow
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Explore the 7 key steps of the Modliq machine learning workspace. Click any stage to review its visual pipeline content.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left list of steps */}
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className="w-full text-left"
                  >
                    <div className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                      isActive 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                        : 'bg-[var(--color-bg-light)] border-[var(--color-border-soft)] text-[var(--color-text-main)] hover:border-gray-300'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.n}
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold mb-1.5 ${isActive ? 'text-white' : 'text-[var(--color-primary-dark)]'}`}>
                          {step.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${isActive ? 'text-white/70' : 'text-[var(--color-text-main)]'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Mock Output panel */}
            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 text-white min-h-[360px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.04),transparent_50%)] font-mono text-[9px] opacity-10 uppercase tracking-widest p-4">Pipeline Preview</div>
              
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Step {steps[activeStep].n} Output Preview</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {steps[activeStep].mockContent.type === 'table' && (
                        <div className="space-y-3">
                          <div className="overflow-x-auto">
                            <table className="w-full text-[10px] font-mono border-collapse">
                              <thead>
                                <tr className="border-b border-white/10 text-white/40">
                                  {steps[activeStep].mockContent.headers?.map(h => (
                                    <th key={h} className="text-left py-1.5 px-2">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {steps[activeStep].mockContent.rows?.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="py-2 px-2 text-white/80">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="text-[9px] text-white/40 italic font-mono">{steps[activeStep].mockContent.footnote}</div>
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'list' && (
                        <div className="space-y-2">
                          {steps[activeStep].mockContent.items?.map((item, idx) => (
                            <div key={idx} className="text-xs font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-2 rounded-lg">
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'comparison' && (
                        <div className="space-y-2.5">
                          {steps[activeStep].mockContent.models?.map(m => (
                            <div key={m.name} className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono ${
                              m.recommended ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/10'
                            }`}>
                              <div>
                                <span className="font-bold">{m.name}</span>
                                {m.recommended && <span className="ml-2 text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded">AUTOML RECOMMENDED</span>}
                              </div>
                              <span className="font-bold text-white/90">{m.accuracy}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'logs' && (
                        <div className="space-y-3 font-mono text-[10px]">
                          <div className="grid grid-cols-2 gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5">
                            <div>Epoch: <span className="text-indigo-400 font-bold">{steps[activeStep].mockContent.epoch}/50</span></div>
                            <div>Loss: <span className="text-indigo-400 font-bold">{steps[activeStep].mockContent.loss}</span></div>
                          </div>
                          <div className="space-y-1 bg-black/40 p-2.5 rounded-lg border border-white/5 text-[9px] text-white/60 h-28 overflow-y-auto">
                            {steps[activeStep].mockContent.logs?.map((log, idx) => (
                              <div key={idx}>{log}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'metrics' && (
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: 'Accuracy', val: steps[activeStep].mockContent.accuracy },
                            { name: 'F1 Score', val: steps[activeStep].mockContent.f1 },
                            { name: 'Precision', val: steps[activeStep].mockContent.precision },
                            { name: 'Recall', val: steps[activeStep].mockContent.recall }
                          ].map(met => (
                            <div key={met.name} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1 font-mono">{met.name}</div>
                              <div className="text-base font-bold text-emerald-400 font-mono">{met.val}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'form' && (
                        <div className="space-y-3">
                          <div className="space-y-1 bg-white/5 border border-white/10 rounded-xl p-3">
                            {steps[activeStep].mockContent.fields?.map(f => (
                              <div key={f.label} className="flex justify-between text-xs font-mono py-0.5">
                                <span className="text-white/50">{f.label}:</span>
                                <span className="text-white font-bold">{f.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-center">
                            <div className="text-[9px] text-indigo-300 font-mono uppercase tracking-wider mb-1">Prediction Outcome</div>
                            <div className="text-sm font-bold text-white font-mono">{steps[activeStep].mockContent.prediction}</div>
                            <div className="text-[10px] text-indigo-300/80 font-mono mt-0.5">Confidence: {steps[activeStep].mockContent.confidence}</div>
                          </div>
                        </div>
                      )}

                      {steps[activeStep].mockContent.type === 'code' && (
                        <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-[9px] text-emerald-400 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                          {steps[activeStep].mockContent.code}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features Grid */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Key Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Core Platform Features
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Explore the advanced AutoML framework and data processing layers powering Modliq.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <FadeIn key={feat.title} delay={idx * 0.05}>
                  <div className="bg-white border border-[var(--color-border-soft)] hover:border-indigo-200 p-6 rounded-2xl hover:shadow-md transition-all duration-300 group h-full">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2 group-hover:text-indigo-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-main)] leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Use Cases Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Target Verticals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Designed For Every Domain
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              From security classifications to transactional predictions — Modliq fits into any enterprise workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, idx) => (
              <FadeIn key={uc.title} delay={idx * 0.05}>
                <div className="border border-[var(--color-border-soft)] hover:border-gray-300 bg-[var(--color-bg-light)] p-6 rounded-2xl hover:shadow-sm transition-all duration-300">
                  <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2">{uc.title}</h4>
                  <p className="text-xs text-[var(--color-text-main)] leading-relaxed">{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Roadmap Section */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Modliq Development Roadmap
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Our plan for expanding AutoML capacities, integration stores, and deployment scales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roadmap.map((rm, idx) => (
              <FadeIn key={rm.phase} delay={idx * 0.1}>
                <div className="bg-white border border-[var(--color-border-soft)] p-6 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                        {rm.phase}
                      </span>
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-400 tracking-wider">
                        {rm.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-3">{rm.title}</h4>
                    <p className="text-xs text-[var(--color-text-main)] leading-relaxed">{rm.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="p-6 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl">
                <h4 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed pl-6.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action (Waitlist Input) */}
      <section id="waitlist" className="py-28 bg-[var(--color-primary-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_60%)]" />
        
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Be Among the First to Experience Modliq
            </h2>
            <p className="text-base text-white/70 max-w-xl mx-auto">
              Join the waiting list for early beta invitations. We will notify you as soon as invites open.
            </p>

            <div className="max-w-md mx-auto pt-4">
              {waitlistSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Invited! You are now on the Modliq waitlist.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    required 
                    value={waitlistEmail} 
                    onChange={e => setWaitlistEmail(e.target.value)} 
                    placeholder="Enter your work email" 
                    className="flex-grow px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                  />
                  <button type="submit" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex-shrink-0">
                    Request Invite →
                  </button>
                </form>
              )}
            </div>

            <div className="flex justify-center gap-6 pt-8 text-xs text-white/50">
              <span>🟢 Development Active</span>
              <span>•</span>
              <span>⚡ Cloud Host & On-Premises Option</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
