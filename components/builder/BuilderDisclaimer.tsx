"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function BuilderDisclaimer() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#64748B]">
      <ShieldCheck className="w-4 h-4 text-[#2196F3] shrink-0" />
      <span>AI-assisted preliminary engineering assessment. Validate with a Qeltrava engineer before implementation.</span>
    </div>
  );
}
