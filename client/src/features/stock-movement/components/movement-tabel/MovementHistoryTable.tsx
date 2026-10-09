import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MovementTypeBadge } from "./MovementTypeBadge";
import type { QueryMovement } from "../../types/stockMovements.api.types";
import { useGetMovements } from "../../hooks/useGetMovements";

interface MovementHistoryTableProps {
  query: QueryMovement;
  page: number;
  onPageChange: (page: number) => void;
}

export const MovementHistoryTable = ({
  query,
  page,
  onPageChange,
}: MovementHistoryTableProps) => {
  const { data: response, isPending } = useGetMovements(query);
  const movements = response?.data;
  const meta = response?.meta;

  if (isPending) {
    return (
      <div className="flex justify-self-center items-center gap-3">
        <p>Loading</p>
        <Spinner />
        <p>movements..</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Produkt</TableHead>
            <TableHead className="hidden md:table-cell">SKU</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead className="hidden md:table-cell">Grund</TableHead>
            <TableHead>Menge</TableHead>
            <TableHead className="hidden lg:table-cell">Notiz</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements?.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell className="font-medium">
                {movement.occurredAt.toLocaleDateString()}
              </TableCell>
              <TableCell>{movement.product.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {movement.product.sku}
              </TableCell>
              <TableCell>
                <MovementTypeBadge type={movement.type} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {movement.reason}
              </TableCell>
              <TableCell>
                {movement.type === "IN" ? "+" : "-"}
                {movement.quantity}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {movement.note ?? "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-2">
        <span className="text-sm text-muted-foreground">
          Page {meta?.page} of {meta?.totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={!meta || page >= meta.totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
