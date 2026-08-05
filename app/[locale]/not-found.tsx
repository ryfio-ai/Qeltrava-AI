"use client";

import React from 'react';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="max-w-md w-full px-6 text-center relative z-10">
        <FadeIn>
          <h1 className="text-9xl font-bold text-[var(--color-accent)] opacity-10 mb-2 font-mono select-none">404</h1>
          <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">Path Not Found</h2>
          <p className="text-[var(--color-text-main)] mb-8 text-base leading-relaxed">
            The requested node does not exist within the current system architecture.
          </p>
          <div className="flex flex-col gap-3">
            <Button href="/" variant="primary" className="w-full text-base py-3">
              Return to Root Directory
            </Button>
            <Button href="/book-consultation" variant="outline" className="w-full text-base py-3">
              Book an AI Strategy Call
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
