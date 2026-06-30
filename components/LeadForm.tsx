"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, LeadFormValues } from '@/lib/validators';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

export const LeadForm = () => {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const t = useTranslations('LeadForm');

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { consent: false, honeypot: '' }
  });

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">{t('FullName')}</label>
          <input id="fullName" {...register("fullName")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">{t('WorkEmail')}</label>
          <input id="email" type="email" {...register("email")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">{t('Company')}</label>
          <input id="company" {...register("company")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">{t('Role')}</label>
          <input id="role" {...register("role")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="website" className="block text-sm font-medium mb-2">{t('Website')}</label>
          <input id="website" {...register("website")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium mb-2">{t('ProjectType')}</label>
          <select id="projectType" {...register("projectType")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            <option value="">{t('SelectOption')}</option>
            <option value="AI Automation">AI Automation</option>
            <option value="SaaS Development">SaaS Development</option>
            <option value="Cloud Migration">Cloud Migration</option>
            <option value="Other">Other</option>
          </select>
          {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium mb-2">{t('Timeline')}</label>
          <select id="timeline" {...register("timeline")} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            <option value="">{t('SelectOption')}</option>
            <option value="ASAP">ASAP</option>
            <option value="1-3 Months">1-3 Months</option>
            <option value="3+ Months">3+ Months</option>
          </select>
          {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-2">{t('Message')}</label>
          <textarea id="message" {...register("message")} rows={4} className="w-full p-3 border border-[var(--color-border-soft)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        
        <div className="md:col-span-2 flex items-start gap-3 mt-2">
          <input type="checkbox" {...register("consent")} className="mt-1" id="consent" />
          <label htmlFor="consent" className="text-sm text-[var(--color-text-main)]">
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

      <Button type="submit" disabled={status === 'loading'} className="w-full md:w-auto">
        {status === 'loading' ? t('Submitting') : t('Submit')}
      </Button>
    </form>
  );
};
