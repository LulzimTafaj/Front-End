'use client';

import { FC, MouseEvent } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleInnerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onCancel} 
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-96"
        onClick={handleInnerClick} 
      >
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="mb-4 text-[#262626]">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border cursor-pointer bg-[#1e6f9f] hover:bg-[#0168a3] text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
