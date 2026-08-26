import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function Toast({ message, onClose, visible }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-forest text-offwhite px-5 py-3.5 shadow-xl flex items-center gap-3 border border-forest-light animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-5 h-5 rounded-full bg-offwhite/20 flex items-center justify-center text-offwhite">
        <Check size={12} strokeWidth={3} />
      </div>
      <p className="text-xs sm:text-sm font-sans tracking-wide">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-offwhite/70 hover:text-offwhite cursor-pointer"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
