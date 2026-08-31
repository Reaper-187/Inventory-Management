import { useQuery } from "@tanstack/react-query";
import { getOneProduct } from "../api/productApi";

export const useGetOneProduct = (id?: string) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: () => getOneProduct(id!),
    enabled: !!id,
  });
};
