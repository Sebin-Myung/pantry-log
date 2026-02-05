import { create } from "zustand";
import { RecipeError, RecipeErrorCode } from "./error";
import { recipeStorage } from "./storage";
import { Recipe } from "./types";
import { getRecipeKeys, sortRecipes } from "./utils";

interface IUseRecipeStore {
  isLoading: boolean;
  recipes: Recipe[];
  hydrate: () => void;
  add: (item: Recipe) => void;
  update: (id: string, partial: Partial<Recipe>) => void;
  remove: (id: string) => void;
}

export const useRecipeStore = create<IUseRecipeStore>((set, get) => ({
  isLoading: true,
  recipes: [],
  hydrate: () => {
    if (!get().isLoading) return;

    const list = recipeStorage.getAllRecipes();
    set({ isLoading: false, recipes: list });
  },
  add: (item: Recipe) => {
    const currentRecipes = get().recipes;

    // 중복 검사
    currentRecipes.forEach((recipe) => {
      if (item.id === recipe.id) throw new RecipeError(RecipeErrorCode.DUPLICATED_ID);
      if (item.name === recipe.name) throw new RecipeError(RecipeErrorCode.DUPLICATED_NAME);
    });

    const newRecipes = sortRecipes([...currentRecipes, item]);
    const recipeKeys = getRecipeKeys(newRecipes);

    recipeStorage.setIds(recipeKeys);
    recipeStorage.addRecipe(item);
    set({ recipes: newRecipes });
  },
  update: (id: string, partial: Partial<Recipe>) => {
    const currentRecipes = get().recipes;
    const currentRecipe = currentRecipes.find((recipe) => recipe.id === id);

    if (!currentRecipe) throw new RecipeError(RecipeErrorCode.NOT_FOUND);

    const newRecipe = { ...currentRecipe, ...partial };

    // 중복 검사
    currentRecipes.forEach((recipe) => {
      if (id !== recipe.id && newRecipe.name === recipe.name) throw new RecipeError(RecipeErrorCode.DUPLICATED_NAME);
    });

    const newItems = sortRecipes(currentRecipes.map((recipe) => (recipe.id === id ? newRecipe : recipe)));
    const itemKeys = getRecipeKeys(newItems);

    recipeStorage.updateRecipe(id, newRecipe);
    recipeStorage.setIds(itemKeys);
    set({ recipes: newItems });
  },
  remove: (id: string) => {
    const currentRecipes = get().recipes;
    const filteredRecipes = currentRecipes.filter((recipe) => recipe.id !== id);
    const newIds = getRecipeKeys(filteredRecipes);

    recipeStorage.setIds(newIds);
    recipeStorage.removeRecipe(id);
    set({ recipes: filteredRecipes });
  },
}));
