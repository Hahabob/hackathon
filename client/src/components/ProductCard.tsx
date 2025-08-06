import { X, Trash2, Minus, Plus } from "lucide-react";
import type { Product } from "../types/Product";
import useCart from "../hooks/useCart";

type Props = {
  product: Product;
  onClose: () => void;
};

const ProductCard = ({ product, onClose }: Props) => {
  const { cart, addToCart, decrementItem, removeFromCart } = useCart();
  const quantity =
    cart.find((item) => item.productId === product._id)?.quantity || 0;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl z-50 bg-white border rounded-2xl shadow-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X />
        </button>
      </div>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />

      <p className="text-gray-600 mb-2">Category: {product.category}</p>
      <p className="text-lg font-bold text-blue-600 mb-4">
        ${product.price.toFixed(2)}
      </p>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => decrementItem(product._id)}
          className="bg-red-100 p-2 rounded hover:bg-red-200"
        >
          <Minus size={16} />
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={() => addToCart({ productId: product._id, quantity: 1 })}
          className="bg-green-100 p-2 rounded hover:bg-green-200"
        >
          <Plus size={16} />
        </button>
        {quantity > 0 && (
          <button
            onClick={() => removeFromCart(product._id)}
            className="ml-auto bg-gray-100 p-2 rounded hover:bg-gray-200 text-red-500"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
