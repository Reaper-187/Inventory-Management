import { z } from "zod";

import { categorySchema } from "@/features/categories/types/category.api.types";
import { supplierSchema } from "@/features/suppliers/types/supplier.api.types";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  sku: z.string(),
  description: z.string().nullable(),
  price: z.coerce.number(),
  imageUrl: z.string().nullable(),
  minStock: z.number(),
  currentStock: z.number(),
  categoryId: z.string().uuid(),
  supplierId: z.string().uuid(),
  category: categorySchema,
  supplier: supplierSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProd = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0),
  minStock: z.number().min(0).optional(),
  currentStock: z.number().min(1),
  categoryId: z.string().uuid(),
  supplierId: z.string().uuid(),
});

export type CreateProduct = z.infer<typeof CreateProd>;

export const UpdateProd = CreateProd.partial();

export type UpdateProduct = z.infer<typeof UpdateProd>;

export const QueryProductSchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
  lowStock: z.boolean().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
});

export type QueryProduct = z.infer<typeof QueryProductSchema>;

export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
