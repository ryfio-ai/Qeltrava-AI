'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  jobTitle: string;
  slug: string;
  shareUrl: string;
  fullShareText: string;
  twitterShareText: string;
}

export function ShareButtons({ jobTitle, slug, shareUrl, fullShareText, twitterShareText }: ShareButtonsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText.replace(/\*/g, '')); // Strip bold markdown asterisks for plain text clipboard
      setCopiedDetails(true);
      alert('Full job details copied! Paste them in your Instagram DM, story, or bio.');
      setTimeout(() => setCopiedDetails(false), 2000);
    } catch (err) {
      console.error('Failed to copy details: ', err);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3.5 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-3 font-mono border-b border-slate-200/50 pb-2 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
        <span>Share this Role</span>
      </h3>
      
      <div className="flex flex-col gap-3">
        {/* Social Buttons row */}
        <div className="flex items-center gap-2.5">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-emerald-50 hover:bg-emerald-100 text-emerald-650 rounded-full flex items-center justify-center transition-all border border-emerald-100 hover:scale-105"
            title="Share Details on WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.49-3.238c1.657.982 3.284 1.498 4.884 1.499 5.485.004 9.954-4.451 9.957-9.923.001-2.652-1.03-5.144-2.905-7.018-1.874-1.874-4.368-2.907-7.025-2.908-5.488 0-9.956 4.453-9.96 9.926-.001 1.782.49 3.517 1.42 5.061l-.988 3.606 3.732-.979zm11.37-7.199c-.3-.149-1.777-.878-2.046-.976-.27-.099-.467-.149-.662.149-.195.299-.755.946-.926 1.144-.171.199-.343.224-.643.075-1.127-.566-1.972-1.034-2.736-2.346-.2-.349.2-.324.571-1.071.06-.12.03-.224-.014-.324-.045-.099-.467-1.125-.64-1.54-.167-.406-.35-.35-.467-.356-.12-.006-.258-.007-.395-.007-.137 0-.361.051-.55.258-.19.206-.723.707-.723 1.724 0 1.017.74 2.002.843 2.141.103.14 1.457 2.224 3.53 3.12.493.213.878.34 1.179.436.496.157.948.135 1.305.081.399-.06 1.777-.726 2.027-1.428.25-.701.25-1.301.175-1.428-.075-.127-.27-.224-.57-.374z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full flex items-center justify-center transition-all border border-blue-100 hover:scale-105"
            title="Share on LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-slate-900 hover:bg-black text-white rounded-full flex items-center justify-center transition-all hover:scale-105"
            title="Share on X (Twitter)"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram (Copy details helper) */}
          <button
            onClick={handleCopyDetails}
            className="w-9 h-9 bg-pink-50 hover:bg-pink-100 text-pink-650 rounded-full flex items-center justify-center transition-all border border-pink-100 hover:scale-105"
            title="Copy Details for Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </button>
        </div>

        {/* Copy normal URL link block */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-xs transition-colors group cursor-pointer"
        >
          <span className="font-medium text-slate-500 font-mono truncate max-w-[200px]">{shareUrl}</span>
          <span className="text-[10px] font-bold text-indigo-650 flex items-center gap-1">
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Copied!
              </>
            ) : (
              <>
                <LinkIcon className="w-3.5 h-3.5" /> Copy Link
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
