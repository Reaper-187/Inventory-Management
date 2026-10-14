import { SelectComp } from "@/components/shared/select-comp/SelectComp";
import type { MovementType } from "../../types/stockMovements.api.types";

interface TypeBadgeSelectProps {
  value: MovementType | "";
  onChange: (value: MovementType | "") => void;
}

const TYPE_ITEMS = [
  { value: "IN", label: "Eingang" },
  { value: "OUT", label: "Ausgang" },
];

export const TypeBadgeSelect = ({ value, onChange }: TypeBadgeSelectProps) => {
  return (
    <SelectComp
      items={TYPE_ITEMS}
      value={value}
      onChange={(value) => onChange(value as MovementType | "")}
      placeholder="Typ"
    />
  );
};
