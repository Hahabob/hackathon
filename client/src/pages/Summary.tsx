import {
  CheckCircle,
  Share2,
  RotateCcw,
  Clock,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../layout/Header";
import BottomNav from "../layout/ButtonNav";
import useCart from "@/hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Summary = () => {
  const { cart, clearCart, loading } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Get selected store from navigation state
  const selectedStore = location.state?.selectedStore;

  // Calculate totals
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const finalTotal = getTotalPrice() * 1.08; // Including 8% tax

  const handleShare = async () => {
    const shareText = `Just completed my smart shopping! Total: ₪${finalTotal.toFixed(
      2
    )} for ${getTotalItems()} items using SmartCart.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "SmartCart Shopping Complete",
          text: shareText,
          url: window.location.origin,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        // You can add a toast notification here if you have a toast system
        alert("Shopping summary copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleStartOver = () => {
    clearCart();
    navigate("/");
  };

  const handleRating = (value: number) => {
    setRating(value);
    // Here you can send the rating to your backend
    console.log(`User rated: ${value} stars`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Summary" showBackButton />
        <div className="container mx-auto px-4 py-6 pt-20 pb-32">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading summary...</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Summary" showBackButton />
        <div className="container mx-auto px-4 py-6 pt-20 pb-32">
          <div className="text-center py-12">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No items to summarize
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart first.
            </p>
            <Button onClick={() => navigate("/")} className="w-full max-w-sm">
              Start Shopping
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Shopping Complete" showBackButton />

      <div className="container mx-auto px-4 py-6 space-y-6 pt-20 pb-32">
        {/* Success Message */}
        <Card className="border-0 shadow-lg text-center">
          <CardContent className="p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Shopping Complete!
            </h1>
            <p className="text-muted-foreground">
              Congratulations! You've successfully completed your smart shopping
              trip.
            </p>
          </CardContent>
        </Card>

        {/* Trip Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Trip Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Store</span>
                </div>
                <span className="font-medium">
                  {selectedStore?.name || "SmartCart Store"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Items</span>
                </div>
                <span className="font-medium">{getTotalItems()} products</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Shopping Time</span>
                </div>
                <span className="font-medium">
                  {selectedStore?.estimatedTime || "Efficient & Fast"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cost Breakdown
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({getTotalItems()} items)
                </span>
                <span className="font-medium">
                  ₪{getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">
                  ₪{(getTotalPrice() * 0.08).toFixed(2)}
                </span>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">
                    Total Paid
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ₪{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Items */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Items Purchased
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} • {item.product.category}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ₪{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleShare} className="h-12">
            <Share2 className="h-4 w-4 mr-2" />
            Share Trip
          </Button>

          <Button onClick={handleStartOver} className="h-12">
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>

        {/* Rating Feedback */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How was your SmartCart experience?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your feedback helps us improve our service
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </Button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-primary mt-3">
                Thank you for rating us {rating} star{rating !== 1 ? "s" : ""}!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Thank You Message */}
        <div className="text-center py-6">
          <p className="text-muted-foreground">
            Thank you for using SmartCart! 🛒✨
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Summary;
