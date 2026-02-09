import { LabelValue } from "@shared";
import { useEffect, useMemo } from "react";
import { useRecipeStore } from "../store";
import { Recipe } from "../types";
import { getRecipeLabelValueFromValue } from "./utils";

export interface IUseRecipeDropdown {
  selectedRecipe?: LabelValue<Recipe>;
  setSelectedRecipe: (recipe?: LabelValue<Recipe>) => void;
}

export function useRecipeDropdown({ selectedRecipe, setSelectedRecipe }: IUseRecipeDropdown) {
  const isLoading = useRecipeStore((state) => state.isLoading);
  const hydrate = useRecipeStore((state) => state.hydrate);
  const recipes = useRecipeStore((state) => state.recipes);

  const recipeLabelValues: LabelValue<Recipe>[] = useMemo(
    () =>
      recipes.map((recipe) => ({
        label: recipe.name,
        value: recipe,
      })),
    [recipes],
  );

  const onRecipeChange = (recipeValue: unknown) => {
    const recipe = recipeValue as Recipe;
    const selected = getRecipeLabelValueFromValue(recipeLabelValues, recipe);

    if (!selected) return;
    setSelectedRecipe(selected);
  };

  useEffect(() => {
    hydrate();
  }, []);

  return { isLoading, recipeLabelValues, selectedRecipe, onRecipeChange };
}
