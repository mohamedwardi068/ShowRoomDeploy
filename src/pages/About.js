// src/pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/logoWhite.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-200 pt-10 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Logo Header */}
        <div
          className="flex items-center space-x-3 cursor-pointer mb-10 group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
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

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">About BlackWave</h1>
        <div className="w-24 h-1 bg-yellow-500 mb-8 rounded-full"></div>

        {/* About Text */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">

          <p>
            BlackWave is a proudly Tunisian brand dedicated to creating modern, sleek, and smart gadgets
            that elevate everyday life. Our products combine cutting-edge technology with elegant design,
            delivering both style and functionality.
          </p>

          <p>
            Founded with a vision of reliability, accessibility, and innovation, BlackWave strives to bring 
            high-quality products to our customers, whether digital or physical. Every item reflects our
            commitment to excellence and our Tunisian heritage.
          </p>

          <p>
            At BlackWave, we believe in making life smarter, simpler, and more connected. 
            From our smart gadgets to our digital solutions, we create products that empower and inspire
            our customers worldwide.
          </p>

          <p>
            Join us on our journey to merge technology, style, and reliability — proudly from Tunisia.
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;
