'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const styles = {
    success: 'bg-success-50 dark:bg-success-700/20 border-success-200 dark:border-success-700/30 text-success-700 dark:text-success-300',
    error: 'bg-error-50 dark:bg-error-700/20 border-error-200 dark:border-error-700/30 text-error-700 dark:text-error-300',
    info: 'bg-info-50 dark:bg-info-700/20 border-info-200 dark:border-info-700/30 text-info-700 dark:text-info-300',
    warning: 'bg-warning-50 dark:bg-warning-700/20 border-warning-200 dark:border-warning-700/30 text-warning-700 dark:text-warning-300',
  };

  const iconStyles = {
    success: 'text-success-500 dark:text-success-400',
    error: 'text-error-500 dark:text-error-400',
    info: 'text-info-500 dark:text-info-400',
    warning: 'text-warning-500 dark:text-warning-400',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" aria-hidden="true" />,
    error: <XCircle className="w-5 h-5" aria-hidden="true" />,
    info: <Info className="w-5 h-5" aria-hidden="true" />,
    warning: <AlertTriangle className="w-5 h-5" aria-hidden="true" />,
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        ${styles[toast.type]}
        border px-4 py-3 rounded-lg shadow-lg dark:shadow-dark-lg
        animate-slide-in-right
        flex items-center gap-3
        min-w-[300px] max-w-[400px]
      `}
    >
      <span className={iconStyles[toast.type]}>{icons[toast.type]}</span>
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="
          p-1 rounded-md
          text-primary-400 dark:text-primary-500
          hover:text-primary-600 dark:hover:text-primary-300
          hover:bg-primary-100 dark:hover:bg-primary-700/50
          focus:outline-none focus:ring-2 focus:ring-accent-500
          transition-colors duration-150
        "
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastType[]; onClose: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 space-y-2"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
