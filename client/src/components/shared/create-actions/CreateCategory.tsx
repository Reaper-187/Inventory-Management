import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "@/features/categories/components/form/CategoryDialog";

export const CreateCategory = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <Button
        className="text-xs md:text-sm cursor-pointer hover:bg-primary/90"
        onClick={() => setCreateOpen(true)}
      >
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
