'use client';
/**
 * design-system/providers/DialogProvider.tsx
 * Imperative dialog API. Open dialogs programmatically via useDialog() hook.
 */
import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import { Dialog } from '../components/Overlays';
import type { DialogSize } from '../components/Overlays';

interface DialogConfig {
  title?:   string;
  content:  React.ReactNode;
  footer?:  React.ReactNode;
  size?:    DialogSize;
}

interface DialogContextValue {
  open:  (config: DialogConfig) => void;
  close: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<DialogConfig | null>(null);

  const open  = useCallback((cfg: DialogConfig) => setConfig(cfg), []);
  const close = useCallback(() => setConfig(null), []);

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {config && (
        <Dialog
          open
          onClose={close}
          title={config.title}
          size={config.size}
          footer={config.footer}
        >
          {config.content}
        </Dialog>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used inside <DialogProvider>');
  return ctx;
}
