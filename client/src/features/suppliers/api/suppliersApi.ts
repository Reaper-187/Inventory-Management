import axios from "axios";
import type {
  CreateSupplier,
  Supplier,
  UpdateSupplier,
} from "../types/supplier.api.types";

const FETCH_SUPPLIERS_API = import.meta.env.VITE_API_FETCH_SUPPLIERS;
const FETCH_ONE_SUPPLIER_API = import.meta.env.VITE_API_FETCH_ONE_SUPPLIER;
const CREATE_SUPPLIER_API = import.meta.env.VITE_API_CREATE_SUPPLIER;
const UPDATE_SUPPLIER_API = import.meta.env.VITE_API_UPDATE_SUPPLIER;
const DELETE_SUPPLIER_API = import.meta.env.VITE_API_DELETE_SUPPLIER;

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get<Supplier[]>(FETCH_SUPPLIERS_API, {});
  return response.data;
};

export const getOneSupplier = async (id: string): Promise<Supplier> => {
  const response = await axios.get(`${FETCH_ONE_SUPPLIER_API}/${id}`);
  return response.data;
};

export const createSuppliers = async (
  data: CreateSupplier,
): Promise<Supplier> => {
  const response = await axios.post<Supplier>(CREATE_SUPPLIER_API, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateSuppliers = async (
  id: string,
  data: UpdateSupplier,
): Promise<Supplier> => {
  const response = await axios.put<Supplier>(
    `${UPDATE_SUPPLIER_API}/${id}`,
    data,
  );
  return response.data;
};

export const deleteSuppliers = async (id: string): Promise<string> => {
  const response = await axios.delete<string>(`${DELETE_SUPPLIER_API}/${id}`);
  return response.data;
};
