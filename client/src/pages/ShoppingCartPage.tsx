// This file is responsible for displaying the contents of the user's shopping cart.
// It will interact with CartItem.tsx to render individual cart items and CartContext.tsx to manage cart state.
// Best practice: Allow users to easily modify item quantities or remove items from the cart.
// Clearly display the subtotal, taxes, and total.
// src/pages/Cart.tsx

import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../layout/Header";
import BottomNav from "../layout/ButtonNav";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) return <p className="p-4 text-muted-foreground">Loading...</p>;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Cart" showBackButton />

        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Start adding products to begin shopping.
            </p>
            <Button onClick={() => navigate("/products")} className="w-full">
              Browse Products
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Cart" showBackButton />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <Card
              key={item.product._id}
              className="border shadow-sm hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-muted-foreground text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.product.category || "No description"}
                    </p>
                    <p className="text-base font-bold text-primary">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center border rounded-full px-2 py-1 bg-muted">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="border shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Items ({getTotalItems()})</span>
              <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Estimated Tax</span>
              <span className="font-medium">
                ${(getTotalPrice() * 0.08).toFixed(2)}
              </span>
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                ${(getTotalPrice() * 1.08).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={() => navigate("/stores")}
          className="w-full h-12 text-base"
        >
          Choose Supermarket
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
