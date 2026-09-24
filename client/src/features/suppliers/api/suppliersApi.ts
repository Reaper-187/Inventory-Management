import axios from "axios";
import type {
  CreateSupplier,
  Supplier,
  UpdateSupplier,
} from "../types/supplier.api.types";

const SUPPLIERS_API = `${import.meta.env.VITE_API_STATIC}/api/suppliers`;

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get<Supplier[]>(SUPPLIERS_API, {});
  return response.data;
};

export const getOneSupplier = async (id: string): Promise<Supplier> => {
  const response = await axios.get(`${SUPPLIERS_API}/${id}`);
  return response.data;
};

export const createSuppliers = async (
  data: CreateSupplier,
): Promise<Supplier> => {
  const response = await axios.post<Supplier>(SUPPLIERS_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateSuppliers = async (
  id: string,
  data: UpdateSupplier,
): Promise<Supplier> => {
  const response = await axios.patch<Supplier>(`${SUPPLIERS_API}/${id}`, data);
  return response.data;
};

export const deleteSuppliers = async (id: string): Promise<string> => {
  const response = await axios.delete<string>(`${SUPPLIERS_API}/${id}`);
  return response.data;
};
