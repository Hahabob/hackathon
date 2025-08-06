// src/components/SupermarketDragDrop/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  // other product fields if needed
}

export interface Aisle {
  id: string;
  name: string;
  products: Product[];
  color: string;
  position: number | null;
}

export interface StoreFeature {
  id: string;
  name: string;
  type: "entrance" | "exit" | "checkout" | string;
  emoji: string;
  color: string;
  position: string | null;
}

export interface BorderSpot {
  id: string;
  side: "top" | "bottom" | "left" | "right";
  position: number;
  feature: StoreFeature | null;
}

export interface GridSpot {
  id: string;
  position: number;
  aisle: Aisle | null;
}
