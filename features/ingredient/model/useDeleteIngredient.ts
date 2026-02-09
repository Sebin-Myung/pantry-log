import { Ingredient, useIngredientStore } from "@entities";

export function useDeleteIngredient() {
  const removeIngredient = useIngredientStore((state) => state.remove);

  const onDeleteIngredient = (id: Ingredient["id"]) => {
    removeIngredient(id);
  };

  return { onDeleteIngredient };
}
