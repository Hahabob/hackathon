// This component provides a modern, grid-based product display with categories and search functionality
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import ProductItem from "./ProductItem";
import useCart from "@/hooks/useCart";
import { useFetchProducts } from "@/hooks/useFetch";
import type { Product } from "@/types/Product";
import { useSearch } from "@/contexts/SearchContext";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading, error } = useFetchProducts();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const getCategoryEmoji = (category: string) => {
    const categoryEmojis: { [key: string]: string } = {
      Fruits: "🍎",
      Vegetables: "🥕",
      Meat: "🥩",
      Dairy: "🥛",
      Bakery: "🍞",
      Snacks: "🍿",
      Beverages: "🥤",
      Frozen: "🧊",
      Pantry: "🥫",
      Household: "🧽",
      "Personal Care": "🧴",
      Baby: "🍼",
      Electronics: "📱",
      Pharmacy: "💊",
      default: "🛒",
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
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Categories */}
        {!searchQuery && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              <Card
                className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === "All"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🛒</div>
                  <p className="font-medium text-sm">All</p>
                  <p className="text-xs text-muted-foreground">
                    {products.length}
                  </p>
                </CardContent>
              </Card>

              {categories.map((category) => {
                const categoryCount = products.filter(
                  (p) => p.category === category
                ).length;
                return (
                  <Card
                    key={category}
                    className={`cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">
                        {getCategoryEmoji(category)}
                      </div>
                      <p className="font-medium text-sm">{category}</p>
                      <p className="text-xs text-muted-foreground">
                        {categoryCount} items
                      </p>
                    </CardContent>
                  </Card>
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

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className="relative">
                  <ProductItem
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="border shadow-sm hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₪{product.price}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="rounded-xl"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
