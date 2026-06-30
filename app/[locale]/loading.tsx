"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-[70vh] w-full flex items-center justify-center bg-[var(--color-bg-white)]">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-2 border-[var(--color-accent)] rounded-sm"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-[var(--color-primary-dark)] rounded-sm"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm font-medium text-[var(--color-text-main)] tracking-widest uppercase">
          Initializing
        </p>
      </div>
    </main>
  );
}
