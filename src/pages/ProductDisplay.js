import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Heart, GitCompare, ShoppingCart } from "lucide-react";
import { getProducts } from "../utils/productStorage";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [compared, setCompared] = useState(false);

  // Load all products from storage
  const allProducts = useMemo(() => {
    return getProducts();
  }, []);

  // Retrieve product & restore like/compare states
  useEffect(() => {
    console.log('Looking for product with ID:', id);
    console.log('All products:', allProducts);

    const found = allProducts.find((p) => String(p.id) === String(id));
    console.log('Found product:', found);
    setProduct(found || null);

    const wl = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setLiked(wl.some(item => String(item.id) === String(id)));

    const cmp = JSON.parse(localStorage.getItem("compare") || "[]");
    setCompared(cmp.some(item => String(item.id) === String(id)));
  }, [allProducts, id]);

  // Toggle wishlist item
  const toggleLike = () => {
    let wl = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const exists = wl.some(item => String(item.id) === String(id));

    if (exists) {
      wl = wl.filter((item) => String(item.id) !== String(id));
      setLiked(false);
    } else {
      wl.push(product);
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wl));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Toggle compare item
  const toggleCompare = () => {
    let cmp = JSON.parse(localStorage.getItem("compare") || "[]");

    const exists = cmp.some(item => String(item.id) === String(id));

    if (exists) {
      cmp = cmp.filter((item) => String(item.id) !== String(id));
      setCompared(false);
    } else {
      cmp.push(product);
      setCompared(true);
    }

    localStorage.setItem("compare", JSON.stringify(cmp));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Product not found</p>
          <p className="text-sm text-gray-500">ID: {id}</p>
          <p className="text-xs text-gray-400 mt-4">Available products: {allProducts.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT — Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image || product.images?.[0] || "https://placehold.co/600x600/f3f4f6/9ca3af?text=Product"}
            alt={product.name || product.title || "Product"}
            className="w-full max-w-md rounded-3xl shadow-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x600/f3f4f6/9ca3af?text=Product";
            }}
          />
        </div>

        {/* RIGHT — Product Info */}
        <div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name || product.title || "Untitled Product"}
          </h1>

          {/* Type/Category */}
          {product.type && (
            <p className="text-sm text-gray-500 mb-2">
              Category: {product.type}
            </p>
          )}

          {/* Compatible Devices */}
          {product.compatibleDevices && product.compatibleDevices.length > 0 && (
            <p className="text-sm text-gray-600 mb-4">
              Compatible: {product.compatibleDevices.join(", ")}
            </p>
          )}

          {/* Price */}
          <p className="text-2xl font-semibold text-blue-700 mb-4">
            {product.price ? `${product.price.toFixed(2)} DT` : "Price not available"}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-6 text-yellow-500 text-lg">
              {"★".repeat(product.rating)}
              <span className="text-gray-300 ml-1">
                {"★".repeat(5 - product.rating)}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-10">
            {/* Contact Us */}
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition">
              <ShoppingCart size={20} />
              Contact Us
            </button>

            {/* Like */}
            <button
              onClick={toggleLike}
              className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition"
            >
              <Heart
                size={22}
                className={liked ? "text-red-500 fill-red-500" : "text-gray-700"}
              />
            </button>

            {/* Compare */}
            <button
              onClick={toggleCompare}
              className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition"
            >
              <GitCompare
                size={22}
                className={compared ? "text-blue-600" : "text-gray-700"}
              />
            </button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Product Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description || `High-quality ${product.type || 'product'} compatible with ${product.compatibleDevices?.join(", ") || "various devices"}.`}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;

