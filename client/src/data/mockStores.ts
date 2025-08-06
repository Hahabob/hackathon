// This file contains mock store data for development and testing.
// It will be used by the StoreContext or components directly when a live API is not available.
// It should export an array of objects conforming to the Store type.
// Best practice: Include a variety of store layouts and locations.

import type { Store } from "../types/Store";

export const mockStores: Store[] = [
  {
    _id: "1",
    name: "SuperSol",
    address: "123 Main Street, Tel Aviv",
    logo: "🛒",
    rating: 4.5,
    estimatedTime: "15-20 min",
    distance: "1.2 km",
    phone: "03-1234567",
    hours: "08:00 - 23:00",
    coordinates: { lat: 32.0853, lng: 34.7818 },
  },
  {
    _id: "2",
    name: "Rami Levy",
    address: "456 Ben Gurion Ave, Tel Aviv",
    logo: "🏪",
    rating: 4.3,
    estimatedTime: "12-18 min",
    distance: "0.8 km",
    phone: "03-2345678",
    hours: "07:00 - 24:00",
    coordinates: { lat: 32.0804, lng: 34.7805 },
  },
  {
    _id: "3",
    name: "Shufersal",
    address: "789 Dizengoff Street, Tel Aviv",
    logo: "🛍️",
    rating: 4.7,
    estimatedTime: "18-25 min",
    distance: "2.1 km",
    phone: "03-3456789",
    hours: "06:30 - 23:30",
    coordinates: { lat: 32.074, lng: 34.7749 },
  },
  {
    _id: "4",
    name: "Victory",
    address: "321 Rothschild Blvd, Tel Aviv",
    logo: "🥇",
    rating: 4.2,
    estimatedTime: "20-30 min",
    distance: "2.5 km",
    phone: "03-4567890",
    hours: "08:00 - 22:00",
    coordinates: { lat: 32.0644, lng: 34.7718 },
  },
  {
    _id: "5",
    name: "Mega",
    address: "654 Allenby Street, Tel Aviv",
    logo: "🏬",
    rating: 4.1,
    estimatedTime: "22-28 min",
    distance: "1.9 km",
    phone: "03-5678901",
    hours: "07:30 - 23:00",
    coordinates: { lat: 32.0663, lng: 34.7701 },
  },
];
