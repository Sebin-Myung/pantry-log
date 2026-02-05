import {
  CookingRecordError,
  cookingRecordRepository,
  CookingRecordSubmitItem,
  showCookingRecordError,
  useIngredientStore,
} from "@entities";
import { randomUUID } from "expo-crypto";

export function useAddCookingRecord() {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const updateIngredient = useIngredientStore((state) => state.update);

  const onSubmit = (item: CookingRecordSubmitItem) => {
    try {
      const createdAt = new Date().toISOString();
      cookingRecordRepository.addCookingRecord({ ...item, id: randomUUID(), createdAt, updatedAt: createdAt });

      item.ingredients.forEach((ingredientItem) => {
        const storedIngredient = ingredients.find((ing) => ing.name === ingredientItem.name);

        if (!storedIngredient) return;
        if (!ingredientItem.quantity || !storedIngredient.quantity) return;

        updateIngredient(storedIngredient.id, {
          ...storedIngredient,
          quantity: {
            amount: storedIngredient.quantity.amount - ingredientItem.quantity.amount,
            unit: storedIngredient.quantity.unit,
          },
        });
      });
    } catch (error) {
      if (error instanceof CookingRecordError) {
        showCookingRecordError({ error });
      }
      throw error;
    }
  };

  return { onSubmit };
}
