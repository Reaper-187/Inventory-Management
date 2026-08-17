import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSuppliers } from "../api/suppliersApi";
import { toast } from "@/components/ui/toast";

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSuppliers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.add({
        type: "success",
        description: "You created the new Supplier successfully",
      });
    },
  });
};
