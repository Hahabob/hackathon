// This file is responsible for visualizing product locations or zones within a store on the map.
// It will receive layout and product data and interact with MapCanvas.tsx to draw on the map.
// Best practice: Use distinct colors or icons to represent different product categories or zones.
// Ensure the zones are interactive (e.g., show a tooltip on hover).
import { useState } from "react";
import ProductCard from "./ProductCard";
import { useFetchProducts } from "../hooks/useFetch";

const ProductList = () => {
  const { data: products = [], isLoading, error } = useFetchProducts();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {productsInCategory.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
