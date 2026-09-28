import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * ToastNotification Component
 * Location: src/components/ToastNotification.jsx
 * Functionality: Floating, auto-dismissing toast feedback alert for user actions.
 */
export default function ToastNotification({ toast, onClose }) {
  if (!toast || !toast.message) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-600 shrink-0" />;
      default:
        return <Info size={18} className="text-blue-600 shrink-0" />;
    }
  };

  const getBadgeStyle = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-short">
      <div className={`p-4 rounded-2xl border shadow-lg flex items-center justify-between gap-3 ${getBadgeStyle()}`}>
        <div className="flex items-center gap-2.5">
          {getIcon()}
          <div>
            <p className="text-xs font-bold leading-tight">{toast.title || 'MarketLink Alert'}</p>
            <p className="text-[11px] text-gray-700 mt-0.5">{toast.message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-black/5 transition cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
