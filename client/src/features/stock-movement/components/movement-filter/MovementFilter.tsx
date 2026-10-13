import { Input } from "@/components/ui/input";
import { ProductDropdown } from "@/features/products/components/product-dropdown/ProductDropdown";
import type { QueryMovement } from "../../types/stockMovements.api.types";
import { TypeBadgeSelect } from "../movement-type-select/TypeBadgeSelect";

interface MovementFiltersProps {
  filters: Omit<QueryMovement, "page" | "limit">;
  onFiltersChange: (filters: Omit<QueryMovement, "page" | "limit">) => void;
}

export const MovementFilters = ({
  filters,
  onFiltersChange,
}: MovementFiltersProps) => {
  const handleProductChange = (productId: string[]) => {
    onFiltersChange({
      ...filters,
      productId: productId.length ? productId : undefined,
    });
  };

  const handleTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      type: type ? (type as QueryMovement["type"]) : undefined,
    });
  };

  return (
    <div className="flex items-center justify-between px-5 my-5">
      <ProductDropdown
        value={filters.productId ?? []}
        onChange={handleProductChange}
      />

      <TypeBadgeSelect value={filters.type ?? ""} onChange={handleTypeChange} />

      <Input
        className="w-1/5"
        type="date"
        value={filters.from ?? ""}
        onChange={(event) =>
          onFiltersChange({ ...filters, from: event.target.value || undefined })
        }
      />

      <Input
        className="w-1/5"
        type="date"
        value={filters.to ?? ""}
        onChange={(event) =>
          onFiltersChange({ ...filters, to: event.target.value || undefined })
        }
      />
    </div>
  );
};
