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
import { SupplierDialog } from "../form/SupplierDialog";

type SelectionMode = "single" | "multiple";

interface SupplierDropdownProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  mode?: SelectionMode;
}

export const SupplierDropdown = ({
  value,
  onChange,
  disabled = false,
  mode = "multiple",
}: SupplierDropdownProps) => {
  const { data: suppliers, isPending } = useGetSuppliers();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const isMultipleMode = mode === "multiple";

  const handleToggle = (supplierId: string) => {
    if (!onChange) return;

    if (isMultipleMode) {
      // Multi-Select Logik
      const currentValues = (value as string[]) || [];
      const newValues = currentValues.includes(supplierId)
        ? currentValues.filter((id) => id !== supplierId)
        : [...currentValues, supplierId];
      onChange(newValues);
    } else {
      // Single-Select Logik
      const currentValue = (value as string) || "";
      onChange(currentValue === supplierId ? "" : supplierId);
    }
  };

  const isChecked = (supplierId: string) => {
    if (isMultipleMode) {
      return ((value as string[]) || []).includes(supplierId);
    } else {
      return (value as string) === supplierId;
    }
  };

  const getButtonLabel = () => {
    if (mode === "single") {
      const selected = (value as string) || "";
      if (!selected) return "Kategorie wählen";
      const cat = suppliers?.find((c) => c.id === selected);
      return cat ? cat.name : "Kategorie wählen";
    }
    return "Kategorien filtern";
  };

  return (
    <div className="flex justify-between px-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" disabled={disabled}>
              {getButtonLabel()}
            </Button>
          }
        />
        <DropdownMenuContent className="w-44">
          {isMultipleMode && (
            <Button
              variant="ghost"
              className="w-full text-xs"
              onClick={() => onChange && onChange([])}
              disabled={disabled}
            >
              Alle entfernen
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setCreateOpen(true)}
          >
            Create new Supplier
          </Button>

          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {isMultipleMode ? "Lieferanten filtern" : "Lieferant auswählen"}
            </DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              suppliers?.map((supplier) => (
                <DropdownMenuCheckboxItem
                  key={supplier.id}
                  checked={isChecked(supplier.id)}
                  onCheckedChange={() => handleToggle(supplier.id)}
                  className="flex justify-between items-center"
                  disabled={disabled}
                >
                  {supplier.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SupplierDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
