"use client";

import React, { useState } from 'react';
import { Code2, Key, Search, Calculator, Check, Copy } from 'lucide-react';

export function DeveloperPlayground() {
  const [toolTab, setToolTab] = useState<'json' | 'jwt' | 'regex' | 'token-calc'>('json');

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{"name":"Qeltrava AI","type":"Manufacturing Intelligence","features":["OEE","Defects","Telemetries"]}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // JWT Decoder State
  const [jwtInput, setJwtInput] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlFlbHRyYXZhIEVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');

  // Token & Cost State
  const [inputPrompt, setInputPrompt] = useState('Analyze 500 rows of CNC machine vibration logs and report anomaly clusters.');
  const [selectedModel, setSelectedModel] = useState<'gpt-4o' | 'claude-3-5-sonnet' | 'gemini-1-5-pro' | 'groq-llama3'>('gpt-4o');

  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  const handleDecodeJwt = () => {
    try {
      const parts = jwtInput.split('.');
      if (parts.length !== 3) {
        setJwtHeader('Invalid JWT format (expected 3 dot-separated parts)');
        setJwtPayload('');
        return;
      }
      const headerObj = JSON.parse(atob(parts[0]));
      const payloadObj = JSON.parse(atob(parts[1]));
      setJwtHeader(JSON.stringify(headerObj, null, 2));
      setJwtPayload(JSON.stringify(payloadObj, null, 2));
    } catch (err: any) {
      setJwtHeader('Error decoding JWT token payload.');
      setJwtPayload('');
    }
  };

  // Model Pricing calculation (est per 1M tokens)
  const getModelPricing = () => {
    switch (selectedModel) {
      case 'gpt-4o':
        return { name: 'OpenAI GPT-4o', inputPerM: 2.5, outputPerM: 10.0 };
      case 'claude-3-5-sonnet':
        return { name: 'Anthropic Claude 3.5 Sonnet', inputPerM: 3.0, outputPerM: 15.0 };
      case 'gemini-1-5-pro':
        return { name: 'Google Gemini 1.5 Pro', inputPerM: 1.25, outputPerM: 5.0 };
      case 'groq-llama3':
        return { name: 'Groq Llama 3 70B', inputPerM: 0.59, outputPerM: 0.79 };
    }
  };

  const estimatedTokens = Math.max(1, Math.ceil(inputPrompt.length / 4));
  const pricing = getModelPricing();
  const estimatedCostUsd = ((estimatedTokens / 1000000) * pricing.inputPerM).toFixed(6);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-3xl mx-auto shadow-xs">
        <button
          onClick={() => {
            setToolTab('json');
            handleFormatJson();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            toolTab === 'json' ? 'bg-[#2196F3] text-white shadow-xs' : 'text-[#475569] hover:text-[#0D47A1]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>JSON Formatter</span>
        </button>
        <button
          onClick={() => {
            setToolTab('jwt');
            handleDecodeJwt();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            toolTab === 'jwt' ? 'bg-[#2196F3] text-white shadow-xs' : 'text-[#475569] hover:text-[#0D47A1]'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>JWT Decoder</span>
        </button>
        <button
          onClick={() => setToolTab('token-calc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            toolTab === 'token-calc' ? 'bg-[#2196F3] text-white shadow-xs' : 'text-[#475569] hover:text-[#0D47A1]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>LLM Token & Cost Calculator</span>
        </button>
      </div>

      {/* Tool 1: JSON Formatter */}
      {toolTab === 'json' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase">Raw JSON Input</label>
            <textarea
              rows={12}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full p-4 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl font-mono text-xs text-[#0F172A] focus:ring-2 focus:ring-[#2196F3] focus:outline-none"
            />
            <button
              onClick={handleFormatJson}
              className="w-full py-2.5 bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold font-mono rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Format & Validate JSON
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase">Prettified Output</label>
              {jsonOutput && (
                <button
                  onClick={() => handleCopyText(jsonOutput)}
                  className="text-xs font-mono text-[#0D47A1] hover:text-[#2196F3] flex items-center gap-1 cursor-pointer"
                >
                  {copiedOutput ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOutput ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {jsonError ? (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 font-mono text-xs rounded-2xl">
                ❌ {jsonError}
              </div>
            ) : (
              <pre className="p-4 bg-[#0F172A] border border-[#1E293B] rounded-2xl font-mono text-xs text-[#38BDF8] h-64 overflow-auto">
                {jsonOutput || '// Formatted output will appear here'}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* Tool 2: JWT Decoder */}
      {toolTab === 'jwt' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-2">Encoded JWT Token</label>
            <input
              type="text"
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              className="w-full p-3 bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl font-mono text-xs text-[#0F172A]"
            />
            <button
              onClick={handleDecodeJwt}
              className="mt-3 px-5 py-2 bg-[#2196F3] text-white text-xs font-bold rounded-xl hover:bg-[#1976D2] transition-all cursor-pointer font-mono"
            >
              Decode Token
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-2">Header</span>
              <pre className="p-4 bg-[#0F172A] border border-[#1E293B] rounded-2xl font-mono text-xs text-[#38BDF8] h-48 overflow-auto">
                {jwtHeader || '// Header JSON'}
              </pre>
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-2">Payload Claim</span>
              <pre className="p-4 bg-[#0F172A] border border-[#1E293B] rounded-2xl font-mono text-xs text-[#4ADE80] h-48 overflow-auto">
                {jwtPayload || '// Payload Claims JSON'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: LLM Token & Cost Calculator */}
      {toolTab === 'token-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-[#0D47A1]">Prompt Text Input</h3>
            <textarea
              rows={6}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="w-full p-3 border border-[#CBD5E1] rounded-xl font-sans text-xs text-[#0F172A]"
            />

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">Target Model Provider</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-xl text-xs font-mono text-[#0F172A] bg-white"
              >
                <option value="gpt-4o">OpenAI GPT-4o ($2.50 / 1M input)</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet ($3.00 / 1M input)</option>
                <option value="gemini-1-5-pro">Google Gemini 1.5 Pro ($1.25 / 1M input)</option>
                <option value="groq-llama3">Groq Llama 3 70B ($0.59 / 1M input)</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-[#0D47A1] mb-2">Token & Cost Breakdown</div>
              <div className="text-4xl font-extrabold text-[#0D47A1] font-anek mb-6">
                ~{estimatedTokens} <span className="text-sm font-normal text-[#64748B]">Tokens</span>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-[#475569]">Selected Model:</span>
                  <span className="font-bold text-[#0F172A]">{pricing.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-[#475569]">Estimated Input Cost (Single Run):</span>
                  <span className="font-bold text-[#0F172A]">${estimatedCostUsd} USD</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded-xl text-xs text-[#0D47A1] font-mono">
              💡 Tip: Running on Groq Llama 3 or Gemini 1.5 Pro provides 4x to 8x token cost efficiency for high-volume telemetry logs.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
