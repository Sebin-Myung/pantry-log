import { RadioButton } from "@shared";
import { IUseStorageLocationRadioButton, useStorageLocationRadioButton } from "../model";

export function StorageLocationRadioButton(props: IUseStorageLocationRadioButton) {
  const { items, selectedLocation, onValueChange } = useStorageLocationRadioButton(props);

  return (
    <RadioButton.Group value={selectedLocation?.value} onValueChange={onValueChange}>
      {items.map((item, index) => (
        <RadioButton.Item
          key={item.value}
          label={item.label}
          value={item.value}
          isFirst={index == 0}
          isLast={index == items.length - 1}
        />
      ))}
    </RadioButton.Group>
  );
}
