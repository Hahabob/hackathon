// This file defines the TypeScript interface for an item in the shopping cart.
// It will be used by CartContext.tsx and components like CartItem.tsx.
// Best practice: This type should compose the Product type and add cart-specific properties like quantity.

import type { Product } from "./Product";

// This helps in keeping the data normalized.
export interface CartItem {
  product: Product;
  quantity: number;
}
