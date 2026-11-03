import type {
  Category,
  CreateCat,
  UpdateCat,
} from "../types/category.api.types";
import { apiClient } from "@/components/shared/api/apiClient";

const CATEGORIES_API = `/api/categories`;

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>(CATEGORIES_API, {});
  return response.data;
};

export const getOneCategory = async (id: string): Promise<Category> => {
  const response = await apiClient.get(`${CATEGORIES_API}/${id}`);
  return response.data;
};

export const createCategories = async (data: CreateCat): Promise<Category> => {
  const response = await apiClient.post<Category>(CATEGORIES_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCategories = async (
  id: string,
  data: UpdateCat,
): Promise<Category> => {
  const response = await apiClient.patch<Category>(
    `${CATEGORIES_API}/${id}`,
    data,
  );
  return response.data;
};

export const deleteCategories = async (id: string): Promise<string> => {
  const response = await apiClient.delete<string>(`${CATEGORIES_API}/${id}`);
  return response.data;
};
