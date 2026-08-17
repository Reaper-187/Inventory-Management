import z from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .min(1, "Name ist erforderlich")
    .max(50, "Name darf maximal 50 Zeichen lang sein"),
  contactPerson: z
    .string()
    .min(1, "Name ist erforderlich")
    .max(50, "Name darf maximal 50 Zeichen lang sein")
    .optional(),
  email: z.email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSupplier {
  name: string;
  contactPerson?: string | null;
  email: string;
  phone?: string;
  address?: string;
}

export interface UpdateSupplier extends CreateSupplier {}
