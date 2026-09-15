import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCategories } from "../../hooks/useGetCategories";
import { Spinner } from "@/components/ui/spinner";

interface CategorieDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CategorieDropdown = ({
  value,
  onChange,
}: CategorieDropdownProps) => {
  const { data: categories, isPending } = useGetCategories();

  const toggleCategory = (categoryId: string) => {
    const newValue = value.includes(categoryId)
      ? value.filter((id) => id !== categoryId)
      : [...value, categoryId];

    onChange(newValue);
  };

  return (
    <div className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Category Menu</Button>}
        />
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>categires</DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              categories?.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={value.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                  className="flex justify-between items-center"
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
