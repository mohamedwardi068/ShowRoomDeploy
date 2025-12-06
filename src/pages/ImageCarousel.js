import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";
import { getAllSliders } from "../services/sliderService";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const startX = useRef(0);
  const containerRef = useRef(null);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getAllSliders();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Auto-slide unless hovered
  useEffect(() => {
    if (isHovered || dragging) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, dragging, nextSlide]);

  // 🖱️ Mouse + touch drag logic
  const handleStart = (e) => {
    setDragging(true);
    startX.current = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  };

  const handleMove = (e) => {
    if (!dragging) return;
    const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const delta = currentX - startX.current;
    setOffset(delta);
  };

  const handleEnd = () => {
    setDragging(false);
    //const width = containerRef.current.offsetWidth;
    // Swipe threshold
    if (offset > 100) {
      prevSlide();
    } else if (offset < -100) {
      nextSlide();
    }

    // Reset offset
    setOffset(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave1={() => {
        setDragging(false);
        setOffset(0);
      }}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {/* Slides Container */}
      <div
        className={`flex h-full transition-transform duration-700 ease-in-out ${dragging ? "transition-none" : ""
          }`}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${offset}px))`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <a
                      href={slide.button1Link}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart size={20} />
                      {slide.button1}
                    </a>
                    <a
                      href={slide.button2Link}
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                    >
                      {slide.button2}
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invisible Background Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 z-20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 z-20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-white scale-110"
              : "bg-white bg-opacity-50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
