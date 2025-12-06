import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/logoWhite.png";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 3-7 business days, depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "You can return products within 14 days of delivery for a full refund."
  },
  {
    question: "Do you offer warranty?",
    answer: "Yes, all BlackWave products come with a 1-year warranty."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach us at support@blackwave.com or via our contact form."
  },
];

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">Frequently Asked Questions</h1>
        <div className="w-20 h-1 bg-yellow-500 mb-8 rounded-full"></div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-40 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition">
              <div
                className="flex justify-between items-center text-lg font-semibold text-yellow-400"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
                <span className="text-white text-xl">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-300 leading-relaxed">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
