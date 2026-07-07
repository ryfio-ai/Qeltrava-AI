"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, LeadFormValues } from '@/lib/validators';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

export const LeadForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'sales' | 'security' | 'partnerships'>('general');
  const t = useTranslations('LeadForm');

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { 
      path: 'general',
      consent: false, 
      honeypot: '' 
    }
  });

  const handleTabChange = (tab: 'general' | 'sales' | 'security' | 'partnerships') => {
    setActiveTab(tab);
    setValue('path', tab);
    // Clear errors when switching tabs
    trigger();
  };

  const onSubmit = async (data: LeadFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || t('NetworkError'));
        setStatus('error');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setErrorMessage(t('NetworkError'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl text-center">
        <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">{t('ThankYou')}</h3>
        <p className="text-[var(--color-text-main)]">{t('SuccessMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />
      
      {/* Path Hidden Input */}
      <input type="hidden" {...register("path")} />

      {/* Dynamic Segmented Tab Selector */}
      <div className="border border-[var(--color-border-soft)] rounded-xl p-1 bg-[var(--color-bg-light)] flex flex-wrap gap-1">
        {(['general', 'sales', 'security', 'partnerships'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={`flex-1 min-w-[100px] text-center py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'bg-white text-[var(--color-primary-dark)] shadow-sm'
                : 'text-[var(--color-text-main)] hover:text-[var(--color-primary-dark)]'
            }`}
          >
            {tab === 'general' ? 'General' : tab === 'sales' ? 'Sales' : tab === 'security' ? 'Security' : 'Partners'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('FullName')}</label>
          <input id="fullName" {...register("fullName")} placeholder="John Doe" className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('WorkEmail')}</label>
          <input id="email" type="email" {...register("email")} placeholder="john@company.com" className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('Company')}</label>
          <input id="company" {...register("company")} placeholder="Enterprise Inc." className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm" />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('Role')}</label>
          <input id="role" {...register("role")} placeholder="Infrastructure Architect" className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm" />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        {/* Dynamic Fields for Sales Path */}
        {activeTab === 'sales' && (
          <>
            <div className="md:col-span-2">
              <label htmlFor="website" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('Website')} (Optional)</label>
              <input id="website" {...register("website")} placeholder="https://company.com" className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm" />
            </div>
            <div>
              <label htmlFor="projectType" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('ProjectType')} *</label>
              <select id="projectType" {...register("projectType", { required: activeTab === 'sales' })} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm cursor-pointer">
                <option value="">{t('SelectOption')}</option>
                <option value="AI Automation">AI Automation</option>
                <option value="SaaS Development">SaaS Development</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Other">Other</option>
              </select>
              {errors.projectType && <p className="text-red-500 text-xs mt-1">Project type is required</p>}
            </div>
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Budget Range *</label>
              <select id="budgetRange" {...register("budgetRange", { required: activeTab === 'sales' })} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm cursor-pointer">
                <option value="">{t('SelectOption')}</option>
                <option value="$10k–$30k">$10k–$30k (₹8L–₹25L)</option>
                <option value="$30k–$80k">$30k–$80k (₹25L–₹66L)</option>
                <option value="$80k–$200k">$80k–$200k (₹66L–₹1.6Cr)</option>
                <option value="$200k+">$200k+ (₹1.6Cr+)</option>
              </select>
              {errors.budgetRange && <p className="text-red-500 text-xs mt-1">Budget range is required</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="timeline" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">{t('Timeline')} *</label>
              <select id="timeline" {...register("timeline", { required: activeTab === 'sales' })} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm cursor-pointer">
                <option value="">{t('SelectOption')}</option>
                <option value="ASAP">ASAP</option>
                <option value="1-3 Months">1-3 Months</option>
                <option value="3+ Months">3+ Months</option>
              </select>
              {errors.timeline && <p className="text-red-500 text-xs mt-1">Timeline is required</p>}
            </div>
          </>
        )}

        {/* Dynamic Fields for Security Path */}
        {activeTab === 'security' && (
          <div className="md:col-span-2">
            <label htmlFor="vulnerabilityDesc" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Vulnerability Details *</label>
            <textarea id="vulnerabilityDesc" {...register("vulnerabilityDesc", { required: activeTab === 'security' })} rows={3} placeholder="Please describe the endpoint, impact, and dynamic payloads..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm"></textarea>
            {errors.vulnerabilityDesc && <p className="text-red-500 text-xs mt-1">Vulnerability details are required</p>}
          </div>
        )}

        {/* Message Input */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-primary-dark)] mb-2">
            {activeTab === 'sales' 
              ? 'Project Summary & Technical Requirements' 
              : activeTab === 'security' 
                ? 'Steps to Reproduce / Remediation' 
                : activeTab === 'partnerships' 
                  ? 'Partnership Details' 
                  : t('Message')}
          </label>
          <textarea id="message" {...register("message")} rows={4} placeholder={activeTab === 'sales' ? "Provide details about your tech stack, databases, integrations..." : "Please describe your request..."} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm"></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        
        {/* Consent Checkbox */}
        <div className="md:col-span-2 flex items-start gap-3 mt-2">
          <input type="checkbox" {...register("consent")} className="mt-1 cursor-pointer" id="consent" />
          <label htmlFor="consent" className="text-sm text-[var(--color-text-main)] cursor-pointer">
            {t('Consent')}
          </label>
        </div>
        {errors.consent && <p className="md:col-span-2 text-red-500 text-xs -mt-4">{errors.consent.message}</p>}
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm mb-4">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center sm:items-start w-full md:w-auto">
        <Button type="submit" disabled={status === 'loading'} className="w-full md:w-auto">
          {status === 'loading' ? t('Submitting') : 'Submit Inquiry →'}
        </Button>
        <p className="text-[10px] text-[var(--color-text-main)] opacity-60 mt-2 font-medium">
          Typically responds in 1 hour
        </p>
      </div>
    </form>
  );
};
