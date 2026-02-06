import { randomUUID } from "expo-crypto";
import {
  CookingRecordError,
  cookingRecordRepository,
  CookingRecordSubmitItem,
  showCookingRecordError,
  useIngredientStore,
} from "../../../entities";

export function useAddCookingRecord() {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const updateIngredient = useIngredientStore((state) => state.update);
  const removeIngredient = useIngredientStore((state) => state.remove);

  const onSubmit = (item: CookingRecordSubmitItem) => {
    try {
      const createdAt = new Date().toISOString();
      cookingRecordRepository.addCookingRecord({ ...item, id: randomUUID(), createdAt, updatedAt: createdAt });

      item.ingredients.forEach((ingredientItem) => {
        const storedIngredient = ingredients.find((ing) => ing.name === ingredientItem.name);

        if (!storedIngredient) return;
        if (!ingredientItem.quantity || !storedIngredient.quantity) return;

        const newAmount = storedIngredient.quantity.amount - ingredientItem.quantity.amount;

        if (newAmount > 0) {
          updateIngredient(storedIngredient.id, {
            ...storedIngredient,
            quantity: {
              amount: newAmount,
              unit: storedIngredient.quantity.unit,
            },
          });
        } else {
          removeIngredient(storedIngredient.id);
        }
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
