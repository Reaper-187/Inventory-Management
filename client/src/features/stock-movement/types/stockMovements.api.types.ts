import { PaginationMetaSchema } from "@/components/shared/api/pagination.types";
import { z } from "zod";

export const MovementTypeEnum = z.enum(["IN", "OUT"]);

export type MovementType = z.infer<typeof MovementTypeEnum>;

export const MovementReasonEnum = z.enum([
  "PURCHASE",
  "RETURN_IN",
  "SALE",
  "DAMAGE",
  "CORRECTION",
]);

export type MovementReason = z.infer<typeof MovementReasonEnum>;

export const MovementProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
});

export const StockMovementSchema = z.object({
  id: z.string(),
  productId: z.string(),
  product: MovementProductSchema,
  type: MovementTypeEnum,
  reason: MovementReasonEnum,
  quantity: z.number(),
  note: z.string().nullable(),
  salePrice: z.coerce.number().nullable(), // Prisma sendet Decimal als JSON-String daher coerce in number
  occurredAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});
export type StockMovement = z.infer<typeof StockMovementSchema>;

export const StockMovementListSchema = z.object({
  data: z.array(StockMovementSchema),
  meta: PaginationMetaSchema,
});
export type StockMovementList = z.infer<typeof StockMovementListSchema>;

export const CreateStockMovement = z.object({
  productId: z.string().uuid(),
  type: MovementTypeEnum,
  reason: MovementReasonEnum,
  quantity: z.number().int().positive(),
  note: z.string().max(500).optional(),
  salePrice: z.number().positive().optional(),
  occurredAt: z.string().optional(),
});
export type CreateStockMovement = z.infer<typeof CreateStockMovement>;

export const QueryMovementSchema = z.object({
  productId: z.array(z.string().uuid()).optional(),
  type: MovementTypeEnum.optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
});
export type QueryMovement = z.infer<typeof QueryMovementSchema>;
