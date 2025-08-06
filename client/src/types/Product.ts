// This file defines the TypeScript interface for a Product object.
// It is used throughout the application, especially in components like ProductCard.tsx and in the CartContext.
// Best practice: Keep the type definition clear and well-documented.
// Ensure it matches the data structure returned by the backend API.
export interface Product {
  _id: string;
  name: string;
  producer: string;
  price: number;
  image?: string;
  category: string;
}
