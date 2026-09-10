import React from 'react';
import { Metadata } from 'next';
import { ManufacturingLab } from '@/components/manufacturing/ManufacturingLab';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Manufacturing AI & Telemetry Lab | Qeltrava AI',
  description: 'Interactive OEE calculator, synthetic machine sensor telemetry simulator, defect inspection datasets, and quality analytics tools.',
  keywords: ["OEE Calculator", "Machine Telemetry Simulator", "Manufacturing AI", "Industrial Telemetry Data", "Quality Intelligence"],
  openGraph: {
    title: 'Manufacturing AI & Telemetry Lab | Qeltrava AI',
    description: 'Turn plant operational data into better engineering decisions with interactive manufacturing tools.',
    type: 'website',
  },
};

export default function ManufacturingLabPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>MANUFACTURING INTELLIGENCE & TELEMETRY LAB</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Engineering AI for <span className="font-serif italic font-normal text-[#2196F3]">Plant Operations</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Calculate OEE metrics, generate synthetic sensor telemetry logs, and export machine datasets for quality and predictive maintenance models.
            </p>
          </div>
        </Reveal>

        {/* Manufacturing Lab Interactive Suite */}
        <Reveal delay={0.1} direction="up">
          <ManufacturingLab />
        </Reveal>
      </div>
    </main>
  );
}
