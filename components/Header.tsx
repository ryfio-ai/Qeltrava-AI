"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Operating Model', href: '/operating-model' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-b border-[var(--color-border-soft)] z-50 flex items-center px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-bold text-[var(--color-primary-dark)]">Qeltrava AI</div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
            Contact
          </Link>
          <Button href="/book-consultation">
            Book an AI Strategy Call
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-[var(--color-primary-dark)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-[var(--color-primary-dark)] border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {links.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-lg font-medium text-white/90 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="text-lg font-medium text-white/90 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </nav>
            <div className="pt-4 border-t border-white/10">
              <Button href="/book-consultation" className="w-full text-center" onClick={() => setIsOpen(false)}>
                Book an AI Strategy Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
