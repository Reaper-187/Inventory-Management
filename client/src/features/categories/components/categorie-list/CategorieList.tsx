import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCategories } from "../../hooks/useGetCategories";
import { CategoryDialog } from "../category-modal/CategoryDialog";
import { DeleteAlert } from "../category-modal/DeleteAlert";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@base-ui/react";

export function CategorieList() {
  const { data: categories, isPending } = useGetCategories();
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categories</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Update</TableHead>
            {/* <TableHead>created by welcher user erstellt hat</TableHead> */}
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.createdAt.toLocaleString()}</TableCell>
              <TableCell>{category.updatedAt.toLocaleString()}</TableCell>
              <TableCell className="cursor-pointer pl-4">
                <Button onClick={() => setEditingCatId(category.id)}>
                  <Edit size={15} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
