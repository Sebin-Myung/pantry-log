import { LabelValue } from "@shared";
import { IngredientSubmitItem, StorageLocation } from "../../../entities";
import { QuantityFieldType } from "../../../features";

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
  initialState?: IngredientSubmitItem;
  onSubmit: (item: IngredientSubmitItem) => void;
}
