import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategories } from "../api/categoriesApi";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategories,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
