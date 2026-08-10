import { useQuery } from "@tanstack/react-query";
import { getOneCategory } from "../api/categoriesApi";

export const useGetOneCategory = (id?: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getOneCategory(id!),
    enabled: !!id,
  });
};
