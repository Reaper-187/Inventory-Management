import { MultiSelectDropdown } from "@/components/shared/dropdown-comp/MultiSelectDropdown";
import { useGetSuppliers } from "../../hooks/useGetSupplier";

interface SupplierDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const SupplierDropdown = ({
  value,
  onChange,
}: SupplierDropdownProps) => {
  const { data: suppliers, isPending } = useGetSuppliers();

  const items =
    suppliers?.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    })) ?? [];

  return (
    <MultiSelectDropdown
      items={items}
      value={value}
      onChange={onChange}
      label="Lieferanten"
      isPending={isPending}
    />
  );
};
