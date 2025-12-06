import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-blue-50/30 blur-3xl -z-10"></div>
      
      {/* Main Content */}
      <div className="text-center relative">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-light text-black tracking-tight leading-none">
            404
          </h1>
          {/* Blue accent line */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-32 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        </div>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>

        {/* Message */}
        <p className="text-xl md:text-2xl text-gray-700 font-light mb-3 tracking-tight">
          Page Not Found
        </p>
        <p className="text-sm md:text-base text-gray-500 font-light mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <a
          href="/"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-light rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105"
        >
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="uppercase tracking-wider text-sm">Back to Home</span>
        </a>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-100/30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-100/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;