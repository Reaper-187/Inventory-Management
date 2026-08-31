import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";
import type { QueryProduct } from "../types/product.api.types";

export const useGetProducts = (query?: QueryProduct) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
  });
};
