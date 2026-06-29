"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/site-config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6 text-center">
        <FadeIn>
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600 font-bold text-2xl">
            !
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">System Interruption</h1>
          <p className="text-[var(--color-text-main)] mb-8">
            An unexpected error occurred within the application layer. The {siteConfig.companyName} engineering team has been notified.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => reset()} variant="primary" className="w-full">
              Attempt Recovery
            </Button>
            <Button href="/" variant="outline" className="w-full">
              Return to System Root
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
