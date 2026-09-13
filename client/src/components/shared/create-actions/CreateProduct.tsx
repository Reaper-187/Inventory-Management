import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/features/products/components/form/ProductDialog";

export const CreateProduct = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setCreateOpen(true)}>Create new Product</Button>
      <ProductDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
