// This file contains mock product data for development and testing purposes.
// It will be used to populate the application with data before the backend API is ready.
// It should export an array of objects conforming to the Product type.
// Best practice: Generate realistic-looking data.
import { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Apple",
    price: 3,
    category: "Fruits",
    image: "https://via.placeholder.com/100x100?text=Apple",
  },
  {
    id: "2",
    name: "Milk",
    price: 5,
    category: "Dairy",
    image: "https://via.placeholder.com/100x100?text=Milk",
  },
  {
    id: "3",
    name: "Bread",
    price: 4,
    category: "Bakery",
    image: "https://via.placeholder.com/100x100?text=Bread",
  },
  {
    id: "4",
    name: "Tomato",
    price: 2,
    category: "Vegetables",
    image: "https://via.placeholder.com/100x100?text=Tomato",
  },
];
