'use client';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';
import { Avatar } from './Avatar';

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIChatProps {
  initialMessages?: AIChatMessage[];
  onSendMessage: (content: string) => Promise<void> | void;
  isTyping?: boolean;
  className?: string;
  placeholder?: string;
}

export function AIChat({
  initialMessages = [],
  onSendMessage,
  isTyping = false,
  className,
  placeholder = 'Ask Qeltrava AI...'
}: AIChatProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    await onSendMessage(newMsg.content);
  };

  return (
    <div className={cn('flex flex-col h-full w-full bg-[var(--surface-1)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden', className)}>
      <div className="flex items-center p-[var(--space-3)] border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <Icon name="Sparkles" size={18} className="text-[var(--color-accent)] mr-2" />
        <h3 className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text)]">Qeltrava AI Assistant</h3>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-[var(--space-4)] space-y-[var(--space-4)]"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[var(--color-text-tertiary)] text-[var(--font-size-sm)]">
            How can I help you today?
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={cn('flex gap-[var(--space-3)] max-w-[85%]', msg.role === 'user' ? 'ml-auto flex-row-reverse' : '')}>
              <Avatar 
                initials={msg.role === 'user' ? 'U' : 'AI'} 
                className={cn('shrink-0', msg.role === 'assistant' && 'bg-[var(--color-accent)] text-white')}
                size="sm"
              />
              <div className={cn(
                'rounded-[var(--radius-lg)] p-[var(--space-3)] text-[var(--font-size-sm)]',
                msg.role === 'user' 
                  ? 'bg-[var(--color-accent)] text-white' 
                  : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
              )}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex gap-[var(--space-3)] max-w-[85%]">
            <Avatar initials="AI" className="shrink-0 bg-[var(--color-accent)] text-white" size="sm" />
            <div className="rounded-[var(--radius-lg)] p-[var(--space-3)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex gap-1 items-center">
              <span className="w-2 h-2 bg-[var(--color-text-tertiary)] rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-[var(--color-text-tertiary)] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-[var(--color-text-tertiary)] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-[var(--space-3)] bg-[var(--color-bg-elevated)] border-t border-[var(--color-border)]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-grow bg-[var(--surface-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-sm)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:border-transparent transition-all"
          />
          <Button type="submit" variant="primary" size="sm" disabled={!inputValue.trim() || isTyping}>
            <Icon name="Send" size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
