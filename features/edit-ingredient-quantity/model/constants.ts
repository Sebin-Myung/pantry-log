import { LabelValue } from "@shared";
import { QuantityUnit, QuantityUnitKorean, QuantityUnits } from "../../../entities";

export const QUANTITY_UNIT_LABEL_VALUES: LabelValue<QuantityUnit>[] = QuantityUnits.map((unit) => ({
  label: QuantityUnitKorean[unit],
  value: unit,
}));
