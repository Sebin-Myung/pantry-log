import { LabelValue } from "@shared";
import { Ingredient } from "../../../entities";

export const getIngredientLabelValueFromValue = (ingredients: LabelValue<Ingredient>[], value: Ingredient) => {
  return ingredients.find((ingredient) => ingredient.value.id === value.id);
};
