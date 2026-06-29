import React from 'react';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6 text-center">
        <FadeIn>
          <h1 className="text-8xl font-bold text-[var(--color-primary-dark)] opacity-20 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Path Not Found</h2>
          <p className="text-[var(--color-text-main)] mb-8">
            The requested node does not exist within the current architecture.
          </p>
          <Button href="/" variant="primary" className="w-full">
            Return to Root Directory
          </Button>
        </FadeIn>
      </div>
    </main>
  );
}
