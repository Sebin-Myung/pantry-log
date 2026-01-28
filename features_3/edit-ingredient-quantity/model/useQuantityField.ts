import { QuantityUnit } from "@entities";
import { LabelValue, onlyPositiveFloat } from "@shared";
import { QUANTITY_UNIT_LABEL_VALUES } from "./constants";
import { getQuantityUnitLabelValueFromValue } from "./utils";

export type QuantityFieldType = {
  amount?: string;
  unit?: LabelValue<QuantityUnit>;
};

export interface IUseQuantityField {
  value?: QuantityFieldType;
  setValue: (value?: Partial<QuantityFieldType>) => void;
}

const defautValue: QuantityFieldType = { amount: "" };

export function useQuantityField({ value, setValue }: IUseQuantityField) {
  const onQuantityOptionChange = (enabled: boolean) => {
    if (!enabled) {
      setValue(undefined);
    } else {
      setValue(defautValue);
    }
  };

  const onQuantityAmountChange = (amount: string) => {
    setValue({ amount: onlyPositiveFloat(amount) });
  };

  const onQuantityUnitChange = (unitValue: unknown) => {
    const unit = unitValue as QuantityUnit;
    const selected = getQuantityUnitLabelValueFromValue(unit);

    if (!selected) return;
    setValue({ unit: selected });
  };

  return {
    isQuantityEnabled: !!value,
    value,
    units: QUANTITY_UNIT_LABEL_VALUES,
    onQuantityOptionChange,
    onQuantityAmountChange,
    onQuantityUnitChange,
  };
}
