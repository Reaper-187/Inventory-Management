import axios from "axios";
import type {
  Category,
  CreateCat,
  UpdateCat,
} from "../types/category.api.types";

const CATEGORIES_API = `${import.meta.env.VITE_API_STATIC}/api/cateogries`;

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(CATEGORIES_API, {});
  return response.data;
};

export const getOneCategory = async (id: string): Promise<Category> => {
  const response = await axios.get(`${CATEGORIES_API}/${id}`);
  return response.data;
};

export const createCategories = async (data: CreateCat): Promise<Category> => {
  const response = await axios.post<Category>(CATEGORIES_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCategories = async (
  id: string,
  data: UpdateCat,
): Promise<Category> => {
  const response = await axios.patch<Category>(`${CATEGORIES_API}/${id}`, data);
  return response.data;
};

export const deleteCategories = async (id: string): Promise<string> => {
  const response = await axios.delete<string>(`${CATEGORIES_API}/${id}`);
  return response.data;
};
