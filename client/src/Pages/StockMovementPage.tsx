import { MovementFilters } from "@/features/stock-movement/components/movement-filter/MovementFilter";
import { MovementHistoryTable } from "@/features/stock-movement/components/movement-tabel/MovementHistoryTable";
import type { QueryMovement } from "@/features/stock-movement/types/stockMovements.api.types";
import { useState } from "react";

export const StockMovementPage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Omit<QueryMovement, "page" | "limit">>(
    {},
  );
  const limit = 10;

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <MovementFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <MovementHistoryTable
        query={{ ...filters, page, limit }}
        page={page}
        onPageChange={setPage}
        variant="full"
      />
    </>
  );
};
