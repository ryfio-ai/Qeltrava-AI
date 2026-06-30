"use client";

import React from 'react';
import { useConsent } from './ConsentProvider';
import { Button } from './Button';
import { Link } from '@/src/routing';
import { AnimatePresence, motion } from 'framer-motion';

export const CookieBanner = () => {
  const { hasConsent, acceptConsent, declineConsent, isInitialized } = useConsent();

  // If we already checked local storage and a decision was made, hide banner
  if (!isInitialized || localStorage.getItem('qeltrava_cookie_consent') !== null) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white border-t border-[var(--color-border-soft)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="max-w-4xl">
          <h3 className="font-bold text-[var(--color-primary-dark)] mb-1">Your privacy matters</h3>
          <p className="text-sm text-[var(--color-text-main)]">
            We use cookies to ensure you get the best experience on our website. 
            We only use essential functional cookies and opt-in analytics. 
            Read our <Link href="/cookie-policy" className="underline font-medium hover:text-[var(--color-accent)]">Cookie Policy</Link> for details.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={declineConsent}
            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            Decline All
          </button>
          <Button onClick={acceptConsent} className="w-full md:w-auto whitespace-nowrap">
            Accept All
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
