import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Press & Media | ' + siteConfig.companyName,
  description: 'Press releases, media kits, and brand assets for Qeltrava AI.',
};

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">Press & Media</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Press Kit & Brand Assets</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
            Everything you need to write about Qeltrava AI. For press inquiries, please contact us at <a href="mailto:press@qeltrava.ai" className="text-[var(--color-accent)] hover:underline">press@qeltrava.ai</a>.
          </p>
        </div>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Brand Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl">
              <h3 className="font-bold text-[var(--color-primary-dark)] mb-4">Logos</h3>
              <p className="text-sm text-[var(--color-text-main)] mb-6">High-resolution brand logos in PNG and SVG formats.</p>
              <button className="text-sm font-semibold text-[var(--color-accent)] hover:underline">Download Logo Pack (.zip)</button>
            </div>
            <div className="p-8 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl">
              <h3 className="font-bold text-[var(--color-primary-dark)] mb-4">Executive Headshots</h3>
              <p className="text-sm text-[var(--color-text-main)] mb-6">High-resolution photos of our founding team.</p>
              <button className="text-sm font-semibold text-[var(--color-accent)] hover:underline">Download Photos (.zip)</button>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Company Fact Sheet</h2>
          <div className="prose max-w-none text-[var(--color-text-main)]">
            <ul className="space-y-2">
              <li><strong>Founded:</strong> 2026</li>
              <li><strong>Headquarters:</strong> Coimbatore, Tamil Nadu, India</li>
              <li><strong>Founders:</strong> Four engineering graduates from PSG College of Technology</li>
              <li><strong>Mission:</strong> To build secure, scalable, AI-native software systems that deliver measurable operational ROI.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
