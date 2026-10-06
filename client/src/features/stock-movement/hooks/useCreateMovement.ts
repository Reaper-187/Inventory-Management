import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovement } from "../api/stockMovementsApi";

export const useCreateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movements"] });
      // currentStock ändert sich bei jeder Buchung → Produktliste/-detail muss neu laden
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
