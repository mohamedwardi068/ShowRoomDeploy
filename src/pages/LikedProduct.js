import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Heart, Sparkles } from "lucide-react";
import ProductCard from "../myComponents/ProductCard";

const LikedProduct = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (Array.isArray(stored)) {
      setWishlist(stored);
    } else {
      setWishlist([]);
    }

    const handleWishlistUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(Array.isArray(updated) ? updated : []);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedList = wishlist.filter((product) => product.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
    setWishlist(updatedList);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const clearAll = () => {
    localStorage.setItem("wishlist", JSON.stringify([]));
    setWishlist([]);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!wishlist.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 blur-3xl opacity-30 animate-pulse"></div>
          <Heart className="relative w-24 h-24 text-slate-300 mb-6 stroke-1" />
        </div>
        
        <h2 className="text-4xl font-light text-slate-800 mb-3 tracking-tight">
          Your Collection Awaits
        </h2>
        <p className="text-slate-500 mb-8 font-light tracking-wide">Curate your wishlist with exquisite selections</p>
        
        <button
          onClick={() => navigate("/")}
          className="group relative px-8 py-3.5 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative flex items-center gap-2 font-light tracking-widest text-sm">
            <Sparkles className="w-4 h-4" />
            EXPLORE COLLECTION
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => navigate(-1)}
              className="group p-3 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-300 border border-slate-200/50"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
            </button>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-2 tracking-tight">
                Your Wishlist
              </h1>
              <p className="text-slate-500 font-light tracking-wider text-sm">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Selected
              </p>
            </div>

            <button
              onClick={clearAll}
              className="group px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 border border-slate-200/50 font-light tracking-wider text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Products Grid */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  
                  <div className="relative transform transition-all duration-500 group-hover:-translate-y-2">
                    <ProductCard
                      id={product.id}
                      image={product.image || product.images?.[0] || ""}
                      name={product.name || "Untitled product"}
                      price={typeof product.price === "number" ? product.price : 0}
                      type={product.type || ""}
                      compatibleDevices={product.compatibleDevices || []}
                      isHot={!!product.isHot}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    
                    {/* Remove button overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-slate-900 hover:scale-110 transition-all duration-300 z-20 group/btn border border-slate-200/50"
                      title="Remove from wishlist"
                    >
                      <X className="w-4 h-4 text-slate-600 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer accent */}
     
        </div>
      </div>
    </div>
  );
};

export default LikedProduct;