'use client';

import { useRef, useEffect } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  isDark: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, isDark, onConfirm, onCancel }: DeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative z-10 p-6 rounded-2xl shadow-2xl border max-w-md w-full animate-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-gray-900 border-white/20'
            : 'bg-white border-black/10'
        }`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <p className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Delete QR Code?
        </p>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          This action cannot be undone. The QR code will be permanently deleted.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-500 transition-all"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
              isDark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
