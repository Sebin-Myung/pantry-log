import { CookingRecordSubmitItem, Recipe } from "@entities";
import { isValidQuantity, QuantityFieldType } from "@features";
import { getDateFormat, LabelValue, ROUTES, useSubmit } from "@shared";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_RECIPE_INGREDIENT_ROW, RecipeIngredientFieldType } from "../../recipe-ingredients";
import { CookingRecordFormState, IUseCookingRecordForm } from "./types";

interface ValidCookingRecordFormState extends Omit<CookingRecordFormState, "cookedAt" | "ingredients"> {
  cookedAt: Date;
  ingredients: { name: string; quantity: Required<QuantityFieldType> }[];
}

export function useCookingRecordForm({ initialState, onSubmit: onSubmitItem }: IUseCookingRecordForm) {
  const router = useRouter();
  const { isSubmitting, handleSubmit } = useSubmit();

  const [name, setName] = useState<string>("");
  const [cookedAt, setCookedAt] = useState<Date>();
  const [selectedRecipe, setSelectedRecipe] = useState<LabelValue<Recipe>>();
  const [ingredients, setIngredients] = useState<RecipeIngredientFieldType[]>([DEFAULT_RECIPE_INGREDIENT_ROW]);
  const [unappliedIngredients, setUnappliedIngredients] = useState<RecipeIngredientFieldType[]>([]);

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
    setSelectedRecipe,
    ingredients,
    setIngredients,
    unappliedIngredients,
    setUnappliedIngredients,
    isValid,
    isSubmitting,
    onSubmit,
  };
}
