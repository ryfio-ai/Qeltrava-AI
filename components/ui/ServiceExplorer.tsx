"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';

type Service = {
  title: string;
  href: string;
  desc: string;
  category: 'Modernization' | 'Automation' | 'Security' | 'New Product';
  icon: React.ReactNode;
};

const services: Service[] = [
  { 
    title: 'AI Automation', 
    href: '/services/ai-automation', 
    desc: 'Automate high-value workflows with custom agents.', 
    category: 'Automation',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  },
  { 
    title: 'Cloud & DevOps', 
    href: '/services/cloud-devops', 
    desc: 'Enterprise-grade scalable infrastructure.', 
    category: 'Modernization',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S20 10 17.5 10c-.3 0-.6 0-.8.1C15.8 7.1 14 5 11.5 5 8.5 5 6 7.5 6 10.5c0 .3.1.7.2 1C3.8 11.8 2 14.1 2 17c0 3.3 2.7 6 6 6h9.5z"/></svg>
  },
  { 
    title: 'Cybersecurity', 
    href: '/services/cybersecurity', 
    desc: 'Secure by design systems and compliance.', 
    category: 'Security',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  },
  { 
    title: 'Data Analytics', 
    href: '/services/data-analytics', 
    desc: 'Actionable intelligence from unstructured data.', 
    category: 'Automation',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M3 3v18h18M18 9l-5 5-3-3-4 4"/></svg>
  },
  { 
    title: 'Product Engineering', 
    href: '/services/product-engineering', 
    desc: 'End-to-end software architecture.', 
    category: 'New Product',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  },
  { 
    title: 'SaaS Development', 
    href: '/services/saas-development', 
    desc: 'Launch multi-tenant scalable applications.', 
    category: 'New Product',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  },
];

const categories = ['All', 'Automation', 'Modernization', 'Security', 'New Product'];

export const ServiceExplorer = () => {
  const [filter, setFilter] = useState<string>('All');

  const filteredServices = services.filter(
    (s) => filter === 'All' || s.category === filter
  );

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              filter === cat
                ? 'bg-[var(--color-primary-dark)] text-white'
                : 'bg-[var(--color-bg-light)] text-[var(--color-text-main)] hover:bg-[var(--color-border-soft)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Animated Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredServices.map((service) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ rotate: 1, scale: 1.02 }}
              key={service.href}
              className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[var(--color-bg-light)] rounded-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)]">{service.title}</h3>
              </div>
              <p className="text-[var(--color-text-main)] mb-6 flex-grow">{service.desc}</p>
              <Button href={service.href} variant="outline" className="w-full">
                Explore Service
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
