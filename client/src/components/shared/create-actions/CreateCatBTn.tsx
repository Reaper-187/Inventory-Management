import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "@/features/categories/components/form/CategoryDialog";

export const CreateCategory = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <Button variant="outline" onClick={() => setCreateOpen(true)}>
        Create new Category
      </Button>
      <CategoryDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
