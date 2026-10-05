import z from "zod";

export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
