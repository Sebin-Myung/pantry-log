import { Ingredient, IngredientError, showIngredientError, useIngredientStore } from "@entities";

export function useAddIngredient() {
  const addIngredient = useIngredientStore((state) => state.add);

  const onSubmit = (item: Ingredient) => {
    try {
      addIngredient(item);
    } catch (error) {
      if (error instanceof IngredientError) {
        showIngredientError({ error });
      }
      throw error;
    }
  };

  return { onSubmit };
}
