import { IngredientError, IngredientSubmitItem, showIngredientError, useIngredientStore } from "@entities";
import { randomUUID } from "expo-crypto";

export function useAddIngredient() {
  const addIngredient = useIngredientStore((state) => state.add);

  const onSubmit = (item: IngredientSubmitItem) => {
    try {
      addIngredient({ ...item, id: randomUUID() });
    } catch (error) {
      if (error instanceof IngredientError) {
        showIngredientError({ error });
      }
      throw error;
    }
  };

  return { onSubmit };
}
