import { StorageLocation, StorageLocationKorean, StorageLocations } from "@entities";
import { LabelValue } from "@shared";

export const STORAGE_LOCATION_LABEL_VALUES: LabelValue<StorageLocation>[] = StorageLocations.map((location) => ({
  label: StorageLocationKorean[location],
  value: location,
}));
