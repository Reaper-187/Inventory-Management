import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProduct } from "../types/product.api.types";
import { updateProduct } from "../api/productApi";
import { toast } from "@/components/ui/toast";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProduct }) =>
      updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products", "detail", updatedProduct.id],
      });
      toast.add({
        type: "success",
        description: "Product updated successfully",
      });
    },
  });
};
