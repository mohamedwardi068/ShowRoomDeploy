import React from "react";

const PromoBannerSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-10"> {/* Reduced vertical padding */}
      {/* ---------- ROW 1 ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Small Banner */}
        <div className="md:col-span-5 relative overflow-hidden rounded-xl group cursor-pointer h-[220px] sm:h-[260px] lg:h-[300px]">
          <img
            src="https://woodmart.xtemos.com/accessories/wp-content/uploads/sites/7/2022/08/accessories-banner-1.jpg"
            alt="Cases for Phone"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 text-white">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold mb-1">Something completely new</p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Cases for Phone</h3>
            <a
              href="https://woodmart.xtemos.com/accessories/product-category/cases/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            >
              to shop
            </a>
          </div>
        </div>

        {/* Right Large Banner */}
        <div className="md:col-span-7 relative overflow-hidden rounded-xl group cursor-pointer h-[220px] sm:h-[260px] lg:h-[300px]">
          <img
            src="https://woodmart.xtemos.com/accessories/wp-content/uploads/sites/7/2022/04/accessories-banner-2.jpg"
            alt="Straps of Any Color"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 text-white">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold mb-1">Accessories for watch</p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Straps of Any Color</h3>
            <a
              href="https://woodmart.xtemos.com/accessories/product-category/straps/"
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            >
              to shop
            </a>
          </div>
        </div>
      </div>

      {/* ---------- ROW 2 ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Large Banner */}
        <div className="md:col-span-7 relative overflow-hidden rounded-xl group cursor-pointer h-[220px] sm:h-[260px] lg:h-[300px]">
          <img
            src="https://woodmart.xtemos.com/accessories/wp-content/uploads/sites/7/2022/04/accessories-banner-3.jpg"
            alt="Buy One and Get 50% Off the Second"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 text-white">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold mb-1">Special offer</p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Buy One and Get 50% Off the Second
            </h3>
            <a
              href="https://woodmart.xtemos.com/accessories/product-category/power-banks/"
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            >
              read more
            </a>
          </div>
        </div>

        {/* Right Small Banner */}
        <div className="md:col-span-5 relative overflow-hidden rounded-xl group cursor-pointer h-[220px] sm:h-[260px] lg:h-[300px]">
          <img
            src="https://woodmart.xtemos.com/accessories/wp-content/uploads/sites/7/2022/09/wood-accessories-category-4-opt.jpg"
            alt="Charger Discount"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 text-white">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold mb-1">
              Try something completely
            </p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Charger Discount</h3>
            <a
              href="https://woodmart.xtemos.com/accessories/product-category/charger/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            >
              buy now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSection;
