import {
  StockMovementSchema,
  StockMovementListSchema,
  type StockMovement,
  type CreateStockMovement,
  type QueryMovement,
  type StockMovementList,
} from "../types/stockMovements.api.types";
import { apiClient } from "@/components/shared/api/apiClient";

const STOCK_MOVEMENTS_API = `/api/stock-movements`;

const toEndOfDay = (date?: string) =>
  date ? `${date}T23:59:59.999` : undefined;

export const getMovements = async (
  query?: QueryMovement,
): Promise<StockMovementList> => {
  const { data } = await apiClient.get(STOCK_MOVEMENTS_API, {
    params: query && { ...query, to: toEndOfDay(query.to) },
  });

  return StockMovementListSchema.parse(data);
};

export const createMovement = async (
  payload: CreateStockMovement,
): Promise<StockMovement> => {
  const { data } = await apiClient.post(STOCK_MOVEMENTS_API, payload);

  return StockMovementSchema.parse(data);
};
