import type { Product } from "../types/Product";
import useCart from "../hooks/useCart";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="mt-1 font-bold text-blue-600">
        ₪{product.price.toFixed(2)}
      </p>
      <button
        onClick={() => addToCart({ productId: product.id, quantity: 1 })}
        className="mt-3 w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
