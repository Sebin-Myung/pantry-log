import { Ingredient, IngredientSubmitItem, StorageLocation } from "@entities";
import { QuantityFieldType } from "@features";
import { LabelValue } from "@shared";

export interface IngredientFormState {
  location?: LabelValue<StorageLocation>;
  name: string;
  quantity?: QuantityFieldType;
  brand: string;
  purchaseSource: string;
  purchaseDate?: Date;
  productionDate?: Date;
  expirationDate?: Date;
}

export interface IUseIngredientForm {
  initialState?: Ingredient;
  onSubmit: (item: IngredientSubmitItem) => void;
}
