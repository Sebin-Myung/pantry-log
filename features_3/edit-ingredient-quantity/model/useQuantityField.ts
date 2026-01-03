import { QuantityUnit, QuantityUnitKorean, QuantityUnits } from "@entities";
import { LabelValue, onlyPositiveFloat } from "@shared";
import { useEffect, useState } from "react";

export type QuantityFieldType =
  | {
      amount?: string;
      unit?: LabelValue<QuantityUnit>;
    }
  | undefined;

export interface IUseQuantityField {
  initialValue?: { amount: number; unit: QuantityUnit };
  value: QuantityFieldType;
  setValue: React.Dispatch<React.SetStateAction<QuantityFieldType>>;
}

export function useQuantityField({ initialValue, value, setValue }: IUseQuantityField) {
  const quantityUnitLabelValues: LabelValue<QuantityUnit>[] = QuantityUnits.map((unit) => ({
    label: QuantityUnitKorean[unit],
    value: unit,
  }));

  const [isQuantityEnabled, setIsQuantityEnabled] = useState<boolean>(true);

  const onQuantityOptionChange = (enabled: boolean) => {
    setIsQuantityEnabled(enabled);
    if (!enabled) {
      setValue(undefined);
    }
  };

  const onQuantityAmountChange = (amount: string) => {
    setValue((prev) => ({ ...prev, amount: onlyPositiveFloat(amount) }));
  };

  const onQuantityUnitChange = (value: unknown) => {
    const unit = value as QuantityUnit;
    const selected = quantityUnitLabelValues.find((item) => item.value === unit);
    if (selected) {
      setValue((prev) => ({ ...prev, unit: selected }));
    } else {
      setValue(undefined);
    }
  };

  useEffect(() => {
    if (initialValue) {
      onQuantityAmountChange(initialValue.amount.toString());
      onQuantityUnitChange(initialValue.unit);
    }
  }, [initialValue]);

  return {
    isQuantityEnabled,
    value,
    units: quantityUnitLabelValues,
    onQuantityOptionChange,
    onQuantityAmountChange,
    onQuantityUnitChange,
  };
}
