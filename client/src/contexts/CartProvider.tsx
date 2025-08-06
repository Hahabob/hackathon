// src/contexts/CartProvider.tsx
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import CartContext, { type CartContextType } from "./CartContext";
import type { CartItem } from "../types/CartItem";
import type { Product } from "@/types/Product";

interface Props {
  children: React.ReactNode;
}

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setCart(res.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const createCart = async (items: CartItem[]) => {
    console.log("Saving cart:", items);
    try {
      for (const item of items) {
        const productId =
          typeof item.product === "string" ? item.product : item.product._id;

        await api.post(
          "/cart",
          {
            productId,
            quantity: item.quantity,
          },
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Failed to save cart", error);
    }
  };

  useEffect(() => {
    if (loading) return;
    createCart(cart);
  }, [cart, loading]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.product._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p.product._id === product._id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const decrementItem = (productId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    decrementItem,
    clearCart,
    loading,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
