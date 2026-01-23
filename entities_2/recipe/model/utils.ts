import { Recipe } from "./types";

export const sortRecipes = (items: Recipe[]) => {
  return [...items].sort((a, b) => {
    // 이름 가나다 순
    return a.name.localeCompare(b.name, "ko");
  });
};

export const getRecipeKeys = (items: Recipe[]) => {
  return items.map((item) => item.id);
};
