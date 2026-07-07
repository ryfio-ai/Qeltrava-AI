"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  Building2, 
  MapPin, 
  CalendarCheck, 
  Bed, 
  Search, 
  ShieldCheck,
  ChevronRight,
  Home,
  LayoutDashboard,
  Smartphone,
  CheckCircle
} from 'lucide-react';
import { submitNewsletter } from '@/platform/shared/actions';

const workflowSteps = [
  { n: 1, title: 'Discover', desc: 'Smart search properties with tailored filters.' },
  { n: 2, title: 'View Layout', desc: 'Interactive floor and room visualizations.' },
  { n: 3, title: 'Check Real-Time', desc: 'Live bed occupancy tracking.' },
  { n: 4, title: 'Book', desc: 'Secure, instant digital reservation.' }
];

const keyFeatures = [
  { icon: Bed, title: 'Live Visual Availability', desc: 'Interactive room and floor layouts with real-time occupancy status.' },
  { icon: Search, title: 'Smart Discovery', desc: 'Advanced search and filtering tailored for students and professionals.' },
  { icon: CalendarCheck, title: 'Instant Booking Workflow', desc: 'Reserve your spot as easily as booking a movie ticket with secure digital payments.' },
  { icon: LayoutDashboard, title: 'Property Dashboard', desc: 'Dedicated management tools for PG owners and hostel operators to track inventory.' },
  { icon: Smartphone, title: 'Mobile-First Experience', desc: 'A seamless, responsive interface designed for on-the-go property discovery.' },
  { icon: ShieldCheck, title: 'Secure Digital Process', desc: 'End-to-end secure booking process with verified listings and transparent pricing.' }
];

const userBenefits = [
  { title: 'For Students & Professionals', desc: 'No more broker fees or outdated listings. See exactly what is available and book it instantly from your phone.' },
  { title: 'For Property Owners', desc: 'Automate your inventory management. Fill beds faster and reduce administrative overhead with a centralized dashboard.' }
];

const timelineStages = [
  { title: 'Phase 1: Property discovery', desc: 'Smart search and filtering engine.', active: false },
  { title: 'Phase 2: Real-time bed availability', desc: 'Interactive visual layouts and occupancy tracking.', active: true },
  { title: 'Phase 3: Online booking', desc: 'Secure digital payment and reservation workflow.', active: false },
  { title: 'Phase 4: Property management dashboard', desc: 'Tools for PG and hostel operators.', active: false },
  { title: 'Phase 5: AI-powered recommendations', desc: 'Personalized matching algorithms.', active: false }
];

const techStack = ['React', 'Next.js', 'TypeScript', 'Supabase', 'AI', 'Cloud', 'Maps', 'Real-Time'];

const faqs = [
  { q: 'Is StaySeat available for public use yet?', a: 'StaySeat is currently in active development. Join our early access list to be notified when we launch in your city.' },
  { q: 'Who is StaySeat built for?', a: 'It is designed for students and working professionals looking for PGs or hostels, as well as property owners looking to modernize their booking process.' },
  { q: 'How does the visual availability work?', a: 'Instead of just showing text that a room is available, we show a dynamic floor plan where you can select specific beds, much like booking a theater seat.' }
];

export default function StaySeatPage() {
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-teal-600 text-[10px] font-mono font-bold uppercase tracking-wider mb-6">
              ⚡ Coming Soon
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[var(--color-primary-dark)] max-w-4xl mx-auto">
              Smart Accommodation, Visualized.
            </h1>
            <p className="text-base md:text-xl text-[var(--color-text-main)] leading-relaxed mt-6 max-w-2xl mx-auto">
              A next-generation platform helping students and working professionals find and book PGs, hostels, and rentals with a real-time visual availability experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-8 justify-center">
              <a href="#waitlist" className="cta-button justify-center py-3 px-8 bg-teal-600 text-white border-transparent hover:bg-teal-700 rounded-full font-semibold transition-colors">
                Join Early Access List
              </a>
              <a href="/contact?subject=StaySeat+Launch+Notification" className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 border border-[var(--color-border-soft)] bg-white hover:bg-gray-50 text-[var(--color-primary-dark)] font-semibold text-sm transition-all shadow-sm">
                Notify Me at Launch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-16">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600 font-mono">
              The Problem
            </h3>
            <p className="text-lg md:text-xl text-[var(--color-text-main)] leading-relaxed font-medium">
              Finding a PG or hostel relies on static listings, outdated photos, and calling brokers. StaySeat introduces a hyperlocal approach where you can interactively explore property layouts and reserve a specific bed in real-time, matching the modern standard of travel and ticket booking.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Workflow Section */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-3 block font-mono">
              How StaySeat Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Four Steps to Your New Home
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-12 h-12 rounded-full border border-[var(--color-border-soft)] bg-white shadow-sm flex items-center justify-center font-mono text-sm font-bold text-gray-500 group-hover:border-teal-500 group-hover:text-teal-600 transition-all duration-300">
                  {step.n}
                </div>
                <div className="space-y-1 px-2">
                  <h4 className="text-sm font-bold text-[var(--color-primary-dark)] group-hover:text-teal-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Key Features & Benefits Grid */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-3 block font-mono">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {keyFeatures.map(feat => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-6 rounded-2xl transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border-soft)] text-teal-600 flex items-center justify-center flex-shrink-0">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userBenefits.map(benefit => (
              <div key={benefit.title} className="bg-teal-50/50 border border-teal-100 p-8 rounded-2xl">
                <h4 className="text-lg font-bold text-teal-900 mb-3">{benefit.title}</h4>
                <p className="text-sm text-teal-800/80 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tech Stack */}
      <section className="py-16 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-primary-dark)] font-mono whitespace-nowrap">
              Technology
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {techStack.map(tech => (
                <span key={tech} className="px-4 py-2 bg-white border border-[var(--color-border-soft)] rounded-full text-xs font-semibold text-[var(--color-text-main)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Development Status Section */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-3 block font-mono">
              Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Product Timeline
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {timelineStages.map((stage, idx) => (
              <div key={stage.title} className={`p-5 rounded-2xl border transition-all ${
                stage.active 
                  ? 'border-teal-200 bg-teal-50/30' 
                  : 'border-[var(--color-border-soft)] bg-transparent opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">{stage.title}</h4>
                  {stage.active && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-teal-600 uppercase bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                      🟢 Current Phase
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-main)] leading-normal">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[var(--color-border-soft)] p-6 rounded-2xl shadow-sm">
                <h4 className="text-base font-bold text-[var(--color-primary-dark)] mb-2">{faq.q}</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Call To Action (Waitlist Input) */}
      <section id="waitlist" className="py-28 bg-[var(--color-primary-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.06),transparent_60%)]" />
        
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              StaySeat is currently under development.
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
              Be among the first to experience the future of smart accommodation booking.
            </p>

            <div className="max-w-md mx-auto pt-4">
              {waitlistSubmitted ? (
                <div className="bg-teal-500/10 border border-teal-500/20 text-teal-400 p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Invited! You are now on the early access list.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    required 
                    value={waitlistEmail} 
                    onChange={e => setWaitlistEmail(e.target.value)} 
                    placeholder="Enter your email address" 
                    className="flex-grow px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-teal-400 transition-all font-mono"
                  />
                  <button type="submit" className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors flex-shrink-0">
                    Join Early Access
                  </button>
                </form>
              )}
            </div>
            <div className="flex justify-center gap-4 pt-6">
              <a href="/contact?subject=StaySeat+Launch+Notification" className="text-xs font-semibold text-white/60 hover:text-white transition-colors underline">
                Notify Me at Launch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
