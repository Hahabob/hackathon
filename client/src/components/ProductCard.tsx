import type { Product } from "../types/Product";
import useCart from "../hooks/useCart";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover rounded-xl mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
      />

      <h3
        className="text-xl font-semibold text-gray-900 mb-1 truncate"
        title={product.name}
      >
        {product.name}
      </h3>

      <p
        className="text-sm text-gray-600 mb-3 truncate"
        title={product.category}
      >
        {product.category}
      </p>

      <p className="mt-auto text-lg font-extrabold text-blue-700">
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={() => addToCart({ productId: product._id, quantity: 1 })}
        className="mt-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 rounded-3xl shadow-lg
               hover:from-pink-500 hover:via-red-500 hover:to-yellow-500
               active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
