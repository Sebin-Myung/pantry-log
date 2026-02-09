import { LabelValue } from "@shared";
import { StorageLocationKorean, StorageLocations } from "../constants";
import { StorageLocation } from "../types";

export const STORAGE_LOCATION_LABEL_VALUES: LabelValue<StorageLocation>[] = StorageLocations.map((location) => ({
  label: StorageLocationKorean[location],
  value: location,
}));
