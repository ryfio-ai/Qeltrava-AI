"use client";

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function BuilderDisclaimer() {
  return (
    <div className="flex items-center gap-2 pt-3 text-[11px] font-mono text-slate-500 border-t border-slate-900 select-none">
      <ShieldAlert className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
      <span>AI-assisted preliminary engineering assessment. Validate with a Qeltrava engineer before implementation.</span>
    </div>
  );
}
