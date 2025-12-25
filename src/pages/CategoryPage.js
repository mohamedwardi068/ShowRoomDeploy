import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import ProductCard from "../myComponents/ProductCard";
import { getProducts } from "../utils/productStorage";

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

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Load all products from central storage
  const allProducts = useMemo(() => {
    const data = getProducts();
    return data.map((p) => ({
      ...p,
      categorySlug: p.type ? p.type.toLowerCase().replace(/\s+/g, "-") : "unknown",
      connector: p.connector || "Universal",
      model: p.model || null,
      compatibleDevices: Array.isArray(p.compatibleDevices) ? p.compatibleDevices : ["Universal"],
      image: p.image || p.images?.[0] || "https://placehold.co/300x400/f3f4f6/9ca3af?text=Product",
    }));
  }, []);

  // Products in this category
  const categoryProducts = allProducts.filter((p) => p.categorySlug === slug);

  // Available filters for this category
  const availableFilters = categoryFilters[slug] || [];

  // Multi-select state for filters and models
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  // Auto-select filter from URL query param
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && availableFilters.includes(filterParam)) {
      setSelectedFilters([filterParam]);
    } else {
      setSelectedFilters([]);
    }
  }, [searchParams, slug]);

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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 min-h-[70vh] flex flex-col lg:flex-row gap-8">

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold capitalize">{slug.replace("-", " ")}</h1>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          {isFiltersOpen ? <X size={20} /> : <Filter size={20} />}
          <span>Filters</span>
        </button>
      </div>

      {/* Sidebar Filters */}
      {availableFilters.length > 0 && (
        <aside className={`
          fixed inset-0 z-40 bg-white p-6 overflow-y-auto transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-64 lg:p-4 lg:bg-gray-50 lg:rounded-lg lg:h-fit lg:block
          ${isFiltersOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <h2 className="text-lg font-bold mb-4 hidden lg:block">Filters</h2>

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
        <h1 className="text-3xl font-bold mb-6 capitalize hidden lg:block">{slug.replace("-", " ")}</h1>

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
