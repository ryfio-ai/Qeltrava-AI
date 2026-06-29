import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { Button } from './Button';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[var(--color-bg-white)]/90 backdrop-blur-md border-b border-[var(--color-border-soft)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo-bg.png" alt="Qeltrava AI Logo" width={40} height={40} className="w-10 h-10 object-contain group-hover:opacity-80 transition-opacity" />
          <span className="font-bold text-xl tracking-tight text-[var(--color-primary-dark)]">
            {siteConfig.companyName}
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--color-text-main)]">
          <Link href="/services" className="hover:text-[var(--color-accent)] transition-colors">Services</Link>
          <Link href="/solutions" className="hover:text-[var(--color-accent)] transition-colors">Solutions</Link>
          <Link href="/industries" className="hover:text-[var(--color-accent)] transition-colors">Industries</Link>
          <Link href="/operating-model" className="hover:text-[var(--color-accent)] transition-colors">Operating Model</Link>
          <Link href="/insights" className="hover:text-[var(--color-accent)] transition-colors">Insights</Link>
          <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">About</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
            Contact
          </Link>
          <Button href="/book-consultation" variant="primary" className="py-2 px-5 text-sm">
            {siteConfig.defaultCTA}
          </Button>
        </div>

        {/* Mobile menu button placeholder */}
        <button className="lg:hidden p-2 text-[var(--color-text-main)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};
