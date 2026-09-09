"use client";

import React from 'react';

export interface BuilderInputProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  helperText?: string;
  isTextArea?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
  name?: string;
  type?: string;
  required?: boolean;
}

export function BuilderInput({ 
  label, 
  value,
  onChange,
  placeholder,
  helperText, 
  isTextArea = false, 
  multiline = false, 
  rows = 3, 
  disabled = false,
  className = "", 
  name,
  type = "text",
  required = false
}: BuilderInputProps) {
  const useTextArea = isTextArea || multiline;
  const baseStyles = "w-full bg-[#FFFFFF] border border-[#CBD5E1] focus:border-[#2196F3] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/40 transition-all font-sans disabled:opacity-50 shadow-xs";

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0D47A1]">
        {label}
      </label>
      {useTextArea ? (
        <textarea 
          rows={rows} 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          required={required}
          className={`${baseStyles} ${className}`} 
        />
      ) : (
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          required={required}
          className={`${baseStyles} ${className}`} 
        />
      )}
      {helperText && (
        <p className="text-[11px] text-[#64748B] font-sans">{helperText}</p>
      )}
    </div>
  );
}
