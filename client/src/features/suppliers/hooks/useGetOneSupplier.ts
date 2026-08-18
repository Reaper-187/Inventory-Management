import { useQuery } from "@tanstack/react-query";
import { getOneSupplier } from "../api/suppliersApi";

export const useGetOneSupplier = (id?: string) => {
  return useQuery({
    queryKey: ["suppliers", id],
    queryFn: () => getOneSupplier(id!),
    enabled: !!id,
  });
};
