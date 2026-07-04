import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { AISolutionArchitect } from '@/components/ui/AISolutionArchitect';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: `AI Solution Architect | Design Your System | ${siteConfig.companyName}`,
  description: 'Interactively design your AI solution. Select the components you need and instantly see your system architecture, technology stack, team composition, and cost estimate.',
};

export default function AISolutionArchitectPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-light)]">

      {/* Hero */}
      <section className="pt-20 pb-16 bg-[var(--color-primary-dark)] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 40%)',
          }}
        />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full text-[var(--color-accent)] text-xs font-bold font-mono uppercase tracking-wider mb-6">
              ⚡ Interactive Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
              AI Solution Architect
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-3">
              Design your system in real time. Select the components your product needs — your architecture, tech stack, team, and cost estimate generate instantly.
            </p>
            <p className="text-sm text-white/40 max-w-xl mx-auto">
              Used by CTOs and founders to scope projects before their first call with our team.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tool */}
      <section className="py-12 px-6 md:px-12">
        <FadeIn direction="up">
          <AISolutionArchitect />
        </FadeIn>
      </section>

      {/* How It Becomes Real */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-[var(--color-border-soft)]">
        <div className="max-w-5xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">How We Turn This Into Reality</span>
              <h2 className="text-3xl font-bold text-[var(--color-primary-dark)]">From your design to production</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Architecture Workshop',
                desc: 'We review your selections, ask the right engineering questions, and validate the architecture against your scale and compliance requirements.',
                duration: '1–2 weeks',
                color: '#6366f1',
              },
              {
                step: '02',
                title: 'Sprint-Based Build',
                desc: 'Engineering pods build in 2-week sprints. Every sprint ends with a working demo — not a status update.',
                duration: '4–16 weeks',
                color: '#3b82f6',
              },
              {
                step: '03',
                title: 'Production Deployment',
                desc: 'Blue-green deployment, infrastructure-as-code, runbooks, and a 30-day hypercare window with the build team.',
                duration: '1–2 weeks',
                color: '#10b981',
              },
            ].map(item => (
              <FadeIn key={item.step} direction="up">
                <div className="p-7 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl relative overflow-hidden">
                  <div className="text-5xl font-black text-gray-100 absolute -top-2 -right-2 select-none pointer-events-none font-mono">{item.step}</div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold mb-4"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-xs font-semibold font-mono text-gray-400">⏱ {item.duration}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-[var(--color-primary-dark)]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to build your solution?</h2>
            <p className="text-lg text-white/70 mb-8">
              Book a 30-minute Architecture Workshop. Bring your component selection — we&apos;ll validate the approach and scope an accurate proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/book-consultation" variant="primary" className="text-base px-8 py-4">
                Book Architecture Workshop
              </Button>
              <Button href="/case-studies" variant="outline" className="text-base px-8 py-4 border-white/20 text-white hover:bg-white/10">
                See What We&apos;ve Built
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
