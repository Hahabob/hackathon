// src/App.tsx
// import { Routes, Route } from "react-router-dom";
// import ProductCatalogPage from "./pages/ProductCatalogPage";
// import ShoppingCartPage from "./pages/ShoppingCartPage";
// import MapPage from "./pages/MapPage";

import Sidebar from "./components/SideBar";
import { useAuth } from "./contexts/AuthContext";
import { useSidebar } from "./contexts/SideBarContext";
import { useSearch } from "./contexts/SearchContext";
import ProductList from "./components/ProductList";
import GlobalSearchBar from "./components/GlobalSearchBar";
import ProductCard from "./components/ProductCard";
import CartSummary from "./components/CartSummary";

// import Header from "./components/Header";
// import Navigation from "./components/Navigation";

const App = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const { selectedProduct, setSelectedProduct } = useSearch();

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <button
          onClick={toggleSidebar}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {user ? user.name?.charAt(0) : `sidebar`}
        </button>
        <GlobalSearchBar />
      </div>

      <Sidebar />
      <ProductList />

      <CartSummary />
      {selectedProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSelectedProduct(null)}
          />
          <ProductCard
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </>
      )}
    </>
  );
};

export default App;
