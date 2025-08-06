// src/App.tsx
import { Routes, Route } from "react-router-dom";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import MapPage from "./pages/MapPage";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Header />
      <Navigation />
      <main className="px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductCatalogPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
