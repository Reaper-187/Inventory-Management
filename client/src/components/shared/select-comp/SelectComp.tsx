import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectCompProps {
  items: SelectItem[];
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SelectComp = ({
  items,
  value,
  onChange,
  placeholder = "Auswählen",
  disabled = false,
  isLoading = false,
}: SelectCompProps) => {
  const selectedLabel = items.find((item) => item.value === value)?.label;
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? "Wird geladen..." : placeholder}>
          {selectedLabel}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
