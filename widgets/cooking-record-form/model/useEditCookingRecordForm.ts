import { getQuantityUnitLabelValueFromValue, RecipeSubmitItem } from "@entities";
import { useEffect, useState } from "react";
import { DEFAULT_RECIPE_INGREDIENT_ROW, RecipeIngredientDropdownType } from "../../recipe-ingredients";
import { CookingRecordFormState } from "./types";

interface IUseEditCookingRecordForm {
  initialState: Pick<RecipeSubmitItem, "ingredients">;
}

export function useEditCookingRecordForm({ initialState }: IUseEditCookingRecordForm) {
  const [ingredients, setIngredients] = useState<RecipeIngredientDropdownType[]>([DEFAULT_RECIPE_INGREDIENT_ROW]);

  useEffect(() => {
    const newIngredients: CookingRecordFormState["ingredients"] = initialState.ingredients.map(({ name, quantity }) =>
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

    setIngredients(newIngredients);
  }, [initialState]);

  return { ingredients, setIngredients };
}
