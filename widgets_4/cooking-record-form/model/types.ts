import { CookingRecordSubmitItem } from "@entities";
import { RecipeIngredientFieldType } from "@widgets/recipe-ingredients";

export interface CookingRecordFormState {
  name: string;
  cookedAt?: Date;
  ingredients: RecipeIngredientFieldType[];
}

export interface IUseCookingRecordForm {
  initialState?: CookingRecordSubmitItem;
  onSubmit: (item: CookingRecordSubmitItem) => void;
}
