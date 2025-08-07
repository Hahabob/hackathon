// This component provides a modern, grid-based product display with categories and search functionality
import { useState, useMemo } from "react";
import { Search, Plus, Minus, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import useCart from "@/hooks/useCart";
import { useFetchProducts } from "@/hooks/useFetch";
import type { Product } from "@/types/Product";
import { useSearch } from "@/contexts/SearchContext";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading, error } = useFetchProducts();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { searchQuery } = useSearch();

  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const getCartQuantity = (productId: string) => {
    const item = cart.find((item) => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleIncrement = (product: Product) => {
    const currentQuantity = getCartQuantity(product._id);
    updateQuantity(product._id, currentQuantity + 1);
  };

  const handleDecrement = (product: Product) => {
    const currentQuantity = getCartQuantity(product._id);
    if (currentQuantity > 1) {
      updateQuantity(product._id, currentQuantity - 1);
    } else {
      removeFromCart(product._id);
    }
  };

  const getCategoryEmoji = (category: string) => {
    const categoryEmojis: { [key: string]: string } = {
      Fruits: "🍎",
      Produce: "🥕",
      Meat: "🥩",
      Dairy: "🥛",
      Bakery: "🍞",
      Sweets: "🍿",
      Drinks: "🥤",
      Frozen: "🧊",
      Pantry: "🥫",
      Household: "🧽",
      "Personal Care": "🧴",
      Baby: "🍼",
      Electronics: "📱",
      Pharmacy: "💊",
      default: "🛒",
      Cereal: "🥣",
      Snacks: "🍪",
      Spreads: "🥑 + 🥣",
      Salads: "🥗",
      Cooking: "🍳",
      
    };
    return categoryEmojis[category] || categoryEmojis.default;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading products: {error?.message || String(error)}
            </p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search and Filter (only show if no global search) */}
        {!searchQuery && (
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-xl"
                disabled
              />
            </div>
          </div>
        )}

        {/* Categories - Horizontal Scrollable */}
        {!searchQuery && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Categories
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 snap-x snap-mandatory scrollbar-hide">
              <style>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <button
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 snap-start ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                <div className="flex items-center gap-2">
                  <span>🛒</span>
                  <span>All Products</span>
                  <span className="text-xs opacity-75">
                    ({products.length})
                  </span>
                </div>
              </button>

              {categories.map((category) => {
                const categoryCount = products.filter(
                  (p) => p.category === category
                ).length;
                return (
                  <button
                    key={category}
                    className={`flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 snap-start ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{getCategoryEmoji(category)}</span>
                      <span>{category}</span>
                      <span className="text-xs opacity-75">
                        ({categoryCount})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Products as Full-Width Rows */}
          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const quantity = getCartQuantity(product._id);

              return (
                <Card
                  key={product._id}
                  className="border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.category}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₪{product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Cart Controls */}
                      <div
                        className="flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {quantity === 0 ? (
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                          >
                            Add to Cart
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <Button
                              size="sm"
                              onClick={() => handleDecrement(product)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-purple-500 bg-[#F08B51] text-white hover:bg-[#d97a46] transition"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 font-medium text-sm min-w-[40px] text-center">
                              {quantity}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => handleIncrement(product)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-purple-500 bg-[#8AA624] text-white hover:bg-[#7a961f] transition"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `No products match your search for "${searchQuery}"`
                  : "No products found in this category"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                  }}
                  className="mt-4"
                >
                  Show All Products
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductCard
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
