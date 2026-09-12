import axios from "axios";
import type {
  CreateProduct,
  PaginationMeta,
  Product,
  QueryProduct,
  UpdateProduct,
} from "../types/product.api.types";

const PRODUCTS_API = `${import.meta.env.VITE_API_STATIC}/api/products`;

export const getProducts = async (
  query?: QueryProduct,
): Promise<{ data: Product[]; meta: PaginationMeta }> => {
  const response = await axios.get(PRODUCTS_API, { params: query });
  return response.data;
};

export const getOneProduct = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${PRODUCTS_API}/${id}`);
  return response.data;
};

export const createProduct = async (data: CreateProduct): Promise<Product> => {
  const response = await axios.post<Product>(PRODUCTS_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProduct,
): Promise<Product> => {
  const response = await axios.patch<Product>(`${PRODUCTS_API}/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await axios.delete<Product>(`${PRODUCTS_API}/${id}`);
  return response.data;
};

export const uploadProductImage = async (
  id: string,
  file: File,
): Promise<Product> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post<Product>(
    `${PRODUCTS_API}/${id}/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};
