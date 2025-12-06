import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../myComponents/ProductCard";
import { getProducts } from "../utils/productStorage";

const ProductsGrid = () => {
  const [searchParams] = useSearchParams();
  const showSubFilters = searchParams.get("showSubFilters") === "true";

  // MAIN FILTERS
  const mainFilters = ["Adapters", "Chargers", "Earphones"];
  const filterSlugs = mainFilters.map((f) => f.toLowerCase().replace(/\s+/g, "-"));

  const [activeFilter, setActiveFilter] = useState(filterSlugs[0]);
  const [earphoneSubFilter, setEarphoneSubFilter] = useState(showSubFilters ? "all" : null);

  // Get real products from storage
  const products = useMemo(() => {
    const allProducts = getProducts();
    // Map products to include categorySlug for filtering
    return allProducts.map(p => ({
      ...p,
      categorySlug: p.type ? p.type.toLowerCase().replace(/\s+/g, "-") : "unknown",
    }));
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (activeFilter === "earphones") {
      if (earphoneSubFilter && earphoneSubFilter !== "all") {
        return products.filter(
          (p) =>
            p.categorySlug === "earphones" &&
            p.type?.toLowerCase() === earphoneSubFilter.toLowerCase()
        );
      }
      return products.filter((p) => p.categorySlug === "earphones");
    }

    return products.filter((p) => p.categorySlug === activeFilter);
  }, [products, activeFilter, earphoneSubFilter]);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {mainFilters.map((filter, idx) => {
            const slug = filterSlugs[idx];
            return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(slug);
                  setEarphoneSubFilter(slug === "earphones" ? "all" : null);
                }}
                className={`px-8 py-3 text-lg font-bold uppercase tracking-widest transition-all duration-300 border-b-4 rounded-t-lg ${activeFilter === slug
                  ? "border-blue-700 text-gray-900 shadow-lg shadow-blue-200/50"
                  : "border-transparent text-gray-500 hover:text-blue-700 hover:border-blue-300"
                  }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* EARPHONES SUB-FILTERS */}
        {activeFilter === "earphones" && (
          <div className="flex justify-center gap-4 mb-10">
            {["all", "Type-C", "Jack", "Lightning"].map((t) => (
              <button
                key={t}
                onClick={() => setEarphoneSubFilter(t)}
                className={`px-6 py-2 rounded-full border text-sm ${earphoneSubFilter === t
                  ? "bg-blue-600 text-white border-blue-700"
                  : "border-gray-400 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              type={product.type}
              compatibleDevices={product.compatibleDevices}
              isHot={product.isHot}
            />
          ))}
        </div>
      </div>



    </div>
  );
};

export default ProductsGrid;
