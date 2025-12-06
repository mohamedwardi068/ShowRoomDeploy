import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductModal from "../myComponents/ProductModal";

// All products (you can keep more items here if needed)
const allProducts = [
  { id: 1, name: "Earphones", price: 59.99, image: "https://via.placeholder.com/150", category: "Earphones", categorySlug: "earphones" },
  { id: 2, name: "Glass Protectoion", price: 14.99, image: "https://via.placeholder.com/150", category: "glass-protection", categorySlug: "glass-protection" },
  { id: 3, name: "Charger", price: 29.99, image: "https://via.placeholder.com/150", category: "Chargers", categorySlug: "chargers" },
  { id: 4, name: "Cables", price: 19.99, image: "https://via.placeholder.com/150", category: "Cables", categorySlug: "cables" },
  { id: 5, name: "Car Charger", price: 24.99, image: "https://via.placeholder.com/150", category: "Chargers", categorySlug: "chargers" },
];

// Only show these categories
const allowedCategories = ["Earphones", "glass-protection", "Chargers", "Cables", "Car Charger"];

export default function PopularProductsCarousel() {
  const [products, setProducts] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dragStart = useRef(null);

  // Filter products on mount
  useEffect(() => {
    const filtered = allProducts.filter(p => allowedCategories.includes(p.category));
    setProducts(filtered);
  }, []);

  // Responsive items per slide
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else setItemsPerSlide(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const shouldLoop = products.length > itemsPerSlide;

  const extended = shouldLoop
    ? [...products.slice(-itemsPerSlide), ...products, ...products.slice(0, itemsPerSlide)]
    : [...products];

  const realStart = shouldLoop ? itemsPerSlide : 0;
  const realEnd = shouldLoop ? extended.length - itemsPerSlide : products.length;

  useEffect(() => {
    setCurrentIndex(realStart);
  }, [itemsPerSlide, realStart, products.length]);

  const goTo = (index) => {
    setTransitionEnabled(true);
    setCurrentIndex(index);
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  useEffect(() => {
    if (!shouldLoop) return;
    if (currentIndex === realEnd) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(realStart);
      }, 300);
    } else if (currentIndex === realStart - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(realEnd - 1);
      }, 300);
    }
  }, [currentIndex, realEnd, realStart, shouldLoop]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDown = (e) => {
    dragStart.current = e.clientX || e.touches[0].clientX;
  };

  const handleUp = (e) => {
    if (!dragStart.current) return;
    const endX = e.clientX || e.changedTouches[0].clientX;
    const diff = endX - dragStart.current;
    if (diff > 60) handlePrev();
    else if (diff < -60) handleNext();
    dragStart.current = null;
  };

  return (
    <section className="py-12 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 pb-2 border-b-2 border-blue-700/50 inline-block px-4">
          Most Popular Products
        </h2>

        <div
          className="relative mt-10 overflow-hidden select-none"
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchEnd={handleUp}
        >
          <div
            className={`flex ${transitionEnabled ? "transition-transform duration-300" : ""}`}
            style={{
              width: `${(extended.length / itemsPerSlide) * 100}%`,
              transform: `translateX(-${(currentIndex * 100) / extended.length}%)`,
            }}
          >
            {extended.map((p, i) => (
              <div
                key={i}
                className="p-3 flex-shrink-0 cursor-pointer"
                style={{ width: `${100 / extended.length}%` }}
                onClick={() => setSelectedProduct(p)}
              >
                <div className="bg-white rounded-xl shadow-lg border p-5 group h-full flex flex-col">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-32 mx-auto object-contain group-hover:scale-105 transition-transform mb-4"
                  />
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{p.category}</p>
                  <div className="flex items-end justify-center mt-auto">
                    <span className="text-base font-semibold text-gray-600 mr-0.5">DT</span>
                    <span className="text-lg font-bold text-gray-900">{p.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shouldLoop && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow border"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow border"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={{
            image: selectedProduct.image,
            title: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
            description: `This is a ${selectedProduct.category} product.`,
            categorySlug: selectedProduct.categorySlug,
            stock: 50,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
