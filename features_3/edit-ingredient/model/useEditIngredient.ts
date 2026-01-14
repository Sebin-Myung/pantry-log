import { Ingredient, ingredientStorage, useIngredientStore } from "@entities";
import { useBackButton } from "@shared";
import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";

export interface IUseEditIngredient extends Pick<Ingredient, "id"> {}

export function useEditIngredient({ id }: IUseEditIngredient) {
  const { goBack } = useBackButton();
  const updateIngredient = useIngredientStore((state) => state.update);

  const [item, setItem] = useState<Ingredient>();

  const onSubmit = (item: Ingredient) => {
    updateIngredient(id, item);
  };

  useLayoutEffect(() => {
    const storageIngredient = ingredientStorage.getIngredient(id);

    if (!storageIngredient) {
      Alert.alert("알림", "존재하지 않는 재료입니다.", [{ text: "확인", style: "default", onPress: goBack }]);
      return;
    }

    setItem(storageIngredient);
  }, []);

  return { initialState: item, onSubmit };
}
