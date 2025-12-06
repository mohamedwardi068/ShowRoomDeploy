import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowLeft, Sparkles, Scale } from "lucide-react";

const Compare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem("compare") || "[]");
    setCompareList(storedCompare);
  }, [location.state]);

  const removeFromCompare = (productId) => {
    const updatedList = compareList.filter((product) => product.id !== productId);
    localStorage.setItem("compare", JSON.stringify(updatedList));
    setCompareList(updatedList);
    window.dispatchEvent(new Event("compareUpdated"));
  };

  const clearAll = () => {
    localStorage.setItem("compare", JSON.stringify([]));
    setCompareList([]);
    window.dispatchEvent(new Event("compareUpdated"));
  };

  if (!compareList.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 blur-3xl opacity-30 animate-pulse"></div>
          <Scale className="relative w-24 h-24 text-slate-300 mb-6 stroke-1" />
        </div>
        
        <h2 className="text-4xl font-light text-slate-800 mb-3 tracking-tight">
          No Products to Compare
        </h2>
        <p className="text-slate-500 mb-8 font-light tracking-wide">Select items to compare their features</p>
        
        <button
          onClick={() => navigate("/")}
          className="group relative px-8 py-3.5 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative flex items-center gap-2 font-light tracking-widest text-sm">
            <Sparkles className="w-4 h-4" />
            CONTINUE SHOPPING
          </span>
        </button>
      </div>
    );
  }

  const keys = Array.from(
    new Set(compareList.flatMap((product) => Object.keys(product)))
  ).filter((key) => key !== "id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => navigate(-1)}
              className="group p-3 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-300 border border-slate-200/50"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
            </button>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-2 tracking-tight">
                Compare Products
              </h1>
              <p className="text-slate-500 font-light tracking-wider text-sm">
                {compareList.length} {compareList.length === 1 ? 'Item' : 'Items'} Selected
              </p>
            </div>

            <button
              onClick={clearAll}
              className="group px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 border border-slate-200/50 font-light tracking-wider text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Compare Table */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 backdrop-blur-sm">
                  <tr>
                    <th className="sticky left-0 bg-gradient-to-r from-slate-50/80 to-slate-100/80 backdrop-blur-sm px-8 py-6 border-r border-slate-200/50 text-left">
                      <span className="text-slate-700 font-light tracking-wider text-sm uppercase">Feature</span>
                    </th>

                    {compareList.map((product, index) => (
                      <th key={index} className="px-8 py-6 min-w-[280px]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-left">
                            <p className="font-medium text-slate-800 mb-1 tracking-tight">{product.name}</p>
                            <p className="text-sm text-slate-500 font-light tracking-wide">
                              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="group/btn p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-slate-900 hover:scale-110 transition-all duration-300 border border-slate-200/50"
                          >
                            <X className="w-4 h-4 text-slate-600 group-hover/btn:text-white transition-colors" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/30">
                  {keys.map((key, index) => (
                    <tr 
                      key={key} 
                      className={`transition-colors duration-200 ${
                        index % 2 ? "bg-slate-50/30" : "bg-white/30"
                      } hover:bg-slate-100/50`}
                    >
                      <td className="sticky left-0 px-8 py-5 bg-inherit backdrop-blur-sm border-r border-slate-200/50 font-light capitalize tracking-wide text-slate-700">
                        {key.replace(/_/g, " ")}
                      </td>

                      {compareList.map((product, pIndex) => (
                        <td key={`${pIndex}-${key}`} className="px-8 py-5">
                          {typeof product[key] === "object" ? (
                            <pre className="text-xs font-light text-slate-600 bg-slate-100/50 rounded-lg p-3 overflow-x-auto">
                              {JSON.stringify(product[key], null, 2)}
                            </pre>
                          ) : (
                            <span className="text-slate-700 font-light">
                              {product[key]?.toString() || "—"}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer accent */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 font-light tracking-widest text-xs uppercase">
              Make informed decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;