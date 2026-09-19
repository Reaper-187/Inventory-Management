import { ProductFilters } from "@/features/products/components/product-filter/ProductFilters";
import { ProductTable } from "@/features/products/components/product-table/ProductTable";
import type { QueryProduct } from "@/features/products/types/product.api.types";
import { useState } from "react";

export const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Omit<QueryProduct, "page" | "limit">>(
    {},
  );
  const limit = 10;

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <ProductFilters filters={filters} onFiltersChange={handleFiltersChange} />
      <ProductTable
        query={{ ...filters, page, limit }}
        page={page}
        onPageChange={setPage}
      />
    </>
  );
};
