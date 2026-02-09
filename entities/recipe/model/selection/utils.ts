import { LabelValue } from "@shared";
import { Recipe } from "../types";

export const getRecipeLabelValueFromValue = (recipes: LabelValue<Recipe>[], value: Recipe) => {
  return recipes.find((recipe) => recipe.value.id === value.id);
};
