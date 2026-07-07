"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
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
  Smartphone
} from 'lucide-react';

const workflowSteps = [
  { label: 'Discover Properties', icon: Search, desc: 'Smart search with filters' },
  { label: 'View Interactive Layouts', icon: Building2, desc: 'Floor & room visualization' },
  { label: 'Check Real-Time Availability', icon: Bed, desc: 'Live bed occupancy' },
  { label: 'Instant Booking', icon: CalendarCheck, desc: 'Secure digital process' }
];

const features = [
  {
    icon: Bed,
    title: 'Live Visual Availability',
    desc: 'Interactive room and floor layouts with real-time occupancy status.'
  },
  {
    icon: Search,
    title: 'Smart Discovery',
    desc: 'Advanced search and filtering tailored for students and professionals.'
  },
  {
    icon: CalendarCheck,
    title: 'Instant Booking Workflow',
    desc: 'Reserve your spot as easily as booking a movie ticket with secure digital payments.'
  },
  {
    icon: LayoutDashboard,
    title: 'Property Dashboard',
    desc: 'Dedicated management tools for PG owners and hostel operators to track inventory.'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Experience',
    desc: 'A seamless, responsive interface designed for on-the-go property discovery.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Digital Process',
    desc: 'End-to-end secure booking process with verified listings and transparent pricing.'
  }
];

export function FeaturedProductStaySeat() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-600 border border-teal-500/20 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full">
              ✨ Coming Soon
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-bg-light)] text-[var(--color-text-main)] border border-[var(--color-border-soft)] text-[10px] font-mono font-bold uppercase tracking-wider rounded-full">
              PropTech Platform
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] tracking-tight leading-tight">
            Introducing StaySeat
          </h2>

          <p className="text-lg md:text-xl font-bold text-gray-700 leading-relaxed">
            A next-generation accommodation discovery platform. Find and book PGs, hostels, and rentals with a real-time visual availability experience.
          </p>

          <p className="text-sm text-[var(--color-text-main)] leading-relaxed">
            StaySeat simplifies hyperlocal accommodation by replacing static listings with interactive floor plans and live bed availability—making the booking experience intuitive and transparent for students and working professionals.
          </p>

          <div className="grid grid-cols-3 gap-4 p-5 bg-white border border-[var(--color-border-soft)] rounded-2xl shadow-sm">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Development</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Category</div>
              <div className="text-xs font-bold text-[var(--color-primary-dark)]">PropTech</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Availability</div>
              <div className="text-xs font-bold text-[var(--color-primary-dark)]">Coming Soon</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button href="/contact?subject=StaySeat+Early+Access" className="justify-center bg-teal-600 text-white border-transparent hover:bg-teal-700">
              Join Early Access List
            </Button>
            <Button href="/contact?subject=StaySeat+Launch+Notification" variant="outline" className="justify-center">
              Notify Me at Launch
            </Button>
          </div>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="relative">
          <div className="relative bg-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.06),transparent_50%)]" />
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">StaySeat Mobile Web</span>
              </div>
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-[9px] font-mono rounded">Live Preview</span>
            </div>

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
                          ? 'bg-slate-900 border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.08)]' 
                          : 'bg-slate-950/60 border-white/[0.04]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isHovered ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/60'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-bold text-white tracking-wide">{step.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5 truncate">{step.desc}</div>
                      </div>

                      <ChevronRight className={`w-4 h-4 text-white/20 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1 text-teal-400' : ''
                      }`} />
                    </motion.div>

                    {idx < workflowSteps.length - 1 && (
                      <div className="absolute left-[33px] top-[50px] bottom-[-20px] w-px border-l border-dashed border-white/20 z-0 pointer-events-none group-hover:border-teal-500/40 transition-colors" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none -z-10" />
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
              className="bg-white border border-[var(--color-border-soft)] hover:border-teal-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2 group-hover:text-teal-600 transition-colors">
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
