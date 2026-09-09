"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function BuilderDisclaimer() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg text-xs font-sans text-[#6B7280]">
      <ShieldCheck className="w-4 h-4 text-[#2E75B6] shrink-0" />
      <span>AI-assisted preliminary engineering assessment. Validate with a Qeltrava engineer before implementation.</span>
    </div>
  );
}
