import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Terms of Service</h1>
            <p className="text-xl text-[var(--color-text-main)] mb-10">Last Updated: October 2024</p>
            
            <div className="prose prose-lg text-[var(--color-text-main)]">
              <p className="font-bold text-red-600 mb-8 p-4 border border-red-200 bg-red-50 rounded-lg">
                NOTE: This is standard boilerplate text for pre-launch purposes. It must be reviewed by legal counsel before executing enterprise contracts or processing client data.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing and using the services provided by Qeltrava AI ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">2. Description of Services</h2>
              <p className="mb-6">
                Qeltrava AI provides enterprise software engineering, AI automation, cloud infrastructure, and consulting services. The specific scope, deliverables, and timelines for any engagement will be governed by a separate Master Services Agreement (MSA) and Statement of Work (SOW).
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">3. Intellectual Property</h2>
              <p className="mb-6">
                Unless otherwise explicitly stated in an MSA, all methodologies, frameworks, and foundational code (including the Qeltrava Delivery OS) remain the exclusive intellectual property of Qeltrava AI. Client-specific deliverables and custom intellectual property generated during an engagement will be transferred to the client upon full payment, subject to the terms of the MSA.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">4. Limitation of Liability</h2>
              <p className="mb-6">
                To the maximum extent permitted by applicable law, Qeltrava AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">5. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Qeltrava AI is registered, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
