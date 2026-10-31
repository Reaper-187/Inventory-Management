import { CategorieDropdown } from "@/features/categories";
import type { QueryProduct } from "../../types/product.api.types";
import { SupplierDropdown } from "@/features/suppliers";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectComp } from "@/components/shared/select-comp/SelectComp";

interface ProductFiltersProps {
  filters: Omit<QueryProduct, "page" | "limit">;
  onFiltersChange: (filters: Omit<QueryProduct, "page" | "limit">) => void;
}

const STATUS_OPTIONS = [
  { value: "active", label: "Aktive Produkte" },
  { value: "all", label: "Aktive + archivierte" },
  { value: "archived", label: "Nur archivierte" },
];

export const ProductFilters = ({
  filters,
  onFiltersChange,
}: ProductFiltersProps) => {
  const handleCategoryChange = (categoryId: string[]) => {
    onFiltersChange({
      ...filters,
      categoryId,
    });
  };

  const handleSupplierChange = (supplierId: string[]) => {
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
      <SelectComp
        classes="w-fit"
        value={filters.status ?? "active"}
        onChange={(value) =>
          onFiltersChange({
            ...filters,
            status: value as QueryProduct["status"],
          })
        }
        items={STATUS_OPTIONS}
      />

      <div className="flex items-center gap-1">
        <Checkbox
          checked={(filters.lowStock ?? false) && filters.status === "active"}
          onCheckedChange={handleLowStockChange}
          disabled={(filters.status ?? "active") !== "active"}
          name="Low-on-Stock"
          className={
            filters.status !== "active"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
        />
        <p>Low-on-Stock</p>
      </div>
    </div>
  );
};
