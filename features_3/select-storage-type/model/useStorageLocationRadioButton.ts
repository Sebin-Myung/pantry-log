import { StorageLocation, StorageLocationKorean, StorageLocations } from "@entities";
import { LabelValue } from "@shared";
import { useLayoutEffect } from "react";

export interface IUseStorageLocationRadioButton {
  initialValue?: StorageLocation;
  selectedLocation?: LabelValue<StorageLocation>;
  setSelectedLocation: (location?: LabelValue<StorageLocation>) => void;
}

export function useStorageLocationRadioButton({
  initialValue,
  selectedLocation,
  setSelectedLocation,
}: IUseStorageLocationRadioButton) {
  const storageLocationLabelValues: LabelValue<StorageLocation>[] = StorageLocations.map((location) => ({
    label: StorageLocationKorean[location],
    value: location,
  }));

  const onValueChange = (value: unknown) => {
    const location = value as StorageLocation;
    const selected = storageLocationLabelValues.find((item) => item.value === location);
    if (selected) {
      setSelectedLocation(selected);
    }
  };

  useLayoutEffect(() => {
    if (initialValue) {
      onValueChange(initialValue);
    }
  }, [initialValue]);

  return { items: storageLocationLabelValues, selectedLocation, onValueChange };
}
