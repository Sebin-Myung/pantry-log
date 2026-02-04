import { Ingredient } from "@entities";
import { LabelValue } from "@shared";

export const getIngredientLabelValueFromValue = (ingredients: LabelValue<Ingredient>[], value: Ingredient) => {
  return ingredients.find((ingredient) => ingredient.value.id === value.id);
};
