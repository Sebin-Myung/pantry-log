import { QuantityUnit, StorageLocation } from "./types";

export const StorageLocationKorean: Record<StorageLocation, string> = {
  frozen: "냉동",
  fridge: "냉장",
  pantry: "실온",
};

export const QuantityUnitKorean: Record<QuantityUnit, string> = {
  g: "g",
  ml: "ml",
  pcs: "개",
};
