import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Accessibility Statement</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed mb-12">
            Qeltrava AI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>

          <div className="space-y-8 text-[var(--color-text-main)]">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Qeltrava AI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard, though we are actively working to resolve these gaps.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Technical Specifications</h2>
              <p className="mb-2">Accessibility of Qeltrava AI relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>HTML</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of Qeltrava AI. Please let us know if you encounter accessibility barriers:
                <br /><br />
                E-mail: <a href="mailto:accessibility@qeltrava.ai" className="text-[var(--color-accent)] hover:underline">accessibility@qeltrava.ai</a>
              </p>
              <p className="mt-4">We try to respond to feedback within 2 business days.</p>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
