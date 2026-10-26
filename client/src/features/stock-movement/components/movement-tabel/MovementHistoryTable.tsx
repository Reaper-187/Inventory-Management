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
import { StockMovementDialog } from "../form/StockMovementDialog";
import { useState } from "react";
import { Info, MoreHorizontalIcon, RotateCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductionInfoModal } from "@/features/products/components/modal/ProductInfoModal";

interface MovementHistoryTableProps {
  query: QueryMovement;
  page: number;
  onPageChange: (page: number) => void;
  variant?: "full" | "embedded";
}

export const MovementHistoryTable = ({
  query,
  page,
  onPageChange,
  variant = "full",
}: MovementHistoryTableProps) => {
  const { data: response, isPending } = useGetMovements(query);
  const movements = response?.data;
  const meta = response?.meta;

  const [rebookProductId, setRebookProductId] = useState<string | null>(null);
  const [productInfoId, setProductInfoId] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="flex justify-self-center items-center gap-3">
        <p>Loading</p>
        <Spinner />
        <p>movements..</p>
      </div>
    );
  }

  if (!movements || movements.length === 0) {
    return (
      <div className="flex justify-center items-center py-5 text-sm text-muted-foreground">
        Keine Bewegungen gefunden
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            {variant === "full" && (
              <>
                <TableHead>Produkt</TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
              </>
            )}
            <TableHead>Typ</TableHead>
            <TableHead className="hidden md:table-cell">Grund</TableHead>
            <TableHead>Menge</TableHead>
            {variant === "full" && (
              <>
                <TableHead className="hidden lg:table-cell">Notiz</TableHead>
                <TableHead>Aktionen</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements?.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell className="font-medium">
                {movement.occurredAt.toLocaleDateString()}
              </TableCell>
              {variant === "full" && (
                <>
                  <TableCell>{movement.product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {movement.product.sku}
                  </TableCell>
                </>
              )}
              <TableCell>
                <MovementTypeBadge type={movement.type} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {movement.reason}
              </TableCell>
              <TableCell
                className={
                  movement.type === "IN" ? "text-green-500" : "text-red-500"
                }
              >
                {movement.type === "IN" ? "+" : "-"}
                {movement.quantity}
              </TableCell>
              {variant === "full" && (
                <>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {movement.note ?? "-"}
                  </TableCell>
                  <TableCell className="cursor-pointer pl-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        }
                      />

                      <DropdownMenuContent align="center">
                        <Button
                          className="w-full flex justify-self-center"
                          size="icon"
                          variant="ghost"
                          onClick={() => setProductInfoId(movement.productId)}
                        >
                          <Info size={15} />
                        </Button>

                        <DropdownMenuSeparator />
                        <Button
                          className="w-full flex justify-self-center"
                          size="icon"
                          variant="ghost"
                          onClick={() => setRebookProductId(movement.productId)}
                        >
                          <RotateCw size={15} />
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {variant === "full" && (
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
      )}

      {rebookProductId && (
        <StockMovementDialog
          open={true}
          onOpenChange={(open) => !open && setRebookProductId(null)}
          defaultProductId={rebookProductId}
        />
      )}

      {productInfoId && (
        <ProductionInfoModal
          prodId={productInfoId}
          open={!!productInfoId}
          showHistory={false}
          onOpenChange={(open) => !open && setProductInfoId(null)}
        />
      )}
    </>
  );
};
