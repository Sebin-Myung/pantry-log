import { QuantityUnit, QuantityUnitKorean, QuantityUnits } from "@entities";
import { LabelValue, onlyPositiveFloat } from "@shared";
import { useLayoutEffect } from "react";

export type QuantityFieldType = {
  amount?: string;
  unit?: LabelValue<QuantityUnit>;
};

export interface IUseQuantityField {
  initialValue?: { amount: number; unit: QuantityUnit };
  value?: QuantityFieldType;
  setValue: (value?: QuantityFieldType) => void;
}

const defautValue: QuantityFieldType = { amount: "" };

export function useQuantityField({ initialValue, value, setValue }: IUseQuantityField) {
  const quantityUnitLabelValues: LabelValue<QuantityUnit>[] = QuantityUnits.map((unit) => ({
    label: QuantityUnitKorean[unit],
    value: unit,
  }));

  const onQuantityOptionChange = (enabled: boolean) => {
    if (!enabled) {
      setValue(undefined);
    } else {
      setValue(defautValue);
    }
  };

  const onQuantityAmountChange = (amount: string) => {
    setValue({ amount: onlyPositiveFloat(amount), unit: value?.unit });
  };

  const onQuantityUnitChange = (unitValue: unknown) => {
    const unit = unitValue as QuantityUnit;
    const selected = quantityUnitLabelValues.find((item) => item.value === unit);
    if (selected) {
      setValue({ amount: value?.amount, unit: selected });
    }
  };

  useLayoutEffect(() => {
    if (initialValue) {
      onQuantityAmountChange(initialValue.amount.toString());
      onQuantityUnitChange(initialValue.unit);
    }
  }, [initialValue]);

  return {
    isQuantityEnabled: !!value,
    value,
    units: quantityUnitLabelValues,
    onQuantityOptionChange,
    onQuantityAmountChange,
    onQuantityUnitChange,
  };
}
