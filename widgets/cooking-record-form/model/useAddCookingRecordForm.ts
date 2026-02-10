import { getQuantityUnitLabelValueFromValue, Recipe, RecipeIngredient, useIngredientStore } from "@entities";
import { useAddCookingRecord } from "@features";
import { LabelValue } from "@shared";
import { useState } from "react";
import { DEFAULT_RECIPE_INGREDIENT_ROW, RecipeIngredientDropdownType } from "../../recipe-ingredients";

export function useAddCookingRecordForm() {
  const { onSubmit } = useAddCookingRecord();

  const savedIngredients = useIngredientStore((state) => state.ingredients);

  const [selectedRecipe, setSelectedRecipe] = useState<LabelValue<Recipe>>();
  const [ingredients, setIngredients] = useState<RecipeIngredientDropdownType[]>([DEFAULT_RECIPE_INGREDIENT_ROW]);
  const [unappliedIngredients, setUnappliedIngredients] = useState<RecipeIngredient[]>([]);

  const onRecipeItemClick = (recipe?: LabelValue<Recipe>) => {
    setSelectedRecipe(recipe);

    if (!recipe) return;

    const newIngredients: RecipeIngredientDropdownType[] = [];
    const newUnappliedIngredients: RecipeIngredient[] = [];

    recipe.value.ingredients.forEach((item) => {
      const searchedIngredient = savedIngredients.find(
        (ingredient) =>
          item.name === ingredient.name &&
          (!item.quantity || !ingredient.quantity || item.quantity.unit === ingredient.quantity.unit),
      );

      if (!searchedIngredient) {
        newUnappliedIngredients.push(item);
      } else {
        const ingredientField: RecipeIngredientDropdownType = item.quantity
          ? {
              name: item.name,
              quantity: {
                amount: item.quantity.amount.toString(),
                unit: getQuantityUnitLabelValueFromValue(item.quantity.unit),
              },
            }
          : { name: item.name, quantity: undefined };

        if (searchedIngredient.quantity && item.quantity) {
          ingredientField.quantity!.amount = Math.min(
            searchedIngredient.quantity.amount,
            item.quantity.amount,
          ).toString();
        }

        newIngredients.push({
          ...ingredientField,
          selectedIngredient: { label: searchedIngredient.name, value: searchedIngredient },
        });
      }
    });

    setIngredients(newIngredients.length > 0 ? newIngredients : [DEFAULT_RECIPE_INGREDIENT_ROW]);
    setUnappliedIngredients(newUnappliedIngredients);
  };

  const onUnappliedIngredientDelete = (index: number) => {
    setUnappliedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    selectedRecipe,
    onRecipeItemClick,
    ingredients,
    setIngredients,
    unappliedIngredients,
    onUnappliedIngredientDelete,
    onSubmit,
  };
}
