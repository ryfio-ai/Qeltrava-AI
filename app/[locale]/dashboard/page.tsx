"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VisualImportanceOfDashboards } from '@/components/ui/VisualImportanceOfDashboards';
import { VisualWhyWebsite } from '@/components/ui/VisualWhyWebsite';
import { VisualAIAdoptionStrategy } from '@/components/ui/VisualAIAdoptionStrategy';
import { VisualDigitalTransformation } from '@/components/ui/VisualDigitalTransformation';
import { VisualWhatSoftwareCompanyDoes } from '@/components/ui/VisualWhatSoftwareCompanyDoes';
import { VisualHowSoftwareCompaniesWork } from '@/components/ui/VisualHowSoftwareCompaniesWork';
import { VisualMindOfDeveloper } from '@/components/ui/VisualMindOfDeveloper';
import { VisualClientSources } from '@/components/ui/VisualClientSources';
import { VisualBenefitsOfConsulting } from '@/components/ui/VisualBenefitsOfConsulting';
import { VisualCustomerServiceSolutions } from '@/components/ui/VisualCustomerServiceSolutions';

export default function DashboardDemoPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboards");

  const tabs = [
    { id: "dashboards", label: "Importance of Dashboards", comp: <VisualImportanceOfDashboards /> },
    { id: "website", label: "Why Business Needs a Website", comp: <VisualWhyWebsite /> },
    { id: "ai-adoption", label: "AI Adoption Strategy", comp: <VisualAIAdoptionStrategy /> },
    { id: "digital-trans", label: "Digital Transformation Hub", comp: <VisualDigitalTransformation /> },
    { id: "company-role", label: "Software Services Wheel", comp: <VisualWhatSoftwareCompanyDoes /> },
    { id: "company-work", label: "How We Think & Work", comp: <VisualHowSoftwareCompaniesWork /> },
    { id: "dev-mind", label: "Developer Mindset", comp: <VisualMindOfDeveloper /> },
    { id: "client-sources", label: "Lead Sources Chart", comp: <VisualClientSources /> },
    { id: "consulting", label: "Consulting Benefits", comp: <VisualBenefitsOfConsulting /> },
    { id: "customer-service", label: "Customer Service Flow", comp: <VisualCustomerServiceSolutions /> },
  ];

  const currentTab = tabs.find(t => t.id === activeTab)!;

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] pb-24 pt-8">
      
      {/* Live Metrics Band */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Total API Invocations</span>
            <div className="text-2xl font-black text-[var(--color-primary-dark)] mt-1 font-mono">1,482,903</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Model Response Latency</span>
            <div className="text-2xl font-black text-[var(--color-primary-dark)] mt-1 font-mono">0.24s</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Average Pipeline Load</span>
            <div className="text-2xl font-black text-[var(--color-primary-dark)] mt-1 font-mono">14.2%</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Uptime Reliability</span>
            <div className="text-2xl font-black text-[var(--color-success)] mt-1 font-mono">99.9972%</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white border border-[var(--color-border-soft)] rounded-3xl p-5 shadow-sm">
          <h2 className="text-base font-extrabold text-[var(--color-primary-dark)] uppercase tracking-wider mb-4 border-b pb-2">
            Visual Showcases
          </h2>
          
          <nav className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[var(--color-primary-dark)] text-white shadow-sm' 
                      : 'text-[var(--color-text-main)] hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Selected Visual Display Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentTab.comp}
          </motion.div>
        </div>

      </div>

    </main>
  );
}
