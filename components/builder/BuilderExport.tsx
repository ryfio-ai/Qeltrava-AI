"use client";

import React, { useState } from 'react';
import { Copy, Download, Check, FileText } from 'lucide-react';

interface BuilderExportProps {
  data: any;
  filename?: string;
}

export function BuilderExport({ data, filename = "qeltrava-builder-report" }: BuilderExportProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    let mdContent = `# QELTRAVA BUILDER LAB REPORT\nDate: ${new Date().toISOString()}\n\n`;
    if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        mdContent += `## ${key.toUpperCase()}\n\`\`\`json\n${JSON.stringify(data[key], null, 2)}\n\`\`\`\n\n`;
      });
    } else {
      mdContent += data;
    }
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E8F0]">
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] hover:bg-[#E3F2FD] text-xs font-mono font-bold text-[#0D47A1] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2196F3]" />}
        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
      </button>

      <button
        onClick={handleDownloadJSON}
        className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] hover:bg-[#E3F2FD] text-xs font-mono font-bold text-[#0D47A1] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
      >
        <Download className="w-3.5 h-3.5 text-[#2196F3]" />
        <span>JSON</span>
      </button>

      <button
        onClick={handleDownloadMarkdown}
        className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] hover:bg-[#E3F2FD] text-xs font-mono font-bold text-[#0D47A1] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
      >
        <FileText className="w-3.5 h-3.5 text-[#2196F3]" />
        <span>Markdown</span>
      </button>
    </div>
  );
}
