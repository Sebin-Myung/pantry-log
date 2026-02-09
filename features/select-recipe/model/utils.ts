import { Recipe } from "@entities";
import { LabelValue } from "@shared";

export const getRecipeLabelValueFromValue = (recipes: LabelValue<Recipe>[], value: Recipe) => {
  return recipes.find((recipe) => recipe.value.id === value.id);
};
