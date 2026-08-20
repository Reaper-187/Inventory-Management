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
import { Edit, Info, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/shared/deleteAlert/DeleteAlert";
import { useDeleteSupplier } from "../../hooks/useDeleteSupplier";
import { useGetSuppliers } from "../../hooks/useGetSupplier";
import { SupplierDialog } from "../form/SupplierDialog";
import { SuppInfoModal } from "../modal-comp/SuppInfoModal";

export function SupplierTable() {
  const { mutate: deleteSuppMutation, isPending: isDeleteing } =
    useDeleteSupplier();
  const { data: suppliers, isPending } = useGetSuppliers();
  const [editingSupId, setEditingSupId] = useState<string | null>(null);
  const [deleteSupId, setDeleteSupId] = useState<string | null>(null);
  const [infoSuppId, setInfoSuppId] = useState<string | null>(null);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Suppliers</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>last Update</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>created by welcher user erstellt hat</TableHead> */}
            <TableHead>Contact-Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers?.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.createdAt.toLocaleString()}</TableCell>
              <TableCell>{supplier.updatedAt.toLocaleString()}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.contactPerson}</TableCell>
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
                      onClick={() => setEditingSupId(supplier.id)}
                    >
                      <Edit size={15} />
                    </Button>

                    <DropdownMenuSeparator />

                    <Button
                      className="w-full flex justify-self-center"
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteSupId(supplier.id)}
                    >
                      <Trash2 color="red" size={15} />
                    </Button>
                    <DropdownMenuSeparator />

                    <Button
                      className="w-full flex justify-self-center"
                      size="icon"
                      variant="ghost"
                      onClick={() => setInfoSuppId(supplier.id)}
                    >
                      <Info size={15} />
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deleteSupId && (
        <DeleteAlert
          id={deleteSupId}
          open={!!deleteSupId}
          onOpenChange={(open) => !open && setDeleteSupId(null)}
          isPending={isDeleteing}
          onDelete={deleteSuppMutation}
        />
      )}
      {editingSupId && (
        <SupplierDialog
          mode="edit"
          suppId={editingSupId}
          open={true}
          onOpenChange={(open) => !open && setEditingSupId(null)}
        />
      )}

      {infoSuppId && (
        <SuppInfoModal
          supId={infoSuppId}
          open={!!infoSuppId}
          onOpenChange={(open) => !open && setInfoSuppId(null)}
        />
      )}
    </>
  );
}
