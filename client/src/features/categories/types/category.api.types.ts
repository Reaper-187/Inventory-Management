import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name ist erforderlich")
    .max(50, "Name darf maximal 50 Zeichen lang sein"),
  description: z.string().optional(),
});

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCat {
  name: string;
  description?: string | null;
}

export interface UpdateCat extends CreateCat {}
