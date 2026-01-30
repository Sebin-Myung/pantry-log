import { Recipe, useRecipeStore } from "@entities";

export function useDeleteRecipe() {
  const removeRecipe = useRecipeStore((state) => state.remove);

  const onDeleteRecipe = (id: Recipe["id"]) => {
    removeRecipe(id);
  };

  return { onDeleteRecipe };
}
