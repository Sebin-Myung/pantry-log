import { QuantityFieldType } from "@features";

export interface RecipeIngredientFieldType {
  name: string;
  quantity?: QuantityFieldType;
}

export interface IUseRecipeIngredients {
  inputType?: "input" | "dropdown";
  ingredients: RecipeIngredientFieldType[];
  setIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientFieldType[]>>;
}
