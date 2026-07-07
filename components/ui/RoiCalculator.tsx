"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, Link } from '@/src/routing';
import { calculateRoi, ProcessType, RoiResults } from '@/lib/roi-calculator';
import { CountUpMetric } from './CountUpMetric';
import { Share2, Info } from 'lucide-react';

export const RoiCalculator = () => {
  const router = useRouter();
  
  // State for inputs
  const [people, setPeople] = useState<number>(5);
  const [rate, setRate] = useState<number>(45);
  const [hours, setHours] = useState<number>(12);
  const [processType, setProcessType] = useState<ProcessType>('document-processing');
  
  // Display result state — seeded with defaults so first paint is never all-zeros
  const [results, setResults] = useState<RoiResults>(() =>
    calculateRoi(5, 45, 12, 'document-processing')
  );

  const [copied, setCopied] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const urlTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize inputs from URL search parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTeam = params.get('team');
      const urlRate = params.get('rate');
      const urlHours = params.get('hours');
      const urlProcess = params.get('process');

      if (urlTeam) {
        const parsed = parseInt(urlTeam, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 500) setPeople(parsed);
      }
      if (urlRate) {
        const parsed = parseInt(urlRate, 10);
        if (!isNaN(parsed) && parsed >= 20 && parsed <= 500) setRate(parsed);
      }
      if (urlHours) {
        const parsed = parseInt(urlHours, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) setHours(parsed);
      }
      if (urlProcess && ['document-processing', 'customer-support', 'data-entry', 'approval-workflows', 'other'].includes(urlProcess)) {
        setProcessType(urlProcess as ProcessType);
      }
    }
  }, []);

  // Recalculate calculations with 150ms debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      const calculation = calculateRoi(people, rate, hours, processType);
      setResults(calculation);
    }, 150);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [people, rate, hours, processType]);

  // Update URL parameters silently with 300ms debounce
  useEffect(() => {
    if (urlTimerRef.current) {
      clearTimeout(urlTimerRef.current);
    }
    urlTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      params.set('team', people.toString());
      params.set('rate', rate.toString());
      params.set('hours', hours.toString());
      params.set('process', processType);
      
      const newQuery = params.toString();
      // Replace query silently without polluting browser back-button history
      window.history.replaceState(null, '', `${window.location.pathname}?${newQuery}`);
    }, 350); // Kept slightly above 300ms for safety

    return () => {
      if (urlTimerRef.current) clearTimeout(urlTimerRef.current);
    };
  }, [people, rate, hours, processType]);

  // Handle URL copying
  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      const shareUrl = window.location.href;
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link', err);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[var(--color-border-soft)] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 select-none">
      
      {/* Inputs Form */}
      <div className="lg:col-span-7 p-8 md:p-12 flex flex-col gap-6 bg-white">
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Configure Your Scenario</h3>
          <p className="text-sm text-[var(--color-text-main)]">Adjust the parameters to estimate the financial cost of manual processes.</p>
        </div>

        <div className="space-y-5">
          {/* People Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="peopleInput" className="text-sm font-semibold text-[var(--color-primary-dark)]">
                How many people perform this process?
              </label>
              <span className="font-mono text-sm text-[var(--color-accent)] font-bold">{people}</span>
            </div>
            <input 
              id="peopleInput"
              type="range"
              min="1"
              max="500"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] focus:outline-none"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
              <span>1 person</span>
              <span>500 people</span>
            </div>
          </div>

          {/* Hourly Cost Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="rateInput" className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Average hourly cost per person (USD)
              </label>
              <span className="font-mono text-sm text-[var(--color-accent)] font-bold">${rate}/hr</span>
            </div>
            <input 
              id="rateInput"
              type="range"
              min="20"
              max="500"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] focus:outline-none"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
              <span>$20/hr</span>
              <span>$500/hr</span>
            </div>
          </div>

          {/* Hours Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="hoursInput" className="text-sm font-semibold text-[var(--color-primary-dark)]">
                Hours spent per person per week
              </label>
              <span className="font-mono text-sm text-[var(--color-accent)] font-bold">{hours} hrs/wk</span>
            </div>
            <input 
              id="hoursInput"
              type="range"
              min="1"
              max="40"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] focus:outline-none"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
              <span>1 hr</span>
              <span>40 hrs</span>
            </div>
          </div>

          {/* Process Type Select */}
          <div>
            <label htmlFor="processSelect" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">
              What type of process?
            </label>
            <select
              id="processSelect"
              value={processType}
              onChange={(e) => setProcessType(e.target.value as ProcessType)}
              className="w-full p-3.5 border border-[var(--color-border-soft)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm text-[var(--color-primary-dark)] font-medium cursor-pointer"
            >
              <option value="document-processing">Document processing (PDF routing, invoicing)</option>
              <option value="customer-support">Customer support (ticketing, FAQs)</option>
              <option value="data-entry">Data entry & reports consolidation</option>
              <option value="approval-workflows">Approval & verification workflows</option>
              <option value="other">Other manual administrative tasks</option>
            </select>
          </div>
        </div>

        {/* Copy share link button */}
        <button
          onClick={handleCopyLink}
          className="mt-2 flex items-center justify-center gap-2 self-start text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors py-2 px-4 rounded-xl border border-[var(--color-border-soft)] hover:bg-gray-50/50"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Copy shareable calculation link'}</span>
        </button>
      </div>

      {/* Results Display Panel */}
      <div className="lg:col-span-5 bg-[var(--color-primary-dark)] text-white p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        <div className="relative z-10 space-y-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Financial Analysis</h4>
            <p className="text-[11px] text-[var(--color-accent)] font-semibold font-mono uppercase tracking-[0.15em]">&lt;qeltrava-roi-estimator&gt;</p>
          </div>

          {/* Current Status Cost */}
          <div className="border-b border-white/10 pb-6">
            <span className="block text-sm text-white/60 mb-2 font-medium">Annual Cost of Current Process</span>
            <div className="text-3xl md:text-4xl font-extrabold text-white flex items-baseline gap-1">
              <span className="font-mono font-medium opacity-60 text-xl">$</span>
              <CountUpMetric key={results.annualCost} value={results.annualCost} className="text-white" />
              <span className="text-xs text-white/50 font-mono ml-2">/year</span>
            </div>
          </div>

          {/* Savings Outcome */}
          <div className="border-b border-white/10 pb-6">
            <span className="block text-sm text-white/60 mb-2 font-medium">Illustrative Automation Savings</span>
            <div className="text-2xl md:text-3xl font-extrabold text-[#1FAA59] flex items-baseline gap-1 flex-wrap">
              <span className="font-mono font-medium opacity-60 text-lg">$</span>
              <CountUpMetric key={results.savingsMin} value={results.savingsMin} className="text-[#1FAA59]" />
              <span className="text-lg font-mono opacity-50 px-1.5">–</span>
              <span className="font-mono font-medium opacity-60 text-lg">$</span>
              <CountUpMetric key={results.savingsMax} value={results.savingsMax} className="text-[#1FAA59]" />
              <span className="text-xs text-white/50 font-mono ml-2">/year</span>
            </div>
          </div>

          {/* Payback & Implementation Cost Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-white/50 mb-1">Implementation</span>
              <p className="font-mono text-sm font-bold text-white/95">
                ${results.implCostMin.toLocaleString()} – ${results.implCostMax.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="block text-xs text-white/50 mb-1">Payback Period</span>
              <p className="font-mono text-sm font-bold text-white/95">
                {results.paybackMin} – {results.paybackMax} months
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & CTA */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-6">
          <div className="flex items-start gap-2 text-xs text-white/60 leading-relaxed font-sans">
            <Info className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
            <p className="text-white/60 text-[13px] italic">
              Illustrative estimate — actual results vary by project.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/proposal?fromRoi=true&team=${people}&rate=${rate}&hours=${hours}&process=${processType}`}
              className="flex-1 flex items-center justify-center py-3.5 px-6 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all text-center cursor-pointer border border-[var(--color-accent)]"
            >
              Build Proposal from this estimate →
            </Link>
            <Link
              href="/book-consultation"
              className="flex-1 flex items-center justify-center py-3.5 px-6 rounded-xl bg-white hover:bg-gray-100 text-[var(--color-primary-dark)] text-sm font-bold shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
