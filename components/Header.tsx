"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/src/routing';
import { Button } from '@/components/Button';
import { Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import { SearchModal } from '@/components/ui/SearchModal';

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavCard {
  title: string;
  desc?: string;
  note?: string;
  stats?: string;
  cta?: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  introTitle: string;
  introDesc: string;
  columns: NavColumn[];
  card: NavCard;
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  
  const t = useTranslations('Header');
  const pathname = usePathname();
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setActiveMenu(null);
    setIsOpen(false);
  }, [pathname]);

  const handleMouseEnter = (menuId: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menuId);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handlePanelMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handlePanelMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handleNavClick = (menuId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMenu(prev => prev === menuId ? null : menuId);
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
    setIsOpen(false);
  };

  const navItems: NavItem[] = [
    {
      id: 'products',
      label: 'Products',
      introTitle: 'Proprietary Platforms',
      introDesc: 'Proprietary products built by Qeltrava engineering.',
      columns: [
        {
          title: 'AutoML & Studio',
          links: [
            { label: 'Modliqer (No-Code ML)', href: '/products/modliq', badge: 'Flagship' }
          ]
        },
        {
          title: 'PropTech Platforms',
          links: [
            { label: 'StaySeat (Smart Accommodation)', href: '/products/stayseat', badge: 'Soon' }
          ]
        },
        {
          title: 'Enterprise Tools',
          links: [
            { label: 'Quantra AI (Analytics)', href: '#', badge: 'Teaser' },
            { label: 'AI Workflow Studio', href: '#', badge: 'Soon' }
          ]
        }
      ],
      card: {
        title: 'Join Modliqer Waitlist',
        desc: 'Build and deploy machine learning models through a visual workflow.',
        cta: 'Request Invite →',
        href: '/products/modliq'
      }
    },
    {
      id: 'services',
      label: 'Services',
      introTitle: 'Engineering Capabilities',
      introDesc: 'Full-stack engineering, AI automation, cloud infrastructure, and data systems.',
      columns: [
        {
          title: 'Core Practice',
          links: [
            { label: 'AI Automation & Agents', href: '/services/ai-automation', badge: 'Core' },
            { label: 'SaaS Platform Development', href: '/services/saas-development' },
            { label: 'Product Engineering', href: '/services/product-engineering' }
          ]
        },
        {
          title: 'Infrastructure & Data',
          links: [
            { label: 'Cloud Architecture & DevOps', href: '/services/cloud-devops' },
            { label: 'Data Platform & Analytics', href: '/services/data-analytics' },
            { label: 'Cybersecurity & Compliance', href: '/services/cybersecurity' }
          ]
        }
      ],
      card: {
        title: 'Engineering Assessment',
        desc: 'Book a 45-minute technical architecture review with our lead engineers.',
        cta: 'Book Assessment →',
        href: '/book-consultation'
      }
    },
    {
      id: 'industries',
      label: 'Industries',
      introTitle: 'Sector Expertise',
      introDesc: 'Deep domain implementations across regulated and high-scale sectors.',
      columns: [
        {
          title: 'Regulated & High Trust',
          links: [
            { label: 'Fintech & Banking', href: '/industries/fintech' },
            { label: 'Healthcare & Biotech', href: '/industries/healthcare' },
            { label: 'Government & Public Sector', href: '/industries/government' }
          ]
        },
        {
          title: 'Operations & Scale',
          links: [
            { label: 'Manufacturing & Smart Factory', href: '/industries/manufacturing' },
            { label: 'Logistics & Supply Chain', href: '/industries/logistics' },
            { label: 'Retail & E-commerce', href: '/industries/retail' },
            { label: 'SaaS & Technology', href: '/industries/saas' }
          ]
        }
      ],
      card: {
        title: 'Industry Benchmarks',
        desc: 'Explore case studies and ROI metrics tailored to your sector.',
        cta: 'View Sector Studies →',
        href: '/case-studies'
      }
    },
    {
      id: 'solutions',
      label: 'Solutions',
      introTitle: 'Packaged Offerings',
      introDesc: 'Outcome-bundled engagements for specific buyer challenges.',
      columns: [
        {
          title: 'Primary Outcomes',
          links: [
            { label: 'AI Solution Architect', href: '/ai-solution-architect', badge: 'New' },
            { label: 'AI Customer Service Transformation', href: '/solutions/customer-service' },
            { label: 'AI Operations Automation', href: '/solutions/operations-automation' },
            { label: 'Legacy System Modernization', href: '/solutions/legacy-modernization' },
            { label: 'SaaS Launch Program', href: '/solutions/saas-launch' }
          ]
        },
        {
          title: 'Strategic Audits',
          links: [
            { label: 'AI Readiness Assessment', href: '/ai-readiness' },
            { label: 'Enterprise Data Foundation', href: '/solutions/data-foundation' },
            { label: 'Compliance & Security Hardening', href: '/solutions/compliance-hardening' }
          ]
        }
      ],
      card: {
        title: 'Check your AI Readiness',
        desc: '10 questions. Instant score + custom action plan.',
        cta: 'Take Assessment →',
        href: '/ai-readiness'
      }
    },
    {
      id: 'resources',
      label: 'Resources',
      introTitle: 'Knowledge & Tools',
      introDesc: 'Technical research, calculators, assessment tools, and engineering articles.',
      columns: [
        {
          title: 'Research & Content',
          links: [
            { label: 'Technical Insights', href: '/insights' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'White Papers', href: '/insights' }
          ]
        },
        {
          title: 'Interactive Tools',
          links: [
            { label: 'AI Solution Architect', href: '/ai-solution-architect', badge: 'New' },
            { label: 'AI Prompt Playground', href: '/playground', badge: 'New' },
            { label: 'AI Readiness Assessment', href: '/ai-readiness', badge: 'New' },
            { label: 'AI Proposal Generator', href: '/proposal', badge: 'New' },
            { label: 'ROI Calculator', href: '/roi-calculator' },
            { label: 'AI Strategy Quiz', href: '/quiz' },
            { label: 'Glossary', href: '/glossary' }
          ]
        }
      ],
      card: {
        title: 'Featured Research',
        desc: 'Why AI-Native Architecture Is an Architecture Decision, Not a Feature Toggle.',
        cta: 'Read Article →',
        href: '/insights/ai-native-architecture-decision'
      }
    },
    {
      id: 'company',
      label: 'Company',
      introTitle: 'Company',
      introDesc: 'Built by engineers, for engineers.',
      columns: [
        {
          title: 'About Us',
          links: [
            { label: 'About Us', href: '/about' },
            { label: 'Our Team', href: '/team' },
            { label: 'Operating Model', href: '/operating-model' },
            { label: 'Careers', href: '/careers' }
          ]
        },
        {
          title: 'Trust & Media',
          links: [
            { label: 'Security & Trust', href: '/security' },
            { label: 'Accessibility Standards', href: '/accessibility' },
            { label: 'Government', href: '/government' },
            { label: 'Press & Media', href: '/press' }
          ]
        }
      ],
      card: {
        title: 'PSG College of Technology, Class of 2026.',
        desc: 'Building the engineering firm we would have wanted to hire.',
        href: '/about'
      }
    }
  ];

  return (
    <header className="w-full h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 sticky top-0 shadow-xs select-none">
      <div className="w-full max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between gap-4">
          
        {/* Brand Logo (Left Aligned) */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={closeAllMenus}>
          <Image 
            src="/logo-bg.png" 
            alt="Qeltrava AI Logo" 
            width={40} 
            height={40} 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="text-xl font-black text-[#1B2A4A] tracking-tight whitespace-nowrap">Qeltrava AI</span>
        </Link>

        {/* Visually hidden links for SEO */}
        <div className="sr-only">
          <Link href="/about">{t('About') || 'About'}</Link>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map(item => {
            const isMenuOpen = activeMenu === item.id;
            return (
              <div 
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className="relative py-6"
              >
                <button
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`text-xs xl:text-sm font-semibold transition-colors px-3 py-2 rounded-lg flex items-center gap-1 focus:outline-none hover:bg-slate-100/70 whitespace-nowrap ${
                    isMenuOpen || pathname.startsWith(`/${item.id}`)
                      ? 'text-[#2B70AB] bg-slate-50' 
                      : 'text-[#1B2A4A] hover:text-[#2B70AB]'
                  }`}
                  aria-expanded={isMenuOpen}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-[#2B70AB]' : ''}`} />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <LocaleSwitcher />
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg text-[#1B2A4A] hover:text-[#2B70AB] hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Search site (Cmd+K)"
          >
            <Search size={18} />
          </button>

          <Button href="/book-consultation" onClick={closeAllMenus} className="bg-[#2B70AB] hover:bg-[#235b8c] text-white rounded-full px-5 py-2.5 text-xs font-bold whitespace-nowrap shadow-sm">
            {t('BookCall') || 'Book Call'}
          </Button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#1B2A4A] hover:text-[#2B70AB] transition-colors focus:outline-none"
            aria-label="Search site"
          >
            <Search size={22} />
          </button>
          <button 
            className="p-2 text-[#1B2A4A]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMenu(null)}
            className="fixed inset-0 top-20 bg-slate-900/20 backdrop-blur-xs z-30 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Desktop Mega-menu dropdown panel */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            className="absolute left-0 right-0 top-20 w-full bg-white text-[#1B2A4A] shadow-2xl border-b border-slate-200 z-40 select-none"
          >
            {navItems.filter(item => item.id === activeMenu).map(item => (
              <div key={item.id} className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-12 gap-8">
                
                {/* Left Column (Intro description) */}
                <div className="col-span-3 pr-6 border-r border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B70AB] font-mono mb-2">
                      {item.introTitle}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                      {item.introDesc}
                    </p>
                  </div>
                  <div className="pt-6 font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                    &lt;qeltrava-nav-gate&gt;
                  </div>
                </div>

                {/* Sub-columns Links list */}
                {item.columns.map((col, idx) => (
                  <div key={idx} className="col-span-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      {col.title}
                    </h4>
                    <ul className="space-y-3">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            href={link.href as any}
                            onClick={closeAllMenus}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-[#2B70AB] transition-colors group"
                          >
                            <span>{link.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#2B70AB]" />
                            {link.badge && (
                              <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-[#2B70AB] scale-90 border border-slate-200">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Right Column Featured Card */}
                <div className="col-span-3">
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden group hover:border-[#2B70AB]/30 transition-all">
                    <div className="relative z-10">
                      {item.card.stats && (
                        <div className="text-3xl font-extrabold text-[#2B70AB] font-mono mb-2">
                          {item.card.stats}
                        </div>
                      )}
                      <h4 className="text-sm font-bold text-[#1B2A4A] mb-2">{item.card.title}</h4>
                      {item.card.desc && (
                        <p className="text-xs text-slate-600 leading-relaxed mb-1 font-medium">{item.card.desc}</p>
                      )}
                      {item.card.note && (
                        <p className="text-[9px] italic text-slate-400">{item.card.note}</p>
                      )}
                    </div>
                    
                    {item.card.cta && (
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <Link
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          href={item.card.href as any}
                          onClick={closeAllMenus}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#2B70AB] hover:underline"
                        >
                          <span>{item.card.cta}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white border-t border-slate-200 p-6 flex flex-col gap-6 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-80px)] select-none text-[#1B2A4A]"
          >
            {/* Header controls inside mobile menu */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#2B70AB]">NAVIGATION</span>
              <div className="bg-slate-100 p-2 rounded-md"><LocaleSwitcher /></div>
            </div>

            {/* Accordion List */}
            <nav className="flex flex-col gap-4 font-sans">
              {navItems.map(item => {
                const isExpanded = expandedMobileMenu === item.id;
                return (
                  <div key={item.id} className="border-b border-slate-100 pb-3">
                    <button
                      onClick={() => setExpandedMobileMenu(prev => prev === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between text-lg font-bold text-[#1B2A4A] py-1 text-left focus:outline-none"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-180 text-[#2B70AB]' : ''}`} />
                    </button>
                    
                    {/* Collapsible Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pl-4 space-y-4">
                            {item.columns.map((col, idx) => (
                              <div key={idx}>
                                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{col.title}</h5>
                                <ul className="space-y-2">
                                  {col.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                      <Link
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        href={link.href as any}
                                        onClick={closeAllMenus}
                                        className="text-sm font-semibold text-slate-700 hover:text-[#2B70AB] transition-colors flex items-center justify-between"
                                      >
                                        <span>{link.label}</span>
                                        {link.badge && (
                                          <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-[#2B70AB] scale-90 border border-slate-200">
                                            {link.badge}
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link 
                href="/contact" 
                className="text-lg font-bold text-[#1B2A4A] py-2 border-b border-slate-100 flex items-center justify-between" 
                onClick={closeAllMenus}
              >
                <span>Contact</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
            </nav>

            {/* Pinned Book Call Callout */}
            <div className="pt-4 border-t border-slate-200">
              <Button href="/book-consultation" className="w-full text-center bg-[#2B70AB] hover:bg-[#235b8c] text-white rounded-full py-3 font-bold" onClick={closeAllMenus}>
                Book an AI Strategy Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search modal palette */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
