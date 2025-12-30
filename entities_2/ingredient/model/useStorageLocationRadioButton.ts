import { LabelValue } from "@shared";
import { SetStateAction, useEffect } from "react";
import { StorageLocationKorean, StorageLocations } from "./constants";
import { StorageLocation } from "./types";

export interface IUseStorageLocationRadioButton {
  initialValue?: StorageLocation;
  selectedLocation?: LabelValue<StorageLocation>;
  setSelectedLocation: React.Dispatch<SetStateAction<LabelValue<StorageLocation> | undefined>>;
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

  useEffect(() => {
    if (initialValue) {
      onValueChange(initialValue);
    }
  }, [initialValue]);

  return { items: storageLocationLabelValues, selectedLocation, onValueChange };
}
