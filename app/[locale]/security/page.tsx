import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Security & Trust</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed mb-12">
            At Qeltrava AI, we engineer platforms for enterprise and government organizations. Security is foundational to our delivery process, not an afterthought.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Certifications & Compliance</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 bg-[var(--color-bg-light)] rounded-lg">
                  <span className="font-semibold text-[var(--color-text-main)]">SOC 2 Type II</span>
                  <span className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">In Progress (Target Q3 2026)</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-[var(--color-bg-light)] rounded-lg">
                  <span className="font-semibold text-[var(--color-text-main)]">ISO 27001</span>
                  <span className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">In Progress (Target Q4 2026)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Infrastructure & Data Residency</h2>
              <p className="text-[var(--color-text-main)] mb-4">
                We deploy exclusively to top-tier cloud providers (AWS, Google Cloud, Azure, and Vercel). By default, client data is hosted in the US (us-east-1). However, our deployment architecture fully supports regional isolation for EU (Frankfurt) or specific local jurisdictions to comply with strict data residency requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Vulnerability Disclosure</h2>
              <p className="text-[var(--color-text-main)] mb-4">
                We take security reports seriously. If you have discovered a vulnerability in a Qeltrava AI system, please contact us immediately at <a href="mailto:security@qeltrava.ai" className="text-[var(--color-accent)] hover:underline">security@qeltrava.ai</a>. We will respond within 24 hours.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
