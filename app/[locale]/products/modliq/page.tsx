"use client";

import React, { useState } from 'react';
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
  ChevronUp,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle,
  HelpCircle,
  Clock,
  Terminal,
  ShieldAlert,
  ArrowUpRight,
  FileCheck,
  Award,
  BookOpen,
  GraduationCap,
  Microscope,
  Sliders,
  CheckSquare,
  ShieldCheck,
  FileSpreadsheet,
  Gauge,
  Factory,
  Search,
  Zap,
  Info
} from 'lucide-react';
import { submitNewsletter } from '@/platform/shared/actions';

// Product Hunt Link
const MODLIQER_PH_URL = "https://www.producthunt.com/products/modliqer?launch=modliqer";

export default function ModliqPage() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      try {
        await submitNewsletter(waitlistEmail);
        setWaitlistSubmitted(true);
        setWaitlistEmail('');
      } catch (err) {
        alert('Failed to register request.');
      }
    }
  };

  // Interactive 4-step workflow data
  const consoleWorkflowSteps = [
    {
      num: '1',
      title: 'Upload or Connect Data',
      subtitle: 'Universal Ingestion',
      desc: 'Drag & drop CSV/Excel or link Supabase / Postgres / MongoDB',
      badge: 'Step 1 of 4',
      details: {
        source: 'Extrusion_Batch_Log_2026.csv',
        rows: '1,240 Rows Ingested',
        target: 'yield_pct (Target Metric)',
        inputs: '12 Process Features',
        health: '86/100 (Ready)',
        tag: 'AUTO-PROFILED',
        note: 'Column headers, datatypes, and missing rows are profiled automatically. No code required.'
      }
    },
    {
      num: '2',
      title: 'Choose Template or Type Goal',
      subtitle: 'Natural Language ML',
      desc: 'Plain-English goal parsing: "Maximize yield below 90°C"',
      badge: 'Step 2 of 4',
      details: {
        source: 'Goal Parser active',
        rows: 'Parsed 3 constraints',
        target: 'Max(yield_pct)',
        inputs: 'Temp <= 90°C, Speed <= 450 RPM',
        health: 'Constraint Validated',
        tag: 'LLM PARSED',
        note: 'Goal parser extracts target metrics, optimization direction, and physical plant safety boundaries.'
      }
    },
    {
      num: '3',
      title: 'Review & Confirm Setup',
      subtitle: 'Engineer Gating',
      desc: 'Visual safety check before ML model execution',
      badge: 'Step 3 of 4',
      details: {
        source: 'Pre-flight Safety Audit',
        rows: '16 Models Queued',
        target: 'Surrogate Training',
        inputs: 'XGBoost, Random Forest, Neural Net',
        health: 'Gating Passed',
        tag: 'SAFETY CHECK',
        note: 'Modliq Gating: Engineers stay in control. Every step requires clear confirmation before ML setpoints are generated.'
      }
    },
    {
      num: '4',
      title: 'Validate & Export Passport',
      subtitle: 'Audit Evidence',
      desc: 'Cp/Cpk capability math & buyer-ready Quality Passports',
      badge: 'Step 4 of 4',
      details: {
        source: 'Quality Passport Generated',
        rows: 'Cp: 1.68 | Cpk: 1.54',
        target: 'PSW & ISIR Ready',
        inputs: 'Math Verified Engine',
        health: '100% Audit Compliant',
        tag: 'PASSPORT EXPORTED',
        note: 'Instant PDF export with traceable Math Verification Records ready for OEM buyers and auditors.'
      }
    }
  ];

  // 6 Stages Interactive Flow
  const sixStages = [
    {
      id: '01',
      name: 'Ingest',
      title: '01. Ingest Data',
      userDoes: 'Uploads CSV/Excel files, extracts tables from PDF/Word, or connects read-only Supabase/Postgres or MongoDB databases.',
      modliqCalculates: 'Auto-maps column data types, identifies target metrics vs controllable process features, and parses batch timestamps.',
      output: 'Clean dataset preview & structural column profiling schema.'
    },
    {
      id: '02',
      name: 'Check',
      title: '02. Check Health & Data Risk',
      userDoes: 'Reviews automated data cleanliness summary, outlier detection warnings, and target data leakage alerts.',
      modliqCalculates: 'Computes Dataset Health Score (0–100), missing value ratios, and feature correlation matrices.',
      output: 'Dataset readiness audit report & automated median/mode cleaning transforms.'
    },
    {
      id: '03',
      name: 'Optimize',
      title: '03. Optimize Models',
      userDoes: 'Types plain-English optimization goal (e.g. "Maximize tensile strength while keeping energy below 12 kW").',
      modliqCalculates: 'Trains 16 regression algorithms (XGBoost, Random Forest, Gradient Boosting) and computes SHAP feature driver rankings.',
      output: 'AutoML Leaderboard, R²/RMSE accuracy metrics, and constrained optimal setpoint recommendations.'
    },
    {
      id: '04',
      name: 'Validate',
      title: '04. Validate Quality & SPC Math',
      userDoes: 'Inputs specification limits (USL/LSL) or customer quality tolerance standards.',
      modliqCalculates: 'Deterministic mathematical formulas for Cp, Cpk, Pp, Ppk, X-bar/R control limits, and OEE availability matrices.',
      output: 'Statistical Process Control (SPC) control charts & process capability verification.'
    },
    {
      id: '05',
      name: 'Execute',
      title: '05. Execute Safe Plant Trials',
      userDoes: 'Selects recommended parameter window to run in production or classroom lab.',
      modliqCalculates: 'Generates safe trial boundary ranges and 7-Batch step-by-step Standard Operating Procedures (SOPs).',
      output: 'Printable 7-Batch Factory Trial SOP & operator instruction sheets.'
    },
    {
      id: '06',
      name: 'Prove',
      title: '06. Prove & Export Passports',
      userDoes: 'Attaches batch inspection data and exports buyer-ready documentation.',
      modliqCalculates: 'Assembles Part Submission Warrants (PSW), ISIR initial inspection sheets, and mathematical proof audit trails.',
      output: 'Buyer-Ready Quality Passport PDF & PPAP compliance pack.'
    }
  ];

  // FAQs
  const faqs = [
    {
      q: 'Do I need a data scientist or programming skills to use Modliq?',
      a: 'No. Modliq is built specifically as a visual, no-code platform. Plant engineers, quality managers, teachers, and students can perform complete exploratory data analysis, train predictive models, and calculate Cp/Cpk math through intuitive guided workflows without writing code.'
    },
    {
      q: 'Does Modliq replace teachers, engineers, or data scientists?',
      a: 'No. Modliq is a decision-support tool and interactive learning platform that keeps humans in control. Modliq handles repetitive data cleaning, model comparison, and statistical math, allowing engineers and researchers to make informed decisions faster.'
    },
    {
      q: 'How does Modliq serve Manufacturing Industries?',
      a: 'Modliq converts Excel production logs, machine sensor databases, and quality reports into actionable optimization setpoints, SPC control charts, OEE metrics, supplier lot risk analysis, and OEM buyer-accepted Quality Passports.'
    },
    {
      q: 'How does Modliq serve Education & Research?',
      a: 'Modliq provides a clean visual environment for teaching data science, quality engineering, and AutoML. Teachers demonstrate ML concepts without managing complex Python environments, while research scholars run exploratory analysis and model benchmarking efficiently.'
    },
    {
      q: 'How can I schedule a demo for my plant, department, or lab?',
      a: 'You can click "Book Your Free Demo" anywhere on this page or email support@modliq.io to schedule a tailored live walkthrough for your manufacturing plant or academic institution.'
    },
    {
      q: 'Is Modliq an ISO certification body or a replacement for accredited testing?',
      a: 'No. Modliq is a computational analytics platform. It generates mathematical proof records, capability math (Cp/Cpk), and Quality Passports based on your uploaded inspection logs, but does not act as an accredited third-party testing laboratory.'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      
      {/* Launch Banner Header */}
      <div className="w-full bg-[#1B2A4A] text-white py-2.5 px-4 text-center text-xs font-semibold select-none flex items-center justify-center gap-2 border-b border-white/10">
        <span className="bg-[#2B70AB] text-white px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase">
          LAUNCHING AUG 20
        </span>
        <span>Modliqer (No-Code ML & Manufacturing Analytics) is LIVE on Product Hunt! Check it out →</span>
        <a href={MODLIQER_PH_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#FF6154] hover:text-white transition-colors ml-1">
          Product Hunt Launch ↗
        </a>
      </div>

      {/* 1. Hero Section */}
      <section className="pt-20 pb-20 border-b border-slate-200 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={MODLIQER_PH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FF6154]/10 hover:bg-[#FF6154]/20 border border-[#FF6154]/30 rounded-full text-[#FF6154] text-[11px] font-mono font-bold tracking-wider transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-[#FF6154] text-white flex items-center justify-center text-[9px]">P</span>
                  <span>🚀 LIVE ON PRODUCT HUNT →</span>
                </a>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-100 text-[#1B2A4A] border border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full">
                  🇮🇳 Built in Tamil Nadu by Qeltrava AI
                </span>
              </div>

              <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#2B70AB] mt-4">
                No-Code Machine Learning · Manufacturing Intelligence · Education & Research
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#1B2A4A] mt-4">
                No-code machine learning for factories, classrooms, and applied research.
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mt-6 max-w-3xl mx-auto font-medium">
                Modliqer helps manufacturing teams, teachers, students, professors, and research scholars explore data, run EDA, compare ML models, validate results, and generate professional reports — without writing code.
              </p>

              <div className="pt-2 text-xs font-semibold text-slate-500 italic">
                Built in Tamil Nadu by Qeltrava AI for real-world industry use and practical ML learning.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <a 
                  href="/contact?interest=demo" 
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-[#2B70AB] hover:bg-[#235b8c] text-white font-bold text-base transition-all shadow-lg shadow-[#2B70AB]/25 cursor-pointer w-full sm:w-auto"
                >
                  Book Your Free Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#industry" 
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 border border-slate-300 bg-white hover:bg-slate-50 text-[#1B2A4A] font-bold text-base transition-all shadow-xs cursor-pointer w-full sm:w-auto"
                >
                  Explore Platform
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Modliq Console — Guided No-Code Workflow Preview (Light Theme) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              INTERACTIVE DEMO PREVIEW
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Modliq Console — Guided No-Code Workflow
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Modliq Gating: Engineers stay in control. Every step requires clear confirmation before ML setpoint recommendations are generated.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {consoleWorkflowSteps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  activeWorkflowStep === idx
                    ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-600/10'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                    activeWorkflowStep === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{step.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Console Mockup Window */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  Active Screen: {consoleWorkflowSteps[activeWorkflowStep].title}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                {consoleWorkflowSteps[activeWorkflowStep].details.tag}
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Source File</div>
                <div className="text-sm font-bold text-slate-900 mt-1 truncate">{consoleWorkflowSteps[activeWorkflowStep].details.source}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Target Feature</div>
                <div className="text-sm font-bold text-indigo-600 mt-1 truncate">{consoleWorkflowSteps[activeWorkflowStep].details.target}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Process Inputs</div>
                <div className="text-sm font-bold text-slate-900 mt-1 truncate">{consoleWorkflowSteps[activeWorkflowStep].details.inputs}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Dataset Health</div>
                <div className="text-sm font-bold text-emerald-600 mt-1 truncate">{consoleWorkflowSteps[activeWorkflowStep].details.health}</div>
              </div>
            </div>

            {/* Note box */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-medium flex items-start gap-3">
              <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>{consoleWorkflowSteps[activeWorkflowStep].details.note}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. One Platform — Two Practical Lanes */}
      <section id="industry" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              DUAL-LANE PLATFORM
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              One no-code ML platform. Two practical use cases.
            </h2>
            <p className="text-base text-slate-600">
              Analyze data, build predictive models, and prove results without writing code — tailored for manufacturing plants and academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Industry Lane Card */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-8 flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-full text-xs font-mono font-bold uppercase">
                  <Factory className="w-3.5 h-3.5" /> Industry Lane
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  For Manufacturing Industries
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Turn production logs into optimization, SPC, Cp/Cpk, OEE, supplier traceability, and buyer-ready Quality Passports.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-400">Key Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                    {[
                      'Data Ingestion', 'EDA Studio',
                      'Dataset Health', 'Goal Parser',
                      'AutoML Optimization', 'Quality Studio (Cp/Cpk)',
                      'OEE & Downtime', 'Supplier Traceability',
                      'Quality Passport', 'PPAP / ISIR Packs'
                    ].map(cap => (
                      <div key={cap} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="/contact?interest=manufacturing-demo"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
              >
                Book Manufacturing Demo →
              </a>
            </div>

            {/* Education Lane Card */}
            <div className="bg-indigo-50/50 border border-indigo-100 p-8 rounded-3xl space-y-8 flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 rounded-full text-xs font-mono font-bold uppercase">
                  <GraduationCap className="w-3.5 h-3.5" /> Education & Research Lane
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  For Education & Research
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Teach, learn, and apply EDA, data visualization, model comparison, feature importance, and research reporting without complex Python setup.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-400">Key Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                    {[
                      'No-code EDA Studio', 'Chart Studio',
                      'Dataset Health', 'AutoML Leaderboard',
                      'Model Metrics (R², RMSE)', 'Feature Importance',
                      'Research Reports', 'Classroom Presets'
                    ].map(cap => (
                      <div key={cap} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-indigo-100">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="/contact?interest=education-demo"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20"
              >
                Book Education Demo →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Manufacturing Industry Solutions Deep Dive */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
              MANUFACTURING SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Modliq for Manufacturing Industries
            </h2>
            <p className="text-base text-slate-600">
              Manufacturing teams can use Modliq to convert Excel logs, QC reports, supplier records, machine data, and production databases into analysis, optimization, quality validation, and buyer-ready evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Quality & SPC Math</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculate process capability indices (Cp, Cpk, Pp, Ppk), X-bar/R control limits, defect rates, and subgroup statistics verified by a single Python engine.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">PPAP / ISIR & Quality Passport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate buyer-accepted Part Submission Warrants (PSW) and Initial Sample Inspection Reports (ISIR) with traceable Math Verification Records for OEM buyers.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">OEE & Process Optimization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analyze equipment availability, performance loss, quality yield, downtime Pareto, and run constrained AutoML process setpoint optimization.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href="/contact?interest=manufacturing-demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-lg"
            >
              Book Your Free Manufacturing Demo →
            </a>
          </div>

        </div>
      </section>

      {/* 5. Academic & Research Solutions Deep Dive */}
      <section id="education" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              ACADEMIC SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Modliq for Education & Research
            </h2>
            <p className="text-base text-slate-600">
              Teachers, professors, students, and research scholars can use Modliq as a no-code environment for data analysis and machine learning practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Teachers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create interactive classroom demonstrations for EDA, data visualization, and model comparison without managing complex coding environments.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Professors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teach applied analytics, quality engineering, AutoML, and manufacturing data science with structured workflows and repeatable examples.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <UsersIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Students</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn data analysis and machine learning visually. Upload datasets, ask questions, compare models, and understand results step by step.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Research Scholars</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use Modliq for early-stage exploratory analysis, feature discovery, visualization, model benchmarking, and research report preparation.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href="/contact?interest=education-demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/20"
            >
              Book Education Demo →
            </a>
          </div>

        </div>
      </section>

      {/* 6. Interactive Step-by-Step Flow (6 Stages - Light Theme) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              WORKFLOW STAGES
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              How Modliq guides manufacturing decisions.
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Click through the 6 stages below to see what the user does, what Modliq calculates, and what output is generated.
            </p>
          </div>

          {/* 6 Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sixStages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`py-3.5 px-4 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                  activeStageIdx === idx
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {stage.id}. {stage.name}
              </button>
            ))}
          </div>

          {/* Active Stage Details Box */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">{sixStages[activeStageIdx].title}</h3>
              <span className="text-xs font-mono text-indigo-700 uppercase font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                No-Code Step
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">What User Does</span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {sixStages[activeStageIdx].userDoes}
                </p>
              </div>

              <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-mono text-indigo-600 uppercase font-bold">What Modliq Calculates</span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {sixStages[activeStageIdx].modliqCalculates}
                </p>
              </div>

              <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">Generated Output</span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {sixStages[activeStageIdx].output}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Methodology & Algorithmic Rigor */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              METHODOLOGY & ALGORITHMIC RIGOR
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Transparent methods, not black-box claims.
            </h2>
            <p className="text-base text-slate-600">
              Modliq clearly separates predictive machine learning, deterministic quality calculations, and AI language assistance. Modliq calculates. AI explains. Engineers approve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. ML */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-700 border border-indigo-500/20 rounded-full text-xs font-mono font-bold uppercase">
                Machine Learning
              </div>
              <h3 className="text-xl font-bold text-slate-900">1. No-Code ML Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Surrogate models trained on historical plant data to predict outcomes and recommend safe setpoints.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-200 pt-4">
                <li>• Random Forest & Gradient Boosting</li>
                <li>• SHAP feature driver rankings</li>
                <li>• Constraint-bounded optimization</li>
                <li>• Safe parameter trial windows</li>
                <li className="text-indigo-600 font-bold">• Model Zoo: 16 Regression Models</li>
              </ul>
            </div>

            {/* 2. Deterministic Math */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full text-xs font-mono font-bold uppercase">
                Deterministic Math
              </div>
              <h3 className="text-xl font-bold text-slate-900">2. Engineering Calculations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exact mathematical and statistical formulas computed directly without neural hallucination risks.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-200 pt-4">
                <li>• Dataset readiness score (0–100)</li>
                <li>• SPC control limits (UCL / LCL)</li>
                <li>• Cp & Cpk process capability index</li>
                <li>• OEE (Avail × Perf × Qual) & AQL tables</li>
                <li className="text-emerald-600 font-bold">• Pure Math & Statistical Standards</li>
              </ul>
            </div>

            {/* 3. AI Assistance */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-full text-xs font-mono font-bold uppercase">
                AI Assistance
              </div>
              <h3 className="text-xl font-bold text-slate-900">3. AI Copilot Assistance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-provider LLM gateway assisting engineers with explanations, SOP drafts, and CAPA summaries.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 border-t border-slate-200 pt-4">
                <li>• Natural language goal parsing</li>
                <li>• SHAP driver plain-English translation</li>
                <li>• CAPA action plan drafting</li>
                <li>• Standard Operating Procedure (SOP) drafts</li>
                <li className="text-amber-600 font-bold">• Guardrailed Multi-Provider Gateway</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Manufacturing-Specific ML vs Generic Tools Comparison Matrix */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              COMPARISON MATRIX
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Manufacturing-Specific ML vs Generic Tools
            </h2>
            <p className="text-base text-slate-600">
              Generic AutoML tools can train models, but they don't understand manufacturing workflows like SPC, Cp/Cpk, OEE, supplier lots, trial SOPs, or Quality Passports. Modliq is no-code ML built specifically for factory process decisions.
            </p>
          </div>

          {/* Comparison Table (Light Theme) */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 text-xs font-mono uppercase">
                    <th className="p-4 sm:p-6 font-bold">Capability / Feature</th>
                    <th className="p-4 sm:p-6 font-bold text-slate-500">Generic AutoML</th>
                    <th className="p-4 sm:p-6 font-bold text-indigo-600">Modliq Platform</th>
                    <th className="p-4 sm:p-6 font-bold text-slate-700">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-medium">
                  {[
                    {
                      feat: 'Manufacturing natural language goal parser',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Extracts target, direction & plant limits'
                    },
                    {
                      feat: 'Visual Review & Confirm setup wizard',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Gating safety check before model runs'
                    },
                    {
                      feat: 'Dataset Health check & target leakage warnings',
                      generic: 'Basic',
                      modliq: 'Yes',
                      why: 'Tailored to plant sensor & lab data'
                    },
                    {
                      feat: 'Statistical Process Control (SPC & Cpk math)',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'I-MR control charts & capability'
                    },
                    {
                      feat: '7-Batch trial SOP generation',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Step-by-step factory trial instructions'
                    },
                    {
                      feat: 'Buyer-Ready Quality Passport',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Audit evidence report for OEM buyers'
                    },
                    {
                      feat: 'OEE calculator & downtime Pareto',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Operations & line bottleneck metrics'
                    },
                    {
                      feat: 'Supplier material lot risk traceability',
                      generic: 'No',
                      modliq: 'Yes',
                      why: 'Correlates vendor lots to batch yield'
                    }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 sm:p-6 font-bold text-slate-900">{row.feat}</td>
                      <td className="p-4 sm:p-6 text-slate-500">{row.generic}</td>
                      <td className="p-4 sm:p-6 font-bold text-indigo-600 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        {row.modliq}
                      </td>
                      <td className="p-4 sm:p-6 text-slate-600">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FAQs */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Everything you need to know about Modliq for industry and education.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-slate-900 text-base flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIdx === idx ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIdx === idx && (
                  <div className="p-6 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Final Call To Action (Waitlist & Demo Input - Light Theme) */}
      <section id="waitlist" className="py-28 bg-gradient-to-b from-slate-50 to-indigo-50/40 text-slate-900 relative overflow-hidden border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
          <FadeIn>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              GET STARTED WITH MODLIQ
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mt-2">
              Analyze data. Build models. Prove results — without code.
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Whether you are a manufacturer, teacher, student, professor, or research scholar, Modliq helps you explore data and machine learning without code.
            </p>

            <div className="max-w-md mx-auto pt-4">
              {waitlistSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Request received! Our team will contact you shortly for a live demo.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    required 
                    value={waitlistEmail} 
                    onChange={e => setWaitlistEmail(e.target.value)} 
                    placeholder="Enter your work email address" 
                    className="flex-grow px-5 py-3.5 rounded-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 transition-all font-mono shadow-sm"
                  />
                  <button type="submit" className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex-shrink-0 cursor-pointer shadow-lg shadow-indigo-600/20">
                    Book Your Free Demo
                  </button>
                </form>
              )}
            </div>

            {/* Disclaimer */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl text-[11px] text-slate-600 leading-relaxed text-left mt-8 shadow-sm">
              <span className="font-bold text-slate-900 block mb-1">Platform & Decision Disclaimer:</span>
              Modliq supports learning and decision-making, reduces technical friction, automates repetitive workflows, and keeps humans in control. It does not replace teachers, researchers, engineers, or data scientists. Manufacturing recommendations must be validated through controlled engineering review before production use. Education and research workflows assist with learning and exploratory analysis, but do not replace foundational learning of statistics and domain knowledge.
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}

// Icon helper for students persona
function UsersIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
