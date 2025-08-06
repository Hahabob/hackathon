import { createContext } from "react";
import type { CartItem } from "../types/CartItem";

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);
export default CartContext;
