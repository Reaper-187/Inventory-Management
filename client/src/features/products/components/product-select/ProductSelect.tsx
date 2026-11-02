import { SelectComp } from "@/components/shared/select-comp/SelectComp";
import { useGetProductOptions } from "../../hooks/useGetProductOptions";

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
  const { data: options, isPending } = useGetProductOptions("active");

  const items =
    options?.map((product) => ({
      value: product.id,
      label: `${product.name} (${product.sku})`,
    })) ?? [];

  return (
    <SelectComp
      classes="w-full"
      items={items}
      value={value ?? ""}
      onChange={onChange}
      placeholder="Produkt wählen"
      disabled={disabled}
      isLoading={isPending}
    />
  );
};
