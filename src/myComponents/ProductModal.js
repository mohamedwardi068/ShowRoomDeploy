import React from "react";
import { MdClose, MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    if (product.categorySlug) {
      navigate(`/shop/category/${product.categorySlug}`);
      onClose();
    }
  };

  const handleAddToWishlist = () => {
    // Add functionality to add the product to the wishlist
    console.log("Product added to wishlist", product.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <div className="bg-gradient-to-r from-[#2b2b2b] via-[#3a3a3a] to-[#1a1a1a] w-full max-w-6xl rounded-3xl shadow-xl relative flex flex-col md:flex-row animate-[fadeIn_.25s_ease]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-400 transition"
        >
          <MdClose size={28} />
        </button>

        {/* LEFT: Product Image */}
        <div className="md:w-1/2 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-gray-700">
          <img
            src={product.image || product.images?.[0]}
            alt={product.title}
            className="w-full max-w-[400px] object-contain border-4 border-gold-600 rounded-xl shadow-lg"
          />
        </div>

        {/* RIGHT: Product Details */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between space-y-6">
          <div>
            {/* Brand */}
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
              {product.brand || "PREMIUM BRAND"}
            </p>

            {/* Title */}
            <h2 className="text-4xl font-extrabold text-white mb-4">
              {product.title}
            </h2>

            {/* Price */}
            <div className="text-3xl font-bold text-[#ffd700] mb-4">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mt-4 mb-6">
              {product.description || "No description available."}
            </p>

            {/* Category Link */}
            {product.category && product.categorySlug && (
              <p
                onClick={handleCategoryClick}
                className="text-[#ffd700] font-semibold cursor-pointer hover:underline mb-6"
              >
                Category: {product.category}
              </p>
            )}

            {/* Stock */}
            <div className="text-sm text-gray-500">
              <span className="text-green-400 font-semibold">✓</span>{" "}
              {product.stock || 98} in stock
            </div>
          </div>

          {/* Wishlist Button */}
          <div className="flex justify-start mt-6">
            <button
              onClick={handleAddToWishlist}
              className="flex items-center gap-2 bg-transparent border-2 border-[#ffd700] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#ffd700] hover:text-black"
            >
              <MdFavoriteBorder size={20} />
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
