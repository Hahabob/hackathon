import type { Product } from "../types/Product";
import useCart from "../hooks/useCart";
import { Button } from "./ui/button";

type Props = {
  product: Product;
  onClick?: () => void;
};

const ProductItem = ({ product, onClick }: Props) => {
  const { cart, addToCart, decrementItem } = useCart();

  const cartItem = cart.find((item) => item.productId === product._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="border rounded-lg p-4 shadow flex items-center justify-between">
      <div onClick={onClick}>
        <div>
          <p className="font-semibold ">{product.name}</p>
          <p className="text-sm text-gray-500">{product.producer}</p>
          <p className="text-sm text-blue-600">
            ₪{quantity ? product.price * quantity : product.price}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => decrementItem(product._id)}
          className="px-2 py-1 bg-red-100 rounded hover:bg-red-200 text-black"
        >
          -
        </Button>

        <span className="min-w-[24px] text-center">{quantity}</span>

        <Button
          onClick={() => addToCart({ productId: product._id, quantity: 1 })}
          className="px-2 py-1 bg-green-100 rounded hover:bg-green-200 text-black"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
