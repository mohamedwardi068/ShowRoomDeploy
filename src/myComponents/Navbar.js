import { useState, useEffect } from "react";
import { Search, Heart, Shuffle, Menu, X } from "lucide-react";
import logo from "../logo/logoImg.png";
import { useNavigate } from "react-router-dom";
import { getNavigationItems } from "../utils/navigationStorage";
import { getProducts } from "../utils/productStorage";

export default function Navbar() {
  const navigate = useNavigate();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navigationItems, setNavigationItems] = useState([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const updateCounts = () => {
      const wl = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const cmp = JSON.parse(localStorage.getItem("compare") || "[]");
      setWishlistCount(wl.length);
      setCompareCount(cmp.length);
    };

    const updateNavigation = () => {
      setNavigationItems(getNavigationItems());
    };

    // Load products for search
    setAllProducts(getProducts());

    updateCounts();
    updateNavigation();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("compareUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);
    window.addEventListener("navigationUpdated", updateNavigation);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("compareUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
      window.removeEventListener("navigationUpdated", updateNavigation);
    };
  }, []);

  // Handle Search Input
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  const handleSearchClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (index) => setActiveDropdown(activeDropdown === index ? null : index);
  const handleCompareClick = () => navigate("/compare");
  const handleWishlistClick = () => navigate("/wishlist");

  const handleSubItemClick = (parentSlug, subItem) => {
    console.log("handleSubItemClick", parentSlug, subItem);
    if (subItem.type === "filter-link") {
      navigate(`/shop/category/${parentSlug}?filter=${subItem.filter}`);
    } else {
      navigate(`/product/${subItem.id}`);
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full shadow-sm bg-white border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold">ShowRoom</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 relative">
          {navigationItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Category Name */}
              <div
                className="py-3 px-2 -mx-2 rounded-lg transition-colors group-hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/shop/category/${item.slug}`)}
              >
                <span className="text-sm font-semibold hover:text-blue-600 whitespace-nowrap">
                  {item.title}
                </span>
              </div>

              {/* Dropdown – Renders ONLY if items.length > 0 */}
              {item.items.length > 0 && (
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="bg-white shadow-lg border rounded-lg min-w-[200px]">
                    <ul className="py-2">
                      {item.items.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer whitespace-nowrap transition-colors"
                          onClick={() => handleSubItemClick(item.slug, subItem)}
                        >
                          {subItem.title || subItem.name || subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-gray-700">

          {/* Desktop Search Bar */}
          <div className="relative hidden lg:block">
            <div className="flex items-center border rounded-full px-3 py-1 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-blue-500 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white shadow-xl border rounded-lg z-50 overflow-hidden">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleSearchClick(product.id)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition"
                      >
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                        <div>
                          <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
                          <p className="text-xs text-blue-600 font-bold">${product.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Compare */}
          <div className="relative hidden sm:block cursor-pointer" onClick={handleCompareClick}>
            <Shuffle className="w-5 h-5 hover:text-blue-600" />
            {compareCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="relative hidden sm:block cursor-pointer" onClick={handleWishlistClick}>
            <Heart className="w-5 h-5 hover:text-blue-600" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">

          {/* Search box */}
          <div className="px-4 py-3 border-b relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery && (
              <div className="mt-2 bg-white border rounded-lg shadow-lg overflow-hidden">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleSearchClick(product.id)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                        <div>
                          <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
                          <p className="text-xs text-blue-600 font-bold">${product.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Categories */}
          <nav className="px-4 py-2 flex flex-col gap-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left py-3 px-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors border shadow-sm"
                onClick={() => {
                  if (item.slug === "glass-protection") {
                    navigate(`/shop/category/${item.slug}?filter=Clear`); // Default to Clear or just category
                  } else {
                    navigate(`/shop/category/${item.slug}`);
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
