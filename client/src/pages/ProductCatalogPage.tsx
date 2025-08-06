import CartSummary from "@/components/CartSummary";
import ProductList from "@/components/ProductList";
import Header from "../layout/Header";
import BottomNav from "../layout/ButtonNav";

export default function ProductCatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Products" />

      {/* Main content with padding for header and bottom nav */}
      <div className="pt-16 pb-32">
        <ProductList />
      </div>

      {/* Fixed components */}
      <CartSummary />
      <BottomNav />
    </div>
  );
}
