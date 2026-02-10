import { CookingRecordSubmitItem } from "@entities";
import { RecipeIngredientDropdownType, RecipeIngredientFieldType } from "../../recipe-ingredients";

export interface CookingRecordFormState {
  name: string;
  cookedAt?: Date;
  ingredients: RecipeIngredientFieldType[];
}

export interface IUseCookingRecordBaseForm {
  initialState?: Partial<CookingRecordSubmitItem>;
  ingredients: RecipeIngredientDropdownType[];
  onSubmit: (item: CookingRecordSubmitItem) => void;
}
