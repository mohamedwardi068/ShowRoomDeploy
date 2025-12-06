import React from 'react';
import { ShoppingCart, ArrowRight, Image } from 'lucide-react';

const SlidePreview = ({ slide }) => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-xl bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: slide.image ? `url(${slide.image})` : 'none',
          backgroundColor: slide.image ? 'transparent' : '#1f2937',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {slide.title || 'Your Title Here'}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl">
              {slide.description || 'Your description will appear here...'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                title={`Link: ${slide.button1Link || '#'}`}
              >
                <ShoppingCart size={20} />
                {slide.button1 || 'Button 1'}
              </button>

              <button
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                title={`Link: ${slide.button2Link || '#'}`}
              >
                {slide.button2 || 'Button 2'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {!slide.image && (
        <div className="absolute inset-0 flex items-center justify-center z-5">
          <div className="text-center text-gray-500">
            <Image size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No image provided</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidePreview;
