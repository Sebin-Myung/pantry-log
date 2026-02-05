import { LabelValue } from "@shared";
import { Recipe } from "../../../entities";

export const getRecipeLabelValueFromValue = (recipes: LabelValue<Recipe>[], value: Recipe) => {
  return recipes.find((recipe) => recipe.value.id === value.id);
};
