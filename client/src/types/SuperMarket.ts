// types/Supermarket.ts

export interface GridItem {
  _id: string;
  type: "aisle" | "feature" | "product";
  name: string;
  position: { i: number; j: number }; // row/col in grid
}

export interface Aisle {
  _id: string;
  name: string;
  items: string[]; // product IDs or item names
}

export interface StoreFeature {
  _id: string;
  name: string;
  description?: string;
}

export interface SuperMarket {
  _id: string;
  name: string;
  location: string;
  aisles: Aisle[];
  features: StoreFeature[];
  layout: GridItem[][]; // 2D grid of items (null/empty slots may be optional)
  createdAt?: string;
  updatedAt?: string;
}
