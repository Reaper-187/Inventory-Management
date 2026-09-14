import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/features/products/components/form/ProductDialog";

export const CreateProduct = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <Button
        className="text-xs md:text-sm cursor-pointer hover:bg-primary/90"
        onClick={() => setCreateOpen(true)}
      >
        Create new Product
      </Button>
      <ProductDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
