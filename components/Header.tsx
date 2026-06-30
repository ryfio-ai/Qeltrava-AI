"use client";

import React, { useState } from 'react';
import { Link, usePathname } from '@/src/routing';
import { Button } from '@/components/Button';
import { Menu, X, Lock, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');
  const pathname = usePathname();

  const links = [
    { label: t('Dashboard'), href: '/dashboard' },
    { label: t('Services'), href: '/services' },
    { label: t('Solutions'), href: '/solutions' },
    { label: t('Industries'), href: '/industries' },
    { label: t('OperatingModel'), href: '/operating-model' },
    { label: t('Insights'), href: '/insights' },
    { label: t('About'), href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm border-b border-[var(--color-border-soft)]">
      
      {/* Chrome Browser System Bar */}
      <div className="h-9 w-full bg-[#e9ddfe] flex items-center justify-between border-b border-[#d4c8fa]/50 select-none px-4">
        {/* Left Window Controls */}
        <div className="flex gap-1.5 items-center min-w-[80px]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 cursor-pointer" />
        </div>

        {/* Browser Tabs */}
        <div className="flex items-end flex-grow max-w-lg justify-start h-full pl-4 pt-1.5 overflow-hidden">
          <div className="bg-white px-4 py-1.5 flex items-center gap-2 border-r border-[#d4c8fa]/40 border-t border-l border-white rounded-t-lg text-[11px] font-semibold text-[var(--color-primary-dark)] relative top-[1px] shadow-sm min-w-[140px]">
            <Image src="/logo-bg.png" alt="Qeltrava Logo" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
            <span className="truncate">Qeltrava AI</span>
            <span className="ml-auto text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 w-3 h-3 flex items-center justify-center cursor-pointer text-[8px]">×</span>
          </div>
          <button className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-white/40 ml-1 mb-1" aria-label="New Tab">
            <span className="text-[14px] leading-none font-bold">+</span>
          </button>
        </div>

        {/* Address Bar */}
        <div className="hidden md:flex items-center gap-2 bg-white/70 hover:bg-white border border-[#d4c8fa]/30 rounded-md px-3 py-1 text-[11px] text-gray-500 max-w-sm w-full mx-auto transition-colors">
          <Lock size={10} className="text-[var(--color-success)] shrink-0" />
          <span className="truncate font-mono">https://qeltrava.ai{pathname}</span>
          <RotateCw size={9} className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer shrink-0" />
        </div>

        {/* Right spacing */}
        <div className="min-w-[80px]" />
      </div>

      {/* Main Navbar */}
      <div className="w-full h-20 bg-white/90 backdrop-blur-md flex items-center px-6 md:px-12">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/logo-bg.png" 
              alt="Qeltrava AI Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10 object-contain group-hover:opacity-80 transition-opacity" 
            />
            <span className="text-xl font-bold text-[var(--color-primary-dark)] tracking-tight">Qeltrava AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map(link => (
              <Link 
                key={link.href} 
                href={link.href as any} 
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === link.href 
                    ? 'text-[var(--color-accent)]' 
                    : 'text-[var(--color-text-main)] hover:text-[var(--color-accent)]'
                }`}
              >
                {link.label}
                {link.href === '/dashboard' && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Locale */}
          <div className="hidden lg:flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/contact" className="text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
              {t('Contact')}
            </Link>
            <Button href="/book-consultation">
              {t('BookCall')}
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
            className="absolute top-[116px] left-0 right-0 bg-[var(--color-primary-dark)] border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl z-50"
          >
            <div className="flex justify-end mb-2">
               <div className="bg-white/10 p-2 rounded-md"><LocaleSwitcher /></div>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href as any} 
                  className="text-lg font-medium text-white/90 hover:text-white transition-colors flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.href === '/dashboard' && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
                    </span>
                  )}
                </Link>
              ))}
              <Link href="/contact" className="text-lg font-medium text-white/90 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                {t('Contact')}
              </Link>
            </nav>
            <div className="pt-4 border-t border-white/10">
              <Button href="/book-consultation" className="w-full text-center" onClick={() => setIsOpen(false)}>
                {t('BookCall')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

