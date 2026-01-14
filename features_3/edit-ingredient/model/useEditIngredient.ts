import { Ingredient, ingredientStorage, useIngredientStore } from "@entities";
import { useLayoutEffect, useState } from "react";

export interface IUseEditIngredient extends Pick<Ingredient, "id"> {}

export function useEditIngredient({ id }: IUseEditIngredient) {
  const updateIngredient = useIngredientStore((state) => state.update);

  const [item, setItem] = useState<Ingredient>();

  const onSubmit = (item: Ingredient) => {
    updateIngredient(id, item);
  };

  useLayoutEffect(() => {
    const storageIngredient = ingredientStorage.getIngredient(id);

    if (!storageIngredient) {
      return;
    }

    setItem(storageIngredient);
  }, []);

  return { initialState: item, onSubmit };
}
