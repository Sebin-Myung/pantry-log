import { Dropdown, RadioButton, TextInput } from "@shared";
import { View } from "react-native";
import { IUseQuantityField, useQuantityField } from "../model/quantity";

interface QuantityFieldProps extends IUseQuantityField {
  unitDisabled?: boolean;
}

export function QuantityField({ unitDisabled, ...props }: QuantityFieldProps) {
  const { isQuantityEnabled, value, units, onQuantityOptionChange, onQuantityAmountChange, onQuantityUnitChange } =
    useQuantityField(props);

  return (
    <View style={{ gap: 10 }}>
      <RadioButton.Group value={isQuantityEnabled} onValueChange={onQuantityOptionChange}>
        <RadioButton.Item label="입력" value={true} isFirst />
        <RadioButton.Item label="생략" value={false} isLast />
      </RadioButton.Group>
      {isQuantityEnabled && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              inputMode="decimal"
              value={value?.amount ?? ""}
              setValue={onQuantityAmountChange}
              placeholder="용량을 입력해주세요."
            />
          </View>
          <View style={{ width: 120 }}>
            <Dropdown.Root
              placeholder="단위 선택"
              label={value?.unit?.label}
              value={value?.unit?.value}
              onValueChange={onQuantityUnitChange}
              disabled={unitDisabled}>
              {units.map((item, index) => (
                <Dropdown.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  isLast={index === units.length - 1}
                />
              ))}
            </Dropdown.Root>
          </View>
        </View>
      )}
    </View>
  );
}
