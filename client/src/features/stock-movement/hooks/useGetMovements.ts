import { useQuery } from "@tanstack/react-query";
import { getMovements } from "../api/stockMovementsApi";
import type { QueryMovement } from "../types/stockMovements.api.types";

export const useGetMovements = (query?: QueryMovement) => {
  return useQuery({
    queryKey: ["movements", query],
    queryFn: () => getMovements(query),
  });
};
