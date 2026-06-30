import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none text-[var(--color-text-main)]">
            <p>Last updated: June 2026</p>
            <p>This Cookie Policy explains how Qeltrava AI uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
            
            <h2>What are cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            
            <h2>Why do we use cookies?</h2>
            <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>

            <h3>Essential Cookies</h3>
            <p>These cookies are strictly necessary to provide you with services available through our Websites and to use some of its features, such as access to secure areas.</p>
            <ul>
              <li><strong>qeltrava_cookie_consent</strong>: Remembers your consent preference for analytics cookies. (Duration: 1 year)</li>
            </ul>

            <h3>Analytics & Performance Cookies</h3>
            <p>These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective our marketing campaigns are. <strong>We do not load these cookies until you explicitly consent via our cookie banner.</strong></p>

            <h2>How can I control cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager that appears when you first visit our site.</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
