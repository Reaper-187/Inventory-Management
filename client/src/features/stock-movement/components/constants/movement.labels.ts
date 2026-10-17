import type { MovementReason } from "../../types/stockMovements.api.types";

export const REASON_LABELS: Record<MovementReason, string> = {
  PURCHASE: "Einkauf",
  RETURN_IN: "Rückgabe",
  SALE: "Verkauf",
  DAMAGE: "Beschädigung",
  CORRECTION: "Korrektur",
};
