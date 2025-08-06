import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { useFetchProducts } from "../hooks/useFetch";
import type { Product } from "../types/Product";

const GlobalSearchBar = () => {
  const { data: allProducts = [] } = useFetchProducts();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    showResults,
    setShowResults,
    setSelectedProduct,
  } = useSearch();

  const searchRef = useRef<HTMLDivElement>(null);

  // חיפוש במוצרים
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.producer.toLowerCase().includes(query)
    );

    setSearchResults(filtered);
    setShowResults(filtered.length > 0);
  }, [searchQuery, allProducts, setSearchResults, setShowResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResults]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
        <Search size={20} className="absolute left-3 text-gray-400" />

        <input
          type="text"
          placeholder="serch products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          className="w-full pl-10 pr-10 py-3 bg-transparent border-none outline-none"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* תוצאות חיפוש */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {searchResults.map((product) => (
            <button
              key={product._id}
              onClick={() => handleProductSelect(product)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-xs font-bold text-blue-600">
                    ₪{product.price}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
