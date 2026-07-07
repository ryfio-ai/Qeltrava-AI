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

  const handleMouseEnter = (menuId: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menuId);
    }, 240); // 240ms hover delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // small delay to cross gap
  };

  const handlePanelMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handlePanelMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleNavClick = (menuId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMenu(prev => prev === menuId ? null : menuId);
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
    setIsOpen(false);
    setExpandedMobileMenu(null);
  };

  // Nav Items config mapping
  const navItems: NavItem[] = [
    {
      id: 'products',
      label: 'Products',
      introTitle: 'Flagship AI Platforms',
      introDesc: 'Proprietary products built by Qeltrava engineering.',
      columns: [
        {
          title: 'AutoML & Studio',
          links: [
            { label: 'Modliq (No-Code ML)', href: '/products/modliq', badge: 'Flagship' }
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
        title: 'Join Modliq Waitlist',
        desc: 'Build and deploy machine learning models through a visual workflow.',
        cta: 'Request Invite →',
        href: '/products/modliq'
      }
    },
    {
      id: 'services',
      label: t('Services') || 'Services',
      introTitle: 'Engineering Services',
      introDesc: 'Six practices. One delivery system.',
      columns: [
        {
          title: 'Build',
          links: [
            { label: 'AI Automation', href: '/services/ai-automation' },
            { label: 'SaaS Development', href: '/services/saas-development' },
            { label: 'Product Engineering', href: '/services/product-engineering' }
          ]
        },
        {
          title: 'Scale',
          links: [
            { label: 'Cloud & DevOps', href: '/services/cloud-devops' },
            { label: 'Data & Analytics', href: '/services/data-analytics' },
            { label: 'Cybersecurity', href: '/services/cybersecurity' }
          ]
        }
      ],
      card: {
        title: 'AI Opportunity Audit',
        desc: 'A free 2-week diagnostic sprint.',
        cta: 'Book Audit →',
        href: '/book-consultation'
      }
    },
    {
      id: 'industries',
      label: t('Industries') || 'Industries',
      introTitle: 'Industries We Serve',
      introDesc: 'Deep specialization in regulated, high-stakes sectors.',
      columns: [
        {
          title: 'Core Sectors',
          links: [
            { label: 'Fintech & Banking', href: '/industries/fintech' },
            { label: 'Healthcare & Healthtech', href: '/industries/healthcare' },
            { label: 'Logistics & Supply Chain', href: '/industries/logistics' },
            { label: 'Manufacturing', href: '/industries/manufacturing' }
          ]
        },
        {
          title: 'Digital Sectors',
          links: [
            { label: 'Government & Public Sector', href: '/industries/government' },
            { label: 'Retail & E-commerce', href: '/industries/retail' },
            { label: 'SaaS & Technology', href: '/industries/saas' },
            { label: 'Education', href: '/industries/education' }
          ]
        }
      ],
      card: {
        title: 'View Case Studies',
        stats: '92%',
        desc: 'Predictive accuracy on logistics ML pipeline.',
        note: 'Illustrative — based on project benchmark',
        cta: 'View Case Studies →',
        href: '/case-studies'
      }
    },
    {
      id: 'solutions',
      label: t('Solutions') || 'Solutions',
      introTitle: 'Cross-Service Solutions',
      introDesc: 'Outcome-bundled engagements for specific buyer challenges.',
      columns: [
        {
          title: 'Primary Outcomes',
          links: [
            { label: 'AI Solution Architect', href: '/ai-solution-architect', badge: 'New' },
            { label: 'AI Customer Service Transformation', href: '/solutions/ai-customer-service-transformation' },
            { label: 'AI Operations Automation', href: '/solutions/ai-operations-automation' },
            { label: 'Legacy System Modernization', href: '/solutions/legacy-modernization' },
            { label: 'SaaS Launch Program', href: '/solutions/saas-launch' }
          ]
        },
        {
          title: 'Strategic Audits',
          links: [
            { label: 'AI Readiness Assessment', href: '/solutions/ai-readiness' },
            { label: 'Enterprise Data Foundation', href: '/solutions/data-foundation' },
            { label: 'Compliance & Security Hardening', href: '/solutions/security-hardening' }
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
      introTitle: 'Resources',
      introDesc: 'Engineering research, case studies, and delivery insights.',
      columns: [
        {
          title: 'Learn',
          links: [
            { label: 'Insights & Blog', href: '/insights' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'White Papers', href: '/insights', badge: 'Soon' },
            { label: 'Data Sheets', href: '/insights', badge: 'Soon' }
          ]
        },
        {
          title: 'Explore',
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
    <header className="w-full h-20 bg-white/90 backdrop-blur-md border-b border-[var(--color-border-soft)] z-50 flex items-center px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={closeAllMenus}>
          <Image 
            src="/logo-bg.png" 
            alt="Qeltrava AI Logo" 
            width={40} 
            height={40} 
            className="w-10 h-10 object-contain group-hover:opacity-80 transition-opacity" 
          />
          <span className="text-xl font-bold text-[var(--color-primary-dark)] tracking-tight whitespace-nowrap">Qeltrava AI</span>
        </Link>

        {/* Visually hidden links for crawler and SEO compatibility */}
        <div className="sr-only">
          <Link href="/about">{t('About') || 'About'}</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center xl:gap-1 gap-0.5">
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
                  className={`text-sm font-semibold transition-colors xl:px-4 px-2 py-2 rounded-lg flex items-center gap-1 focus:outline-none hover:bg-gray-50 whitespace-nowrap ${
                    isMenuOpen || pathname.startsWith(`/${item.id}`)
                      ? 'text-[var(--color-accent)]' 
                      : 'text-[var(--color-text-main)] hover:text-[var(--color-accent)]'
                  }`}
                  aria-expanded={isMenuOpen}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA & Locale */}
        <div className="hidden lg:flex items-center xl:gap-4 gap-2.5 flex-shrink-0">
          <LocaleSwitcher />
          
          {/* Search Trigger Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            aria-label="Search site (Cmd+K)"
          >
            <Search size={18} />
          </button>

          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/918925575794?text=Hi%20Qeltrava%20AI%2C%20I%27d%20like%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white hover:bg-[#1DA851] transition-colors"
            aria-label="Contact on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>

          <Link 
            href="/contact" 
            className="text-sm font-semibold text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
            onClick={closeAllMenus}
          >
            {t('Contact') || 'Contact'}
          </Link>
          
          <Button href="/book-consultation" onClick={closeAllMenus} className="whitespace-nowrap">
            {t('BookCall') || 'Book Call'}
          </Button>
        </div>

        {/* Mobile Search & Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[var(--color-primary-dark)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
            aria-label="Search site"
          >
            <Search size={22} />
          </button>
          <button 
            className="p-2 text-[var(--color-primary-dark)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Desktop Mega-menu dropdown panel */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            className="absolute left-0 right-0 top-20 w-full bg-[var(--color-primary-dark)] text-white shadow-2xl border-t border-white/10 z-40 select-none"
          >
            {navItems.filter(item => item.id === activeMenu).map(item => (
              <div key={item.id} className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-12 gap-8">
                
                {/* Left Column (Intro description) */}
                <div className="col-span-3 pr-6 border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] font-mono mb-2">
                      {item.introTitle}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-sans">
                      {item.introDesc}
                    </p>
                  </div>
                  <div className="pt-6 font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    &lt;qeltrava-nav-gate&gt;
                  </div>
                </div>

                {/* Sub-columns Links list */}
                {item.columns.map((col, idx) => (
                  <div key={idx} className="col-span-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                      {col.title}
                    </h4>
                    <ul className="space-y-3">
                      {col.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            href={link.href as any}
                            onClick={closeAllMenus}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-[var(--color-accent)] transition-colors group"
                          >
                            <span>{link.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--color-accent)]" />
                            {link.badge && (
                              <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/50 scale-90">
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
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden group">
                    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                    <div className="relative z-10">
                      {item.card.stats && (
                        <div className="text-3xl font-extrabold text-[var(--color-success)] font-mono mb-2">
                          {item.card.stats}
                        </div>
                      )}
                      <h4 className="text-sm font-bold text-white mb-2">{item.card.title}</h4>
                      {item.card.desc && (
                        <p className="text-xs text-white/70 leading-relaxed mb-1">{item.card.desc}</p>
                      )}
                      {item.card.note && (
                        <p className="text-[9px] italic text-white/40">{item.card.note}</p>
                      )}
                    </div>
                    
                    {item.card.cta && (
                      <Link
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        href={item.card.href as any}
                        onClick={closeAllMenus}
                        className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] hover:text-white transition-colors mt-4 self-start"
                      >
                        <span>{item.card.cta}</span>
                      </Link>
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
            className="absolute top-20 left-0 right-0 bg-[var(--color-primary-dark)] border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-80px)] select-none text-white"
          >
            {/* Header controls inside mobile menu */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent)]">NAVIGATION</span>
              <div className="bg-white/10 p-2 rounded-md"><LocaleSwitcher /></div>
            </div>

            {/* Accordion List */}
            <nav className="flex flex-col gap-4 font-sans">
              {navItems.map(item => {
                const isExpanded = expandedMobileMenu === item.id;
                return (
                  <div key={item.id} className="border-b border-white/5 pb-3">
                    <button
                      onClick={() => setExpandedMobileMenu(prev => prev === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between text-lg font-bold text-white/95 py-1 text-left focus:outline-none"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-white/60 ${isExpanded ? 'rotate-180 text-[var(--color-accent)]' : ''}`} />
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
                                <h5 className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2">{col.title}</h5>
                                <ul className="space-y-2">
                                  {col.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                      <Link
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        href={link.href as any}
                                        onClick={closeAllMenus}
                                        className="text-sm font-semibold text-white/80 hover:text-[var(--color-accent)] transition-colors flex items-center justify-between"
                                      >
                                        <span>{link.label}</span>
                                        {link.badge && (
                                          <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/40 scale-90">
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
                className="text-lg font-bold text-white/95 py-2 border-b border-white/5 flex items-center justify-between" 
                onClick={closeAllMenus}
              >
                <span>Contact</span>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </Link>
            </nav>

            {/* Pinned Book Call Callout */}
            <div className="pt-4 border-t border-white/10">
              <Button href="/book-consultation" className="w-full text-center" onClick={closeAllMenus}>
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
