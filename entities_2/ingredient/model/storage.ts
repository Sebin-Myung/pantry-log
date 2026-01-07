import { storage } from "@shared";
import { Ingredient } from "./types";

const IDS_KEY = "ingredients:ids";
const itemKey = (id: string) => `ingredient:${id}`;

const getIds = (): string[] => {
  const raw = storage.getString(IDS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const setIds = (ids: string[]) => {
  storage.set(IDS_KEY, JSON.stringify(ids));
};

const addIngredient = (item: Ingredient) => {
  const ids = getIds();

  if (!ids.includes(item.id)) {
    setIds([...ids, item.id]);
  } else {
    // 이미 존재하는 ID인 경우 덮어쓰기 방지
    throw new Error(`Ingredient with id ${item.id} already exists.`);
  }

  storage.set(itemKey(item.id), JSON.stringify(item));
};

const getIngredient = (id: string): Ingredient | null => {
  const raw = storage.getString(itemKey(id));
  return raw ? JSON.parse(raw) : null;
};

const updateIngredient = (id: string, partial: Partial<Ingredient>) => {
  const current = getIngredient(id);
  if (!current) throw new Error(`Ingredient with id ${id} does not exist.`);

  const updated = { ...current, ...partial };
  storage.set(itemKey(id), JSON.stringify(updated));
};

const removeIngredient = (id: string) => {
  const ids = getIds().filter((storedId) => storedId !== id);
  setIds(ids);
  storage.remove(itemKey(id));
};

const getAllIngredients = (): Ingredient[] => {
  const ids = getIds();
  return ids.map((id) => getIngredient(id)).filter((item): item is Ingredient => item !== null);
};

export const ingredientStorage = {
  getIds,
  setIds,
  addIngredient,
  getIngredient,
  updateIngredient,
  removeIngredient,
  getAllIngredients,
};
