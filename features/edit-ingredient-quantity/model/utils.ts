import { QuantityUnit } from "../../../entities";
import { QUANTITY_UNIT_LABEL_VALUES } from "./constants";
import { QuantityFieldType } from "./useQuantityField";

export const getQuantityUnitLabelValueFromValue = (value: QuantityUnit) => {
  return QUANTITY_UNIT_LABEL_VALUES.find((item) => item.value === value);
};

export const isValidQuantity = (quantity?: QuantityFieldType): quantity is Required<QuantityFieldType> => {
  return !quantity || (Number(quantity.amount ?? "0") > 0 && !!quantity.unit);
};
