import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/logoWhite.png";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-200 pt-10 px-6">
      <div className="max-w-3xl mx-auto">

        {/* VIP Logo Header */}
        <div
          className="flex items-center space-x-3 cursor-pointer mb-10 group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            {/* glowing border effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-20 blur-xl group-hover:opacity-30 transition"></div>

            <img
              src={logo}
              alt="BlackWave Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            />
          </div>

          <span className="text-3xl font-semibold text-white tracking-wide group-hover:text-yellow-400 transition">
            BlackWave
          </span>
        </div>

        {/* Title Section */}
        <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">
          Privacy Policy
        </h1>

        {/* VIP Divider */}
        <div className="w-20 h-1 bg-yellow-500 mb-8 rounded-full"></div>

        {/* VIP Privacy Text */}
        <p className="mb-6 leading-relaxed text-gray-300 text-lg">
          Among its standout creations, <span className="text-yellow-400 font-semibold">BlackWave</span> 
          represents a proudly Tunisian brand built on precision, elegance, and cutting-edge innovation.
        </p>

        <p className="mb-6 leading-relaxed text-gray-300 text-lg">
          Our modern collection of premium, essential smart gadgets is crafted 
          to elevate everyday life. Built with advanced technology and refined 
          design, BlackWave ensures that you stay connected — wherever you go.
        </p>

        <p className="leading-relaxed text-gray-300 text-lg">
          Together, <span className="text-yellow-400 font-semibold">Revo</span> and 
          <span className="text-yellow-400 font-semibold"> BlackWave </span> embody a shared vision of 
          reliability, style, and accessibility.  
          Every product proudly reflects our commitment to excellence — 
          <span className="text-white font-medium"> made in Tunisia.</span>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
