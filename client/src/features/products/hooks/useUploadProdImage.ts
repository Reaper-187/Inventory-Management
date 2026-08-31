import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProductImage } from "../api/productApi";
import { toast } from "@/components/ui/toast";

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      uploadProductImage(id, file),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products", "detail", updatedProduct.id],
      });
      toast.add({
        type: "success",
        description: "Image uploaded successfully",
      });
    },
  });
};
