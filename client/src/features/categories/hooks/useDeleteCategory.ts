import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategories } from "../api/categoriesApi";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategories,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
