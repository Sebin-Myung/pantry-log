import { StorageLocation } from "../types";
import { STORAGE_LOCATION_LABEL_VALUES } from "./constants";

export const getStorageLocationLabelValueFromValue = (value: StorageLocation) => {
  return STORAGE_LOCATION_LABEL_VALUES.find((item) => item.value === value);
};
