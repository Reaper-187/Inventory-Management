import { Badge } from "@/components/ui/badge";
import type { MovementType } from "../../types/stockMovements.api.types";

interface MovementTypeBadgeProps {
  type: MovementType;
}

export function MovementTypeBadge({ type }: MovementTypeBadgeProps) {
  if (type === "IN") {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        Eingang
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-red-100 text-red-800">
      Ausgang
    </Badge>
  );
}
