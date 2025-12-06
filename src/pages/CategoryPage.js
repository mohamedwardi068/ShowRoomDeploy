import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../myComponents/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Load all products from localStorage backup
  const allProducts = useMemo(() => {
    const data = JSON.parse(localStorage.getItem("all_products_backup") || "[]");
    return data.map((p) => ({
      ...p,
      categorySlug: p.type ? p.type.toLowerCase().replace(/\s+/g, "-") : "unknown",
      connector: p.connector || "Universal",
      model: p.model || null,
      compatibleDevices: Array.isArray(p.compatibleDevices) ? p.compatibleDevices : ["Universal"],
      image: p.image || p.images?.[0] || "https://placehold.co/300x400/f3f4f6/9ca3af?text=Product",
    }));
  }, []);

  // Filters per category
  const categoryFilters = {
    "earphones": ["Jack", "Type-C", "Lightning"],
    "data-cables": ["USB to Micro", "USB to Type-C", "USB to Lightning", "Jack to Jack", "Jack to Type-C", "Jack to Lightning"],
    "adapters": ["USB", "Type-C", "USB/Type-C"],
    "chargers": ["USB to C", "USB to Micro", "USB to Lightning", "Type-C to C", "Type-C to Lightning"],
    "car-charger": ["Car Only", "USB to C", "USB to Lightning", "USB to Micro"],
    "glass-protection": ["Clear", "Print"]
  };

  // Sub-models per category + filter
  const filterModels = {
    "earphones": {
      "Jack": [],
      "Type-C": [],
      "Lightning": []
    },
    "data-cables": {
      "USB to Micro": ["BC01", "BC02", "BC03", "BC04", "BC05"],
      "USB to Type-C": ["BC01", "BC02", "BC03", "BC04CC", "BC05CC"],
      "USB to Lightning": ["BC01", "BC02", "BC03", "BC04LC", "BC05LC"],
      "Jack to Jack": ["BA01"],
      "Jack to Type-C": ["BA01C"],
      "Jack to Lightning": ["BA01L"]
    },
    "adapters": {
      "USB": ["BL01", "BL02", "BL03"],
      "Type-C": ["BL04"],
      "USB/Type-C": ["BL05"]
    },
    "chargers": {
      "USB to C": ["BL01C", "BL02C", "BL03C", "BL04C", "BL05C"],
      "USB to Micro": ["BL01M", "BL02M"],
      "USB to Lightning": ["BL01L", "BL02L"],
      "Type-C to C": ["BL03CC", "BL04CC", "BL05CC"],
      "Type-C to Lightning": ["BL04CL", "BL05CL"]
    },
    "car-charger": {
      "Car Only": ["CL01"],
      "USB to C": ["CL01C"],
      "USB to Lightning": ["CL01L"],
      "USB to Micro": ["CL01M"]
    },
    "glass-protection": {
      "Clear": ["BS01", "BS02"],
      "Print": ["BS03"]
    }
  };

  // Products in this category
  const categoryProducts = allProducts.filter((p) => p.categorySlug === slug);

  // Available filters for this category
  const availableFilters = categoryFilters[slug] || [];

  // Multi-select state for filters and models
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  // Toggle filter selection
  const toggleFilter = (f) => {
    setSelectedFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
    // Reset models when changing filters
    setSelectedModels([]);
  };

  // Toggle model selection
  const toggleModel = (m) => {
    setSelectedModels((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  // Filter products based on selected filters and models
  const filteredProducts = categoryProducts.filter((p) => {
    if (selectedFilters.length > 0 && !selectedFilters.includes(p.connector)) return false;

    if (slug in filterModels && selectedFilters.includes(p.connector) && selectedModels.length > 0) {
      return selectedModels.includes(p.model);
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-[70vh] flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      {availableFilters.length > 0 && (
        <aside className="w-full lg:w-64 border rounded-lg p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Connector / Type filters */}
          <ul className="flex flex-col gap-2">
            {availableFilters.map((f) => (
              <li key={f}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(f)}
                    onChange={() => toggleFilter(f)}
                    className="w-4 h-4"
                  />
                  <span>{f}</span>
                </label>

                {/* Sub-models if available */}
                {slug in filterModels && selectedFilters.includes(f) && filterModels[slug][f] && filterModels[slug][f].length > 0 && (
                  <ul className="ml-6 mt-2 flex flex-col gap-1">
                    {filterModels[slug][f].map((model) => (
                      <li key={model}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedModels.includes(model)}
                            onChange={() => toggleModel(model)}
                            className="w-3 h-3"
                          />
                          <span className="text-sm">{model}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {(selectedFilters.length > 0 || selectedModels.length > 0) && (
            <button
              onClick={() => { setSelectedFilters([]); setSelectedModels([]); }}
              className="mt-4 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          )}
        </aside>
      )}

      {/* Products Grid */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6 capitalize">{slug.replace("-", " ")}</h1>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                type={product.type}
                compatibleDevices={product.compatibleDevices}
                connector={product.connector}
                model={product.model}
                isHot={product.isHot}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
