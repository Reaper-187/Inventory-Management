import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCategories } from "../../hooks/useGetCategories";
import { CategoryDialog } from "../form/CategoryDialog";
import { DeleteAlert } from "../category-modal/DeleteAlert";
import { useState } from "react";
import { Edit, MoreHorizontalIcon, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function CategorieTable() {
  const { data: categories, isPending } = useGetCategories();
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categories</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Update</TableHead>
            {/* <TableHead>created by welcher user erstellt hat</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.createdAt.toLocaleString()}</TableCell>
              <TableCell>{category.updatedAt.toLocaleString()}</TableCell>
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
                      onClick={() => setEditingCatId(category.id)}
                    >
                      <Edit size={15} />
                    </Button>

                    <DropdownMenuSeparator />

                    <Button
                      className="w-full flex justify-self-center"
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteCatId(category.id)}
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

      {deleteCatId && (
        <DeleteAlert
          id={deleteCatId}
          open={!!deleteCatId}
          onOpenChange={(open) => !open && setDeleteCatId(null)}
        />
      )}
      {editingCatId && (
        <CategoryDialog
          mode="edit"
          catId={editingCatId}
          open={true}
          onOpenChange={(open) => !open && setEditingCatId(null)}
        />
      )}
    </>
  );
}
