import CartSummary from "@/components/CartSummary";
import ProductList from "@/components/ProductList";

export default function ProductCatalogPage() {
  return (
    <div>
      <ProductList />
      <CartSummary />
    </div>
  );
}
