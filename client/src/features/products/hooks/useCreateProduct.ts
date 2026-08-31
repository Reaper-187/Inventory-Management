import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productApi";
import { toast } from "@/components/ui/toast";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.add({
        type: "success",
        description: "You created the new Product successfully",
      });
    },
  });
};
