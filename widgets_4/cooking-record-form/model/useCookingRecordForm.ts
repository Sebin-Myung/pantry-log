import { CookingRecordSubmitItem, Recipe, RecipeIngredient, useIngredientStore } from "@entities";
import { getQuantityUnitLabelValueFromValue, isValidQuantity, QuantityFieldType } from "@features";
import { getDateFormat, LabelValue, ROUTES, useSubmit } from "@shared";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_RECIPE_INGREDIENT_ROW, RecipeIngredientDropdownType } from "../../recipe-ingredients";
import { CookingRecordFormState, IUseCookingRecordForm } from "./types";

interface ValidCookingRecordFormState extends Omit<CookingRecordFormState, "cookedAt" | "ingredients"> {
  cookedAt: Date;
  ingredients: { name: string; quantity: Required<QuantityFieldType> }[];
}

export function useCookingRecordForm({ initialState, onSubmit: onSubmitItem }: IUseCookingRecordForm) {
  const router = useRouter();
  const { isSubmitting, handleSubmit } = useSubmit();

  const savedIngredients = useIngredientStore((state) => state.ingredients);

  const [name, setName] = useState<string>("");
  const [cookedAt, setCookedAt] = useState<Date>();
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

  const isValidState = (state: CookingRecordFormState): state is ValidCookingRecordFormState => {
    return (
      !!state.name &&
      !!state.cookedAt &&
      state.ingredients.every((item) => !!item.name && isValidQuantity(item.quantity))
    );
  };

  const isValid = useMemo(() => isValidState({ name, cookedAt, ingredients }), [name, cookedAt, ingredients]);

  const onSubmit = () =>
    handleSubmit(async () => {
      const state = { name, cookedAt, ingredients };

      if (!isValidState(state)) return;

      const newCookingRecord: CookingRecordSubmitItem = {
        name: state.name,
        cookedAt: getDateFormat(state.cookedAt),
        ingredients: state.ingredients.map((item) => ({
          name: item.name,
          quantity: item.quantity ? { amount: Number(item.quantity.amount), unit: item.quantity.unit.value } : null,
        })),
      };

      try {
        onSubmitItem(newCookingRecord);

        router.replace(ROUTES.cookingRecord);
      } catch (error) {
        throw error;
      }
    });

  useEffect(() => {
    if (!initialState) return;

    // initialState 반영
  }, [initialState]);

  return {
    name,
    setName,
    cookedAt,
    setCookedAt,
    selectedRecipe,
    onRecipeItemClick,
    ingredients,
    setIngredients,
    unappliedIngredients,
    setUnappliedIngredients,
    isValid,
    isSubmitting,
    onSubmit,
  };
}
