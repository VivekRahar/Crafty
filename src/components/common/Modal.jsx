import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible Modal Component
 * Demonstrates Unit II & III:
 * - Keyboard listeners (Esc to close)
 * - Body scroll lock effect cleanup
 * - Accessible ARIA attributes
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className={`relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidth} border border-stone-200`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 bg-[#fdfbf7]">
            <div>
              <h3 id="modal-title" className="text-xl font-bold text-slate-900">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
