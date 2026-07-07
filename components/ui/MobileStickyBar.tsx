"use client";

import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { Link } from '@/src/routing';

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border-soft)] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 pb-[env(safe-area-inset-bottom)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex p-3 gap-3">
        <a 
          href="https://wa.me/919629463964"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 text-green-700 border border-green-200 font-semibold text-sm active:bg-green-100 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <Link 
          href="/book-consultation"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-sm active:bg-blue-600 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Book Call
        </Link>
      </div>
    </div>
  );
}
