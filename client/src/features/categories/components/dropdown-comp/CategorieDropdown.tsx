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
import { CategoryDialog } from "../form/CategoryDialog";

type SelectionMode = "single" | "multiple";

interface CategorieDropdownProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  mode?: SelectionMode;
}

export const CategorieDropdown = ({
  value,
  onChange,
  disabled = false,
  mode = "multiple",
}: CategorieDropdownProps) => {
  const { data: categories, isPending } = useGetCategories();
  const [createOpen, setCreateOpen] = useState(false);

  const isMultipleMode = mode === "multiple";

  const handleToggle = (categoryId: string) => {
    if (!onChange) return;

    if (isMultipleMode) {
      // Multi-select Logik
      const currentValues = (value as string[]) || [];
      const newValues = currentValues.includes(categoryId)
        ? currentValues.filter((id) => id !== categoryId)
        : [...currentValues, categoryId];
      onChange(newValues);
    } else {
      // Single-Select logik
      const currentValue = (value as string) || "";
      onChange(currentValue === categoryId ? "" : categoryId);
    }
  };

  const isChecked = (categoryId: string) => {
    if (isMultipleMode) {
      return ((value as string[]) || []).includes(categoryId);
    } else {
      return (value as string) === categoryId;
    }
  };

  const getButtonLabel = () => {
    if (mode === "single") {
      const selected = (value as string) || "";
      if (!selected) return "Kategorie wählen";
      const cat = categories?.find((c) => c.id === selected);
      return cat ? cat.name : "Kategorie wählen";
    }
    return "Kategorien filtern";
  };

  return (
    <div
      className={`${mode === "multiple" ? "flex justify-between px-5" : ""}`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" disabled={disabled}>
              {getButtonLabel()}
            </Button>
          }
        />
        <DropdownMenuContent className="w-44">
          {isMultipleMode && (
            <Button
              variant="ghost"
              className="w-full text-xs"
              onClick={() => onChange && onChange([])}
              disabled={disabled}
            >
              Alle entfernen
            </Button>
          )}

          <Button
            variant="outline"
            className={isMultipleMode ? "w-full" : "hidden"}
            onClick={() => setCreateOpen(true)}
            disabled={disabled}
          >
            Create new Category
          </Button>

          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {isMultipleMode ? "Kategorien filtern" : "Kategorie auswählen"}
            </DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              categories?.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={isChecked(category.id)}
                  onCheckedChange={() => handleToggle(category.id)}
                  className="flex justify-between items-center"
                  disabled={disabled}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CategoryDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </div>
  );
};
