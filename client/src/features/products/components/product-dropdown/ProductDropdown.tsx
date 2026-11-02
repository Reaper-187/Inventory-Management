import { MultiSelectDropdown } from "@/components/shared/dropdown-comp/MultiSelectDropdown";
import { useGetProductOptions } from "../../hooks/useGetProductOptions";

interface ProductDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const ProductDropdown = ({ value, onChange }: ProductDropdownProps) => {
  const { data: options, isPending } = useGetProductOptions("all");

  const items =
    options?.map((product) => ({
      value: product.id,
      label: product.archivedAt ? `${product.name} (archiviert)` : product.name,
    })) ?? [];

  return (
    <MultiSelectDropdown
      items={items}
      value={value}
      onChange={onChange}
      label="Produkte"
      isPending={isPending}
    />
  );
};
