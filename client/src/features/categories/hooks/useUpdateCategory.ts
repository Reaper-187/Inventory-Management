import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategories } from "../api/categoriesApi";
import type { UpdateCat } from "../types/category.api.types";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCat }) =>
      updateCategories(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
