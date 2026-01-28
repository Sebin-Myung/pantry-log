import { RecipeSubmitItem } from "@entities";
import { RecipeIngredientFieldType } from "@widgets/recipe-ingredients";

export interface RecipeFormState {
  name: string;
  ingredients: RecipeIngredientFieldType[];
}

export interface IUseRecipeForm {
  initialState?: RecipeSubmitItem;
  onSubmit: (item: RecipeSubmitItem) => void;
}
