import React, { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  setSearchResults: (results: Product[]) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        showResults,
        setShowResults,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
