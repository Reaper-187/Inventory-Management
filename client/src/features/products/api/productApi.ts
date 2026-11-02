import qs from "qs";
import {
  ProductOptionSchema,
  type CreateProduct,
  type Product,
  type ProductOption,
  type QueryProduct,
  type UpdateProduct,
} from "../types/product.api.types";
import type { PaginationMeta } from "@/components/shared/api/pagination.types";
import { apiClient } from "@/components/shared/api/apiClient";
import z from "zod";

const PRODUCTS_API = `/api/products`;

export const getProducts = async (
  query?: QueryProduct,
): Promise<{ data: Product[]; meta: PaginationMeta }> => {
  const response = await apiClient.get(PRODUCTS_API, {
    params: query,
    // Axios serialisiert Arrays immer mit eckigen Klammern
    // (categoryId[]=x), das Backend/qs erwartet aber categoryId=x&categoryId=y
    // (arrayFormat: 'repeat'), sonst kommen categoryId/supplierId als undefined im DTO an, da der Property-Name nicht mehr matcht. !!!! wichtig
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

export const getProductOptions = async (
  status: QueryProduct["status"],
): Promise<ProductOption[]> => {
  const { data } = await apiClient.get(`${PRODUCTS_API}/options`, {
    params: { status },
  });
  // z.array convertiert data zu liste und .parse prüft den res
  return z.array(ProductOptionSchema).parse(data);
};

export const getOneProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`${PRODUCTS_API}/${id}`);
  return response.data;
};

export const createProduct = async (data: CreateProduct): Promise<Product> => {
  const response = await apiClient.post<Product>(PRODUCTS_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProduct,
): Promise<Product> => {
  const response = await apiClient.patch<Product>(
    `${PRODUCTS_API}/${id}`,
    data,
  );
  return response.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.delete<Product>(`${PRODUCTS_API}/${id}`);
  return response.data;
};

export const uploadProductImage = async (
  id: string,
  file: File,
): Promise<Product> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post<Product>(
    `${PRODUCTS_API}/${id}/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};
