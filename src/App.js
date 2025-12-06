// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./myComponents/Navbar";
import Footer from "./myComponents/Footer";

import ImageCarousel from "./pages/ImageCarousel";
import CategoryList from "./myComponents/CategoryCard";
import ProductsGrid from "./pages/ProductsGrid";
import QualityGoods from "./myComponents/QualityGoods";
import PopularProductsCarousel from "./myComponents/PopularProductsCarousel";

import AdminPage from "./pages/AdminPage";
import SponsorsMapGoogle from "./myComponents/SponsorsMapGoogle";

import ProductPage from "./pages/ProductDisplay";
import Compare from "./pages/Compare";
import LikedProduct from "./pages/LikedProduct";
import NotFound from "./pages/NotFound";

import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ"; // <-- import FAQ
import Shipping from "./pages/Shipping"; // <-- import Shipping

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ImageCarousel />
                <CategoryList />
                <ProductsGrid />
                <QualityGoods />
                <PopularProductsCarousel />
                <SponsorsMapGoogle />
              </>
            }
          />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<LikedProduct />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/shop/category/:slug" element={<CategoryPage />} />
          <Route path="/admin" element={<AdminPage />} />

          {/* Privacy & FAQ */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
