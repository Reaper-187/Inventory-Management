import { useState } from "react";
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
import { CreateCategory } from "@/components/shared/create-actions/CreateCatBTn";

export const CategorieDropdown = () => {
  const { data: categories, isPending } = useGetCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <div className="flex justify-between px-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Category Menu</Button>}
        />
        <DropdownMenuContent className="w-44">
          <CreateCategory />

          <DropdownMenuGroup>
            <DropdownMenuLabel>categires</DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              categories?.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.id)}
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
