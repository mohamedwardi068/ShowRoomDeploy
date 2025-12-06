import React from "react";
import { X } from "lucide-react";

const PreviewModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full relative p-6">
        <button
          onClick={onClose}
          className="absolute top-1 right-3 p-2 rounded-full hover:bg-gray-700"
        >
          <X size={15} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PreviewModal;
