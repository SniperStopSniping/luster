'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'error' | 'success' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'error') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none flex flex-col items-center gap-2 p-4"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
            >
              <div
                className={`
                  flex items-center gap-3 px-5 py-3.5 rounded-lg
                  bg-canvas border shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                  ${toast.type === 'error' ? 'border-red-200' : ''}
                  ${toast.type === 'success' ? 'border-emerald/30' : ''}
                  ${toast.type === 'info' ? 'border-ink/10' : ''}
                `}
              >
                {/* Icon */}
                {toast.type === 'error' && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-red-600">
                      <path d="M6 3.5V6.5M6 8.5V8.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
                {toast.type === 'success' && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                {toast.type === 'info' && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-ink/60">
                      <path d="M6 5.5V8.5M6 3.5V3.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}

                {/* Message */}
                <p className="font-mono text-sm text-ink/80">{toast.message}</p>

                {/* Dismiss button */}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="flex-shrink-0 ml-2 p-1 rounded hover:bg-ink/5 transition-colors"
                  aria-label="Dismiss"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-ink/40">
                    <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

