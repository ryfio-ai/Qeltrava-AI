import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function GovernmentPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Public Sector & Government</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed mb-12">
            Qeltrava AI partners with public sector organizations to modernize legacy systems, implement secure AI automation, and improve citizen services while maintaining strict compliance.
          </p>

          <div className="space-y-12 text-[var(--color-text-main)]">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Secure by Design</h2>
              <p>
                We understand the unique constraints of government procurement and deployment. Our AI-native systems are built from day one to support air-gapped deployments, sovereign cloud infrastructure (e.g., AWS GovCloud), and strict Role-Based Access Control (RBAC).
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-[var(--color-bg-light)] p-6 rounded-lg">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">Accessibility Conformance</h3>
                <p className="text-sm">We engineer interfaces that meet strict Section 508 and WCAG 2.1 AA standards, ensuring public-facing services are accessible to all citizens.</p>
              </div>
              <div className="bg-[var(--color-bg-light)] p-6 rounded-lg">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">Data Sovereignty</h3>
                <p className="text-sm">We provide flexible deployment models, keeping your sensitive constituent data within your regional borders and under your complete control.</p>
              </div>
            </section>
            
            <section className="p-8 border border-[var(--color-border-soft)] rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Procurement Information</h2>
              <p className="mb-4">To request our Capability Statement or discuss specific procurement vehicles, please contact our public sector liaison team.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-[var(--color-primary-dark)] text-white font-medium rounded-md hover:bg-opacity-90 transition">Contact Public Sector Team</a>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
