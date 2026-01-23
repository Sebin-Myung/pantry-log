import { storage } from "@shared";
import { Recipe } from "./types";

const IDS_KEY = "recipe:ids";
const itemKey = (id: string) => `recipe:${id}`;

const getIds = (): string[] => {
  const raw = storage.getString(IDS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const setIds = (ids: string[]) => {
  storage.set(IDS_KEY, JSON.stringify(ids));
};

const addRecipe = (item: Recipe) => {
  storage.set(itemKey(item.id), JSON.stringify(item));
};

const getRecipe = (id: string): Recipe | null => {
  const raw = storage.getString(itemKey(id));
  return raw ? JSON.parse(raw) : null;
};

const updateRecipe = (id: string, item: Recipe) => {
  storage.set(itemKey(id), JSON.stringify(item));
};

const removeRecipe = (id: string) => {
  storage.remove(itemKey(id));
};

const getAllRecipes = (): Recipe[] => {
  const ids = getIds();
  return ids.map((id) => getRecipe(id)).filter((item): item is Recipe => item !== null);
};

export const recipeStorage = {
  getIds,
  setIds,
  addRecipe,
  getRecipe,
  updateRecipe,
  removeRecipe,
  getAllRecipes,
};
