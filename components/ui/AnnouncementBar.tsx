/* eslint-disable */
"use client";

import React, { useEffect, useState } from 'react';

// Dismissible announcement bar stored in sessionStorage
const STORAGE_KEY = 'qeltrava_announcement_dismissed';

export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="w-full h-9 relative z-[60] flex items-center justify-center px-4 select-none bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-[#0D47A1] border-b border-[#1E88E5]/30 shadow-xs"
      role="banner"
      aria-live="polite"
    >
      <a
        href="https://www.producthunt.com/products/modliqer?launch=modliqer"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-[13px] font-semibold text-center hover:underline truncate flex items-center gap-2"
      >
        <span className="bg-[#E3F2FD] text-[#0D47A1] px-1.5 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider shadow-2xs">
          PRODUCT HUNT
        </span>
        <span className="hover:text-[#90CAF9] transition-colors">🚀 Modliqer (No-Code ML & Manufacturing Analytics) is LIVE on Product Hunt! Check it out →</span>
      </a>
      <button
        onClick={dismiss}
        className="absolute right-4 text-white/70 hover:text-white text-lg leading-none focus:outline-none"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
};
