import { MultiSelectDropdown } from "@/components/shared/dropdown-comp/MultiSelectDropdown";
import { useGetProducts } from "../../hooks/useGetProducts";

interface ProductDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const ProductDropdown = ({ value, onChange }: ProductDropdownProps) => {
  const { data: response, isPending } = useGetProducts({ status: "all" });

  const items =
    response?.data.map((product) => ({
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
