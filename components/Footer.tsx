"use client";

import React from 'react';
import { Link } from '@/src/routing';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white pt-20 border-t border-[var(--color-primary-soft)] flex flex-col relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo-bg.png" alt="Qeltrava AI Logo" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="font-bold text-xl tracking-tight text-white">
                {siteConfig.companyName}
              </span>
            </Link>
            <p className="text-white/70 max-w-sm mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="p-4 rounded-lg bg-[var(--color-primary-soft)]/50 border border-white/10 text-sm text-white/80">
              <span className="font-semibold text-white block mb-1">{t('OperatingModel')}</span>
              {siteConfig.founderMode}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">{t('Services')}</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-white transition-colors">SaaS Development</Link></li>
              <li><Link href="/services/product-engineering" className="hover:text-white transition-colors">Product Engineering</Link></li>
              <li><Link href="/services/cloud-devops" className="hover:text-white transition-colors">Cloud & DevOps</Link></li>
              <li><Link href="/services/data-analytics" className="hover:text-white transition-colors">Data & Analytics</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">{t('Company')}</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/operating-model" className="hover:text-white transition-colors">Operating Model</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">{t('Legal')}</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security & Trust</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link href="/privacy#ccpa" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30">Do Not Sell My Personal Information</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--color-primary-soft)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.legalName}. {t('AllRightsReserved')}</p>
            <LocaleSwitcher />
          </div>
          <p>{t('GlobalRemote')}</p>
        </div>
        
      </div>
    </footer>
  );
};
