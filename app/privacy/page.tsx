import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Privacy Policy</h1>
            <p className="text-xl text-[var(--color-text-main)] mb-10">Last Updated: October 2024</p>
            
            <div className="prose prose-lg text-[var(--color-text-main)]">
              <p className="font-bold text-red-600 mb-8 p-4 border border-red-200 bg-red-50 rounded-lg">
                NOTE: This is standard boilerplate text for pre-launch purposes. It must be reviewed by legal counsel before processing European (GDPR) or California (CCPA) citizen data.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-6">
                We collect information that you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us. This may include your name, email address, company name, phone number, and any other information you choose to provide.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-6">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Process and complete transactions, and send related information.</li>
                <li>Respond to your comments, questions, and requests.</li>
                <li>Communicate with you about services, technical notices, and administrative messages.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">3. Data Security and AI Processing</h2>
              <p className="mb-6">
                Qeltrava AI implements enterprise-grade security measures to protect your personal information. As an AI-native company, we do not use your proprietary business data or personal information to train public AI models without explicit, opt-in consent. 
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">4. Analytics and Tracking</h2>
              <p className="mb-6">
                We use privacy-respecting analytics tools to understand how visitors interact with our website. These tools do not track you across other websites or sell your data to third parties.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mt-8 mb-4">5. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us via our official support channels or the contact form on this website.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
