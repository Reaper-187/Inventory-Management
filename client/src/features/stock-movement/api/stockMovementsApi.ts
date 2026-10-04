import axios from "axios";
import qs from "qs";
import {
  StockMovementSchema,
  StockMovementListSchema,
  type StockMovement,
  type CreateStockMovement,
  type QueryMovement,
} from "../types/stockMovements.api.types";

const STOCK_MOVEMENTS_API = `${import.meta.env.VITE_API_URL}/stock-movements`; // an dein PRODUCTS_API-Muster anpassen

export const getMovements = async (query?: QueryMovement) => {
  const response = await axios.get(STOCK_MOVEMENTS_API, {
    params: query,
    withCredentials: true,
    // das Backend/qs erwartet productId=x&productId=y (arrayFormat: 'repeat')
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return StockMovementListSchema.parse(response.data);
};

export const createMovement = async (
  data: CreateStockMovement,
): Promise<StockMovement> => {
  const response = await axios.post(STOCK_MOVEMENTS_API, data, {
    withCredentials: true,
  });

  return StockMovementSchema.parse(response.data);
};
