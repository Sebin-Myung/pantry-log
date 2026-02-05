export type StorageLocation = "frozen" | "fridge" | "pantry";

export type QuantityUnit = "g" | "ml" | "pcs";

export interface Quantity {
  amount: number;
  unit: QuantityUnit;
}

export interface Ingredient {
  id: string;
  name: string;
  storageLocation: StorageLocation;
  brand: string | null;
  purchaseSource: string | null;
  quantity: Quantity | null;
  purchaseDate: string; // ISO date string
  productionDate: string | null; // ISO date string
  expirationDate: string | null; // ISO date string

  // 추후에 이미지 기능 추가 시 활용
  imageUrl: string | null;
}

export type IngredientSubmitItem = Omit<Ingredient, "id">;

export enum ExpiryStatus {
  APPROACHING, // ≤ 7 days
  IMMINENT, // ≤ 3 days
  EXPIRED, // < 0 day
}
