import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSuppliers } from "../api/suppliersApi";
import type { UpdateSupplier } from "../types/supplier.api.types";

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplier }) =>
      updateSuppliers(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};
