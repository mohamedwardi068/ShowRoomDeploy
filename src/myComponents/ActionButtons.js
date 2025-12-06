import React from 'react';
import { Sliders, Eye, Heart } from 'lucide-react'; // Import icons

const ActionButtons = ({ onQuickViewClick }) => {
  return (
    <div className="absolute top-1/2 right-0 flex flex-col items-center gap-4 transform -translate-y-1/2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
      {/* Add to Compare */}
      <button className="bg-white text-gray-700 hover:text-blue-600 p-2 rounded-full border-2 border-gray-300 transition-all duration-200">
        <Sliders size={20} />
      </button>

      {/* Quick View */}
      <button
        onClick={onQuickViewClick}
        className="bg-white text-gray-700 hover:text-blue-600 p-2 rounded-full border-2 border-gray-300 transition-all duration-200"
      >
        <Eye size={20} />
      </button>

      {/* Add to Wishlist */}
      <button className="bg-white text-gray-700 hover:text-blue-600 p-2 rounded-full border-2 border-gray-300 transition-all duration-200">
        <Heart size={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
