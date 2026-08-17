"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Copy, Check, MessageSquare, Star, Heart, ExternalLink, Code, Layers, UserCheck } from 'lucide-react';

export type ProductHuntTheme = 'light' | 'neutral' | 'dark';

export const MODLIQER_PH_URL = "https://www.producthunt.com/products/modliqer?launch=modliqer";
export const QELTRAVA_PH_PROFILE_URL = "https://www.producthunt.com/@qeltravaai";

interface DriveSupportBadgeProps {
  theme?: ProductHuntTheme;
  postSlug?: string;
  postId?: string;
  className?: string;
  variant?: 'official' | 'custom';
}

/**
 * Drive Support Badge Component (#drivesupport)
 * Standard Product Hunt website badge to drive community support & upvotes.
 */
export function ProductHuntDriveSupportBadge({
  theme = 'neutral',
  postSlug = 'modliqer',
  postId = 'modliqer',
  className = '',
  variant = 'official'
}: DriveSupportBadgeProps) {
  const [imageLoaded, setImageLoaded] = useState(true);

  const badgeImgUrl = `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=${theme}`;
  const targetUrl = MODLIQER_PH_URL;

  // If official variant with valid image
  if (variant === 'official' && imageLoaded) {
    return (
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block hover:opacity-95 transition-opacity select-none ${className}`}
        title="Modliqer - Featured on Product Hunt"
      >
        <img
          src={badgeImgUrl}
          alt="Modliqer - No-code ML & manufacturing analytics to analyze & optimize | Product Hunt"
          width={250}
          height={54}
          className="h-[54px] w-auto max-w-[250px] object-contain"
          onError={() => setImageLoaded(false)}
        />
      </a>
    );
  }

  // Custom styled fallback / variant
  const themeStyles = {
    light: 'bg-white text-slate-900 border-slate-200 hover:border-[#FF6154]/50 shadow-sm',
    neutral: 'bg-slate-900 text-white border-slate-800 hover:border-[#FF6154]/50 shadow-md',
    dark: 'bg-slate-950 text-white border-[#FF6154]/30 hover:border-[#FF6154]/60 shadow-lg shadow-orange-950/20'
  };

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-200 group select-none ${themeStyles[theme]} ${className}`}
      title="Modliqer - Featured on Product Hunt"
    >
      <div className="w-7 h-7 rounded-lg bg-[#FF6154] flex items-center justify-center font-bold text-white text-xs shadow-sm group-hover:scale-105 transition-transform">
        P
      </div>
      <div className="text-left">
        <div className="text-[9px] font-mono uppercase font-bold tracking-wider text-[#FF6154]">
          FEATURED ON
        </div>
        <div className="text-xs font-bold font-sans tracking-tight leading-none mt-0.5">
          Product Hunt
        </div>
      </div>
      <div className="ml-1 pl-2 border-l border-slate-200 dark:border-slate-800 flex items-center gap-1 text-[11px] font-mono font-bold text-[#FF6154]">
        <span>▲</span>
        <span>Upvote</span>
      </div>
    </a>
  );
}

/**
 * Social Proof Badge Component (#socialproof)
 * Validates product with rank, top product badges, or upvote counts.
 */
export function ProductHuntSocialProofBadge({
  postSlug = 'modliqer',
  period = 'daily',
  rank = 1,
  upvotes = 342,
  className = ''
}: {
  postSlug?: string;
  period?: 'daily' | 'weekly' | 'monthly';
  rank?: number;
  upvotes?: number;
  className?: string;
}) {
  const targetUrl = MODLIQER_PH_URL;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#FF6154]/15 via-amber-500/10 to-transparent border border-[#FF6154]/30 hover:border-[#FF6154]/60 rounded-full transition-all duration-200 group ${className}`}
    >
      <span className="w-5 h-5 rounded-full bg-[#FF6154] text-white flex items-center justify-center font-black text-[10px] shadow-sm group-hover:scale-110 transition-transform">
        ▲
      </span>
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-slate-900 dark:text-white font-mono">
          #{rank} Product of the Day
        </span>
        <span className="w-1 h-1 rounded-full bg-[#FF6154]" />
        <span className="font-mono text-[#FF6154] font-bold">
          {upvotes} upvotes
        </span>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6154] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}

/**
 * Post Embed Component (#embedpost)
 * Full detailed embed card of launch for landing pages, blog posts, and press.
 */
export function ProductHuntPostEmbed({
  postSlug = 'modliqer',
  title = 'Modliqer',
  tagline = 'No-code ML & manufacturing analytics to analyze & optimize',
  upvotes = 428,
  commentsCount = 56
}: {
  postSlug?: string;
  title?: string;
  tagline?: string;
  upvotes?: number;
  commentsCount?: number;
}) {
  const productUrl = MODLIQER_PH_URL;
  const profileUrl = QELTRAVA_PH_PROFILE_URL;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6154]/5 rounded-full blur-2xl group-hover:bg-[#FF6154]/10 transition-colors pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FF6154] text-white flex items-center justify-center font-bold text-sm shadow-md">
            P
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Product Hunt Launch
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#FF6154]/10 text-slate-600 dark:text-slate-300 hover:text-[#FF6154] border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold transition-colors"
          >
            <UserCheck className="w-3 h-3 text-[#FF6154]" /> @qeltravaai
          </a>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6154]/10 text-[#FF6154] border border-[#FF6154]/20 text-[11px] font-mono font-bold">
            ⚡ Featured Product
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-black text-xl flex items-center justify-center shadow-md">
              M
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h4>
              <p className="text-xs font-mono text-[#FF6154] font-semibold">
                modliqer.ai • No-Code ML Platform
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {tagline}
          </p>

          {/* Social Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono pt-1">
            <span className="flex items-center gap-1.5 font-bold text-[#FF6154] bg-[#FF6154]/10 px-2.5 py-1 rounded-lg">
              ▲ {upvotes} Upvotes
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              {commentsCount} Discussions
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              4.9/5 Rating
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF6154] hover:bg-[#e04f43] text-white font-bold text-sm transition-all shadow-lg shadow-[#FF6154]/20 hover:shadow-[#FF6154]/30 group-hover:scale-[1.02]"
          >
            <span>Check it out on Product Hunt</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-xs font-semibold text-slate-500 hover:text-[#FF6154] dark:text-slate-400 transition-colors py-1"
          >
            Follow @qeltravaai on Product Hunt →
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Reviews Embed Component
 * Showcases community feedback, user reviews, and star ratings.
 */
export function ProductHuntReviewsEmbed({
  postSlug = 'modliqer'
}: {
  postSlug?: string;
}) {
  const reviews = [
    {
      author: "Elena Rostova",
      role: "Lead Data Scientist",
      company: "Apex Industrial",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "Modliqer transformed our manufacturing analytics workflow. Being able to train and evaluate ML algorithms without building custom Python pipelines saved us months."
    },
    {
      author: "Marcus Chen",
      role: "VP of Operations",
      company: "Nexus Automation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "The visual dataset cleaner & automated feature selection on Modliqer allowed our non-technical engineers to build high-accuracy predictive maintenance models!"
    },
    {
      author: "Sarah Jenkins",
      role: "Product Strategist",
      company: "FactoryOS",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "Super impressed with Modliqer's Product Hunt launch! The one-click ONNX export & interactive endpoint deployment makes AI accessible for any team."
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#FF6154] tracking-wider">
              COMMUNITY REVIEWS
            </span>
            <span className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Loved by Product Hunt Makers & Builders
          </h3>
        </div>

        <a
          href={MODLIQER_PH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6154]/10 hover:bg-[#FF6154]/20 text-[#FF6154] border border-[#FF6154]/20 text-xs font-bold transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Leave a Review on Product Hunt →
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  VERIFIED REVIEW
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  {rev.author}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {rev.role} • {rev.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hero Announcement Pill Component
 * Designed for insertion into the top main landing hero section.
 */
export function ProductHuntHeroBanner({
  postSlug = 'modliqer'
}: {
  postSlug?: string;
}) {
  return (
    <a
      href={MODLIQER_PH_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF6154]/20 via-amber-500/15 to-[#FF6154]/20 border border-[#FF6154]/40 hover:border-[#FF6154] text-white transition-all duration-300 group shadow-lg shadow-[#FF6154]/10 cursor-pointer mb-6"
    >
      <span className="w-5 h-5 rounded-full bg-[#FF6154] text-white flex items-center justify-center font-black text-[10px] shadow-sm group-hover:rotate-12 transition-transform">
        P
      </span>
      <span className="text-xs font-bold tracking-tight text-white/90 group-hover:text-white font-sans">
        Modliqer is <span className="text-[#FF6154] font-extrabold underline decoration-[#FF6154]/50 underline-offset-2">LIVE on Product Hunt</span>!
      </span>
      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF6154]/30 text-orange-200 border border-[#FF6154]/30">
        Support Launch →
      </span>
    </a>
  );
}

/**
 * Embed Code Modal Component
 * Displays ready-to-copy HTML & iframe embed snippets for Light, Neutral, and Dark badges.
 */
export function ProductHuntEmbedCodeModal({
  postSlug = 'modliqer',
  isOpen,
  onClose
}: {
  postSlug?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState<'drivesupport' | 'socialproof' | 'embedpost'>('drivesupport');
  const [selectedTheme, setSelectedTheme] = useState<ProductHuntTheme>('neutral');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedCodes = {
    drivesupport: `<a href="${MODLIQER_PH_URL}" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postSlug}&theme=${selectedTheme}" alt="Modliqer - No-code ML & manufacturing analytics to analyze & optimize | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`,
    socialproof: `<a href="${MODLIQER_PH_URL}" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=${postSlug}&theme=${selectedTheme}&period=daily" alt="Modliqer - Top Product of the Day | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`,
    embedpost: `<iframe style="border: none;" src="https://cards.producthunt.com/cards/posts/${postSlug}?v=1" width="500" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCodes[selectedTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
        >
          ×
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6154] uppercase">
            <Code className="w-4 h-4" /> Embed Center
          </div>
          <h3 className="text-xl font-bold mt-1">Copy Product Hunt Embed Code for Modliqer</h3>
          <p className="text-xs text-slate-400 mt-1">
            Easily embed Modliqer badges, launch cards, or ranking indicators directly on your website or footer.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800">
          {[
            { id: 'drivesupport', label: '👏 Drive Support' },
            { id: 'socialproof', label: '✅ Social Proof' },
            { id: 'embedpost', label: '🔺 Post Embed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold font-mono transition-colors border-b-2 ${
                selectedTab === tab.id
                  ? 'border-[#FF6154] text-[#FF6154] bg-[#FF6154]/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Theme Selector (for drive support & social proof) */}
        {selectedTab !== 'embedpost' && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Theme:</span>
            {(['light', 'neutral', 'dark'] as ProductHuntTheme[]).map((thm) => (
              <button
                key={thm}
                onClick={() => setSelectedTheme(thm)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize border transition-all ${
                  selectedTheme === thm
                    ? 'bg-[#FF6154] text-white border-[#FF6154]'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {thm}
              </button>
            ))}
          </div>
        )}

        {/* Code Snippet Container */}
        <div className="relative">
          <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-orange-300 border border-slate-800 overflow-x-auto whitespace-pre-wrap break-all max-h-36">
            {embedCodes[selectedTab]}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#FF6154] hover:bg-[#e04f43] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400 font-mono">
          <span>Target Product: {MODLIQER_PH_URL}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
