import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSuppliers } from "../api/suppliersApi";

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSuppliers,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
};
