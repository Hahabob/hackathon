import { createContext } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "@/types/Product";

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  decrementItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);
export default CartContext;
