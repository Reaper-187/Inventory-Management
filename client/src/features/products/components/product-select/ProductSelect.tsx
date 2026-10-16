import { SelectComp } from "@/components/shared/select-comp/SelectComp";
import { useGetProducts } from "../../hooks/useGetProducts";

interface ProductSelectProps {
  value?: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export const ProductSelect = ({
  value,
  onChange,
  disabled,
}: ProductSelectProps) => {
  const { data: response, isPending } = useGetProducts();

  const items =
    response?.data.map((product) => ({
      value: product.id,
      label: `${product.name} (${product.sku})`,
    })) ?? [];

  return (
    <SelectComp
      items={items}
      value={value ?? ""}
      onChange={onChange}
      placeholder="Produkt wählen"
      disabled={disabled}
      isLoading={isPending}
    />
  );
};
