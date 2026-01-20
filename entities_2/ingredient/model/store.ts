import { create } from "zustand";
import { ingredientStorage } from "./storage";
import { Ingredient } from "./types";
import { getIngredientKeys, sortIngredients } from "./utils";

interface IUseIngredientStore {
  isLoading: boolean;
  ingredients: Ingredient[];
  hydrate: () => void;
  add: (item: Ingredient) => void;
  update: (id: string, partial: Partial<Ingredient>) => void;
  remove: (id: string) => void;
}

export const useIngredientStore = create<IUseIngredientStore>((set, get) => ({
  isLoading: true,
  ingredients: [],
  hydrate: () => {
    const list = ingredientStorage.getAllIngredients();
    set({ isLoading: false, ingredients: list });
  },
  add: (item: Ingredient) => {
    try {
      const currentIngredients = get().ingredients;

      // 중복 검사
      currentIngredients.forEach((ingredient) => {
        if (item.id === ingredient.id) throw new Error("DUPLICATED_ID");
        if (item.name === ingredient.name) throw new Error("DUPLICATED_NAME");
      });

      const newIngredients = sortIngredients([...currentIngredients, item]);
      const ingredientKeys = getIngredientKeys(newIngredients);

      ingredientStorage.setIds(ingredientKeys);
      ingredientStorage.addIngredient(item);
      set({ ingredients: newIngredients });
    } catch (error) {
      console.error(error);
    }
  },
  update: (id: string, partial: Partial<Ingredient>) => {
    try {
      const currentIngredients = get().ingredients;
      const currentIngredient = currentIngredients.find((ingredient) => ingredient.id === id);

      if (!currentIngredient) throw new Error("NOT_FOUND");

      const newIngredient = { ...currentIngredient, ...partial };
      const newItems = sortIngredients(
        currentIngredients.map((ingredient) => (ingredient.id === id ? newIngredient : ingredient))
      );
      const itemKeys = getIngredientKeys(newItems);

      ingredientStorage.updateIngredient(id, newIngredient);
      ingredientStorage.setIds(itemKeys);
      set({ ingredients: newItems });
    } catch (error) {
      console.error(error);
    }
  },
  remove: (id: string) => {
    const currentIngredients = get().ingredients;
    const filteredIngredients = currentIngredients.filter((ingredient) => ingredient.id !== id);
    const newIds = getIngredientKeys(filteredIngredients);

    ingredientStorage.setIds(newIds);
    ingredientStorage.removeIngredient(id);
    set({ ingredients: filteredIngredients });
  },
}));
