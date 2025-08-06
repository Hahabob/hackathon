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

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setCart(res.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart", error);
        setCart([]); // Set empty cart on error
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      // Debug log
      console.log("Adding to cart:", { productId: product._id, quantity });

      // Sync with backend first for consistency
      const res = await api.post(
        "/cart",
        {
          productId: product._id,
          quantity: quantity,
        },
        { withCredentials: true }
      );

      console.log("Backend response:", res.data);

      // Update local state with backend response
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/${productId}`, {
        withCredentials: true,
      });

      // Update local state with backend response
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return removeFromCart(productId);
    }

    try {
      const res = await api.patch(
        `/cart/${productId}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );

      // Update local state with backend response
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const decrementItem = (productId: string) => {
    const item = cart.find((item) => item.product._id === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  const incrementItem = (productId: string) => {
    const item = cart.find((item) => item.product._id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete("/cart", { withCredentials: true });

      // Update local state with backend response
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    decrementItem,
    incrementItem,
    updateQuantity,
    clearCart,
    loading,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
