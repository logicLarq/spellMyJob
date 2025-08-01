'use client';

import { ReactNode } from 'react';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupModal = ({ isOpen, onClose, children }: PopupModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-[#0f172a] text-white border border-[#00FFAB]/30 rounded-2xl p-6 w-[90vw] max-w-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-400 hover:text-red-500"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
