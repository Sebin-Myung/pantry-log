import { Ingredient } from "@entities";
import { QuantityFieldType } from "@features";
import { LabelValue } from "@shared";

export interface RecipeIngredientFieldType {
  name: string;
  quantity?: QuantityFieldType;
}

export interface RecipeIngredientDropdownType extends RecipeIngredientFieldType {
  selectedIngredient?: LabelValue<Ingredient>;
}

export interface RecipeIngredientsInputProps {
  inputType: "input";
  ingredients: RecipeIngredientFieldType[];
  setIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientFieldType[]>>;
}

export interface RecipeIngredientsDropdownProps {
  inputType: "dropdown";
  ingredients: RecipeIngredientDropdownType[];
  setIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientDropdownType[]>>;
}

export type UseRecipeIngredientsProps = RecipeIngredientsInputProps | RecipeIngredientsDropdownProps;
