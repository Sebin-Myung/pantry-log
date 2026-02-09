import { Recipe, RecipeError, recipeStorage, RecipeSubmitItem, showRecipeError, useRecipeStore } from "@entities";
import { useRouterFunc } from "@shared";
import { useEffect, useState } from "react";

export interface IUseEditRecipe extends Pick<Recipe, "id"> {}

export function useEditRecipe({ id }: IUseEditRecipe) {
  const { goBack } = useRouterFunc();
  const updateRecipe = useRecipeStore((state) => state.update);

  const [item, setItem] = useState<Recipe>();

  const onSubmit = (item: RecipeSubmitItem) => {
    try {
      updateRecipe(id, item);
    } catch (error) {
      if (error instanceof RecipeError) {
        showRecipeError({ error });
      }
      throw error;
    }
  };

  useEffect(() => {
    const storageRecipe = recipeStorage.getRecipe(id);

    if (!storageRecipe) {
      showRecipeError({ error: new RecipeError("RECIPE_NOT_FOUND"), onPress: goBack });
      return;
    }

    setItem(storageRecipe);
  }, []);

  return { initialState: item, onSubmit };
}
