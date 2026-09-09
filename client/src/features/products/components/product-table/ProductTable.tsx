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
import { Edit, Expand, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "../../hooks/useGetProducts";
import { StockLevelBadge } from "./StockLevelBadge";
import { ProductDialog } from "../form/ProductDialog";
import { Spinner } from "@/components/ui/spinner";
import { DeleteAlert } from "@/components/shared/deleteAlert/DeleteAlert";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { ImgModal } from "../modal/ImgModal";

const IMG_BASE_URL = `${import.meta.env.VITE_API_STATIC}/api`;

export const ProductTable = () => {
  const { mutate: deleteMutation, isPending: isDeleteing } = useDeleteProduct();

  const [createOpen, setCreateOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isPending } = useGetProducts({ page, limit });
  const products = response?.data;
  const meta = response?.meta;

  const [editProdId, setEditProdId] = useState<string | null>(null);
  const [deleteProdId, setDeleteProdId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  if (isPending) {
    return (
      <div className="flex justify-self-center items-center gap-3">
        <p>Loading</p>
        <Spinner />
        <p>products..</p>
      </div>
    );
  }

  return (
    <>
      <Button
        className="flex justify-self-end"
        onClick={() => setCreateOpen(true)}
      >
        create new Product
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
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
              <TableCell className="font-medium">
                {product.imageUrl ? (
                  <div
                    className="relative w-12 h-12 md:w-20 md:h-20 cursor-pointer group"
                    onClick={() => setProductId(product.id)}
                  >
                    <img
                      className="w-12 h-12 md:w-20 md:h-20 border-1 border-black"
                      src={`${IMG_BASE_URL}${product.imageUrl}`}
                      alt="img"
                    />
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                      <Expand
                        className="
                  text-primary
                  ml-5
                  w-3 h-3
                  md:w-2.5 md:h-2.5
                  md:group-hover:w-5 md:group-hover:h-5
                  transition-all duration-200
                "
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-muted rounded" />
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                <StockLevelBadge
                  currentStock={product.currentStock}
                  minStock={product.minStock}
                />
              </TableCell>
              <TableCell>{product.price} €</TableCell>

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

      <div className="flex items-center justify-between p-2">
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
      <ProductDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {editProdId && (
        <ProductDialog
          mode="edit"
          productId={editProdId}
          open={true}
          onOpenChange={(open) => !open && setEditProdId(null)}
        />
      )}

      {deleteProdId && (
        <DeleteAlert
          id={deleteProdId}
          open={true}
          onOpenChange={(open) => !open && setDeleteProdId(null)}
          isPending={isDeleteing}
          onDelete={deleteMutation}
        />
      )}

      <ImgModal productId={productId} setProductId={setProductId} />
    </>
  );
};
