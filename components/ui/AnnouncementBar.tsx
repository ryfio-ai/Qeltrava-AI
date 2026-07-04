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
      className="w-full h-9 relative z-[60] flex items-center justify-center px-4 select-none"
      style={{ background: 'var(--color-accent)' }}
      role="banner"
      aria-live="polite"
    >
      <a
        href="/en/solutions/ai-operations-automation"
        className="text-white text-[13px] font-semibold text-center hover:underline truncate"
      >
        New: AI Operations Automation Solution for mid-market enterprises. →
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
