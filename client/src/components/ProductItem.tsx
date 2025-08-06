import type { Product } from "../types/Product";
import useCart from "../hooks/useCart";

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const { cart, addToCart, decrementItem } = useCart();

  const cartItem = cart.find((item) => item.productId === product._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="border rounded-lg p-4 shadow flex items-center justify-between">
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">{product.producer}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => decrementItem(product._id)}
          className="px-2 py-1 bg-red-100 rounded hover:bg-red-200"
        >
          -
        </button>

        <span className="min-w-[24px] text-center">{quantity}</span>

        <button
          onClick={() => addToCart({ productId: product._id, quantity: 1 })}
          className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
