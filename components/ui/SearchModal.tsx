/* eslint-disable */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/src/routing';
import { searchSite, SearchItem } from '@/lib/search-index';
import { Search, X, CornerDownLeft, Sparkles, BookOpen, Layers, CheckSquare, Settings } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search execution
  useEffect(() => {
    if (!query) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const searchResults = searchSite(query);
    setResults(searchResults.slice(0, 6)); // Cap at 6 results
    setActiveIndex(0);
  }, [query]);

  // Handle focus trap & hotkeys
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (results.length > 0 && results[activeIndex]) {
          router.push(results[activeIndex].href as any);
          onClose();
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, router, onClose]);

  // Outside click close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Service':
        return <Settings className="w-4 h-4 text-[var(--color-accent)]" />;
      case 'Industry':
        return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'Solution':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Case Study':
        return <CheckSquare className="w-4 h-4 text-sky-500" />;
      case 'Insight':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'Page':
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[var(--color-primary-dark)]/70 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4 select-none"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="bg-white w-full max-w-[560px] rounded-2xl border border-[var(--color-border-soft)] shadow-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border-soft)] bg-gray-50/50">
              <Search className="w-5 h-5 text-[var(--color-text-main)] opacity-70" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, case studies, insights..."
                className="w-full py-4 bg-transparent text-[15px] font-sans font-medium text-[var(--color-primary-dark)] placeholder-gray-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-white border border-[var(--color-border-soft)] rounded shadow-sm">
                ESC
              </kbd>
              <button 
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results / Empty state */}
            <div 
              className="p-2 overflow-y-auto max-h-[350px]"
              aria-live="polite"
            >
              {query && results.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-1">No results for "{query}"</p>
                  <p className="text-xs text-[var(--color-text-main)] opacity-80">Try searching "AI automation" or "SaaS development"</p>
                </div>
              )}

              {!query && (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-xs font-mono mb-2 uppercase tracking-wider text-[var(--color-accent)] font-semibold">Quick Shortcuts</p>
                  <div className="flex justify-center gap-3 flex-wrap">
                    <button onClick={() => setQuery('AI automation')} className="text-xs bg-[var(--color-bg-light)] text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] px-3 py-1 rounded-full hover:border-[var(--color-accent)] transition-colors">AI Automation</button>
                    <button onClick={() => setQuery('SaaS')} className="text-xs bg-[var(--color-bg-light)] text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] px-3 py-1 rounded-full hover:border-[var(--color-accent)] transition-colors">SaaS Development</button>
                    <button onClick={() => setQuery('Modernization')} className="text-xs bg-[var(--color-bg-light)] text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] px-3 py-1 rounded-full hover:border-[var(--color-accent)] transition-colors">Modernization</button>
                  </div>
                </div>
              )}

              {results.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(item.href as any);
                      onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--color-bg-light)] text-[var(--color-primary-dark)]'
                        : 'bg-transparent text-[var(--color-text-main)] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                        {getIcon(item.category)}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? 'text-[var(--color-primary-dark)]' : 'text-gray-900'}`}>{item.title}</p>
                        <p className="text-xs text-[var(--color-text-main)] opacity-70 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-black/5 text-gray-500">
                        {item.categoryLabel}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-gray-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer tips */}
            {results.length > 0 && (
              <div className="bg-gray-50 border-t border-[var(--color-border-soft)] px-4 py-2.5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span>↑↓</span>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>↵</span>
                  <span>to select</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

