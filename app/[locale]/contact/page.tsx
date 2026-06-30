import React from 'react';
import { LeadForm } from '@/components/LeadForm';
import { siteConfig } from '@/lib/site-config';
import { Metadata } from 'next';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.companyName}`,
  description: "Get in touch with Qeltrava AI to discuss your software engineering, AI automation, or infrastructure needs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">Start a Conversation</h1>
          <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
            Have a process, platform, or product that needs AI-native engineering? Get in touch with us to schedule a strategic review of your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact & Entity Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-[var(--color-border-soft)] p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">Direct Channels</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                    <Mail className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">General Inquiries</h4>
                    <a href="mailto:hello@qeltrava.ai" className="text-sm text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
                      hello@qeltrava.ai
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                    <Mail className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">Sales & Contracts</h4>
                    <a href="mailto:partners@qeltrava.ai" className="text-sm text-[var(--color-text-main)] hover:text-emerald-600 transition-colors">
                      partners@qeltrava.ai
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">Security & Trust</h4>
                    <a href="mailto:security@qeltrava.ai" className="text-sm text-[var(--color-text-main)] hover:text-blue-600 transition-colors">
                      security@qeltrava.ai
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-[var(--color-border-soft)] pt-6 mt-6">
                  <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                    <MapPin className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-dark)]">Corporate Office</h4>
                    <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                      Qeltrava Technologies Private Limited<br />
                      Bangalore, India<br />
                      <span className="text-gray-400 mt-1 block">Global / Remote-first operations</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[var(--color-border-soft)] p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">Tell us about your project</h2>
            <LeadForm />
          </div>

        </div>

      </div>
    </main>
  );
}
