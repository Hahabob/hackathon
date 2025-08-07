import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb"; // Import the new icon

import ProductCatalogPage from "./pages/ProductCatalogPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Summary from "./pages/Summary";
import StoreSelectorPage from "./pages/StoreSelectorPage";
import MapPage from "./pages/MapPage"; // Back to original MapPage

import Sidebar from "./components/SideBar";
import { useAuth } from "./contexts/AuthContext";
import { useSidebar } from "./contexts/SideBarContext";
import { useSearch } from "./contexts/SearchContext";
import GlobalSearchBar from "./components/GlobalSearchBar";
import ProductCard from "./components/ProductCard";
import StartPage from "./pages/StartPage";
// import MapPage from "./pages/MapPage";
// Import Toaster

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
          <TbLayoutSidebarRightExpandFilled className="h-6 w-6" />{" "}
          {/* Use the new icon */}
        </button>
        {window.location.pathname !== "/" && <GlobalSearchBar />}
      </div>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/stores" element={<StoreSelectorPage />} />
          <Route path="/summary" element={<Summary />} />

          <Route path="/store-map" element={<MapPage />} />
        </Routes>
      </BrowserRouter>
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
