import { SelectComp } from "@/components/shared/select-comp/SelectComp";
import { useGetSuppliers } from "../../hooks/useGetSupplier";

interface SupplierSelectProps {
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}

export const SupplierSelect = ({
  value,
  onChange,
  disabled,
}: SupplierSelectProps) => {
  const { data: suppliers, isPending } = useGetSuppliers();

  const items =
    suppliers?.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    })) ?? [];

  return (
    <SelectComp
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Lieferant wählen"
      disabled={disabled}
      isLoading={isPending}
    />
  );
};
