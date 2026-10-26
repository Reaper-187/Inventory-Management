import { useState } from "react";
import { MovementHistoryTable } from "@/features/stock-movement";

interface ProductMovementHistoryProps {
  productId: string;
}

export const ProductMovementHistory = ({
  productId,
}: ProductMovementHistoryProps) => {
  const [page, setPage] = useState(1);

  return (
    <MovementHistoryTable
      query={{ productId: [productId], page, limit: 5 }}
      page={page}
      onPageChange={setPage}
      variant="embedded"
    />
  );
};
