import { useQuery } from "@tanstack/react-query";
import type { QueryProduct } from "../types/product.api.types";
import { getProductOptions } from "../api/productApi";

export const useGetProductOptions = (status: QueryProduct["status"]) =>
  useQuery({
    queryKey: ["products", "options", status],
    queryFn: () => getProductOptions(status),
  });
