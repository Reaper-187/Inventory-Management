import axios from "axios";
import type {
  Category,
  CreateCat,
  UpdateCat,
} from "../types/category.api.types";

const FETCH_CATEGORIES_API = import.meta.env.VITE_API_FETCH_CATEGORIES;
const FETCH_ONE_CATEGORY_API = import.meta.env.VITE_API_FETCH_ONE_CATEGORY;
const CREATE_CATEGORY_API = import.meta.env.VITE_API_CREATE_CATEGORY;
const UPDATE_CATEGORY_API = import.meta.env.VITE_API_UPDATE_CATEGORY;
const DELETE_CATEGORY_API = import.meta.env.VITE_API_DELETE_CATEGORY;

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(FETCH_CATEGORIES_API, {});
  return response.data;
};

export const getOneCategory = async (id: string): Promise<Category> => {
  const response = await axios.get(`${FETCH_ONE_CATEGORY_API}/${id}`);
  return response.data;
};

export const createCategories = async (data: CreateCat): Promise<Category> => {
  const response = await axios.post<Category>(CREATE_CATEGORY_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCategories = async (
  id: string,
  data: UpdateCat,
): Promise<Category> => {
  const response = await axios.put<Category>(
    `${UPDATE_CATEGORY_API}/${id}`,
    data,
  );
  return response.data;
};

export const deleteCategories = async (id: string): Promise<string> => {
  const response = await axios.delete<string>(`${DELETE_CATEGORY_API}/${id}`);
  return response.data;
};
