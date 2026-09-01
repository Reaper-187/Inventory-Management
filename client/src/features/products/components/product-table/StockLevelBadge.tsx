import { Badge } from "@/components/ui/badge";

interface StockLevelBadgeProps {
  currentStock: number;
  minStock: number;
}

export function StockLevelBadge({
  currentStock,
  minStock,
}: StockLevelBadgeProps) {
  if (currentStock === 0) {
    return <Badge variant="destructive">Ausverkauft</Badge>;
  }
  if (currentStock <= minStock) {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Niedrig
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800">
      OK
    </Badge>
  );
}
