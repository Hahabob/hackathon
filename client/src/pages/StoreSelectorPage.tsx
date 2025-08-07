import { MapPin, Filter, SortAsc, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/layout/Header";
import BottomNav from "@/layout/ButtonNav";
import StoreCard from "@/components/StoreCard";
import useCart from "@/hooks/useCart";
import { mockStores } from "../data/mockStores";
import { useNavigate } from "react-router-dom";
import type { Store } from "../types/Store";
import { useState } from "react";

const StoreSelectorPage = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Calculate totals
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  // Update store prices with actual cart total - different pricing per store
  const updatedStores = mockStores.map((store) => ({
    ...store,
    totalPrice:
      getTotalPrice() *
      (store._id === "1"
        ? 1.0 // SuperSol - base price
        : store._id === "2"
        ? 0.95 // Rami Levy - 5% discount
        : store._id === "3"
        ? 1.08 // Shufersal - 8% premium
        : store._id === "4"
        ? 1.12 // Victory - 12% premium
        : 1.05), // Mega - 5% premium
  }));

  const handleSelectStore = (store: Store) => {
    setSelectedStoreId(store._id);
    // Here you can save the selected store to context/backend if needed
    console.log(`Selected store: ${store.name}`);

    // Navigate to summary page directly (map page will be added later)
    setTimeout(() => {
      navigate("/summary", { state: { selectedStore: store } });
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Choose Store" />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading stores...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart first.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="w-full max-w-sm"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6 pt-20 pb-32">
        {/* Cart Summary */}
        <Card className="border-0 shadow-lg bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Your Cart</h3>
                <p className="text-sm text-muted-foreground">
                  {getTotalItems()} items • Base total: ₪
                  {getTotalPrice().toFixed(2)}
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Location and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Tel Aviv Area</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* Store Selection Note */}
        <Card className="border-0 shadow-sm bg-accent/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2">
              🎯 Find the Best Deal
            </h3>
            <p className="text-sm text-muted-foreground">
              Compare prices and estimated shopping time across nearby stores.
              Choose the option that works best for you.
            </p>
          </CardContent>
        </Card>

        {/* Stores List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Nearby Stores
            </h2>
            <span className="text-sm text-muted-foreground">
              {updatedStores.length} stores available
            </span>
          </div>

          <div className="space-y-4">
            {updatedStores
              .sort((a, b) => (a.totalPrice || 0) - (b.totalPrice || 0)) // Sort by price
              .map((store, index) => (
                <div key={store._id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">
                      Best Price 🏆
                    </div>
                  )}
                  <div
                    className={`transition-all duration-300 ${
                      selectedStoreId === store._id
                        ? "scale-95 opacity-60"
                        : "hover:scale-102"
                    }`}
                  >
                    <StoreCard store={store} onSelect={handleSelectStore} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Additional Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              💡 <strong>Smart Tip:</strong> Prices and times are estimated
              based on current store data and your cart contents.
            </p>
            <p className="text-xs text-muted-foreground">
              Final prices may vary. Estimated times include shopping and
              checkout.
            </p>
          </CardContent>
        </Card>

        {/* Back to Cart Button */}
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/cart")}
            className="w-full h-12"
          >
            ← Back to Cart
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default StoreSelectorPage;
