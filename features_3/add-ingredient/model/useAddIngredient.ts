import { Ingredient, useIngredientStore } from "@entities";

export function useAddIngredient() {
  const addIngredient = useIngredientStore((state) => state.add);

  const onSubmit = (item: Ingredient) => {
    addIngredient(item);
  };

  return { onSubmit };
}
