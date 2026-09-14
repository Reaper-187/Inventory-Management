import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGetSuppliers } from "../../hooks/useGetSupplier";

export const SupplierDropdown = () => {
  const { data: suppliers, isPending } = useGetSuppliers();
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const toggleSupplier = (supplierId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId)
        : [...prev, supplierId],
    );
  };

  return (
    <div className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Supplier Menu</Button>}
        />
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>supplier</DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              suppliers?.map((supplier) => (
                <DropdownMenuCheckboxItem
                  key={supplier.id}
                  checked={selectedSuppliers.includes(supplier.id)}
                  onCheckedChange={() => toggleSupplier(supplier.id)}
                  className="flex justify-between items-center"
                >
                  {supplier.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
