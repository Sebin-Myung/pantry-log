import { Ingredient, useIngredientStore } from "@entities";
import { LabelValue } from "@shared";
import { useEffect, useMemo } from "react";
import { getIngredientLabelValueFromValue } from "./utils";

export interface IUseIngredientDropdown {
  selectedIngredient?: LabelValue<Ingredient>;
  setSelectedIngredient: (ingredient?: LabelValue<Ingredient>) => void;
}

export function useIngredientDropdown({ selectedIngredient, setSelectedIngredient }: IUseIngredientDropdown) {
  const isLoading = useIngredientStore((state) => state.isLoading);
  const hydrate = useIngredientStore((state) => state.hydrate);
  const ingredients = useIngredientStore((state) => state.ingredients);

  const ingredientLabelValues: LabelValue<Ingredient>[] = useMemo(
    () =>
      ingredients.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient,
      })),
    [ingredients],
  );

  const onIngredientChange = (ingredientValue: unknown) => {
    const ingredient = ingredientValue as Ingredient;
    const selected = getIngredientLabelValueFromValue(ingredientLabelValues, ingredient);

    if (!selected) return;
    setSelectedIngredient(selected);
  };

  useEffect(() => {
    hydrate();
  }, []);

  return {
    isLoading,
    ingredientLabelValues,
    selectedIngredient,
    onIngredientChange,
  };
}
