import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SupplierDialog } from "@/features/suppliers/components/form/SupplierDialog";

export const CreateSupplier = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <Button
        className="text-xs md:text-sm cursor-pointer hover:bg-primary/90"
        onClick={() => setCreateOpen(true)}
      >
        Create new Supplier
      </Button>
      <SupplierDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
