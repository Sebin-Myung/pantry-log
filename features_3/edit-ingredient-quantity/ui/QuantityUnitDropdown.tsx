import { Dropdown } from "@shared";
import { IUseQuantityUnitDropdown, useQuantityUnitDropdown } from "../model";

export function QuantityUnitDropdown(props: IUseQuantityUnitDropdown) {
  const { items, selectedQuantityUnit, onValueChange } = useQuantityUnitDropdown(props);

  return (
    <Dropdown.Root
      placeholder="단위 선택"
      label={selectedQuantityUnit?.label}
      value={selectedQuantityUnit?.value}
      onValueChange={onValueChange}>
      {items.map((item, index) => (
        <Dropdown.Item key={item.value} label={item.label} value={item.value} isLast={index === items.length - 1} />
      ))}
    </Dropdown.Root>
  );
}
