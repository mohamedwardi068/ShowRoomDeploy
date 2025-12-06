// components/CategoryPreviewCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryPreviewCard = ({ name, count, image, slug }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/shop/category/${slug}`)}
      className="group block text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-700 lg:border-gray-200 group-hover:border-blue-600 transition-all duration-300 transform group-hover:shadow-xl group-hover:shadow-blue-900/40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/112x112/1f2937/9ca3af?text=LUX";
          }}
        />
      </div>

      <h3 className="text-xl font-bold text-white lg:text-gray-900 mb-1 transition-colors duration-300 group-hover:text-blue-500">
        {name || "Untitled Category"}
      </h3>

      <p className="text-sm text-gray-400 lg:text-gray-600">
        {count ? `${count} items` : "0 items"}
      </p>
    </motion.div>
  );
};

export default CategoryPreviewCard;