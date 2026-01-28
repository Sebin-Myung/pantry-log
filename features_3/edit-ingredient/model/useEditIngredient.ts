import {
  Ingredient,
  IngredientError,
  ingredientStorage,
  IngredientSubmitItem,
  showIngredientError,
  useIngredientStore,
} from "@entities";
import { useRouterFunc } from "@shared";
import { useEffect, useState } from "react";

export interface IUseEditIngredient extends Pick<Ingredient, "id"> {}

export function useEditIngredient({ id }: IUseEditIngredient) {
  const { goBack } = useRouterFunc();
  const updateIngredient = useIngredientStore((state) => state.update);

  const [item, setItem] = useState<Ingredient>();

  const onSubmit = (item: IngredientSubmitItem) => {
    try {
      updateIngredient(id, item);
    } catch (error) {
      if (error instanceof IngredientError) {
        showIngredientError({ error });
      }
      throw error;
    }
  };

  useEffect(() => {
    const storageIngredient = ingredientStorage.getIngredient(id);

    if (!storageIngredient) {
      showIngredientError({ error: new IngredientError("INGREDIENT_NOT_FOUND"), onPress: goBack });
      return;
    }

    setItem(storageIngredient);
  }, []);

  return { initialState: item, onSubmit };
}
