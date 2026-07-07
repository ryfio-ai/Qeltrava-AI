import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Link } from '@/src/routing';

export const ManufacturingCallout = () => {
  return (
    <section className="py-16 bg-white border-t border-[var(--color-border-soft)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-accent) 0%, transparent 50%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn direction="up">
          <div className="bg-[var(--color-primary-dark)] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
                Manufacturing Hub Focus
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Based in Coimbatore. Engineering for the World.
              </h3>
              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                As a team operating out of the Manchester of South India, we understand the operational realities of manufacturing, logistics, and supply chain enterprises. We build AI-native software that integrates seamlessly with your existing ERPs and floor-level systems.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link 
                href="/industries/manufacturing" 
                className="inline-flex items-center justify-center bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                View Manufacturing Solutions →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
