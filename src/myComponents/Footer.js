import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/logoWhite.png"; // make sure the path is correct

const Footer = () => {
  const navigate = useNavigate(); // use React Router navigate

  return (
    <footer className="bg-black text-gray-400 text-sm py-4 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Clickable Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
          onClick={() => navigate("/")} // navigate to home
        >
          <img src={logo} alt="BlackWave Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-white">BlackWave</span>
        </div>

        {/* Links */}
        <div className="flex gap-4 text-xs">
          <button className="hover:text-white" onClick={() => navigate("/about")}>About</button>
          <button className="hover:text-white" onClick={() => navigate("/privacy")}>Privacy</button>
          <button className="hover:text-white" onClick={() => navigate("/shipping")}>Shipping</button>
          <button className="hover:text-white" onClick={() => navigate("/faq")}>FAQ</button>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">© 2025 BlackWave</p>
      </div>
    </footer>
  );
};

export default Footer;
