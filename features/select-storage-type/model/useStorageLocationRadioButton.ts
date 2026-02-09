import { StorageLocation } from "@entities";
import { LabelValue } from "@shared";
import { STORAGE_LOCATION_LABEL_VALUES } from "./constants";
import { getStorageLocationLabelValueFromValue } from "./utils";

export interface IUseStorageLocationRadioButton {
  selectedLocation?: LabelValue<StorageLocation>;
  setSelectedLocation: (location?: LabelValue<StorageLocation>) => void;
}

export function useStorageLocationRadioButton({
  selectedLocation,
  setSelectedLocation,
}: IUseStorageLocationRadioButton) {
  const onValueChange = (value: unknown) => {
    const location = value as StorageLocation;
    const selected = getStorageLocationLabelValueFromValue(location);

    if (!selected) return;
    setSelectedLocation(selected);
  };

  return { items: STORAGE_LOCATION_LABEL_VALUES, selectedLocation, onValueChange };
}
