// This file defines the TypeScript interface for a Store object.
// It is used in components like StoreCard.tsx and contexts like StoreContext.tsx.
// Best practice: Include all relevant store information, such as address, hours, and layout data.
// Align this type with the backend's data model for stores.

export interface Store {
  _id: string;
  name: string;
  address?: string;
  logo?: string;
  rating?: number;
  estimatedTime?: string;
  totalPrice?: number;
  distance?: string;
  phone?: string;
  hours?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
