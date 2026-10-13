import { MultiSelectDropdown } from "@/components/shared/dropdown-comp/MultiSelectDropdown";
import { useGetProducts } from "../../hooks/useGetProducts";

interface ProductDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const ProductDropdown = ({ value, onChange }: ProductDropdownProps) => {
  const { data: response, isPending } = useGetProducts();

  const items =
    response?.data.map((product) => ({
      value: product.id,
      label: product.name,
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
