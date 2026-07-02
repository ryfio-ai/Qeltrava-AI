"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useRouter } from '@/src/routing';
import { Button } from '@/components/Button';
import { ArrowLeft, ArrowRight, CheckCircle, Info } from 'lucide-react';

interface QuizAnswer {
  orgType: string;
  challenge: string;
  timeline: string;
  budget: string;
  teamSize: string;
  successGoal: string;
}

interface ServiceRecommendation {
  title: string;
  subtitle: string;
  href: string;
  reasons: string[];
}

// Config object containing recommendation mapping logic
const recommendationRules: Record<string, ServiceRecommendation> = {
  'saas-dev': {
    title: 'SaaS Platform Development',
    subtitle: 'Launch multi-tenant, secure applications ready for enterprise clients from day one.',
    href: '/services/saas-development',
    reasons: [
      'Engineered specifically for startups and scale-ups needing a rapid launch.',
      'Includes database multi-tenancy, Stripe billing integration, and role-based access control.',
      'Ensures clean structural boundaries to prevent early-stage technical debt accumulation.'
    ]
  },
  'product-eng-pod': {
    title: 'Product Engineering Pod',
    subtitle: 'A dedicated team of senior software engineers designing secure, scalable system layers.',
    href: '/services/product-engineering',
    reasons: [
      'Tailored for mid-market and enterprise organizations looking to build complex new solutions.',
      'Provides high velocity with strict operational discipline (strangler-fig migrations, modular setups).',
      'Provides full lifecycle engineering matching strict internal compliance standards.'
    ]
  },
  'modernization-devops': {
    title: 'Software Modernization & Cloud DevOps',
    subtitle: 'Strangler-fig migrations and containerized infrastructure setups with zero downtime.',
    href: '/services/cloud-devops',
    reasons: [
      'Addresses slow existing monolithic architectures and system bottlenecks.',
      'Automates delivery infrastructure using Terraform, Kubernetes, and blue-green deployments.',
      'Saves cloud costs and increases release velocity to multiple deploys per day.'
    ]
  },
  'ai-automation': {
    title: 'AI Automation Sprint',
    subtitle: 'Automate high-value workflows with custom conversational agents and retrieval models.',
    href: '/services/ai-automation',
    reasons: [
      'Ideal for automating manual processing, invoice indexing, or customer ticketing.',
      'Leverages Retrieval-Augmented Generation (RAG) and semantic databases.',
      'Focuses on immediate, quantifiable operational ROI (reducing work cycles up to 80%).'
    ]
  },
  'data-analytics': {
    title: 'Data & Analytics Pipelines',
    subtitle: 'Consolidating operational unstructured data into real-time business intelligence.',
    href: '/services/data-analytics',
    reasons: [
      'Solves raw data visibility constraints across fragmented database schemas.',
      'Builds secure ETL data warehouse architectures and automated reporting views.',
      'Provides predictive modeling pipelines to forecast failures or resource schedules.'
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity & Compliance Safeguards',
    subtitle: 'Secure by design infrastructures ready for HIPAA and SOC 2 audits.',
    href: '/services/cybersecurity',
    reasons: [
      'Resolves severe system vulnerability holes or missing data encryption parameters.',
      'Deploys API Gateways, OAuth standards, and strict role-based access grids.',
      'Protects organization systems against external pen-testing risks.'
    ]
  },
  'product-eng-retainer': {
    title: 'Product Engineering Retainer',
    subtitle: 'dedicated technical pods to continuously build and scale application features.',
    href: '/services/product-engineering',
    reasons: [
      'Solves persistent software engineering capacity constraints without internal hiring friction.',
      'Offers flexible retainers for active system code iteration and maintenance.',
      'Grants direct access to senior architects for system roadmap validation.'
    ]
  }
};

// Logic mapping answers to recommendation keys
function getRecommendationKey(answers: QuizAnswer): string {
  const { orgType, challenge } = answers;
  
  if (challenge.includes('new product') && (orgType.includes('startup') || orgType.includes('Scale-up'))) {
    return 'saas-dev';
  }
  if (challenge.includes('new product') && (orgType.includes('mid-market') || orgType.includes('Enterprise') || orgType.includes('Government') || orgType.includes('Public'))) {
    return 'product-eng-pod';
  }
  if (challenge.includes('slow or outdated')) {
    return 'modernization-devops';
  }
  if (challenge.includes('workflows with AI')) {
    return 'ai-automation';
  }
  if (challenge.includes('visibility and analytics')) {
    return 'data-analytics';
  }
  if (challenge.includes('security or compliance')) {
    return 'cybersecurity';
  }
  return 'product-eng-retainer';
}

export default function QuizPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [answers, setAnswers] = useState<QuizAnswer>({
    orgType: '',
    challenge: '',
    timeline: '',
    budget: '',
    teamSize: '',
    successGoal: ''
  });

  const [quizFinished, setQuizFinished] = useState(false);
  const [cachedResult, setCachedResult] = useState<ServiceRecommendation | null>(null);

  // Restore recommendation from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRec = sessionStorage.getItem('qeltrava_quiz_recommendation');
      if (savedRec) {
        try {
          setCachedResult(JSON.parse(savedRec));
          setQuizFinished(true);
        } catch (e) {
          console.error('Failed to parse cached quiz recommendation', e);
        }
      }
    }
  }, []);

  const handleNextStep = (answerKey: keyof QuizAnswer, value: string) => {
    setAnswers(prev => ({ ...prev, [answerKey]: value }));
    setDirection(1);
    
    if (step < 6) {
      setStep(prev => prev + 1);
    } else {
      // Calculate and save result
      const recKey = getRecommendationKey({ ...answers, [answerKey]: value });
      const rec = recommendationRules[recKey] || recommendationRules['ai-automation'];
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('qeltrava_quiz_recommendation', JSON.stringify(rec));
        sessionStorage.setItem('qeltrava_quiz_answers', JSON.stringify({ ...answers, [answerKey]: value }));
      }
      
      setCachedResult(rec);
      setQuizFinished(true);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('qeltrava_quiz_recommendation');
      sessionStorage.removeItem('qeltrava_quiz_answers');
    }
    setAnswers({
      orgType: '',
      challenge: '',
      timeline: '',
      budget: '',
      teamSize: '',
      successGoal: ''
    });
    setQuizFinished(false);
    setCachedResult(null);
    setStep(1);
  };

  // Build Calendly URL prefilled with parameters
  const getPrefilledCalendlyUrl = () => {
    const baseUrl = 'https://calendly.com/ryfioai/enquiry-qeltrava-ai';
    const params = new URLSearchParams();
    
    params.set('a1', answers.orgType || 'N/A');
    params.set('a2', answers.challenge || 'N/A');
    params.set('a3', answers.timeline || 'N/A');
    params.set('a4', answers.budget || 'N/A');
    params.set('a5', answers.teamSize || 'N/A');
    if (answers.successGoal) {
      params.set('a6', answers.successGoal);
    }
    if (cachedResult) {
      params.set('quiz_recommendation', cachedResult.title);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Form step data
  const steps = [
    {
      num: 1,
      key: 'orgType' as keyof QuizAnswer,
      question: 'What best describes your organization?',
      options: [
        'Early-stage startup',
        'Scale-up (Series A–C)',
        'Mid-market company',
        'Enterprise',
        'Government / Public Sector'
      ]
    },
    {
      num: 2,
      key: 'challenge' as keyof QuizAnswer,
      question: 'What is your primary challenge right now?',
      options: [
        'We need to build a new product or platform',
        'Our existing systems are slow or outdated',
        'We want to automate manual workflows with AI',
        'We need better data visibility and analytics',
        'We have security or compliance gaps',
        'We need engineering capacity without hiring full-time'
      ]
    },
    {
      num: 3,
      key: 'timeline' as keyof QuizAnswer,
      question: 'What is your timeline?',
      options: [
        'Within 4 weeks',
        '1–3 months',
        '3–6 months',
        '6+ months',
        'Exploring options'
      ]
    },
    {
      num: 4,
      key: 'budget' as keyof QuizAnswer,
      question: 'What is your approximate budget range?',
      options: [
        '$10k–$30k',
        '$30k–$80k',
        '$80k–$200k',
        '$200k+'
      ]
    },
    {
      num: 5,
      key: 'teamSize' as keyof QuizAnswer,
      question: 'Do you have an existing engineering team?',
      options: [
        'No internal engineers',
        '1–5 engineers',
        '6–20 engineers',
        '20+ engineers'
      ]
    }
  ];

  const currentStepData = steps.find(s => s.num === step);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0
    })
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
            Partner Assessment
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
            AI Strategy Assessment
          </h1>
        </div>

        {!quizFinished ? (
          <div className="bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col gap-8 relative min-h-[460px] justify-between">
            
            {/* Step progress dots */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] pb-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      i <= step ? 'bg-[var(--color-accent)]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-400 font-bold uppercase">
                Step {step} of 6
              </span>
            </div>

            {/* Quiz Content Slide */}
            <div className="flex-grow overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6 w-full"
                >
                  {step <= 5 && currentStepData ? (
                    <>
                      <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary-dark)]">
                        {currentStepData.question}
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {currentStepData.options.map(option => (
                          <button
                            key={option}
                            onClick={() => handleNextStep(currentStepData.key, option)}
                            className="w-full text-left p-4 rounded-xl border border-[var(--color-border-soft)] bg-white hover:bg-[var(--color-bg-light)] text-sm font-semibold text-[var(--color-primary-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent cursor-pointer"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Step 6: Success Goals Text Area
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary-dark)]">
                        What does success look like in 6 months?
                      </h2>
                      <p className="text-xs text-[var(--color-text-main)] opacity-80">Describe your core objectives, system capabilities, or automation outcomes (max 300 characters, optional).</p>
                      <textarea
                        maxLength={300}
                        rows={5}
                        placeholder="E.g., Automated invoice parsing directly synced to QuickBooks, reducing finance review latency from 3 days to under 1 hour..."
                        value={answers.successGoal}
                        onChange={(e) => setAnswers(prev => ({ ...prev, successGoal: e.target.value }))}
                        className="w-full p-4 border border-[var(--color-border-soft)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm font-medium text-[var(--color-primary-dark)] placeholder-gray-400 bg-white"
                      />
                      <div className="flex justify-between items-center text-xs text-gray-400 font-mono mt-1">
                        <span>{300 - answers.successGoal.length} characters remaining</span>
                      </div>
                      <button
                        onClick={() => handleNextStep('successGoal', answers.successGoal || 'Not specified')}
                        className="w-full py-4 rounded-xl bg-[var(--color-primary-dark)] text-white hover:bg-[var(--color-primary-dark)]/90 text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Calculate My Recommendation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            {step > 1 && (
              <div className="flex justify-start border-t border-[var(--color-border-soft)] pt-6 mt-4">
                <button
                  onClick={handleBackStep}
                  className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-main)] hover:text-[var(--color-primary-dark)] transition-colors py-2 px-4 rounded-xl border border-[var(--color-border-soft)] hover:bg-gray-50/50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // Final screen: Recommendation Cards
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col gap-8"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-border-soft)] pb-6">
              <CheckCircle className="w-6 h-6 text-[#1FAA59] shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Analysis Complete</span>
                <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">Your Recommended Starting Point</h2>
              </div>
            </div>

            {cachedResult && (
              <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-6 md:p-8 rounded-2xl">
                <span className="text-xs font-mono font-bold uppercase text-[var(--color-accent)] tracking-widest block mb-2">Recommended Engagement</span>
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">{cachedResult.title}</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-6 font-semibold">{cachedResult.subtitle}</p>
                
                <h4 className="text-xs font-bold uppercase text-[var(--color-primary-dark)] tracking-wider mb-3">Why this fits your situation:</h4>
                <ul className="space-y-3">
                  {cachedResult.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-text-main)] leading-relaxed font-medium">
                      <span className="text-[#1FAA59] text-sm leading-none font-bold mt-0.5">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 border-t border-[var(--color-border-soft)] pt-8 mt-4">
              <a
                href={getPrefilledCalendlyUrl()}
                className="flex-1 py-4 px-6 rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 text-sm font-bold shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Your Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              {cachedResult && (
                <Link
                  href={cachedResult.href as any}
                  className="flex-1 py-4 px-6 rounded-xl border border-[var(--color-border-soft)] text-[var(--color-primary-dark)] hover:bg-gray-50 text-sm font-bold transition-all text-center flex items-center justify-center cursor-pointer bg-white"
                >
                  Explore Recommended Service
                </Link>
              )}
            </div>

            <button
              onClick={handleResetQuiz}
              className="text-center text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors hover:underline cursor-pointer"
            >
              Restart Assessment
            </button>
          </motion.div>
        )}
        
        {/* Share preview tip */}
        <div className="flex items-start gap-2 text-xs text-[var(--color-text-main)] opacity-70 leading-relaxed font-sans bg-gray-50/50 p-4 rounded-xl border border-[var(--color-border-soft)]">
          <Info className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <p>
            You can share the quiz URL with colleagues. Completed recommendations are cached inside your session and can be reset at any time.
          </p>
        </div>
      </div>
    </main>
  );
}
