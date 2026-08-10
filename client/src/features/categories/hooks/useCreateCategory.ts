import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategories } from "../api/categoriesApi";
import { toast } from "@/components/ui/toast";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.add({
        type: "success",
        description: "You created the new Category successfully",
      });
    },
  });
};
