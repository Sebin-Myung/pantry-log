import { LabelValue } from "@shared";
import { QuantityUnitKorean, QuantityUnits } from "../constants";
import { QuantityUnit } from "../types";

export const QUANTITY_UNIT_LABEL_VALUES: LabelValue<QuantityUnit>[] = QuantityUnits.map((unit) => ({
  label: QuantityUnitKorean[unit],
  value: unit,
}));
