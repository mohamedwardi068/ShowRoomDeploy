import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmColor = 'bg-red-600' }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden transform transition-all scale-100">
                <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-300 text-lg">{message}</p>
                </div>

                <div className="flex justify-end space-x-3 p-4 bg-gray-800/50 border-t border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors ${confirmColor}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
