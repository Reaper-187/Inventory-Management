import type {
  CreateSupplier,
  Supplier,
  UpdateSupplier,
} from "../types/supplier.api.types";
import { apiClient } from "@/components/shared/api/apiClient";

const SUPPLIERS_API = `/api/suppliers`;

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await apiClient.get<Supplier[]>(SUPPLIERS_API, {});
  return response.data;
};

export const getOneSupplier = async (id: string): Promise<Supplier> => {
  const response = await apiClient.get(`${SUPPLIERS_API}/${id}`);
  return response.data;
};

export const createSuppliers = async (
  data: CreateSupplier,
): Promise<Supplier> => {
  const response = await apiClient.post<Supplier>(SUPPLIERS_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateSuppliers = async (
  id: string,
  data: UpdateSupplier,
): Promise<Supplier> => {
  const response = await apiClient.patch<Supplier>(
    `${SUPPLIERS_API}/${id}`,
    data,
  );
  return response.data;
};

export const deleteSuppliers = async (id: string): Promise<string> => {
  const response = await apiClient.delete<string>(`${SUPPLIERS_API}/${id}`);
  return response.data;
};
