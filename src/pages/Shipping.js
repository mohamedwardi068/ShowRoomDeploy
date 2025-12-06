// src/pages/Shipping.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/logoWhite.png";

const Shipping = () => {
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
        <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">Order & Access Policy</h1>
        <div className="w-24 h-1 bg-yellow-500 mb-8 rounded-full"></div>

        {/* Sections */}
        <div className="space-y-8 text-gray-300 text-lg leading-relaxed">

          <section>
            <h2 className="text-yellow-400 font-semibold text-2xl mb-2">Order Processing</h2>
            <p>
              All orders are processed instantly. Once your purchase is complete, 
              your product or access is available immediately.
            </p>
          </section>

          <section>
            <h2 className="text-yellow-400 font-semibold text-2xl mb-2">Digital Access</h2>
            <p>
              All BlackWave products that are digital or smart devices are delivered virtually. 
              You will receive instructions, downloads, or activation codes immediately after checkout.
            </p>
          </section>

          <section>
            <h2 className="text-yellow-400 font-semibold text-2xl mb-2">Pickup Option</h2>
            <p>
              If your order requires physical collection, items can be picked up 
              from our Tunis office within 24 hours of purchase. 
              No delivery fees apply.
            </p>
          </section>

          <section>
            <h2 className="text-yellow-400 font-semibold text-2xl mb-2">Support</h2>
            <p>
              For any questions regarding your order or access, 
              please contact us at <span className="text-white font-medium">support@blackwave.com</span>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Shipping;
