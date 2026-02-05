import { randomUUID } from "expo-crypto";
import { RecipeError, RecipeSubmitItem, showRecipeError, useRecipeStore } from "../../../entities";

export function useAddRecipe() {
  const addRecipe = useRecipeStore((state) => state.add);

  const onSubmit = (item: RecipeSubmitItem) => {
    try {
      const createdAt = new Date().toISOString();
      addRecipe({ ...item, id: randomUUID(), createdAt, updatedAt: createdAt });
    } catch (error) {
      if (error instanceof RecipeError) {
        showRecipeError({ error });
      }
      throw error;
    }
  };

  return { onSubmit };
}
