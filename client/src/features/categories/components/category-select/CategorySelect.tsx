import { SelectComp } from "@/components/shared/select-comp/SelectComp";
import { useGetCategories } from "../../hooks/useGetCategories";

interface CategorySelectProps {
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}

export const CategorySelect = ({
  value,
  onChange,
  disabled,
}: CategorySelectProps) => {
  const { data: categories, isPending } = useGetCategories();

  const items =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <SelectComp
      items={items}
      value={value}
      onChange={onChange}
      placeholder="Kategorie wählen"
      disabled={disabled}
      isLoading={isPending}
    />
  );
};
