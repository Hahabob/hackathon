export interface StoreSection {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
  position: { x: number; y: number }; // Percentage coordinates for placement on a map
  completed: boolean;
  products: string[]; // Array of product _ids that belong to this section
}

// Mock data for store sections. In a real application, this would come from a backend.
// The 'products' array should contain _id strings of products relevant to that section.
export const mockStoreSections: StoreSection[] = [
  {
    id: "entrance",
    name: "Entrance",
    icon: "🚪",
    position: { x: 10, y: 50 },
    completed: false,
    products: [],
  },
  {
    id: "produce",
    name: "Produce",
    icon: "🥦",
    position: { x: 30, y: 20 },
    completed: false,
    products: ["65e92123a01234567890abcd", "65e92123a01234567890abce"], // Example product _ids
  },
  {
    id: "dairy",
    name: "Dairy",
    icon: "🥛",
    position: { x: 50, y: 80 },
    completed: false,
    products: ["65e92123a01234567890abcf", "65e92123a01234567890abd0"],
  },
  {
    id: "meat",
    name: "Meat & Seafood",
    icon: "🥩",
    position: { x: 70, y: 30 },
    completed: false,
    products: ["65e92123a01234567890abd1"],
  },
  {
    id: "bakery",
    name: "Bakery",
    icon: "🍞",
    position: { x: 90, y: 60 },
    completed: false,
    products: ["65e92123a01234567890abd2"],
  },
  {
    id: "checkout",
    name: "Checkout",
    icon: "💳",
    position: { x: 95, y: 50 },
    completed: false,
    products: [],
  },
];

// You can add more complex mock data here, e.g., different sections for different stores
// For example:
// export const mockStoreMaps = {
//   "store1": [
//     { id: "entrance", name: "Entrance", icon: "🚪", position: { x: 10, y: 50 }, completed: false, products: [] },
//     // ... sections for store 1
//   ],
//   "store2": [
//     { id: "entrance", name: "Entrance", icon: "🚪", position: { x: 5, y: 50 }, completed: false, products: [] },
//     // ... sections for store 2
//   ],
// };
