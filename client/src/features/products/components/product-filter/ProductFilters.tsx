import { CategorieDropdown } from "@/features/categories";
import type { QueryProduct } from "../../types/product.api.types";
import { SupplierDropdown } from "@/features/suppliers";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFiltersProps {
  filters: Omit<QueryProduct, "page" | "limit">;
  onFiltersChange: (filters: Omit<QueryProduct, "page" | "limit">) => void;
}

export const ProductFilters = ({
  filters,
  onFiltersChange,
}: ProductFiltersProps) => {
  const handleCategoryChange = (categoryId: string[]) => {
    console.log("categoryId", categoryId);
    onFiltersChange({
      ...filters,
      categoryId,
    });
  };

  const handleSupplierChange = (supplierId: string[]) => {
    console.log("supplierId", supplierId);
    onFiltersChange({
      ...filters,
      supplierId,
    });
  };

  const handleLowStockChange = (lowStock: boolean) => {
    onFiltersChange({
      ...filters,
      lowStock,
    });
  };

  return (
    <div className="flex items-center justify-between px-5 my-5">
      <Input
        className="w-1/5"
        placeholder="Search"
        value={filters.search ?? ""}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            search: event.target.value,
          })
        }
      />
      <CategorieDropdown
        value={filters.categoryId ?? []}
        onChange={handleCategoryChange}
      />
      <SupplierDropdown
        value={filters.supplierId ?? []}
        onChange={handleSupplierChange}
      />

      <div className="flex items-center gap-1">
        <Checkbox
          checked={filters.lowStock ?? false}
          onCheckedChange={handleLowStockChange}
          name="Low-on-Stock"
        />
        <p>Low-on-Stock</p>
      </div>
    </div>
  );
};
