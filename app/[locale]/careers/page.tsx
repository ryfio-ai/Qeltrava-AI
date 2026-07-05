import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { Briefcase, Award, Zap, Shield, Search, MapPin, Clock, DollarSign } from 'lucide-react';
import { db } from '@/platform/shared/database/db';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Careers & Open Roles | ' + siteConfig.companyName,
  description: 'Join Qeltrava AI to design, build, and scale the next generation of intelligent software systems.',
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    c?: string;
  }>;
}

export default async function CareersPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const c = resolvedParams.c || 'All';

  // Fetch open jobs from central DB
  const rawJobs = await db.jobs.list('ws-qeltrava-ai');
  const activeJobs = rawJobs.filter(job => {
    if (job.status !== 'Published') return false;
    
    const matchesQuery = q === '' || 
      job.title.toLowerCase().includes(q.toLowerCase()) || 
      job.description.toLowerCase().includes(q.toLowerCase());
      
    const matchesCategory = c === 'All' || (() => {
      const cat = c.toLowerCase();
      const dept = job.department.toLowerCase();
      if (cat === 'engineering') {
        return ['engineering', 'artificial intelligence', 'quality assurance', 'cloud engineering', 'data', 'security'].includes(dept);
      }
      if (cat === 'design') {
        return dept === 'design';
      }
      if (cat === 'growth & marketing') {
        return ['growth & marketing', 'developer relations'].includes(dept);
      }
      if (cat === 'operations') {
        return dept === 'operations';
      }
      return dept === cat;
    })();
      
    return matchesQuery && matchesCategory;
  });

  const categories = ['All', 'Engineering', 'Design', 'Operations', 'Growth & Marketing'];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Build the Foundation</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              We are looking for builders, systems thinkers, and engineers who care deeply about code quality, mathematical precision, and absolute user value.
            </p>
          </div>
        </FadeIn>

        {/* Culture & Values */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4 text-center">Engineering Culture</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Zero Hype</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  We don't chase trendy buzzwords. We build robust, reliable systems backed by mathematical proofs and solid software architecture.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Rigorous Standards</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  Our codebase is peer-reviewed, heavily tested, and documented. We believe engineering rigor is the only way to scale systems.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Security-First</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  Compliance and role-based access are core properties of our design system, not final checklists.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Dynamic Jobs Filter and Loop */}
        <section className="space-y-8">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Active Openings</h2>
          </FadeIn>

          {/* Filters Row */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <form method="GET" action="/careers" className="flex items-center gap-2 w-full md:max-w-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={q} 
                  placeholder="Search open positions..." 
                  className="bg-transparent focus:outline-none w-full text-slate-800" 
                />
                {c !== 'All' && <input type="hidden" name="c" value={c} />}
              </form>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    href={`/careers?c=${cat}${q ? `&q=${q}` : ''}`}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all ${
                      c === cat 
                        ? 'bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)] shadow-sm' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Job Loop Cards */}
          <div className="space-y-6">
            {activeJobs.map((job, idx) => {
              const getDeptPillStyles = (dept: string) => {
                switch (dept.toLowerCase()) {
                  case 'engineering':
                    return 'bg-amber-50 text-amber-600 border-amber-100/60';
                  case 'artificial intelligence':
                    return 'bg-rose-50 text-rose-650 border-rose-100/60';
                  case 'design':
                    return 'bg-purple-50 text-purple-650 border-purple-100/60';
                  case 'quality assurance':
                    return 'bg-orange-50 text-orange-655 border-orange-100/60';
                  case 'cloud engineering':
                    return 'bg-sky-50 text-sky-650 border-sky-100/60';
                  case 'data':
                    return 'bg-teal-50 text-teal-650 border-teal-100/60';
                  case 'security':
                    return 'bg-red-50 text-red-650 border-red-100/60';
                  case 'developer relations':
                    return 'bg-indigo-50 text-indigo-650 border-indigo-100/60';
                  case 'operations':
                    return 'bg-emerald-50 text-emerald-650 border-emerald-100/60';
                  case 'growth & marketing':
                    return 'bg-blue-50 text-blue-650 border-blue-100/60';
                  default:
                    return 'bg-slate-50 text-slate-655 border-slate-200/60';
                }
              };

              return (
                <FadeIn key={job.id} delay={idx * 0.05}>
                  <Link 
                    href={`/careers/${job.slug}`}
                    className="block p-7 bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300 hover:border-slate-200/80 group"
                  >
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getDeptPillStyles(job.department)}`}>
                          {job.department}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-extrabold text-[var(--color-primary-dark)] group-hover:text-[var(--color-accent)] transition-colors tracking-tight">
                        {job.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                        {job.description}
                      </p>
                      
                      <div className="flex justify-between items-center mt-3 pt-4 border-t border-slate-100/50">
                        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-450 font-semibold">
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-350" /> {job.employment_type}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-350" /> {job.location}</span>
                          <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-350" /> {job.salary || 'NA'}</span>
                        </div>
                        <span className="text-xs font-bold text-indigo-650 group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
                          View job <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}

            {activeJobs.length === 0 && (
              <FadeIn delay={0.1}>
                <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-8 text-center">
                  <h3 className="text-sm font-bold text-[var(--color-primary-dark)] mb-3">No Active Openings</h3>
                  <p className="text-xs text-[var(--color-text-main)] max-w-lg mx-auto leading-relaxed">
                    We don't have any open roles matching your search criteria. Check back soon or submit a speculative application below.
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Speculative CTA */}
        <FadeIn direction="up">
          <div className="p-8 md:p-12 bg-[var(--color-primary-dark)] text-white rounded-2xl text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Submit a Speculative Application</h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
              We constantly hire senior specialists for modular consulting contracts and long-term project support. Get in touch with our team.
            </p>
            <Button href="mailto:hello@qeltrava.ai?subject=Speculative%20Application%20-%20General" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent">
              Submit Speculative Application
            </Button>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
