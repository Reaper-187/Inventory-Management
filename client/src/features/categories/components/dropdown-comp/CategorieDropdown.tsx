import { MultiSelectDropdown } from "@/components/shared/dropdown-comp/MultiSelectDropdown";
import { useGetCategories } from "../../hooks/useGetCategories";

interface CategorieDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CategorieDropdown = ({
  value,
  onChange,
}: CategorieDropdownProps) => {
  const { data: categories, isPending } = useGetCategories();

  const items =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <MultiSelectDropdown
      items={items}
      value={value}
      onChange={onChange}
      label="Kategorien"
      isPending={isPending}
    />
  );
};
