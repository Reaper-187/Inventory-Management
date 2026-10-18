import { ProductDropdown } from "@/features/products/components/product-dropdown/ProductDropdown";
import type { QueryMovement } from "../../types/stockMovements.api.types";
import { TypeBadgeSelect } from "../movement-type-select/TypeBadgeSelect";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { StockMovementDialog } from "../form/StockMovementDialog";

interface MovementFiltersProps {
  filters: Omit<QueryMovement, "page" | "limit">;
  onFiltersChange: (filters: Omit<QueryMovement, "page" | "limit">) => void;
}

export const MovementFilters = ({
  filters,
  onFiltersChange,
}: MovementFiltersProps) => {
  const dateRange: DateRange | undefined = {
    from: filters.from ? new Date(filters.from) : undefined,
    to: filters.to ? new Date(filters.to) : undefined,
  };

  const [createOpen, setCreateOpen] = useState(false);

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

  const handleDateRangeChange = (range: DateRange | undefined) => {
    onFiltersChange({
      ...filters,
      from: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      to: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <div className="flex items-center justify-between px-5 my-5 gap-2">
      <ProductDropdown
        value={filters.productId ?? []}
        onChange={handleProductChange}
      />
      <Button onClick={() => setCreateOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Neue Bewegung
      </Button>

      <TypeBadgeSelect value={filters.type ?? ""} onChange={handleTypeChange} />

      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className={cn(
                "w-[220px] justify-start text-left font-normal",
                !dateRange?.from && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd.MM.yyyy")} -{" "}
                    {format(dateRange.to, "dd.MM.yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "dd.MM.yyyy")
                )
              ) : (
                <span>Datum wählen</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
            autoFocus
          />
        </PopoverContent>
      </Popover>

      {createOpen && (
        <StockMovementDialog open={createOpen} onOpenChange={setCreateOpen} />
      )}
    </div>
  );
};
