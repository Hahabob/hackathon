// This file is responsible for displaying a summary of the shopping cart.
// It will interact with CartContext.tsx to get the cart's subtotal, taxes, and total.
// Best practice: Keep this component simple and focused on displaying the final costs.
// Include a clear call-to-action button for checkout.
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";

export default function CartSummary() {
  const { cart, loading, clearCart } = useCart();
  const navigate = useNavigate();
  // Calculate totals from cart items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Don't show if cart is empty or loading
  if (loading || totalItems === 0) {
    return null;
  }
  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="fixed bottom-24 left-4 right-4 z-40 mx-auto max-w-sm">
      <Button
        onClick={handleNavigateToCart}
        className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden group"
        size="lg"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content container */}
        <div className="relative flex items-center justify-between w-full px-2">
          {/* Left side - Cart icon with badge */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold min-w-5">
                  {totalItems > 99 ? "99+" : totalItems}
                </div>
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">
                {totalItems === 1 ? "1 item" : `${totalItems} items`}
              </div>
              <div className="text-xs opacity-90">Press to watch cart</div>
            </div>
          </div>

          {/* Right side - Price */}
          <div className="flex items-center space-x-2">
            <div className="text-left">
              <div className="text-lg font-bold">₪{totalPrice.toFixed(2)}</div>
              <div className="text-xs opacity-90">Total</div>
            </div>
            <X onClick={clearCart} />
          </div>
        </div>

        {/* Pulse animation for new items */}
        <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-2xl" />
      </Button>

      {/* Optional: Add a subtle shadow underneath */}
      <div className="absolute inset-0 bg-black opacity-10 rounded-2xl transform translate-y-1 -z-10" />
    </div>
  );
}
