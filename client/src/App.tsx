// src/App.tsx
// import { Routes, Route } from "react-router-dom";
// import ProductCatalogPage from "./pages/ProductCatalogPage";
// import ShoppingCartPage from "./pages/ShoppingCartPage";
// import MapPage from "./pages/MapPage";

import Sidebar from "./components/SideBar";
import { useAuth } from "./contexts/AuthContext";
import { useSidebar } from "./contexts/SideBarContext";
import ProductList from "./components/ProductList";
// import Header from "./components/Header";
// import Navigation from "./components/Navigation";

const App = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  return (
    <>
      {/* <Header />
      <Navigation />
      <main className="px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductCatalogPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main> */}
      <button
        onClick={toggleSidebar}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {user ? user.name?.charAt(0) : `sidebar`}
      </button>
      <Sidebar />
      <ProductList />
    </>
  );
};

export default App;
