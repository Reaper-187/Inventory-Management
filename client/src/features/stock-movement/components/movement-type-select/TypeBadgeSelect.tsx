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
    <div className="w-full md:w-1/4 lg:w-1/5">
      <SelectComp
        items={TYPE_ITEMS}
        value={value}
        onChange={(value) => onChange(value as MovementType | "")}
        placeholder="Typ"
      />
    </div>
  );
};
