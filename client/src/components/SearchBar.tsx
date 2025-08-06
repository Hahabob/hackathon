import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  autoSearch?: boolean; // חיפוש אוטומטי בזמן הקלדה
  debounceMs?: number; // זמן המתנה לפני חיפוש אוטומטי
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search products...",
  className = "",
  autoSearch = true,
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Debounced search effect
  useEffect(() => {
    if (!autoSearch || !onSearch) return;

    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch, autoSearch, debounceMs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleManualSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleManualSearch();
    }
  };

  return (
    <div
      className={`relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <Search
        size={20}
        className="absolute left-3 text-gray-400 pointer-events-none"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="w-full pl-10 pr-10 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
      />

      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-10 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      {!autoSearch && (
        <button
          onClick={handleManualSearch}
          className="absolute right-3 p-1 text-blue-500 hover:text-blue-600 transition-colors"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
