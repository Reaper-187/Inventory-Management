import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "../../hooks/useGetProducts";
import { StockLevelBadge } from "./StockLevelBadge";

export const ProductTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isPending } = useGetProducts({ page, limit });
  const products = response?.data;
  const meta = response?.meta;

  const [editProdId, setEditProdId] = useState<string | null>(null);
  const [deleteProdId, setDeleteProdId] = useState<string | null>(null);

  if (isPending) {
    return <p>Loading products...</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                <StockLevelBadge
                  currentStock={product.currentStock}
                  minStock={product.minStock}
                />
              </TableCell>
              <TableCell>{product.price.toFixed(2)} €</TableCell>

              <TableCell className="cursor-pointer pl-6">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="size-8">
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
                      onClick={() => setEditProdId(product.id)}
                    >
                      <Edit size={15} />
                    </Button>

                    <DropdownMenuSeparator />

                    <Button
                      className="w-full flex justify-self-center"
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteProdId(product.id)}
                    >
                      <Trash2 color="red" size={15} />
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          Page {meta?.page} of {meta?.totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!meta || page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
