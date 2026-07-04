"use client";

import React, { useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Link } from '@/src/routing';
import { insightsArticles } from '@/lib/insights-data';

export const InsightsClient = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'AI Engineering', 'Enterprise Architecture', 'Product & Delivery'];

  const filteredArticles = insightsArticles.filter(
    art => activeCategory === 'All' || art.category === activeCategory
  );

  const featuredArticle = insightsArticles[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-16">
      <FadeIn>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">Insights</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-2xl">
            Engineering intelligence, technical deep-dives, and original research from the Qeltrava AI team.
          </p>
        </div>
      </FadeIn>

      {/* Featured Article */}
      <FadeIn delay={0.1}>
        <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-xs text-[var(--color-text-main)] opacity-70">
                  {featuredArticle.date} • {featuredArticle.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-4 hover:text-[var(--color-accent)] transition-colors">
                <Link href={`/insights/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="text-sm text-[var(--color-text-main)] mb-6 leading-relaxed">
                {featuredArticle.summary}
              </p>
            </div>
            <Link href={`/insights/${featuredArticle.slug}`} className="text-sm font-bold text-[var(--color-accent)] hover:underline flex items-center gap-2">
              Read Full Article <span>→</span>
            </Link>
          </div>
          <div className="lg:col-span-5 bg-[var(--color-primary-dark)] p-8 flex items-center justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="z-10 text-center text-white p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
              <span className="font-mono text-sm block mb-2 text-white/50">&lt;qeltrava-architecture&gt;</span>
              <span className="font-mono text-xs text-[var(--color-accent)] font-bold">AI_NATIVE_BOUNDARIES = true</span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Filter and Grid */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-2 border-b border-[var(--color-border-soft)] pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary-dark)] text-white'
                  : 'bg-[var(--color-bg-light)] text-[var(--color-text-main)] hover:bg-[var(--color-border-soft)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map(art => (
            <FadeIn key={art.slug} delay={0.1}>
              <article className="bg-white border border-[var(--color-border-soft)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-accent)] uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-main)] opacity-70">
                      {art.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mb-3 hover:text-[var(--color-accent)] transition-colors">
                    <Link href={`/insights/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[var(--color-text-main)] leading-relaxed mb-6">
                    {art.summary.substring(0, 180)}...
                  </p>
                </div>
                <Link href={`/insights/${art.slug}`} className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1.5 mt-auto">
                  Read Article <span>→</span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>


      {/* Newsletter Signup */}
      <FadeIn direction="up">
        <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto w-full relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(circle, var(--color-accent) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Subscribe to our newsletter</h3>
          <p className="text-sm text-[var(--color-text-main)] mb-6 max-w-md mx-auto">
            Monthly: original research, architecture deep-dives, and technical tutorials from our engineering team.
          </p>
          {subscribed ? (
            <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 py-3 px-6 rounded-xl max-w-md mx-auto">
              ✔ Thanks for subscribing! You will receive our next update.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full border border-[var(--color-border-soft)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              />
              <button type="submit" className="bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/90 text-white font-medium text-sm py-3 px-6 rounded-full transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </FadeIn>

      {/* Bottom CTA */}
      <FadeIn direction="up">
        <div className="p-10 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to transform your workflow?</h3>
            <p className="text-white/80">Schedule an AI Opportunity Audit to diagnose your business bottlenecks.</p>
          </div>
          <Button href="/book-consultation" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent whitespace-nowrap">
            Book an AI Strategy Call
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};
