import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/categoryStorage";

const CircleCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <section className="py-12 bg-gray-950 lg:bg-white transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(`/shop/category/${cat.slug}`)}
              className="group block text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-700 lg:border-gray-200 group-hover:border-blue-600 transition-all duration-300 transform group-hover:shadow-xl group-hover:shadow-blue-900/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/112x112/1f2937/9ca3af?text=LUX"; }}
                />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-gray-900 mb-1 transition-colors duration-300 group-hover:text-blue-500">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-400 lg:text-gray-600">{cat.count} items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CircleCategories;
