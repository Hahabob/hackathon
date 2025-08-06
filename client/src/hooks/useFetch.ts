// This file contains a custom React hook for fetching data from an API.
// It will be used by components to simplify data fetching logic, including loading and error states.
// It will likely use the api.ts utility for making the actual requests.
// Best practice: Make the hook generic so it can be reused for different data types.
// Handle caching and re-fetching logic appropriately

import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Product } from "../types/Product";

export function useFetchProducts(storeId: string) {
  return useQuery<Product[]>({
    queryKey: ["products", storeId],
    queryFn: async () => {
      const response = await api.get(`/supermarket/${storeId}/products`);
      return response.data.data;
    },
    enabled: !storeId,
  });
}
