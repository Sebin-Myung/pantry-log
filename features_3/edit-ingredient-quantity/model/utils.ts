import { QuantityUnit } from "@entities";
import { QUANTITY_UNIT_LABEL_VALUES } from "./constants";

export const getQuantityUnitLabelValueFromValue = (value: QuantityUnit) => {
  return QUANTITY_UNIT_LABEL_VALUES.find((item) => item.value === value);
};
