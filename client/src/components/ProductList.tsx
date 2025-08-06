// This file is responsible for visualizing product locations or zones within a store on the map.
// It will receive layout and product data and interact with MapCanvas.tsx to draw on the map.
// Best practice: Use distinct colors or icons to represent different product categories or zones.
// Ensure the zones are interactive (e.g., show a tooltip on hover).
import { useState } from "react";
import { useFetchProducts } from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import type { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
const ProductList = () => {
  const { data: products = [], isLoading, error } = useFetchProducts();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  if (isLoading) return <p>loading your products...</p>;
  if (error) return <p>error fetching products</p>;
  if (products.length === 0) return <p>no products to display</p>;

  // Group products by category
  const grouped = products.reduce(
    (acc: Record<string, typeof products>, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <div className="p-4 space-y-4">
      {Object.entries(grouped).map(([category, productsInCategory]) => (
        <div key={category} className="border rounded-lg p-4 shadow">
          <button
            className="w-full flex justify-between items-center text-left font-semibold text-lg"
            onClick={() =>
              setOpenCategory(openCategory === category ? null : category)
            }
          >
            {category}
            <span>{openCategory === category ? "▲" : "▼"}</span>
          </button>

          {openCategory === category && (
            <div className="flex flex-col space-y-2 mt-4">
              {productsInCategory.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
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
    </div>
  );
};

export default ProductList;
