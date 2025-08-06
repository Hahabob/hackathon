// This file is responsible for visualizing product locations or zones within a store on the map.
// It will receive layout and product data and interact with MapCanvas.tsx to draw on the map.
// Best practice: Use distinct colors or icons to represent different product categories or zones.
// Ensure the zones are interactive (e.g., show a tooltip on hover).
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useFetchProducts } from "../hooks/useFetch";

const ProductList = () => {
  const { storeId } = useParams<{ storeId: string }>();

  if (!storeId) return <p>didnt found store ID</p>;

  const { data: products = [], isLoading, error } = useFetchProducts(storeId);

  if (isLoading) return <p>loading your products...</p>;
  if (error) return <p> error fetching products</p>;
  if (products.length === 0) return <p>no products to display</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
