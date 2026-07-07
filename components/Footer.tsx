"use client";

import React, { useState } from 'react';
import { Link } from '@/src/routing';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { siteConfig } from '@/lib/site-config';
import { useTranslations } from 'next-intl';
// Social icons (inline SVG — lucide-react version doesn't include brand icons)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations('Footer');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer data-theme="dark" className="bg-[var(--color-primary-dark)] text-white flex flex-col relative overflow-hidden select-none">
      
      {/* ROW 1 — Top Footer (padding: 80px top/bottom) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-12">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image 
                  src="/logo-bg.png" 
                  alt="Qeltrava AI Logo" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10 object-contain brightness-0 invert" 
                />
                <span className="font-bold text-xl tracking-tight text-white">
                  Qeltrava AI
                </span>
              </Link>
              <p className="text-white/70 max-w-sm mb-8 leading-relaxed font-sans text-sm font-medium">
                Engineering Intelligence. Delivering Outcomes.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-auto">
              <a 
                href="https://www.linkedin.com/company/qeltravai/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://www.instagram.com/qeltravaai" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://wa.me/918925575794?text=Hi%20Qeltrava%20AI%2C%20I%27d%20like%20to%20discuss%20a%20project" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a 
                href="https://github.com/QeltravaAI" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6 font-mono">
              Services
            </h3>
            <ul className="space-y-4 text-[13px] text-white/70 font-sans font-semibold">
              <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-white transition-colors">SaaS Development</Link></li>
              <li><Link href="/services/product-engineering" className="hover:text-white transition-colors">Product Engineering</Link></li>
              <li><Link href="/services/cloud-devops" className="hover:text-white transition-colors">Cloud & DevOps</Link></li>
              <li><Link href="/services/data-analytics" className="hover:text-white transition-colors">Data & Analytics</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6 font-mono">
              Products
            </h3>
            <ul className="space-y-4 text-[13px] text-white/70 font-sans font-semibold">
              <li><Link href="/products/modliq" className="hover:text-white transition-colors">Modliq</Link></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6 font-mono">
              Industries
            </h3>
            <ul className="space-y-4 text-[13px] text-white/70 font-sans font-semibold">
              <li><Link href="/industries/fintech" className="hover:text-white transition-colors">Fintech</Link></li>
              <li><Link href="/industries/healthcare" className="hover:text-white transition-colors">Healthcare</Link></li>
              <li><Link href="/industries/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link href="/industries/government" className="hover:text-white transition-colors">Government</Link></li>
              <li><Link href="/industries/manufacturing" className="hover:text-white transition-colors">Manufacturing</Link></li>
              <li><Link href="/industries/retail" className="hover:text-white transition-colors">Retail</Link></li>
              <li><Link href="/industries/saas" className="hover:text-white transition-colors">SaaS & Tech</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6 font-mono">
              Resources
            </h3>
            <ul className="space-y-4 text-[13px] text-white/70 font-sans font-semibold">
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/quiz" className="hover:text-white transition-colors">AI Quiz</Link></li>
              <li><Link href="/roi-calculator" className="hover:text-white transition-colors">ROI Calculator</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">White Papers</Link></li>
              <li><Link href="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-6 font-mono">
              Company
            </h3>
            <ul className="space-y-4 text-[13px] text-white/70 font-sans font-semibold">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/operating-model" className="hover:text-white transition-colors">Operating Model</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security & Trust</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ROW 2 — Newsletter Strip (--primary-soft background, 1px top border) */}
      <div className="border-t border-white/10 bg-[var(--color-primary-soft)]/20 py-10 w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-md">
            <h4 className="text-sm font-bold text-white mb-1">Subscribe to Qeltrava AI Insights</h4>
            <p className="text-xs text-white/60">Monthly engineering research. No weekly noise.</p>
          </div>
          
          <div className="w-full md:max-w-md">
            {subscribed ? (
              <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-4 rounded-xl">
                ✔ Thanks for subscribing! You will receive our next update.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-white placeholder-gray-400 font-medium"
                />
                <button 
                  type="submit" 
                  className="bg-white hover:bg-gray-100 text-[var(--color-primary-dark)] font-bold text-xs py-2.5 px-6 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ROW 3 — Legal Bar (--primary-dark background, 48px height) */}
      <div className="border-t border-white/10 bg-[var(--color-primary-dark)]/90 py-6 w-full text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <address className="not-italic flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 leading-normal">
            <span className="font-semibold text-white/70">© {new Date().getFullYear()} Qeltrava Technologies Private Limited</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Coimbatore, Tamil Nadu, India — 641 004 <span className="mx-2 opacity-30">•</span> CIN: [actual number once incorporated] <span className="mx-2 opacity-30">•</span> GST: [actual number once registered]</span>
          </address>
          
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[10px] uppercase tracking-wider text-white/40 hidden md:inline-block">
              STPI: <span className="italic">Registration in Progress</span> <span className="mx-1">•</span> IEC: <span className="italic">Pending</span>
            </span>
            <a 
              href="https://qeltravaai.vercel.app" 
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] text-emerald-400 font-medium select-none hover:bg-emerald-500/20 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </a>
            
            <div className="flex items-center gap-4 text-xs font-semibold">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/security" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};
