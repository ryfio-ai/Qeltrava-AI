import React from 'react';
import { LeadForm } from '@/components/LeadForm';
import { siteConfig } from '@/lib/site-config';
import { Metadata } from 'next';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: `Contact Us | AI Software Development Consultation | ${siteConfig.companyName}`,
  description: "Get in touch with Qeltrava AI to discuss your software engineering, AI automation, or infrastructure needs. Book a free discovery call today.",
  keywords: ["Contact Qeltrava AI", "Hire AI developers", "Software engineering consultation", "AI automation agency contact", "Custom software consultation"],
  openGraph: {
    title: 'Contact Us | AI Software Development Consultation',
    description: "Get in touch with Qeltrava AI to discuss your software engineering, AI automation, or infrastructure needs.",
    type: 'website',
  },
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
                {/* WhatsApp Primary CTA */}
                <div>
                  <a 
                    href="https://wa.me/919629463964?text=Hi%20Qeltrava%20AI%2C%20I%27d%20like%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-lg shadow-md transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp →
                  </a>
                  <p className="text-center text-xs text-[var(--color-text-main)] mt-3">Typically replies within 2 hours, business days.</p>
                </div>
                
                <hr className="border-[var(--color-border-soft)]" />
                
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
                      Coimbatore, Tamil Nadu, India<br />
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
            <div className="mb-6 bg-[var(--color-bg-light)] p-4 rounded-xl border border-[var(--color-border-soft)] text-sm text-[var(--color-text-main)] leading-relaxed">
              We respond to all inquiries within 1 business day.<br />
              <strong>Business hours (Mon–Fri):</strong> 9:00 AM – 6:00 PM IST | 11:30 PM – 8:30 AM EST | 4:30 AM – 1:30 PM BST<br />
              <strong>Emergency support for active clients:</strong> WhatsApp +91 96294 63964
            </div>
            <LeadForm />
          </div>

        </div>

      </div>
    </main>
  );
}
