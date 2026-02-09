import { LabelValue } from "@shared";
import { Ingredient } from "../types";

export const getIngredientLabelValueFromValue = (ingredients: LabelValue<Ingredient>[], value: Ingredient) => {
  return ingredients.find((ingredient) => ingredient.value.id === value.id);
};
