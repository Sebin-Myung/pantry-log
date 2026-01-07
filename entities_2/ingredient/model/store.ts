import { create } from "zustand";
import { ingredientStorage } from "./storage";
import { Ingredient } from "./types";
import { getIngredientKeys, sortIngredients } from "./utils";

interface IUseIngredientStore {
  ingredients: Ingredient[];
  hydrate: () => void;
  add: (item: Ingredient) => void;
  update: (id: string, partial: Partial<Ingredient>) => void;
  remove: (id: string) => void;
}

export const useIngredientStore = create<IUseIngredientStore>((set, get) => ({
  ingredients: [],
  hydrate: () => {
    const list = ingredientStorage.getAllIngredients();
    set({ ingredients: list });
  },
  add: (item: Ingredient) => {
    try {
      ingredientStorage.addIngredient(item);

      const newItems = sortIngredients([...get().ingredients, item]);
      const itemKeys = getIngredientKeys(newItems);

      set({ ingredients: newItems });
      ingredientStorage.setIds(itemKeys);
    } catch (error) {
      console.error(error);
    }
  },
  update: (id: string, partial: Partial<Ingredient>) => {
    try {
      ingredientStorage.updateIngredient(id, partial);

      const newItems = sortIngredients(get().ingredients.map((i) => (i.id === id ? { ...i, ...partial } : i)));
      const itemKeys = getIngredientKeys(newItems);

      set({ ingredients: newItems });
      ingredientStorage.setIds(itemKeys);
    } catch (error) {
      console.error(error);
    }
  },
  remove: (id: string) => {
    ingredientStorage.removeIngredient(id);
    set({ ingredients: get().ingredients.filter((i) => i.id !== id) });
  },
}));
