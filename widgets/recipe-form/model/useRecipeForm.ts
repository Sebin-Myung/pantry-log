import { getQuantityUnitLabelValueFromValue, isValidQuantity, QuantityFieldType, RecipeSubmitItem } from "@entities";
import { ROUTES, useSubmit } from "@shared";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_RECIPE_INGREDIENT_ROW, RecipeIngredientFieldType } from "../../recipe-ingredients";
import { IUseRecipeForm, RecipeFormState } from "./types";

interface ValisRecipeFormState extends Omit<RecipeFormState, "ingredients"> {
  ingredients: { name: string; quantity: Required<QuantityFieldType> }[];
}

export function useRecipeForm({ initialState, onSubmit: onSubmitItem }: IUseRecipeForm) {
  const router = useRouter();
  const { isSubmitting, handleSubmit } = useSubmit();

  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<RecipeIngredientFieldType[]>([DEFAULT_RECIPE_INGREDIENT_ROW]);

  const isValidState = (state: RecipeFormState): state is ValisRecipeFormState => {
    return !!state.name && state.ingredients.every((item) => !!item.name && isValidQuantity(item.quantity));
  };

  const isValid = useMemo(() => isValidState({ name, ingredients }), [name, ingredients]);

  const onSubmit = () =>
    handleSubmit(async () => {
      const state = { name, ingredients };

      if (!isValidState(state)) return;

      const newRecipe: RecipeSubmitItem = {
        name: state.name,
        ingredients: state.ingredients.map((item) => ({
          name: item.name,
          quantity: item.quantity ? { amount: Number(item.quantity.amount), unit: item.quantity.unit.value } : null,
        })),
      };

      try {
        onSubmitItem(newRecipe);

        router.replace(ROUTES.recipe);
      } catch (error) {
        throw error;
      }
    });

  useEffect(() => {
    if (!initialState) return;

    const newIngredients: RecipeFormState["ingredients"] = initialState.ingredients.map(({ name, quantity }) =>
      quantity
        ? {
            name,
            quantity: {
              amount: quantity.amount.toString(),
              unit: getQuantityUnitLabelValueFromValue(quantity.unit),
            },
          }
        : { name },
    );

    setName(initialState.name);
    setIngredients(newIngredients);
  }, [initialState]);

  return { name, setName, ingredients, setIngredients, isValid, isSubmitting, onSubmit };
}
