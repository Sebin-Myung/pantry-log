import { LabelValue } from "@shared";
import { useEffect } from "react";
import { QuantityUnitKorean, QuantityUnits } from "./constants";
import { QuantityUnit } from "./types";

export interface IUseQuantityUnitDropdown {
  initialValue?: string;
  selectedQuantityUnit?: LabelValue<QuantityUnit>;
  setSelectedQuantityUnit: React.Dispatch<React.SetStateAction<LabelValue<QuantityUnit> | undefined>>;
}

export function useQuantityUnitDropdown({
  initialValue,
  selectedQuantityUnit,
  setSelectedQuantityUnit,
}: IUseQuantityUnitDropdown) {
  const quantityUnitLabelValues: LabelValue<QuantityUnit>[] = QuantityUnits.map((unit) => ({
    label: QuantityUnitKorean[unit],
    value: unit,
  }));

  const onValueChange = (value: unknown) => {
    const unit = value as QuantityUnit;
    const selected = quantityUnitLabelValues.find((item) => item.value === unit);
    if (selected) {
      setSelectedQuantityUnit(selected);
    } else {
      setSelectedQuantityUnit(undefined);
    }
  };

  useEffect(() => {
    if (initialValue) {
      onValueChange(initialValue);
    }
  }, [initialValue]);

  return { items: quantityUnitLabelValues, selectedQuantityUnit, onValueChange };
}
