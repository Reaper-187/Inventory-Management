import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

export interface DropdownItem {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  items: DropdownItem[];
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  triggerLabel?: string;
  isPending?: boolean;
}

export const MultiSelectDropdown = ({
  items,
  value,
  onChange,
  label,
  triggerLabel,
  isPending = false,
}: MultiSelectDropdownProps) => {
  const toggleItem = (itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter((id) => id !== itemValue)
      : [...value, itemValue];

    onChange(newValue);
  };

  return (
    <div className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">{triggerLabel ?? label}</Button>}
        />
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {isPending ? (
              <Spinner className="flex justify-self-center" />
            ) : (
              items.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.value}
                  checked={value.includes(item.value)}
                  onCheckedChange={() => toggleItem(item.value)}
                  className="flex justify-between items-center"
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
